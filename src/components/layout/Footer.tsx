"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Lock } from "lucide-react";

const CORE_SERVICES_FOOTER = [
  { label: "Architectural Drawing", href: "/services/architectural-drawing" },
  { label: "2D Floor Plan Design", href: "/services/2d-floor-plan-design" },
  {
    label: "3D Architectural Visualization",
    href: "/services/3d-architectural-visualization",
  },
  { label: "3D Kitchen Design", href: "/services/3d-kitchen-design" },
  { label: "3D Bathroom Design", href: "/services/3d-bathroom-design" },
  { label: "3D Clinic Design", href: "/services/3d-clinic-design" },
  { label: "Home Interior Design", href: "/services/home-interior-design" },
  {
    label: "DWG Drafting & Documentation",
    href: "/services/dwg-drafting-and-documentation",
  },
];

export default function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-ivory border-t border-ivory/10 arch-grid-dark">
      {/* Main Footer Columns */}
      <div className="mx-auto max-w-[1440px] px-6 py-20 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Column 1: Brand Identity & Statement */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="inline-flex items-center gap-3.5">
              <div className="flex h-10 w-10 items-center justify-center border border-bronze bg-charcoal text-ivory">
                <span className="font-serif text-xl tracking-widest">K</span>
              </div>
              <div>
                <span className="block font-serif text-xl tracking-[0.22em] text-ivory">
                  KOLS ARCHITECTS
                </span>
                <span className="block font-mono text-[9px] tracking-[0.26em] uppercase text-bronze">
                  DESIGNING SPACES. VISUALIZING POSSIBILITIES.
                </span>
              </div>
            </Link>

            <p className="max-w-sm text-sm leading-relaxed text-concrete-light">
              We create architectural experiences through thoughtful design,
              technical precision and immersive visualization.
            </p>

            <div className="pt-2 space-y-2 border-t border-ivory/10">
              <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-bronze">
                POSITIONING
              </p>
              <p className="text-xs text-concrete">
                Architecture · Architectural Drawings · 2D Floor Plans · 3D
                Visualization · Interior Design · DWG Documentation
              </p>
            </div>
          </div>

          {/* Column 2: Main Navigation */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-mono text-xs tracking-[0.22em] uppercase text-bronze">
              NAVIGATION
            </h3>
            <ul className="space-y-3 text-sm text-ivory/80">
              <li>
                <Link href="/" className="hover:text-bronze transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-bronze transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="hover:text-bronze transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/portfolio"
                  className="hover:text-bronze transition-colors"
                >
                  Portfolio Archive
                </Link>
              </li>
              <li>
                <Link
                  href="/process"
                  className="hover:text-bronze transition-colors"
                >
                  Our Process
                </Link>
              </li>
              <li>
                <Link
                  href="/get-a-quote"
                  className="inline-flex items-center gap-1.5 text-bronze hover:text-ivory transition-colors font-medium"
                >
                  <span>Get a Quote</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-bronze transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Services Directory */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="font-mono text-xs tracking-[0.22em] uppercase text-bronze">
              ARCHITECTURAL SERVICES
            </h3>
            <ul className="space-y-2.5 text-sm text-ivory/80">
              {CORE_SERVICES_FOOTER.map((srv) => (
                <li key={srv.href}>
                  <Link
                    href={srv.href}
                    className="hover:text-bronze transition-colors"
                  >
                    {srv.label}
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <Link
                  href="/services"
                  className="font-mono text-[11px] tracking-[0.18em] uppercase text-bronze hover:text-ivory transition-colors"
                >
                  View All 14 Services →
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Direct Studio Contact & Channels */}
          <div className="lg:col-span-3 space-y-5">
            <h3 className="font-mono text-xs tracking-[0.22em] uppercase text-bronze">
              STUDIO ENQUIRIES
            </h3>

            <div className="space-y-3 text-sm">
              <div>
                <span className="block font-mono text-[10px] tracking-[0.18em] uppercase text-concrete">
                  DIRECT WHATSAPP LINE
                </span>
                <a
                  href="https://wa.me/2348067403009"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-flex items-center gap-1.5 text-ivory hover:text-bronze transition-colors font-medium"
                >
                  <span>Chat on WhatsApp (+234 806 740 3009)</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-bronze" />
                </a>
              </div>

              <div>
                <span className="block font-mono text-[10px] tracking-[0.18em] uppercase text-concrete">
                  BUSINESS EMAIL
                </span>
                <Link
                  href="/contact"
                  className="mt-1 block text-ivory/80 hover:text-bronze transition-colors text-xs"
                >
                  Official Email Channel (Configurable via Studio CMS)
                </Link>
              </div>

              <div>
                <span className="block font-mono text-[10px] tracking-[0.18em] uppercase text-concrete">
                  COLLABORATION COVERAGE
                </span>
                <p className="mt-1 text-xs text-concrete-light">
                  Remote Architectural Design &amp; Visualization Studio ·
                  Serving Residential, Commercial &amp; Healthcare Clients
                </p>
              </div>
            </div>

            {/* Social Media Placeholders (Configurable in Admin CMS) */}
            <div className="pt-2">
              <span className="block font-mono text-[10px] tracking-[0.18em] uppercase text-concrete mb-2.5">
                OFFICIAL CHANNELS
              </span>
              <div className="flex flex-wrap gap-2">
                {["Instagram", "LinkedIn", "Behance", "Pinterest"].map(
                  (platform) => (
                    <Link
                      key={platform}
                      href="/contact#channels"
                      className="border border-ivory/15 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-concrete-light hover:border-bronze hover:text-bronze transition-colors"
                    >
                      {platform}
                    </Link>
                  )
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Copyright Strip */}
        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-ivory/10 pt-8 text-xs text-concrete sm:flex-row sm:items-center">
          <p>
            © {currentYear} KOLS ARCHITECTS. All rights reserved. Designing
            Spaces. Visualizing Possibilities.
          </p>

          <div className="flex flex-wrap items-center gap-6">
            <Link
              href="/privacy-policy"
              className="hover:text-ivory transition-colors"
            >
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-ivory transition-colors">
              Terms &amp; Conditions
            </Link>
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 text-concrete/80 hover:text-bronze transition-colors font-mono text-[11px]"
            >
              <Lock className="h-3 w-3" />
              <span>Studio CMS</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
