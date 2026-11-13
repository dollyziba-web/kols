import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms & Conditions | KOLS ARCHITECTS",
  description:
    "Terms and Conditions governing architectural design, 2D documentation, and 3D visualization commissions at KOLS ARCHITECTS.",
};

export default function TermsPage() {
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
            STUDIO TERMS OF ENGAGEMENT
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl text-charcoal mt-2">
            Terms &amp; Conditions
          </h1>
        </div>

        <div className="border border-charcoal/15 bg-ivory-light p-8 sm:p-12 space-y-8 text-sm sm:text-base leading-relaxed text-charcoal/80">
          <section className="space-y-3">
            <h2 className="font-serif text-2xl text-charcoal">
              1. Scope of Architectural &amp; Visualization Services
            </h2>
            <p>
              KOLS ARCHITECTS provides architectural design, 2D floor plan
              layouts, 3D architectural and interior visualization, and AutoCAD
              DWG drafting services according to the written quotation and scope
              agreed with the client prior to project commencement.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl text-charcoal">
              2. Design Reviews &amp; Revisions
            </h2>
            <p>
              Each commission follows our structured five-stage workflow,
              including dedicated review and refinement checkpoints. Additional
              structural redesigns outside the agreed brief may be quoted as a
              scope variation.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl text-charcoal">
              3. Site Verification &amp; Local Compliance
            </h2>
            <p>
              Where KOLS ARCHITECTS provides remote architectural design,
              conceptual planning, or 3D visualization services, final on-site
              structural engineering verification and local municipal building
              code sign-off remain the responsibility of the appointed local
              contractor or engineer of record.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl text-charcoal">
              4. Intellectual Property
            </h2>
            <p>
              Upon full settlement of agreed studio fees, clients receive a
              license to use the final delivered drawings, CAD files, and 3D
              renderings for the specified project.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
