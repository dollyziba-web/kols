import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2, Layers } from "lucide-react";
import { getServices, getWebsiteSettings } from "@/lib/db";
import { ServiceCategoryGroup } from "@/types/kols";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getWebsiteSettings();
  return {
    title: settings.seo.services.title,
    description: settings.seo.services.description,
    alternates: { canonical: "/services" },
  };
}

const SERVICE_GROUPS: {
  group: ServiceCategoryGroup;
  code: string;
  subtitle: string;
}[] = [
  {
    group: "Architecture & Technical Documentation",
    code: "DIVISION 01",
    subtitle:
      "Orthographic architectural drawings, 2D floor plan design, AutoCAD DWG documentation, residential architecture, commercial space design, and custom architectural commissions.",
  },
  {
    group: "3D Architectural Visualization",
    code: "DIVISION 02",
    subtitle:
      "Photorealistic exterior and interior 3D architectural rendering, bespoke 3D kitchen design, spa-inspired 3D bathroom design, and patient-centered 3D clinic visualization.",
  },
  {
    group: "Interior Design",
    code: "DIVISION 03",
    subtitle:
      "Sophisticated living room design, holistic home interior design, prestigious private reception hall design, and strategic interior space planning.",
  },
];

export default async function ServicesPage() {
  const services = await getServices(true);

  return (
    <div className="bg-ivory text-charcoal">
      {/* Page Hero */}
      <section className="bg-charcoal text-ivory pt-40 pb-24 sm:pt-48 sm:pb-32 border-b border-ivory/10 arch-grid-dark">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-end">
            <div className="lg:col-span-8 space-y-6">
              <div className="inline-flex items-center gap-2.5">
                <span className="h-[1.5px] w-8 bg-bronze" />
                <span className="font-mono text-xs tracking-[0.26em] uppercase text-bronze">
                  STUDIO CAPABILITIES · 14 SPECIALIZED SERVICES
                </span>
              </div>
              <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl leading-[1.08] text-ivory">
                Architectural Design, 2D Documentation &amp; 3D Visualization.
              </h1>
            </div>
            <div className="lg:col-span-4 border-l-2 border-bronze pl-5 space-y-3">
              <p className="text-sm text-ivory/80 leading-relaxed">
                Every service is delivered with architectural rigor, clear
                technical documentation, and photorealistic visual clarity.
                Select any service below to explore its full scope and
                deliverables.
              </p>
              <Link
                href="/get-a-quote"
                className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-bronze hover:text-ivory transition"
              >
                <span>REQUEST A CUSTOM QUOTATION</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categorized Services Directory */}
      {SERVICE_GROUPS.map((section, sectionIdx) => {
        const groupServices = services.filter(
          (s) => s.categoryGroup === section.group
        );

        const isDarkSection = sectionIdx === 1;

        return (
          <section
            key={section.group}
            className={`py-24 sm:py-32 border-b ${
              isDarkSection
                ? "bg-charcoal text-ivory border-ivory/10 arch-grid-dark"
                : "bg-ivory text-charcoal border-charcoal/10 arch-grid-light"
            }`}
          >
            <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
              <div className="mb-16 grid grid-cols-1 gap-6 lg:grid-cols-12 items-end">
                <div className="lg:col-span-7 space-y-3">
                  <span className="font-mono text-xs tracking-[0.24em] uppercase text-bronze">
                    {section.code}
                  </span>
                  <h2 className="font-serif text-3xl sm:text-5xl">
                    {section.group}
                  </h2>
                </div>
                <div className="lg:col-span-5">
                  <p
                    className={`text-sm sm:text-base leading-relaxed ${
                      isDarkSection ? "text-concrete-light" : "text-charcoal/75"
                    }`}
                  >
                    {section.subtitle}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
                {groupServices.map((service) => (
                  <article
                    key={service.id}
                    className={`group flex flex-col justify-between border transition duration-500 ${
                      isDarkSection
                        ? "border-ivory/15 bg-charcoal-light/50 hover:border-bronze"
                        : "border-charcoal/15 bg-ivory-light hover:border-bronze hover:shadow-xl"
                    }`}
                  >
                    <div>
                      <Link
                        href={`/services/${service.slug}`}
                        data-cursor="EXPLORE"
                        className="block relative aspect-[16/9] w-full overflow-hidden bg-charcoal"
                      >
                        <img
                          src={service.heroImage}
                          alt={service.title}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute left-4 top-4 bg-charcoal/90 border border-bronze/50 px-3 py-1 font-mono text-[10px] tracking-[0.2em] uppercase text-bronze">
                          SERVICE {service.number}
                        </div>
                      </Link>

                      <div className="p-8 space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-bronze">
                            {service.categoryGroup}
                          </span>
                          <Layers className="h-4 w-4 text-bronze" />
                        </div>

                        <h3 className="font-serif text-2xl sm:text-3xl">
                          <Link
                            href={`/services/${service.slug}`}
                            className="hover:text-bronze transition-colors"
                          >
                            {service.title}
                          </Link>
                        </h3>

                        <p
                          className={`text-sm leading-relaxed ${
                            isDarkSection
                              ? "text-concrete-light"
                              : "text-charcoal/75"
                          }`}
                        >
                          {service.shortDescription}
                        </p>

                        <div className="pt-3 space-y-2">
                          <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-bronze block">
                            KEY DELIVERABLES:
                          </span>
                          <ul className="grid grid-cols-1 gap-1.5">
                            {service.deliverables.slice(0, 3).map((del) => (
                              <li
                                key={del}
                                className="flex items-center gap-2 text-xs"
                              >
                                <CheckCircle2 className="h-3.5 w-3.5 text-bronze shrink-0" />
                                <span
                                  className={
                                    isDarkSection
                                      ? "text-ivory/85"
                                      : "text-charcoal/85"
                                  }
                                >
                                  {del}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div
                      className={`px-8 py-5 border-t flex items-center justify-between ${
                        isDarkSection
                          ? "border-ivory/10"
                          : "border-charcoal/10"
                      }`}
                    >
                      <Link
                        href={`/services/${service.slug}`}
                        className="inline-flex items-center gap-2 font-mono text-xs font-semibold tracking-[0.2em] uppercase text-bronze hover:underline"
                      >
                        <span>VIEW FULL SERVICE SPECIFICATION</span>
                        <ArrowUpRight className="h-4 w-4" />
                      </Link>
                      <Link
                        href={`/get-a-quote?service=${encodeURIComponent(
                          service.title
                        )}`}
                        className="font-mono text-[10px] uppercase tracking-wider opacity-75 hover:opacity-100 hover:text-bronze transition"
                      >
                        Request Quote →
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* Final Conversion Strip */}
      <section className="bg-charcoal text-ivory py-24">
        <div className="mx-auto max-w-4xl px-6 text-center space-y-6">
          <span className="font-mono text-xs tracking-[0.24em] uppercase text-bronze">
            TAILORED ARCHITECTURAL COMMISSIONS
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl">
            Need a Combined Package of 2D Drawings &amp; 3D Renders?
          </h2>
          <p className="text-sm sm:text-base text-concrete-light max-w-2xl mx-auto leading-relaxed">
            Many clients combine our 2D Floor Plan Design and DWG Drafting with
            Photorealistic 3D Visualization for a complete end-to-end architectural
            presentation.
          </p>
          <div className="pt-2">
            <Link
              href="/get-a-quote"
              className="inline-flex items-center gap-3 bg-bronze px-8 py-4 text-xs font-semibold tracking-[0.22em] uppercase text-charcoal transition hover:bg-ivory"
            >
              <span>GET A PROJECT QUOTATION</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
