import { EnquirySubmission } from "@/types/kols";

export async function sendEnquiryNotificationEmail(
  enquiry: EnquirySubmission
): Promise<{ sent: boolean; provider: string }> {
  const resendApiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.NOTIFICATION_EMAIL_TO || "studio@kolsarchitects.com";

  if (resendApiKey && resendApiKey.startsWith("re_")) {
    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "KOLS ARCHITECTS <notifications@kolsarchitects.com>",
          to: [toEmail],
          subject: `[KOLS ARCHITECTS] New ${enquiry.enquiryType.toUpperCase()} Enquiry — ${enquiry.fullName} (${enquiry.projectCategory})`,
          html: `
            <div style="font-family: sans-serif; color: #17191B; max-width: 640px; padding: 24px; background: #F3F0E9;">
              <h2 style="letter-spacing: 2px; border-bottom: 1px solid #A58B62; padding-bottom: 12px;">
                KOLS ARCHITECTS — NEW PROJECT ENQUIRY
              </h2>
              <p><strong>Client Name:</strong> ${enquiry.fullName}</p>
              <p><strong>Email:</strong> ${enquiry.email}</p>
              <p><strong>WhatsApp Number:</strong> ${enquiry.whatsappNumber}</p>
              <p><strong>Category:</strong> ${enquiry.projectCategory}</p>
              <p><strong>Property Type:</strong> ${enquiry.propertyType || "N/A"}</p>
              <p><strong>Preferred Style:</strong> ${enquiry.preferredStyle || "N/A"}</p>
              <p><strong>Budget:</strong> ${enquiry.projectBudget || "Optional / Not specified"}</p>
              <p><strong>Deadline:</strong> ${enquiry.projectDeadline || "Flexible"}</p>
              <p><strong>Project Description:</strong><br/>${enquiry.projectDescription}</p>
              <p><strong>Additional Information:</strong><br/>${enquiry.additionalInfo || "None"}</p>
              <p><strong>Attached Reference Files:</strong> ${enquiry.referenceFiles.length}</p>
            </div>
          `,
        }),
      });

      if (response.ok) {
        return { sent: true, provider: "resend" };
      }
    } catch (error) {
      console.warn("Resend email dispatch error:", error);
    }
  }

  // Logged & stored in Admin Dashboard Enquiries queue when external SMTP/Resend key is not yet provided
  return { sent: false, provider: "admin-dashboard-queue" };
}
