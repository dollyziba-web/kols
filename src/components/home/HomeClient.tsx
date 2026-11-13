"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  CheckCircle2,
  Compass,
  FileCode2,
  Layers,
  Menu,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import {
  PortfolioProject,
  ServiceItem,
  TestimonialItem,
  WebsiteSettings,
} from "@/types/kols";
import VideoPresentationPlayer from "@/components/interactive/VideoPresentationPlayer";
import Architectural3DViewer from "@/components/interactive/Architectural3DViewer";

interface HomeClientProps {
  services?: ServiceItem[];
  projects?: PortfolioProject[];
  testimonials: TestimonialItem[];
  settings: WebsiteSettings;
}

const CAPABILITIES_LIST = [
  {
    code: "CAP-01",
    service: "Architectural drawings",
    deliverable: "Technical drawings and documentation.",
    detail: "Orthographic plans, elevations, sections, and construction sheets.",
  },
  {
    code: "CAP-02",
    service: "2D floor plans",
    deliverable: "Detailed floor plan layouts.",
    detail: "Room zoning, dimensional grids, circulation, and furniture blocks.",
  },
  {
    code: "CAP-03",
    service: "3D kitchen design",
    deliverable: "Realistic kitchen renders.",
    detail: "Cabinetry joinery, stone islands, appliances, and cove lighting.",
  },
  {
    code: "CAP-04",
    service: "3D bathroom design",
    deliverable: "Material, fixture and lighting visualization.",
    detail: "Wet-room slab set-outs, sanitaryware, vanities, and illumination.",
  },
  {
    code: "CAP-05",
    service: "3D clinic design",
    deliverable: "Healthcare interior concepts.",
    detail: "Patient reception, waiting lounges, and clinical consultation suites.",
  },
  {
    code: "CAP-06",
    service: "Living room design",
    deliverable: "Interior layouts and renders.",
    detail: "Bespoke seating compositions, hearth walls, and daylight studies.",
  },
  {
    code: "CAP-07",
    service: "DWG drafting",
    deliverable: "Editable CAD drawing files.",
    detail: "ISO-layered native AutoCAD .DWG documentation and conversions.",
  },
  {
    code: "CAP-08",
    service: "Interior design",
    deliverable: "Space planning and visualization.",
    detail: "Holistic residential and commercial interior architecture packages.",
  },
];

const PROCESS_STAGES = [
  {
    number: "01",
    title: "DISCOVERY & CONSULTATION",
    description:
      "Understand client needs, objectives, space requirements and design preferences.",
    output: "Project Brief · Spatial Requirements · Reference Audit",
  },
  {
    number: "02",
    title: "CONCEPT DEVELOPMENT",
    description:
      "Develop design ideas, layouts, concepts and architectural direction.",
    output: "Spatial Zoning · Massing Concepts · Material Direction",
  },
  {
    number: "03",
    title: "DESIGN & VISUALIZATION",
    description:
      "Create 2D drawings, detailed plans and realistic 3D representations.",
    output: "2D CAD Plans · Elevations · Photorealistic 3D Renders",
  },
  {
    number: "04",
    title: "REVIEW & REFINEMENT",
    description: "Collect feedback and make agreed revisions.",
    output: "Design Walkthrough · Material & Layout Adjustments",
  },
  {
    number: "05",
    title: "FINAL DELIVERY",
    description:
      "Deliver agreed drawings, renderings, visualizations and project files.",
    output: "High-Res Renders · Plot-Ready PDFs · Native DWG Files",
  },
];

const WHY_CHOOSE_ITEMS = [
  {
    title: "Creative and functional design solutions",
    description:
      "Every spatial layout balances architectural beauty with everyday ergonomics, structural logic, and circulation clarity.",
  },
  {
    title: "Detailed architectural planning",
    description:
      "Disciplined 2D floor plans, elevations, and sections prepared with clear dimensions, grid axes, and annotations.",
  },
  {
    title: "High-quality 3D visualization",
    description:
      "Photorealistic exterior and interior renderings that allow you to evaluate spaces with confidence before construction.",
  },
  {
    title: "Attention to materials, textures and lighting",
    description:
      "Carefully calibrated natural daylight, warm architectural illumination, stone veining, timber grain, and metallic finishes.",
  },
  {
    title: "Customized solutions",
    description:
      "Bespoke architectural and interior concepts tailored to your specific plot, property type, aesthetic preference, and brief.",
  },
  {
    title: "Professional communication",
    description:
      "Clear milestone updates, structured design reviews, and responsive studio consultation from initial enquiry to completion.",
  },
  {
    title: "Remote collaboration",
    description:
      "Streamlined digital workflows supporting homeowners, developers, and architects across local and international locations.",
  },
  {
    title: "Organized project delivery",
    description:
      "Well-structured drawing sets, high-resolution render archives, and clean editable CAD files delivered on agreed schedules.",
  },
];

export default function HomeClient({
  testimonials,
  settings,
}: HomeClientProps) {
  const [capabilitiesExpanded, setCapabilitiesExpanded] = useState(false);
  const [whyChooseExpanded, setWhyChooseExpanded] = useState(false);

  const primaryCapability = CAPABILITIES_LIST[0];
  const additionalCapabilities = CAPABILITIES_LIST.slice(1);

  return (
    <div className="overflow-hidden">
      {/* =====================================================================
          4.2 CINEMATIC ARCHITECTURAL HERO
      ===================================================================== */}
      <section className="relative min-h-[88vh] w-full bg-charcoal text-ivory flex items-center pt-32 pb-20 sm:pt-36 sm:pb-24 lg:py-32 overflow-hidden">
        {/* Background Architectural Render with Subtle Scale Motion */}
        <motion.div
          initial={{ scale: 1.08, opacity: 0.4 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 z-0"
        >
          <img
            src="/images/renders/hero-residence.png"
            alt="KOLS ARCHITECTS — Contemporary Architectural Residence Visualization"
            className="h-full w-full object-cover object-center"
          />
          {/* Carefully controlled dark editorial gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/55 to-charcoal/25" />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/30 to-charcoal/50" />
        </motion.div>

        {/* Subtle Architectural Grid Hairlines */}
        <div className="pointer-events-none absolute inset-0 z-0 arch-grid-dark opacity-50" />

        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-12 lg:gap-12">
            {/* Hero Copy Column */}
            <div className="lg:col-span-8 space-y-6 sm:space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="inline-flex items-center gap-3 border border-bronze/50 bg-charcoal/70 backdrop-blur-sm px-4 py-2"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-bronze" />
                <span className="font-mono text-[10px] sm:text-xs tracking-[0.26em] uppercase text-ivory">
                  {settings.primaryTagline}
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.85, delay: 0.22 }}
                className="font-serif text-4xl sm:text-6xl lg:text-[66px] font-normal leading-[1.06] tracking-wide text-ivory"
              >
                {settings.heroHeadline}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.35 }}
                className="max-w-2xl text-base sm:text-lg lg:text-xl font-light leading-relaxed text-ivory/85"
              >
                {settings.heroSubheadline}
              </motion.p>

              {/* Hero CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.45 }}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-1"
              >
                <Link
                  href="/get-a-quote"
                  className="inline-flex items-center justify-center gap-3 bg-bronze px-8 py-4 text-xs font-semibold tracking-[0.22em] uppercase text-charcoal transition duration-300 hover:bg-ivory"
                >
                  <span>START A PROJECT</span>
                  <ArrowUpRight className="h-4 w-4" />
                </Link>

                <Link
                  href="/portfolio"
                  className="inline-flex items-center justify-center gap-3 border border-ivory/40 bg-charcoal/50 backdrop-blur-sm px-8 py-4 text-xs font-medium tracking-[0.22em] uppercase text-ivory transition duration-300 hover:border-bronze hover:text-bronze"
                >
                  <span>EXPLORE OUR WORK</span>
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </motion.div>
            </div>

            {/* Right Architectural Coordinate & Scroll Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="lg:col-span-4 flex flex-col items-start lg:items-end justify-between gap-6 border-t border-ivory/15 pt-6 lg:border-t-0 lg:pt-0"
            >
              <div className="border-l-2 border-bronze pl-4 text-left lg:text-right lg:border-l-0 lg:border-r-2 lg:pl-0 lg:pr-4 space-y-1">
                <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-bronze">
                  DISCIPLINES
                </p>
                <p className="text-xs text-ivory/80">
                  Architecture · 2D Floor Plans · 3D Visualization · Interior
                  Design · Technical DWG Documentation
                </p>
              </div>

              <a
                href="#studio-introduction"
                aria-label="Scroll to Studio Introduction"
                className="group inline-flex items-center gap-3 font-mono text-[10px] tracking-[0.24em] uppercase text-ivory/75 hover:text-bronze transition"
              >
                <span>SCROLL TO EXPLORE</span>
                <span className="flex h-9 w-9 items-center justify-center border border-ivory/25 group-hover:border-bronze transition">
                  <ArrowDown className="h-3.5 w-3.5 animate-bounce text-bronze" />
                </span>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          4.3 STUDIO INTRODUCTION (EDITORIAL SPLIT LAYOUT)
      ===================================================================== */}
      <section
        id="studio-introduction"
        className="relative bg-ivory text-charcoal py-16 sm:py-20 lg:py-24 border-b border-charcoal/10 arch-grid-light"
      >
        <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
            {/* Left Editorial Architectural Imagery */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-6 space-y-4"
            >
              <div className="relative overflow-hidden border border-charcoal/15 bg-charcoal shadow-2xl">
                <img
                  src="/images/renders/studio-intro.png"
                  alt="KOLS ARCHITECTS Studio Courtyard and Spatial Pavilion Study"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="flex items-center justify-between bg-charcoal px-5 py-3 text-ivory font-mono text-[10px] tracking-[0.2em] uppercase">
                  <span>STUDY: LIGHT, PROPORTION &amp; MATERIALITY</span>
                  <span className="text-bronze">KOLS STUDIO</span>
                </div>
              </div>

              {/* Integrated Technical Precision Detail Bar (aligned cleanly with zero awkward overflow) */}
              <div className="border border-bronze/50 bg-charcoal px-5 py-4 text-ivory shadow-md flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-bronze shrink-0">
                  WHERE DESIGN MEETS PRECISION
                </p>
                <p className="text-xs text-ivory/85 leading-relaxed">
                  Bridging expressive 3D visualization with rigorous 2D CAD
                  documentation.
                </p>
              </div>
            </motion.div>

            {/* Right Editorial Text Composition */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="lg:col-span-6 space-y-6 lg:pl-4"
            >
              <div className="inline-flex items-center gap-2.5">
                <span className="h-[1.5px] w-8 bg-bronze" />
                <span className="font-mono text-xs tracking-[0.24em] uppercase text-bronze-dark font-semibold">
                  {settings.aboutLabel}
                </span>
              </div>

              <h2 className="font-serif text-3xl sm:text-5xl leading-[1.12] tracking-wide text-charcoal">
                {settings.aboutHeadline}
              </h2>

              <p className="text-base sm:text-lg leading-relaxed text-charcoal/80">
                {settings.aboutIntro}
              </p>

              <blockquote className="border-l-2 border-bronze bg-ivory-dark/60 p-5 text-sm sm:text-base italic font-serif text-charcoal/90 leading-relaxed">
                “{settings.aboutPhilosophy}”
              </blockquote>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-3 border-t border-charcoal/10">
                <div>
                  <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-bronze-dark block">
                    CORE CAPABILITY 01
                  </span>
                  <p className="mt-1 font-serif text-lg font-medium text-charcoal">
                    2D Architectural &amp; DWG Documentation
                  </p>
                </div>
                <div>
                  <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-bronze-dark block">
                    CORE CAPABILITY 02
                  </span>
                  <p className="mt-1 font-serif text-lg font-medium text-charcoal">
                    Photorealistic 3D &amp; Interior Visualization
                  </p>
                </div>
              </div>

              <div className="pt-1">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-3 bg-charcoal px-7 py-4 text-xs font-medium tracking-[0.2em] uppercase text-ivory transition duration-300 hover:bg-bronze hover:text-charcoal"
                >
                  <span>DISCOVER OUR STUDIO</span>
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          4.6 CINEMATIC VIDEO PRESENTATION & 3D INTERACTIVE EXPERIENCE
      ===================================================================== */}
      <section className="bg-charcoal-dark text-ivory py-16 sm:py-20 lg:py-24 border-b border-ivory/10">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16 space-y-16">
          {/* Video Presentation Block */}
          <div className="space-y-8">
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <div className="space-y-3 max-w-2xl">
                <div className="inline-flex items-center gap-2.5">
                  <span className="h-[1.5px] w-8 bg-bronze" />
                  <span className="font-mono text-xs tracking-[0.24em] uppercase text-bronze">
                    CINEMATIC VISUALIZATION REEL &amp; WALKTHROUGHS
                  </span>
                </div>
                <h2 className="font-serif text-3xl sm:text-5xl leading-[1.12] text-ivory">
                  Immersive Architectural Motion &amp; 2D-to-3D Precision.
                </h2>
              </div>
              <p className="max-w-md text-xs sm:text-sm text-concrete leading-relaxed">
                Preview our exterior flythroughs, culinary joinery studies, and
                interior sequences—or toggle the interactive{" "}
                <span className="text-bronze">Compare 2D CAD vs 3D Render</span>{" "}
                mode to inspect how technical drawings translate into photorealistic
                spaces.
              </p>
            </div>

            <VideoPresentationPlayer />
          </div>

          {/* Interactive 3D Spatial Viewer Block */}
          <div className="space-y-8 pt-10 border-t border-ivory/10">
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <div className="space-y-2">
                <span className="font-mono text-xs tracking-[0.24em] uppercase text-bronze">
                  REAL-TIME WEBGL ARCHITECTURAL STUDIO
                </span>
                <h3 className="font-serif text-2xl sm:text-4xl text-ivory">
                  Interactive 3D Massing, Wireframe &amp; Solar Study.
                </h3>
              </div>
              <p className="max-w-md text-xs sm:text-sm text-concrete">
                Orbit the 3D architectural model in real time, switch between
                shaded travertine, CAD wireframe, and dusk lighting, or jump to
                orthographic plan and elevation viewpoints.
              </p>
            </div>

            <Architectural3DViewer />
          </div>
        </div>
      </section>

      {/* =====================================================================
          4.7 CAPABILITIES AND DELIVERABLES (COLLAPSIBLE CAP-01 TO CAP-08)
      ===================================================================== */}
      <section className="bg-ivory text-charcoal py-16 sm:py-20 lg:py-24 border-b border-charcoal/10 arch-grid-light">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
          <div
            className={`grid grid-cols-1 gap-10 lg:grid-cols-12 ${
              capabilitiesExpanded ? "items-start" : "items-center"
            }`}
          >
            <div className="lg:col-span-5 space-y-5">
              <div className="inline-flex items-center gap-2.5">
                <span className="h-[1.5px] w-8 bg-bronze" />
                <span className="font-mono text-xs tracking-[0.24em] uppercase text-bronze-dark font-semibold">
                  TECHNICAL OUTPUTS
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl leading-[1.12] text-charcoal">
                Capabilities &amp; Studio Deliverables.
              </h2>
              <p className="text-sm sm:text-base text-charcoal/75 leading-relaxed">
                Every commission is structured around clear, buildable, and
                presentation-ready deliverables—whether you require editable
                AutoCAD DWG sheets for construction or 4K photorealistic renders
                for design approval.
              </p>
              <div className="border border-charcoal/15 bg-charcoal p-6 text-ivory space-y-3">
                <div className="flex items-center gap-2.5 text-bronze font-mono text-xs uppercase tracking-widest">
                  <FileCode2 className="h-4 w-4" />
                  <span>STANDARD FILE FORMATS</span>
                </div>
                <p className="font-mono text-xs text-ivory/85">
                  .DWG · .DXF · .PDF (ISO A1/A3) · .PNG / .TIFF (4K–8K) · .MP4
                </p>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              {/* Primary Card CAP-01 (Always Visible with Top-Right Hamburger / Close Toggle) */}
              <div className="border border-charcoal/15 bg-ivory-light p-7 sm:p-8 transition duration-300 hover:border-bronze hover:shadow-lg flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-charcoal/10 pb-3.5">
                    <span className="font-mono text-xs tracking-[0.22em] uppercase text-bronze-dark font-semibold">
                      {primaryCapability.code}
                    </span>
                    <div className="flex items-center gap-2.5">
                      <Layers className="h-4 w-4 text-bronze" />
                      <button
                        type="button"
                        onClick={() =>
                          setCapabilitiesExpanded((prev) => !prev)
                        }
                        aria-expanded={capabilitiesExpanded}
                        aria-controls="additional-capabilities-grid"
                        aria-label={
                          capabilitiesExpanded
                            ? "Collapse capabilities list"
                            : "Expand all capabilities (CAP-02 to CAP-08)"
                        }
                        title={
                          capabilitiesExpanded
                            ? "Hide additional capabilities"
                            : "View all 8 studio capabilities"
                        }
                        className="inline-flex h-9 w-9 items-center justify-center border border-charcoal/20 bg-ivory text-charcoal transition duration-200 hover:border-bronze hover:bg-charcoal hover:text-ivory focus:outline-none focus:ring-2 focus:ring-bronze"
                      >
                        {capabilitiesExpanded ? (
                          <X className="h-4 w-4 text-bronze" />
                        ) : (
                          <Menu className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl text-charcoal capitalize">
                    {primaryCapability.service}
                  </h3>
                  <p className="font-medium text-sm sm:text-base text-bronze-dark">
                    {primaryCapability.deliverable}
                  </p>
                  <p className="text-xs sm:text-sm leading-relaxed text-charcoal/75">
                    {primaryCapability.detail}
                  </p>
                </div>
              </div>

              {/* Expandable Cards CAP-02 through CAP-08 */}
              <AnimatePresence initial={false}>
                {capabilitiesExpanded && (
                  <motion.div
                    id="additional-capabilities-grid"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-1">
                      {additionalCapabilities.map((item) => (
                        <div
                          key={item.code}
                          className="border border-charcoal/15 bg-ivory-light p-7 transition duration-300 hover:border-bronze hover:shadow-lg flex flex-col justify-between"
                        >
                          <div className="space-y-3">
                            <div className="flex items-center justify-between border-b border-charcoal/10 pb-3">
                              <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-bronze-dark font-semibold">
                                {item.code}
                              </span>
                              <Layers className="h-4 w-4 text-bronze" />
                            </div>
                            <h3 className="font-serif text-2xl text-charcoal capitalize">
                              {item.service}
                            </h3>
                            <p className="font-medium text-sm text-bronze-dark">
                              {item.deliverable}
                            </p>
                            <p className="text-xs leading-relaxed text-charcoal/75">
                              {item.detail}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          4.8 OUR PROCESS (5-STAGE ARCHITECTURAL TIMELINE — ENHANCED READABILITY)
      ===================================================================== */}
      <section className="bg-ivory-dark/50 text-charcoal py-16 sm:py-20 lg:py-24 border-b border-charcoal/10">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end mb-12">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2.5">
                <span className="h-[1.5px] w-8 bg-bronze" />
                <span className="font-mono text-xs tracking-[0.24em] uppercase text-bronze-dark font-semibold">
                  STRUCTURED WORKFLOW
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl leading-[1.12] text-charcoal">
                Our Five-Stage Architectural Process.
              </h2>
            </div>

            <Link
              href="/process"
              className="inline-flex items-center gap-2 font-mono text-xs font-semibold tracking-[0.2em] uppercase text-charcoal hover:text-bronze-dark transition"
            >
              <span>EXPLORE DETAILED WORKFLOW</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {PROCESS_STAGES.map((stage) => (
              <div
                key={stage.number}
                className="group relative flex flex-col justify-between border border-charcoal/15 bg-ivory p-7 sm:p-8 transition duration-300 hover:bg-charcoal hover:text-ivory shadow-sm"
              >
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-4xl sm:text-5xl text-bronze">
                      {stage.number}
                    </span>
                    <Compass className="h-5 w-5 text-concrete-dark group-hover:text-bronze transition-colors" />
                  </div>
                  <h3 className="font-mono text-sm sm:text-base font-bold tracking-[0.14em] uppercase text-charcoal group-hover:text-ivory leading-snug">
                    {stage.number} — {stage.title}
                  </h3>
                  <p className="text-base sm:text-[17px] leading-relaxed font-normal text-charcoal/90 group-hover:text-ivory/95">
                    {stage.description}
                  </p>
                </div>

                <div className="mt-8 border-t border-charcoal/15 group-hover:border-ivory/20 pt-4">
                  <span className="font-mono text-xs font-semibold tracking-[0.16em] uppercase text-bronze-dark group-hover:text-bronze block">
                    STAGE DELIVERABLES
                  </span>
                  <p className="mt-1.5 font-mono text-xs sm:text-sm font-medium text-charcoal/85 group-hover:text-ivory/90 leading-relaxed">
                    {stage.output}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          4.9 WHY CHOOSE KOLS ARCHITECTS?
      ===================================================================== */}
      <section className="bg-charcoal text-ivory py-16 sm:py-20 lg:py-24 border-b border-ivory/10 arch-grid-dark">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end mb-12">
            <div className="max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2.5">
                <span className="h-[1.5px] w-8 bg-bronze" />
                <span className="font-mono text-xs tracking-[0.24em] uppercase text-bronze">
                  STUDIO DISTINCTION
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl leading-[1.12] text-ivory">
                Why Choose KOLS ARCHITECTS?
              </h2>
              <p className="text-sm sm:text-base text-concrete-light leading-relaxed">
                We combine the design sensibility of an architectural atelier with
                the technical precision of a dedicated CAD and 3D visualization
                production studio.
              </p>
            </div>

            {whyChooseExpanded && (
              <button
                type="button"
                onClick={() => setWhyChooseExpanded(false)}
                className="inline-flex items-center gap-2 self-start lg:self-auto border border-ivory/25 bg-charcoal-light/60 px-5 py-3 font-mono text-xs font-medium tracking-[0.18em] uppercase text-bronze transition hover:border-bronze hover:bg-bronze hover:text-charcoal"
              >
                <span>SHOW LESS</span>
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 items-stretch">
            {/* Cards 01 to 03 (Always Visible) */}
            {WHY_CHOOSE_ITEMS.slice(0, 3).map((item, idx) => (
              <div
                key={item.title}
                className="border border-ivory/15 bg-charcoal-light/50 p-7 flex flex-col justify-between space-y-4 hover:border-bronze transition duration-300"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-bronze">
                      0{idx + 1}
                    </span>
                    <CheckCircle2 className="h-4 w-4 text-bronze" />
                  </div>
                  <h3 className="font-serif text-xl text-ivory">{item.title}</h3>
                  <p className="text-xs sm:text-sm leading-relaxed text-concrete-light">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}

            {/* Slot 4: "View for More" Button when collapsed, or Cards 04 to 08 when expanded */}
            {!whyChooseExpanded ? (
              <div
                onClick={() => setWhyChooseExpanded(true)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setWhyChooseExpanded(true);
                  }
                }}
                aria-expanded={whyChooseExpanded}
                aria-label="View for more reasons to choose KOLS ARCHITECTS (Cards 04 to 08)"
                className="group cursor-pointer border border-bronze/50 bg-charcoal-light/70 p-7 flex flex-col justify-between space-y-5 transition duration-300 hover:border-bronze hover:bg-charcoal-light"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs tracking-[0.2em] uppercase text-bronze">
                      04 — 08
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-bronze transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                  <h3 className="font-serif text-xl text-ivory">
                    Discover More Studio Distinctions
                  </h3>
                  <p className="text-xs sm:text-sm leading-relaxed text-concrete-light">
                    Click below to reveal cards 04 through 08 detailing our
                    material calibration, customization, and remote delivery.
                  </p>
                </div>

                <span className="inline-flex w-full items-center justify-center gap-2.5 bg-bronze px-5 py-3.5 font-mono text-xs font-semibold tracking-[0.2em] uppercase text-charcoal transition duration-300 group-hover:bg-ivory">
                  <span>VIEW FOR MORE</span>
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            ) : (
              WHY_CHOOSE_ITEMS.slice(3).map((item, idx) => {
                const cardNumber = idx + 4;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: idx * 0.05 }}
                    className="border border-ivory/15 bg-charcoal-light/50 p-7 flex flex-col justify-between space-y-4 hover:border-bronze transition duration-300"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs text-bronze">
                          0{cardNumber}
                        </span>
                        <CheckCircle2 className="h-4 w-4 text-bronze" />
                      </div>
                      <h3 className="font-serif text-xl text-ivory">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm leading-relaxed text-concrete-light">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>
        </div>
      </section>

      {/* =====================================================================
          4.10 TESTIMONIALS (VERIFIED CLIENT FEEDBACK ARCHIVE)
      ===================================================================== */}
      <section className="bg-ivory text-charcoal py-16 sm:py-20 lg:py-24 border-b border-charcoal/10">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end mb-12">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2.5">
                <span className="h-[1.5px] w-8 bg-bronze" />
                <span className="font-mono text-xs tracking-[0.24em] uppercase text-bronze-dark font-semibold">
                  CLIENT PERSPECTIVES
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl leading-[1.12] text-charcoal">
                Verified Client Testimonials.
              </h2>
            </div>

            <div className="inline-flex items-center gap-2 border border-charcoal/15 bg-ivory-dark px-4 py-2 font-mono text-[10px] tracking-[0.18em] uppercase text-charcoal">
              <ShieldCheck className="h-4 w-4 text-bronze-dark" />
              <span>AUTHENTICITY POLICY: VERIFIED REVIEWS ONLY</span>
            </div>
          </div>

          {testimonials.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((item) => (
                <article
                  key={item.id}
                  className="flex flex-col justify-between border border-charcoal/15 bg-ivory-light p-8 shadow-sm"
                >
                  <div className="space-y-4">
                    <span className="inline-block border border-bronze/40 bg-ivory px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-bronze-dark">
                      {item.projectCategory}
                    </span>
                    <p className="font-serif text-lg italic leading-relaxed text-charcoal">
                      “{item.quote}”
                    </p>
                  </div>

                  <div className="mt-8 flex items-center gap-4 border-t border-charcoal/10 pt-5">
                    {item.clientPhoto ? (
                      <img
                        src={item.clientPhoto}
                        alt={item.clientName}
                        className="h-11 w-11 rounded-full object-cover border border-bronze"
                      />
                    ) : (
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-charcoal font-serif text-sm text-ivory">
                        {item.clientInitials}
                      </div>
                    )}
                    <div>
                      <h3 className="font-sans text-sm font-semibold text-charcoal">
                        {item.clientName}
                      </h3>
                      <p className="font-mono text-[10px] uppercase tracking-wider text-bronze-dark">
                        Verified Studio Client
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="border border-charcoal/15 bg-ivory-light p-8 sm:p-12">
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-center">
                <div className="lg:col-span-8 space-y-3">
                  <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-bronze-dark">
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>VERIFIED CLIENT FEEDBACK ARCHIVE</span>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl text-charcoal">
                    Prepared for Authenticated Client Reviews.
                  </h3>
                  <p className="text-sm sm:text-base text-charcoal/75 leading-relaxed max-w-2xl">
                    In accordance with KOLS ARCHITECTS’ commitment to editorial
                    integrity, we publish only substantiated, client-approved
                    testimonials upon project handover. Completed client
                    feedback can be published directly through the Studio Admin
                    CMS.
                  </p>
                </div>
                <div className="lg:col-span-4 flex lg:justify-end">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2.5 border border-charcoal bg-charcoal px-6 py-3.5 text-xs font-medium tracking-[0.2em] uppercase text-ivory hover:bg-bronze hover:border-bronze hover:text-charcoal transition"
                  >
                    <span>REQUEST REFERENCES OR CONSULTATION</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* =====================================================================
          4.11 FINAL CONVERSION SECTION
      ===================================================================== */}
      <section className="relative bg-charcoal text-ivory py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-25">
          <img
            src="/images/renders/home-cta-pavilion.jpg"
            alt="KOLS ARCHITECTS Architectural Twilight Pavilion"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-charcoal/85" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center space-y-7">
          <span className="inline-block border border-bronze/60 px-4 py-1.5 font-mono text-[10px] tracking-[0.26em] uppercase text-bronze">
            COMMISSION KOLS ARCHITECTS
          </span>

          <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl tracking-wide text-ivory">
            HAVE A PROJECT IN MIND?
          </h2>

          <p className="mx-auto max-w-2xl text-base sm:text-lg leading-relaxed text-ivory/80">
            Let&apos;s turn your vision into a beautifully designed space. Tell
            us what you want to create and we will work with you to develop the
            right architectural or interior design solution.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-3">
            <Link
              href="/get-a-quote"
              className="inline-flex items-center gap-3 bg-bronze px-9 py-4 text-xs font-semibold tracking-[0.22em] uppercase text-charcoal transition duration-300 hover:bg-ivory"
            >
              <span>START YOUR PROJECT</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <a
              href="https://wa.me/2348067403009"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 border border-ivory/35 bg-charcoal/60 px-8 py-4 text-xs font-medium tracking-[0.2em] uppercase text-ivory transition hover:border-bronze hover:text-bronze"
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
