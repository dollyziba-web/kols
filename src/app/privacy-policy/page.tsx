import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | KOLS ARCHITECTS",
  description:
    "Privacy Policy and data protection guidelines for clients and visitors of KOLS ARCHITECTS.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-ivory text-charcoal pt-40 pb-28">
      <div className="mx-auto max-w-4xl px-6 sm:px-10 space-y-10">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-bronze-dark hover:underline mb-6"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Home</span>
          </Link>
          <span className="block font-mono text-xs tracking-[0.24em] uppercase text-bronze-dark font-semibold">
            LEGAL &amp; DATA GOVERNANCE
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl text-charcoal mt-2">
            Privacy Policy
          </h1>
        </div>

        <div className="border border-charcoal/15 bg-ivory-light p-8 sm:p-12 space-y-8 text-sm sm:text-base leading-relaxed text-charcoal/80">
          <section className="space-y-3">
            <h2 className="font-serif text-2xl text-charcoal">
              1. Information We Collect
            </h2>
            <p>
              When you submit a quotation request or consultation enquiry to
              KOLS ARCHITECTS, we collect the contact and project details you
              voluntarily provide—such as your full name, email address,
              WhatsApp/telephone number, project description, and any uploaded
              reference drawings or files.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl text-charcoal">
              2. How We Use Project &amp; Client Data
            </h2>
            <p>
              Submitted information and architectural files are used strictly to
              evaluate your project requirements, prepare accurate quotations,
              communicate design updates, and deliver commissioned architectural
              drawings, 2D floor plans, DWG files, and 3D visualizations.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl text-charcoal">
              3. Confidentiality of Architectural Drawings &amp; Files
            </h2>
            <p>
              All site surveys, floor plans, CAD drawings, and reference media
              uploaded through our portal are stored securely and are only
              accessible to authorized studio administrators. We never sell or
              distribute client project files to third parties.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl text-charcoal">
              4. Contact &amp; Data Requests
            </h2>
            <p>
              To request updates or deletion of your submitted enquiry records,
              please contact KOLS ARCHITECTS via our{" "}
              <Link href="/contact" className="text-bronze-dark underline">
                Contact Page
              </Link>{" "}
              or official WhatsApp channel.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
