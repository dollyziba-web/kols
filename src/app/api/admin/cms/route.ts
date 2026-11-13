import { NextRequest, NextResponse } from "next/server";
import { getServerAdminSession } from "@/lib/auth";
import {
  deleteProject,
  deleteService,
  deleteTestimonial,
  getAllData,
  updateWebsiteSettings,
  upsertProject,
  upsertService,
  upsertTestimonial,
} from "@/lib/db";

export async function GET() {
  const session = getServerAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const data = await getAllData();
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const session = getServerAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { entity, payload } = body;

    if (entity === "project") {
      const saved = await upsertProject(payload);
      return NextResponse.json({ success: true, project: saved });
    }

    if (entity === "service") {
      const saved = await upsertService(payload);
      return NextResponse.json({ success: true, service: saved });
    }

    if (entity === "testimonial") {
      const saved = await upsertTestimonial(payload);
      return NextResponse.json({ success: true, testimonial: saved });
    }

    if (entity === "settings") {
      const saved = await updateWebsiteSettings(payload);
      return NextResponse.json({ success: true, settings: saved });
    }

    return NextResponse.json(
      { error: "Unknown CMS entity type." },
      { status: 400 }
    );
  } catch (error) {
    console.error("CMS POST error:", error);
    return NextResponse.json(
      { error: "Failed to save CMS entity." },
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
  const entity = searchParams.get("entity");
  const id = searchParams.get("id");

  if (!entity || !id) {
    return NextResponse.json(
      { error: "Missing entity or ID." },
      { status: 400 }
    );
  }

  if (entity === "project") {
    const ok = await deleteProject(id);
    return NextResponse.json({ success: ok });
  }

  if (entity === "service") {
    const ok = await deleteService(id);
    return NextResponse.json({ success: ok });
  }

  if (entity === "testimonial") {
    const ok = await deleteTestimonial(id);
    return NextResponse.json({ success: ok });
  }

  return NextResponse.json({ error: "Invalid entity." }, { status: 400 });
}
