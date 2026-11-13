import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { getServerAdminSession } from "@/lib/auth";
import {
  createEnquiry,
  deleteEnquiry,
  getEnquiries,
  updateEnquiryStatus,
} from "@/lib/db";
import { sendEnquiryNotificationEmail } from "@/lib/email";
import { EnquiryStatus, EnquirySubmission } from "@/types/kols";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[+\d][\d\s\-()]{6,22}$/;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Honeypot anti-spam check
    if (body.websiteUrlHoneypot) {
      return NextResponse.json({ success: true, spamFiltered: true });
    }

    const fullName = (body.fullName || "").trim();
    const email = (body.email || "").trim();
    const whatsappNumber = (body.whatsappNumber || "").trim();
    const projectCategory = (body.projectCategory || "").trim();
    const projectDescription = (body.projectDescription || "").trim();
    const enquiryType = body.enquiryType === "contact" ? "contact" : "quote";

    if (!fullName || fullName.length < 2) {
      return NextResponse.json(
        { error: "Please enter your full name." },
        { status: 400 }
      );
    }

    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (!whatsappNumber || !PHONE_REGEX.test(whatsappNumber)) {
      return NextResponse.json(
        { error: "Please enter a valid WhatsApp / telephone number." },
        { status: 400 }
      );
    }

    if (!projectCategory) {
      return NextResponse.json(
        { error: "Please select a project category." },
        { status: 400 }
      );
    }

    if (!projectDescription || projectDescription.length < 10) {
      return NextResponse.json(
        {
          error:
            "Please provide a brief project description (at least 10 characters).",
        },
        { status: 400 }
      );
    }

    const now = new Date().toISOString();
    const enquiry: EnquirySubmission = {
      id: `enq-${Date.now()}-${crypto.randomBytes(3).toString("hex")}`,
      enquiryType,
      fullName,
      email,
      whatsappNumber,
      projectCategory,
      projectDescription,
      propertyType: (body.propertyType || "").trim() || undefined,
      preferredStyle: (body.preferredStyle || "").trim() || undefined,
      projectBudget: (body.projectBudget || "").trim() || undefined,
      projectDeadline: (body.projectDeadline || "").trim() || undefined,
      additionalInfo: (body.additionalInfo || "").trim() || undefined,
      referenceFiles: Array.isArray(body.referenceFiles)
        ? body.referenceFiles
        : [],
      status: "new",
      createdAt: now,
      updatedAt: now,
    };

    const saved = await createEnquiry(enquiry);
    const emailResult = await sendEnquiryNotificationEmail(saved);

    return NextResponse.json({
      success: true,
      enquiryId: saved.id,
      createdAt: saved.createdAt,
      notificationProvider: emailResult.provider,
    });
  } catch (error) {
    console.error("Enquiry submission error:", error);
    return NextResponse.json(
      { error: "Unable to process your submission at this time." },
      { status: 500 }
    );
  }
}

export async function GET() {
  const session = getServerAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const enquiries = await getEnquiries();
  return NextResponse.json({ enquiries });
}

export async function PATCH(req: NextRequest) {
  const session = getServerAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await req.json();
    const { id, status } = body as { id: string; status: EnquiryStatus };
    const validStatuses: EnquiryStatus[] = [
      "new",
      "contacted",
      "in_progress",
      "completed",
    ];
    if (!id || !validStatuses.includes(status)) {
      return NextResponse.json(
        { error: "Invalid enquiry ID or status." },
        { status: 400 }
      );
    }
    const updated = await updateEnquiryStatus(id, status);
    if (!updated) {
      return NextResponse.json({ error: "Enquiry not found." }, { status: 404 });
    }
    return NextResponse.json({ success: true, enquiry: updated });
  } catch {
    return NextResponse.json(
      { error: "Failed to update enquiry." },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const session = getServerAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing enquiry ID." }, { status: 400 });
  }
  const deleted = await deleteEnquiry(id);
  return NextResponse.json({ success: deleted });
}
