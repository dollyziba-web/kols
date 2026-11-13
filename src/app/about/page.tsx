import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2, Compass, Layers, Ruler } from "lucide-react";
import { getWebsiteSettings } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getWebsiteSettings();
  return {
    title: settings.seo.about.title,
    description: settings.seo.about.description,
    alternates: { canonical: "/about" },
  };
}

const AREAS_OF_EXPERTISE = [
  {
    code: "EXP-01",
    title: "Architectural Drawing & Orthographic Documentation",
    description:
      "Detailed floor plans, exterior elevations, structural sections, and construction drawing sets prepared with rigorous dimensional accuracy.",
  },
  {
    code: "EXP-02",
    title: "2D Floor Plan Design & Spatial Optimization",
    description:
      "Strategic space planning that resolves circulation, zoning, daylighting, and ergonomic room proportions for residential and commercial properties.",
  },
  {
    code: "EXP-03",
    title: "Photorealistic 3D Architectural Visualization",
    description:
      "High-dynamic-range exterior and interior 3D renderings that translate unbuilt architectural concepts into persuasive visual reality.",
  },
  {
    code: "EXP-04",
    title: "Specialized Kitchen, Bathroom & Clinic Visualization",
    description:
      "Dedicated 3D design and material visualization for high-precision wet rooms, culinary ateliers, and patient-centered medical/healthcare interiors.",
  },
  {
    code: "EXP-05",
    title: "Luxury Residential & Commercial Interior Design",
    description:
      "Cohesive interior architecture encompassing living lounges, private reception halls, bespoke joinery, lighting plans, and curated material palettes.",
  },
  {
    code: "EXP-06",
    title: "AutoCAD DWG Drafting & CAD Documentation",
    description:
      "ISO-standardized native .DWG drafting, blueprint conversion, and redline documentation support for architects, engineers, and developers.",
  },
];

const WORKING_PRINCIPLES = [
  {
    number: "01",
    title: "Architectural Clarity First",
    description:
      "Before applying surface ornament, we ensure the underlying floor plan, circulation axis, and volumetric massing work effortlessly.",
  },
  {
    number: "02",
    title: "Material & Lighting Authenticity",
    description:
      "Our 3D visualizations simulate physically accurate daylight, artificial colour temperatures, and genuine stone, timber, and metallic textures.",
  },
  {
    number: "03",
    title: "Technical Precision in Every Line",
    description:
      "Drawings are instruments of communication. We maintain disciplined CAD layer standards, clear scale hierarchies, and unambiguous dimensioning.",
  },
  {
    number: "04",
    title: "Transparent & Collaborative Delivery",
    description:
      "We structure every engagement around clear stages, structured review checkpoints, and seamless remote communication across time zones.",
  },
];

export default async function AboutPage() {
  const settings = await getWebsiteSettings();

  return (
    <div className="bg-ivory text-charcoal">
      {/* 1. Elegant Page Hero */}
      <section className="relative bg-charcoal text-ivory pt-40 pb-24 sm:pt-48 sm:pb-32 border-b border-ivory/10 arch-grid-dark overflow-hidden">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-end">
            <div className="lg:col-span-8 space-y-6">
              <div className="inline-flex items-center gap-2.5">
                <span className="h-[1.5px] w-8 bg-bronze" />
                <span className="font-mono text-xs tracking-[0.26em] uppercase text-bronze">
                  ABOUT KOLS ARCHITECTS
                </span>
              </div>
              <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl leading-[1.08] tracking-wide text-ivory">
                Where Architectural Design Meets Visual Precision.
              </h1>
            </div>
            <div className="lg:col-span-4 border-l-2 border-bronze pl-5 space-y-2">
              <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-bronze">
                BRAND POSITIONING
              </p>
              <p className="text-sm text-ivory/80 leading-relaxed">
                A contemporary architectural design and visualization studio
                specializing in transforming concepts into functional,
                aesthetically refined and visually compelling spaces.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Company Introduction & Editorial Imagery */}
      <section className="py-24 sm:py-32 border-b border-charcoal/10 arch-grid-light">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="font-mono text-xs tracking-[0.24em] uppercase text-bronze-dark font-semibold">
                01 / STUDIO INTRODUCTION
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl leading-[1.14] text-charcoal">
                {settings.aboutHeadline}
              </h2>
              <p className="text-base sm:text-lg leading-relaxed text-charcoal/80">
                {settings.aboutIntro}
              </p>
              <p className="text-sm sm:text-base leading-relaxed text-charcoal/75">
                We serve homeowners, property developers, practicing architects,
                construction companies, real estate professionals, interior
                designers, commercial property owners, and healthcare facility
                operators—delivering bespoke design and technical visualization
                solutions tailored to each project&apos;s scale and ambition.
              </p>
            </div>

            <div className="lg:col-span-6">
              <div className="border border-charcoal/15 bg-charcoal p-2 shadow-xl">
                <img
                  src="/images/about/about-atelier-studio.jpg"
                  alt="KOLS ARCHITECTS Design Atelier and Architectural Material Library"
                  className="aspect-[16/10] w-full object-cover"
                />
                <div className="flex items-center justify-between px-4 py-3 font-mono text-[10px] tracking-[0.2em] uppercase text-ivory">
                  <span>ARCHITECTURAL DESIGN ATELIER</span>
                  <span className="text-bronze">DESIGNING SPACES. VISUALIZING POSSIBILITIES.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Studio Philosophy & 4. Design Approach */}
      <section className="bg-charcoal text-ivory py-24 sm:py-32 border-b border-ivory/10">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            {/* Studio Philosophy */}
            <div className="lg:col-span-6 border border-ivory/15 bg-charcoal-light/40 p-8 sm:p-12 space-y-6">
              <div className="flex items-center justify-between border-b border-ivory/10 pb-4">
                <span className="font-mono text-xs tracking-[0.22em] uppercase text-bronze">
                  02 / STUDIO PHILOSOPHY
                </span>
                <Compass className="h-5 w-5 text-bronze" />
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl text-ivory">
                Architecture Beyond Imagination.
              </h2>
              <p className="text-base leading-relaxed text-ivory/85">
                {settings.aboutPhilosophy}
              </p>
              <div className="pt-4 border-t border-ivory/10 grid grid-cols-2 gap-4 font-mono text-[11px] uppercase tracking-wider text-bronze">
                <span>· Spatial Harmony</span>
                <span>· Material Honesty</span>
                <span>· Technical Rigor</span>
                <span>· Visual Conviction</span>
              </div>
            </div>

            {/* Design Approach */}
            <div className="lg:col-span-6 border border-ivory/15 bg-charcoal-light/40 p-8 sm:p-12 space-y-6">
              <div className="flex items-center justify-between border-b border-ivory/10 pb-4">
                <span className="font-mono text-xs tracking-[0.22em] uppercase text-bronze">
                  03 / DESIGN APPROACH
                </span>
                <Ruler className="h-5 w-5 text-bronze" />
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl text-ivory">
                From Concept to Creation.
              </h2>
              <p className="text-base leading-relaxed text-ivory/85">
                {settings.aboutDesignApproach}
              </p>
              <div className="pt-4 border-t border-ivory/10 grid grid-cols-2 gap-4 font-mono text-[11px] uppercase tracking-wider text-bronze">
                <span>· 2D Orthographic Precision</span>
                <span>· Physically Based 3D Light</span>
                <span>· Ergonomic Space Planning</span>
                <span>· Iterative Client Review</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Areas of Expertise */}
      <section className="py-24 sm:py-32 border-b border-charcoal/10">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
          <div className="max-w-3xl space-y-4 mb-16">
            <span className="font-mono text-xs tracking-[0.24em] uppercase text-bronze-dark font-semibold">
              04 / AREAS OF EXPERTISE
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-charcoal">
              Multidisciplinary Architectural &amp; Visualization Capabilities.
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {AREAS_OF_EXPERTISE.map((area) => (
              <div
                key={area.code}
                className="border border-charcoal/15 bg-ivory-light p-8 space-y-4 hover:border-bronze transition"
              >
                <div className="flex items-center justify-between border-b border-charcoal/10 pb-3">
                  <span className="font-mono text-xs text-bronze-dark font-semibold">
                    {area.code}
                  </span>
                  <Layers className="h-4 w-4 text-bronze" />
                </div>
                <h3 className="font-serif text-2xl text-charcoal">
                  {area.title}
                </h3>
                <p className="text-sm leading-relaxed text-charcoal/75">
                  {area.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Creative and Technical Capabilities Split Visual */}
      <section className="bg-ivory-dark/50 py-24 sm:py-32 border-b border-charcoal/10">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <span className="font-mono text-xs tracking-[0.24em] uppercase text-bronze-dark font-semibold">
                05 / CREATIVE &amp; TECHNICAL SYNERGY
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-charcoal">
                Dual Mastery of Technical CAD &amp; Photorealistic 3D.
              </h2>
              <p className="text-sm sm:text-base text-charcoal/80 leading-relaxed">
                Many studios specialize exclusively in either technical drafting
                or artistic rendering. KOLS ARCHITECTS unites both disciplines
                under one roof—ensuring that every 3D visualization is grounded
                in buildable 2D geometry, and every CAD drawing is informed by
                three-dimensional spatial awareness.
              </p>
              <ul className="space-y-3 pt-2">
                {[
                  "ISO-compliant AutoCAD (.DWG) layer organization",
                  "Scaled orthographic floor plans, sections, and elevations",
                  "Physically accurate 3D lighting, stone, timber, and glass shaders",
                  "Tailored workflows for residential, commercial, and healthcare briefs",
                ].map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-3 text-sm text-charcoal/85"
                  >
                    <CheckCircle2 className="h-4 w-4 text-bronze-dark shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="border border-charcoal/15 bg-charcoal p-3 text-ivory">
                <img
                  src="/images/drawings/cad-structural-section.svg"
                  alt="2D Technical CAD Longitudinal Section S-302"
                  className="aspect-[4/3] w-full object-cover"
                />
                <p className="mt-3 font-mono text-[10px] tracking-[0.18em] uppercase text-bronze">
                  TECHNICAL: 2D CAD &amp; DWG DOCUMENTATION
                </p>
              </div>
              <div className="border border-charcoal/15 bg-charcoal p-3 text-ivory">
                <img
                  src="/images/about/about-material-study.jpg"
                  alt="3D Photorealistic Material & Lighting Visualization Sample"
                  className="aspect-[4/3] w-full object-cover"
                />
                <p className="mt-3 font-mono text-[10px] tracking-[0.18em] uppercase text-bronze">
                  CREATIVE: 3D MATERIAL &amp; LIGHTING VISUALIZATION
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Working Principles */}
      <section className="py-24 sm:py-32 border-b border-charcoal/10">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
          <div className="max-w-2xl space-y-3 mb-14">
            <span className="font-mono text-xs tracking-[0.24em] uppercase text-bronze-dark font-semibold">
              06 / WORKING PRINCIPLES
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-charcoal">
              Standards That Guide Every Commission.
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {WORKING_PRINCIPLES.map((principle) => (
              <div
                key={principle.number}
                className="border border-charcoal/15 bg-ivory-light p-7 space-y-4"
              >
                <span className="font-serif text-4xl text-bronze block">
                  {principle.number}
                </span>
                <h3 className="font-serif text-2xl text-charcoal">
                  {principle.title}
                </h3>
                <p className="text-sm leading-relaxed text-charcoal/75">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Final Project Enquiry CTA */}
      <section className="bg-charcoal text-ivory py-24 sm:py-32">
        <div className="mx-auto max-w-4xl px-6 text-center space-y-8">
          <span className="font-mono text-xs tracking-[0.24em] uppercase text-bronze">
            BEGIN A COLLABORATION
          </span>
          <h2 className="font-serif text-4xl sm:text-6xl text-ivory">
            Ready to Discuss Your Architectural Brief?
          </h2>
          <p className="mx-auto max-w-2xl text-base text-concrete-light leading-relaxed">
            Whether you need a complete residential design package, precision
            AutoCAD DWG drafting, or photorealistic 3D visualizations, our
            studio is ready to collaborate.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/get-a-quote"
              className="inline-flex items-center gap-3 bg-bronze px-8 py-4 text-xs font-semibold tracking-[0.22em] uppercase text-charcoal transition hover:bg-ivory"
            >
              <span>REQUEST A PROJECT QUOTATION</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-3 border border-ivory/30 px-8 py-4 text-xs font-medium tracking-[0.22em] uppercase text-ivory transition hover:border-bronze hover:text-bronze"
            >
              <span>EXPLORE ALL 14 SERVICES</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
