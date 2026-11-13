import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  FileCheck2,
  HelpCircle,
  Layers,
} from "lucide-react";
import { getProjects, getServiceBySlug, getServices } from "@/lib/db";

export const dynamic = "force-dynamic";

interface ServiceDetailPageProps {
  params: { slug: string };
}

export async function generateMetadata({
  params,
}: ServiceDetailPageProps): Promise<Metadata> {
  const service = await getServiceBySlug(params.slug);
  if (!service) {
    return { title: "Service Not Found | KOLS ARCHITECTS" };
  }
  return {
    title: service.seoTitle || `${service.title} Services | KOLS ARCHITECTS`,
    description: service.seoDescription || service.shortDescription,
    alternates: { canonical: `/services/${service.slug}` },
  };
}

export default async function ServiceDetailPage({
  params,
}: ServiceDetailPageProps) {
  const [service, allProjects, allServices] = await Promise.all([
    getServiceBySlug(params.slug),
    getProjects(true),
    getServices(true),
  ]);

  if (!service) {
    notFound();
  }

  const relatedProjects = allProjects.slice(0, 3);
  const siblingServices = allServices
    .filter((s) => s.slug !== service.slug)
    .slice(0, 4);

  return (
    <div className="bg-ivory text-charcoal">
      {/* 1. Service-Specific Hero & 2. Service Title */}
      <section className="relative bg-charcoal text-ivory pt-36 pb-20 sm:pt-44 sm:pb-28 border-b border-ivory/10 arch-grid-dark">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
          <div className="mb-8">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.2em] uppercase text-bronze hover:text-ivory transition"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>BACK TO ALL SERVICES</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-3 border border-bronze/50 bg-charcoal-light px-4 py-1.5 font-mono text-[10px] tracking-[0.22em] uppercase text-bronze">
                <span>SERVICE {service.number}</span>
                <span>·</span>
                <span>{service.categoryGroup}</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-6xl leading-[1.08] text-ivory">
                {service.title}
              </h1>

              <p className="text-base sm:text-lg text-ivory/85 leading-relaxed max-w-2xl">
                {service.introduction}
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  href={`/get-a-quote?service=${encodeURIComponent(
                    service.title
                  )}`}
                  className="inline-flex items-center gap-3 bg-bronze px-7 py-4 text-xs font-semibold tracking-[0.2em] uppercase text-charcoal transition hover:bg-ivory"
                >
                  <span>REQUEST A QUOTE FOR THIS SERVICE</span>
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
                <a
                  href="https://wa.me/2348067403009"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-ivory/30 px-6 py-4 text-xs font-medium tracking-[0.2em] uppercase text-ivory hover:border-bronze hover:text-bronze transition"
                >
                  <span>DISCUSS ON WHATSAPP</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="border border-ivory/20 bg-charcoal-dark p-2 shadow-2xl">
                <img
                  src={service.heroImage}
                  alt={service.title}
                  className="aspect-[4/3] w-full object-cover"
                />
                <div className="flex items-center justify-between px-3 pt-3 pb-1 font-mono text-[10px] tracking-[0.18em] uppercase text-concrete">
                  <span>KOLS ARCHITECTS SPECIFICATION</span>
                  <span className="text-bronze">REF #{service.number}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 & 4. Detailed Explanation + 5. What the Service Includes + 7. Typical Deliverables */}
      <section className="py-24 sm:py-32 border-b border-charcoal/10 arch-grid-light">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-12">
            {/* Left Column: Detailed Explanation & Sample Gallery */}
            <div className="lg:col-span-7 space-y-10">
              <div className="space-y-4">
                <span className="font-mono text-xs tracking-[0.24em] uppercase text-bronze-dark font-semibold">
                  ARCHITECTURAL SCOPE &amp; METHODOLOGY
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl text-charcoal">
                  How We Execute {service.title}.
                </h2>
                <p className="text-base leading-relaxed text-charcoal/80">
                  {service.detailedExplanation}
                </p>
              </div>

              {/* 6. Relevant Images */}
              <div className="space-y-6 pt-4">
                <h3 className="font-mono text-xs tracking-[0.22em] uppercase text-bronze-dark font-semibold">
                  REPRESENTATIVE VISUAL &amp; TECHNICAL SAMPLES
                </h3>
                <div className="grid grid-cols-1 gap-6">
                  {service.galleryImages.map((img, i) => (
                    <figure
                      key={i}
                      className="border border-charcoal/15 bg-charcoal text-ivory overflow-hidden"
                    >
                      <img
                        src={img.url}
                        alt={img.alt}
                        className="aspect-[16/10] w-full object-cover"
                      />
                      <figcaption className="px-5 py-3.5 font-mono text-xs text-ivory/85 flex items-center justify-between">
                        <span>{img.caption}</span>
                        <span className="text-bronze">SAMPLE 0{i + 1}</span>
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: What the Service Includes & Typical Deliverables */}
            <div className="lg:col-span-5 space-y-8">
              {/* 5. What the Service Includes */}
              <div className="border border-charcoal/15 bg-ivory-light p-8 space-y-6">
                <div className="flex items-center justify-between border-b border-charcoal/10 pb-4">
                  <div>
                    <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-bronze-dark block">
                      SCOPE OF WORK
                    </span>
                    <h3 className="font-serif text-2xl text-charcoal">
                      What This Service Includes
                    </h3>
                  </div>
                  <Layers className="h-5 w-5 text-bronze" />
                </div>

                <ul className="space-y-3.5">
                  {service.inclusions.map((inc) => (
                    <li
                      key={inc}
                      className="flex items-start gap-3 text-sm text-charcoal/85"
                    >
                      <CheckCircle2 className="h-4 w-4 text-bronze-dark shrink-0 mt-0.5" />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 7. Typical Deliverables */}
              <div className="border border-charcoal bg-charcoal text-ivory p-8 space-y-6">
                <div className="flex items-center justify-between border-b border-ivory/15 pb-4">
                  <div>
                    <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-bronze block">
                      PROJECT HANDOVER
                    </span>
                    <h3 className="font-serif text-2xl text-ivory">
                      Typical Studio Deliverables
                    </h3>
                  </div>
                  <FileCheck2 className="h-5 w-5 text-bronze" />
                </div>

                <ul className="space-y-3.5">
                  {service.deliverables.map((del) => (
                    <li
                      key={del}
                      className="flex items-start gap-3 text-sm text-ivory/85"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-bronze shrink-0" />
                      <span>{del}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-4 border-t border-ivory/15">
                  <Link
                    href={`/get-a-quote?service=${encodeURIComponent(
                      service.title
                    )}`}
                    className="w-full inline-flex items-center justify-center gap-2 bg-bronze px-6 py-3.5 text-xs font-semibold tracking-[0.2em] uppercase text-charcoal transition hover:bg-ivory"
                  >
                    <span>COMMISSION {service.title.toUpperCase()}</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Related Portfolio Projects */}
      <section className="bg-charcoal text-ivory py-24 sm:py-32 border-b border-ivory/10">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end mb-14">
            <div className="space-y-2">
              <span className="font-mono text-xs tracking-[0.24em] uppercase text-bronze">
                CASE STUDIES &amp; DEMONSTRATIONS
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-ivory">
                Related Portfolio Works.
              </h2>
            </div>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-bronze hover:text-ivory transition"
            >
              <span>VIEW FULL PORTFOLIO</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {relatedProjects.map((project) => (
              <article
                key={project.id}
                className="group border border-ivory/15 bg-charcoal-light/40 hover:border-bronze transition flex flex-col justify-between"
              >
                <div>
                  <Link
                    href={`/portfolio/${project.slug}`}
                    className="block relative aspect-[4/3] overflow-hidden bg-charcoal-dark"
                  >
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <span className="absolute right-3 top-3 bg-charcoal/90 border border-bronze/50 px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider text-bronze">
                      {project.projectStatus}
                    </span>
                  </Link>
                  <div className="p-6 space-y-2">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-bronze">
                      {project.category}
                    </span>
                    <h3 className="font-serif text-2xl text-ivory group-hover:text-bronze transition-colors">
                      <Link href={`/portfolio/${project.slug}`}>
                        {project.title}
                      </Link>
                    </h3>
                    <p className="text-xs text-concrete-light line-clamp-2">
                      {project.shortDescription}
                    </p>
                  </div>
                </div>
                <div className="px-6 pb-5 pt-3 border-t border-ivory/10">
                  <Link
                    href={`/portfolio/${project.slug}`}
                    className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-bronze hover:text-ivory"
                  >
                    <span>Inspect Project</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Frequently Asked Questions */}
      <section className="py-24 sm:py-32 border-b border-charcoal/10">
        <div className="mx-auto max-w-4xl px-6 sm:px-10">
          <div className="space-y-3 mb-12 text-center">
            <span className="font-mono text-xs tracking-[0.24em] uppercase text-bronze-dark font-semibold">
              SERVICE CLARIFICATIONS
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-charcoal">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-5">
            {service.faqs.map((faq, idx) => (
              <div
                key={idx}
                className="border border-charcoal/15 bg-ivory-light p-7 space-y-3"
              >
                <div className="flex items-start gap-3">
                  <HelpCircle className="h-5 w-5 text-bronze-dark shrink-0 mt-0.5" />
                  <h3 className="font-serif text-xl sm:text-2xl text-charcoal">
                    {faq.question}
                  </h3>
                </div>
                <p className="pl-8 text-sm sm:text-base leading-relaxed text-charcoal/75">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>

          {/* Other Services Links */}
          <div className="mt-16 pt-12 border-t border-charcoal/10">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-bronze-dark mb-4">
              EXPLORE COMPLEMENTARY SERVICES:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {siblingServices.map((sib) => (
                <Link
                  key={sib.id}
                  href={`/services/${sib.slug}`}
                  className="flex items-center justify-between border border-charcoal/15 bg-ivory px-4 py-3 text-xs font-medium uppercase tracking-wider hover:border-bronze transition"
                >
                  <span>
                    {sib.number} · {sib.title}
                  </span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-bronze-dark" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 10. Request a Quote CTA */}
      <section className="bg-charcoal text-ivory py-24">
        <div className="mx-auto max-w-4xl px-6 text-center space-y-6">
          <span className="font-mono text-xs tracking-[0.24em] uppercase text-bronze">
            START YOUR COMMISSION
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-ivory">
            Request a Quotation for {service.title}.
          </h2>
          <p className="text-sm sm:text-base text-concrete-light max-w-xl mx-auto">
            Share your project brief, dimensions, or reference sketches and receive
            a tailored proposal from KOLS ARCHITECTS.
          </p>
          <div className="pt-2">
            <Link
              href={`/get-a-quote?service=${encodeURIComponent(service.title)}`}
              className="inline-flex items-center gap-3 bg-bronze px-8 py-4 text-xs font-semibold tracking-[0.22em] uppercase text-charcoal transition hover:bg-ivory"
            >
              <span>REQUEST A QUOTE</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
