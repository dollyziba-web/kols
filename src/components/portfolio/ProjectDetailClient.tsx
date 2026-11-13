"use client";

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Expand,
  FileCheck2,
  X,
} from "lucide-react";
import { PortfolioProject } from "@/types/kols";
import VideoPresentationPlayer from "@/components/interactive/VideoPresentationPlayer";

interface ProjectDetailClientProps {
  project: PortfolioProject;
  relatedProjects: PortfolioProject[];
}

export default function ProjectDetailClient({
  project,
  relatedProjects,
}: ProjectDetailClientProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const gallery = project.gallery?.length
    ? [...project.gallery].sort((a, b) => a.order - b.order)
    : [
        {
          id: "fallback-1",
          url: project.thumbnail,
          alt: project.thumbnailAlt || project.title,
          caption: project.shortDescription,
          order: 1,
        },
      ];

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const showPrev = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null ? null : (prev - 1 + gallery.length) % gallery.length
    );
  }, [gallery.length]);

  const showNext = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null ? null : (prev + 1) % gallery.length
    );
  }, [gallery.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, closeLightbox, showPrev, showNext]);

  return (
    <div className="bg-ivory text-charcoal">
      {/* Project Header & Hero Showcase */}
      <section className="bg-charcoal text-ivory pt-36 pb-20 sm:pt-44 sm:pb-28 border-b border-ivory/10 arch-grid-dark">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16 space-y-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.2em] uppercase text-bronze hover:text-ivory transition"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>BACK TO PORTFOLIO ARCHIVE</span>
            </Link>

            <div className="flex flex-wrap items-center gap-2">
              <span className="border border-ivory/20 bg-charcoal-light px-3.5 py-1.5 font-mono text-[10px] tracking-[0.2em] uppercase text-ivory">
                {project.category}
              </span>
              <span className="border border-bronze bg-bronze/15 px-3.5 py-1.5 font-mono text-[10px] tracking-[0.2em] uppercase text-bronze">
                STATUS: {project.projectStatus}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 items-end">
            <div className="lg:col-span-8 space-y-4">
              <p className="font-mono text-xs tracking-[0.24em] uppercase text-bronze">
                {project.drawingCode} · {project.scaleSpec}
              </p>
              <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl leading-[1.08] text-ivory">
                {project.title}
              </h1>
              <p className="text-base sm:text-lg text-ivory/85 max-w-3xl leading-relaxed">
                {project.shortDescription}
              </p>
            </div>

            <div className="lg:col-span-4 flex lg:justify-end">
              <Link
                href={`/get-a-quote?service=${encodeURIComponent(
                  project.category
                )}`}
                className="inline-flex items-center gap-3 bg-bronze px-7 py-4 text-xs font-semibold tracking-[0.2em] uppercase text-charcoal transition hover:bg-ivory"
              >
                <span>ENQUIRE ABOUT SIMILAR PROJECT</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Main Hero Visual with Lightbox Trigger */}
          <div
            onClick={() => setLightboxIndex(0)}
            data-cursor="LIGHTBOX"
            className="group relative aspect-[16/9] w-full cursor-pointer overflow-hidden border border-ivory/20 bg-charcoal-dark shadow-2xl"
          >
            <img
              src={project.thumbnail}
              alt={project.thumbnailAlt || project.title}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute bottom-5 right-5 inline-flex items-center gap-2 border border-bronze/60 bg-charcoal/85 px-4 py-2 font-mono text-[11px] uppercase tracking-wider text-ivory backdrop-blur-sm group-hover:bg-bronze group-hover:text-charcoal transition">
              <Expand className="h-3.5 w-3.5" />
              <span>Open Full-Resolution Lightbox ({gallery.length} Sheets)</span>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study Narrative: Overview, Objective, Approach & Deliverables */}
      <section className="py-24 sm:py-32 border-b border-charcoal/10 arch-grid-light">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-12">
            {/* Left 7 Columns: Overview, Objective, Approach */}
            <div className="lg:col-span-7 space-y-12">
              <div className="space-y-4">
                <span className="font-mono text-xs tracking-[0.24em] uppercase text-bronze-dark font-semibold">
                  01 / PROJECT OVERVIEW
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl text-charcoal">
                  Architectural Context &amp; Vision
                </h2>
                <p className="text-base sm:text-lg leading-relaxed text-charcoal/80">
                  {project.overview}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-6 border-t border-charcoal/10">
                <div className="border border-charcoal/15 bg-ivory-light p-7 space-y-3">
                  <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-bronze-dark font-semibold">
                    02 / DESIGN OBJECTIVE
                  </span>
                  <h3 className="font-serif text-2xl text-charcoal">
                    The Design Brief
                  </h3>
                  <p className="text-sm leading-relaxed text-charcoal/75">
                    {project.designObjective}
                  </p>
                </div>

                <div className="border border-charcoal/15 bg-ivory-light p-7 space-y-3">
                  <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-bronze-dark font-semibold">
                    03 / DESIGN APPROACH
                  </span>
                  <h3 className="font-serif text-2xl text-charcoal">
                    Architectural Solution
                  </h3>
                  <p className="text-sm leading-relaxed text-charcoal/75">
                    {project.designApproach}
                  </p>
                </div>
              </div>
            </div>

            {/* Right 5 Columns: Technical Metadata & Deliverables */}
            <div className="lg:col-span-5 space-y-8">
              <div className="border border-charcoal bg-charcoal text-ivory p-8 space-y-6">
                <div className="flex items-center justify-between border-b border-ivory/15 pb-4">
                  <div>
                    <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-bronze block">
                      DOCUMENTATION &amp; OUTPUTS
                    </span>
                    <h3 className="font-serif text-2xl text-ivory">
                      Project Deliverables
                    </h3>
                  </div>
                  <FileCheck2 className="h-5 w-5 text-bronze" />
                </div>

                <ul className="space-y-3.5">
                  {project.deliverables.map((del) => (
                    <li
                      key={del}
                      className="flex items-start gap-3 text-sm text-ivory/85"
                    >
                      <CheckCircle2 className="h-4 w-4 text-bronze shrink-0 mt-0.5" />
                      <span>{del}</span>
                    </li>
                  ))}
                </ul>

                <div className="border-t border-ivory/15 pt-5 space-y-3 font-mono text-xs">
                  <div className="flex justify-between">
                    <span className="text-concrete">ARCHIVE CODE:</span>
                    <span className="text-ivory">{project.drawingCode}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-concrete">SCALE / AREA:</span>
                    <span className="text-ivory">{project.scaleSpec}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-concrete">CLASSIFICATION:</span>
                    <span className="text-bronze">{project.projectStatus}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Multi-Image Visual Gallery with Lightbox */}
      <section className="py-24 sm:py-32 border-b border-charcoal/10">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16 space-y-12">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div className="space-y-2">
              <span className="font-mono text-xs tracking-[0.24em] uppercase text-bronze-dark font-semibold">
                04 / VISUAL GALLERY &amp; TECHNICAL SHEETS
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-charcoal">
                Renderings, Drawings &amp; Plates.
              </h2>
            </div>
            <p className="font-mono text-xs text-charcoal/70">
              Click any plate to inspect in full-screen lightbox (Keyboard ← / →
              supported)
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {gallery.map((item, idx) => (
              <figure
                key={item.id}
                onClick={() => setLightboxIndex(idx)}
                data-cursor="ZOOM"
                className="group cursor-pointer border border-charcoal/15 bg-charcoal text-ivory overflow-hidden shadow-md hover:border-bronze transition"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-charcoal-dark">
                  <img
                    src={item.url}
                    alt={item.alt}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute right-4 top-4 bg-charcoal/85 border border-bronze/40 p-2 text-ivory opacity-0 group-hover:opacity-100 transition">
                    <Expand className="h-4 w-4 text-bronze" />
                  </div>
                </div>
                <figcaption className="p-5 flex items-center justify-between gap-4">
                  <div>
                    <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-bronze block">
                      PLATE 0{idx + 1}
                    </span>
                    <p className="text-xs sm:text-sm text-ivory/90 mt-0.5">
                      {item.caption || item.alt}
                    </p>
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-concrete shrink-0">
                    Inspect →
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Video Walkthrough Section (Where Available) */}
      {project.videoUrl && (
        <section className="bg-charcoal text-ivory py-24 border-b border-ivory/10">
          <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16 space-y-8">
            <div className="space-y-2">
              <span className="font-mono text-xs tracking-[0.24em] uppercase text-bronze">
                05 / ARCHITECTURAL WALKTHROUGH &amp; BEFORE/AFTER STUDY
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-ivory">
                Interactive Visualization &amp; CAD Overlay Sequence
              </h2>
            </div>
            <VideoPresentationPlayer />
          </div>
        </section>
      )}

      {/* Related Projects */}
      <section className="bg-ivory-dark/40 py-24 border-b border-charcoal/10">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16 space-y-12">
          <div className="flex items-end justify-between">
            <div>
              <span className="font-mono text-xs tracking-[0.24em] uppercase text-bronze-dark font-semibold">
                CONTINUE EXPLORING
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-charcoal mt-1">
                Related Architectural Works
              </h2>
            </div>
            <Link
              href="/portfolio"
              className="font-mono text-xs uppercase tracking-[0.2em] text-charcoal hover:text-bronze-dark"
            >
              All Projects →
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {relatedProjects.map((rel) => (
              <article
                key={rel.id}
                className="group border border-charcoal/15 bg-ivory hover:border-bronze transition flex flex-col justify-between"
              >
                <div>
                  <Link
                    href={`/portfolio/${rel.slug}`}
                    className="block relative aspect-[4/3] overflow-hidden bg-charcoal"
                  >
                    <img
                      src={rel.thumbnail}
                      alt={rel.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </Link>
                  <div className="p-6 space-y-2">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-bronze-dark">
                      {rel.category} · {rel.projectStatus}
                    </span>
                    <h3 className="font-serif text-2xl text-charcoal group-hover:text-bronze-dark transition-colors">
                      <Link href={`/portfolio/${rel.slug}`}>{rel.title}</Link>
                    </h3>
                  </div>
                </div>
                <div className="px-6 pb-5 pt-3 border-t border-charcoal/10">
                  <Link
                    href={`/portfolio/${rel.slug}`}
                    className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-charcoal hover:text-bronze-dark"
                  >
                    <span>View Case Study</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Enquiry CTA */}
      <section className="bg-charcoal text-ivory py-24">
        <div className="mx-auto max-w-4xl px-6 text-center space-y-6">
          <span className="font-mono text-xs tracking-[0.24em] uppercase text-bronze">
            COMMISSION KOLS ARCHITECTS
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-ivory">
            Inspired by {project.title}?
          </h2>
          <p className="text-sm sm:text-base text-concrete-light max-w-xl mx-auto">
            Let&apos;s discuss your site, spatial requirements, or visualization
            needs and craft a tailored proposal.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <Link
              href={`/get-a-quote?service=${encodeURIComponent(
                project.category
              )}`}
              className="inline-flex items-center gap-3 bg-bronze px-8 py-4 text-xs font-semibold tracking-[0.22em] uppercase text-charcoal transition hover:bg-ivory"
            >
              <span>START YOUR PROJECT</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <a
              href="https://wa.me/2348067403009"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-ivory/30 px-7 py-4 text-xs font-medium tracking-[0.2em] uppercase text-ivory hover:border-bronze hover:text-bronze transition"
            >
              <span>WHATSAPP STUDIO</span>
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Accessible Full-Screen Image Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && gallery[lightboxIndex] && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Project Gallery Lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex flex-col justify-between bg-charcoal/95 backdrop-blur-md p-4 sm:p-8 text-ivory"
          >
            {/* Lightbox Top Bar */}
            <div className="flex items-center justify-between border-b border-ivory/15 pb-4">
              <div>
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-bronze">
                  PLATE 0{lightboxIndex + 1} OF 0{gallery.length} ·{" "}
                  {project.title}
                </span>
                <p className="text-xs text-concrete-light mt-0.5">
                  {gallery[lightboxIndex].caption}
                </p>
              </div>
              <button
                type="button"
                onClick={closeLightbox}
                aria-label="Close lightbox"
                className="inline-flex items-center gap-2 border border-ivory/25 px-4 py-2 font-mono text-xs uppercase tracking-widest text-ivory hover:border-bronze hover:text-bronze transition"
              >
                <span>CLOSE [ESC]</span>
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Lightbox Center Image */}
            <div className="relative my-auto flex items-center justify-center overflow-hidden py-4">
              <button
                type="button"
                onClick={showPrev}
                aria-label="Previous image"
                className="absolute left-2 sm:left-6 z-10 flex h-12 w-12 items-center justify-center border border-ivory/25 bg-charcoal/85 text-ivory hover:border-bronze hover:text-bronze transition"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              <img
                src={gallery[lightboxIndex].url}
                alt={gallery[lightboxIndex].alt}
                className="max-h-[75vh] max-w-[88vw] object-contain border border-ivory/15 shadow-2xl"
              />

              <button
                type="button"
                onClick={showNext}
                aria-label="Next image"
                className="absolute right-2 sm:right-6 z-10 flex h-12 w-12 items-center justify-center border border-ivory/25 bg-charcoal/85 text-ivory hover:border-bronze hover:text-bronze transition"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>

            {/* Lightbox Bottom Thumbnails */}
            <div className="flex items-center justify-center gap-3 overflow-x-auto border-t border-ivory/15 pt-4">
              {gallery.map((thumb, idx) => (
                <button
                  key={thumb.id}
                  type="button"
                  onClick={() => setLightboxIndex(idx)}
                  className={`h-14 w-24 shrink-0 overflow-hidden border transition ${
                    idx === lightboxIndex
                      ? "border-2 border-bronze opacity-100"
                      : "border-ivory/20 opacity-50 hover:opacity-80"
                  }`}
                >
                  <img
                    src={thumb.url}
                    alt={thumb.alt}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
