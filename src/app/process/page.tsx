import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { getWebsiteSettings } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getWebsiteSettings();
  return {
    title: settings.seo.process.title,
    description: settings.seo.process.description,
    alternates: { canonical: "/process" },
  };
}

const DETAILED_PROCESS_STAGES = [
  {
    number: "01",
    title: "DISCOVERY & CONSULTATION",
    subtitle: "Brief Alignment, Site Parameters & Spatial Ambition",
    explanation:
      "Every architectural or visualization commission begins with a structured consultation. We review your site dimensions, existing survey or CAD files, room schedule requirements, functional workflow, target timeline, and visual references. Whether you are a homeowner planning a residence or a developer commissioning 3D visualizations, this stage establishes a clear, shared project brief.",
    visual: "/images/process/process-01-consultation.jpg",
    visualCaption: "Stage 01: Spatial Brief & Architectural Direction Alignment",
    deliverables: [
      "Comprehensive Project Brief & Scope Summary",
      "Site / Existing Drawing Audit",
      "Room & Functional Area Schedule",
      "Milestone Schedule & Deliverable Checklist",
    ],
  },
  {
    number: "02",
    title: "CONCEPT DEVELOPMENT",
    subtitle: "Spatial Zoning, Massing & Architectural Direction",
    explanation:
      "With the brief established, our architects develop initial spatial layouts, circulation diagrams, and volumetric massing concepts. We explore how daylight enters the floor plate, how private and social zones interact, and how material palettes—stone, timber, glass, and bronze—establish the desired architectural tone.",
    visual: "/images/drawings/cad-zoning-concept.svg",
    visualCaption: "Stage 02: 2D Spatial Zoning & Structural Grid Concept",
    deliverables: [
      "Preliminary 2D Floor Plan & Zoning Layouts",
      "Volumetric Massing & Proportion Studies",
      "Material, Texture & Lighting Direction Board",
      "Concept Review Consultation",
    ],
  },
  {
    number: "03",
    title: "DESIGN & VISUALIZATION",
    subtitle: "Detailed 2D CAD Drafting & Photorealistic 3D Production",
    explanation:
      "During this core production phase, approved concepts are developed into precision 2D architectural drawings and high-dynamic-range 3D visualizations. Our CAD specialists draft dimensioned floor plans, elevations, and sections while our 3D visualization team builds detailed geometry, custom joinery, physically accurate shaders, and atmospheric daylight/dusk lighting.",
    visual: "/images/process/process-03-visualization.jpg",
    visualCaption: "Stage 03: High-Precision 3D Visualization & Lighting Calibration",
    deliverables: [
      "Dimensioned 2D Architectural Plans, Elevations & Sections",
      "Camera Angle & Clay Lighting Previews",
      "High-Resolution 3D Exterior & Interior Visualizations",
      "Kitchen, Bathroom, or Clinical Joinery Studies",
    ],
  },
  {
    number: "04",
    title: "REVIEW & REFINEMENT",
    subtitle: "Collaborative Feedback & Precision Revisions",
    explanation:
      "We present the coordinated 2D drawings and 3D visual previews for your structured feedback. Together, we evaluate room clearances, facade proportions, cabinet finishes, lighting warmth, and fixture selections—incorporating agreed refinements with technical accuracy.",
    visual: "/images/process/process-04-refinement.jpg",
    visualCaption: "Stage 04: Material, Lighting & Joinery Detail Refinement",
    deliverables: [
      "Consolidated Markup & Revision Log",
      "Refined 2D CAD Layout Adjustments",
      "Updated Material, Fixture & Lighting Renders",
      "Final Pre-Handover Quality Verification",
    ],
  },
  {
    number: "05",
    title: "FINAL DELIVERY",
    subtitle: "Complete Drawing Packages, 4K/8K Renders & Native CAD Files",
    explanation:
      "Once all details are signed off, we compile and deliver your organized final archive. You receive plot-ready scaled PDF drawing sheets, native editable AutoCAD (.DWG) files, and uncompressed 4K/8K photorealistic renderings and walkthroughs—ready for contractor execution, planning submission, or marketing presentation.",
    visual: "/images/drawings/cad-handover-package.svg",
    visualCaption: "Stage 05: Issued-for-Delivery Architectural Documentation",
    deliverables: [
      "Final Plot-Ready Architectural Drawing Set (PDF)",
      "Native Editable AutoCAD (.DWG) Documentation",
      "Uncompressed High-Resolution 3D Renderings",
      "Organized Digital Archive & Handover Transmittal",
    ],
  },
];

export default function ProcessPage() {
  return (
    <div className="bg-ivory text-charcoal">
      {/* Hero */}
      <section className="bg-charcoal text-ivory pt-40 pb-24 sm:pt-48 sm:pb-32 border-b border-ivory/10 arch-grid-dark">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-end">
            <div className="lg:col-span-8 space-y-6">
              <div className="inline-flex items-center gap-2.5">
                <span className="h-[1.5px] w-8 bg-bronze" />
                <span className="font-mono text-xs tracking-[0.26em] uppercase text-bronze">
                  STUDIO METHODOLOGY · STAGES 01 – 05
                </span>
              </div>
              <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl leading-[1.08] text-ivory">
                Our Architectural &amp; Visualization Workflow.
              </h1>
            </div>
            <div className="lg:col-span-4 border-l-2 border-bronze pl-5 space-y-2">
              <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-bronze">
                PREDICTABLE EXCELLENCE
              </p>
              <p className="text-sm text-ivory/80 leading-relaxed">
                A transparent five-stage workflow designed for seamless local
                and international collaboration—from initial enquiry to final
                CAD and 3D delivery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial 5-Stage Timeline */}
      <section className="py-24 sm:py-32 arch-grid-light">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16 space-y-24">
          {DETAILED_PROCESS_STAGES.map((stage, idx) => {
            const isEven = idx % 2 === 1;
            return (
              <div
                key={stage.number}
                className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-center border-b border-charcoal/15 pb-20 last:border-b-0 last:pb-0"
              >
                {/* Text Column */}
                <div
                  className={`lg:col-span-6 space-y-6 ${
                    isEven ? "lg:order-2 lg:pl-8" : "lg:pr-8"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="flex h-12 w-12 items-center justify-center bg-charcoal font-serif text-2xl text-bronze">
                      {stage.number}
                    </span>
                    <div>
                      <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-bronze-dark block font-semibold">
                        STAGE {stage.number} OF 05
                      </span>
                      <h2 className="font-mono text-sm sm:text-base font-bold tracking-[0.18em] uppercase text-charcoal">
                        {stage.number} — {stage.title}
                      </h2>
                    </div>
                  </div>

                  <h3 className="font-serif text-3xl sm:text-4xl text-charcoal">
                    {stage.subtitle}
                  </h3>

                  <p className="text-base leading-relaxed text-charcoal/80">
                    {stage.explanation}
                  </p>

                  <div className="border border-charcoal/15 bg-ivory-light p-6 space-y-3">
                    <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-bronze-dark font-semibold block">
                      STAGE {stage.number} DELIVERABLES &amp; OUTPUTS:
                    </span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {stage.deliverables.map((del) => (
                        <li
                          key={del}
                          className="flex items-start gap-2 text-xs text-charcoal/85"
                        >
                          <CheckCircle2 className="h-3.5 w-3.5 text-bronze-dark shrink-0 mt-0.5" />
                          <span>{del}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Visual Column */}
                <div
                  className={`lg:col-span-6 ${isEven ? "lg:order-1" : ""}`}
                >
                  <div className="border border-charcoal/15 bg-charcoal p-2 text-ivory shadow-xl">
                    <img
                      src={stage.visual}
                      alt={stage.title}
                      className="aspect-[16/10] w-full object-cover"
                    />
                    <div className="flex items-center justify-between px-4 py-3 font-mono text-[10px] tracking-[0.18em] uppercase">
                      <span>{stage.visualCaption}</span>
                      <span className="text-bronze">STAGE {stage.number}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Final START A PROJECT CTA */}
      <section className="bg-charcoal text-ivory py-24 sm:py-32">
        <div className="mx-auto max-w-4xl px-6 text-center space-y-6">
          <span className="font-mono text-xs tracking-[0.24em] uppercase text-bronze">
            INITIATE STAGE 01
          </span>
          <h2 className="font-serif text-4xl sm:text-6xl text-ivory">
            Ready to Begin Your Architectural Project?
          </h2>
          <p className="mx-auto max-w-xl text-base text-concrete-light leading-relaxed">
            Submit your project parameters via our online quotation portal or
            connect directly with our studio on WhatsApp.
          </p>
          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <Link
              href="/get-a-quote"
              className="inline-flex items-center gap-3 bg-bronze px-9 py-4 text-xs font-semibold tracking-[0.22em] uppercase text-charcoal transition hover:bg-ivory"
            >
              <span>START A PROJECT</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <a
              href="https://wa.me/2348067403009"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-ivory/30 px-8 py-4 text-xs font-medium tracking-[0.2em] uppercase text-ivory hover:border-bronze hover:text-bronze transition"
            >
              <span>CHAT ON WHATSAPP</span>
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
