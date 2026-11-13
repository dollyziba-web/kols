"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "HOME", href: "/" },
  { label: "ABOUT", href: "/about" },
  { label: "SERVICES", href: "/services" },
  { label: "PORTFOLIO", href: "/portfolio" },
  { label: "PROCESS", href: "/process" },
  { label: "CONTACT", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isHome = pathname === "/";
  const isAdmin = pathname?.startsWith("/admin");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 36);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  if (isAdmin) return null;

  const isTransparentHero = isHome && !scrolled && !mobileMenuOpen;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isTransparentHero
            ? "bg-gradient-to-b from-charcoal/80 via-charcoal/40 to-transparent py-6 border-b border-ivory/10"
            : "bg-ivory/95 backdrop-blur-md py-4 border-b border-charcoal/10 shadow-[0_4px_24px_rgba(23,25,27,0.05)]"
        }`}
      >
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 sm:px-10 lg:px-16">
          {/* Brand Wordmark */}
          <Link
            href="/"
            className="group flex items-center gap-3.5 focus:outline-none"
            aria-label="KOLS ARCHITECTS Home"
          >
            <div
              className={`flex h-9 w-9 items-center justify-center border transition-colors duration-300 ${
                isTransparentHero
                  ? "border-bronze/80 bg-charcoal/40 text-ivory group-hover:bg-bronze group-hover:text-charcoal"
                  : "border-charcoal/25 bg-charcoal text-ivory group-hover:border-bronze group-hover:bg-bronze group-hover:text-charcoal"
              }`}
            >
              <span className="font-serif text-lg font-medium tracking-widest">
                K
              </span>
            </div>
            <div className="flex flex-col">
              <span
                className={`font-serif text-lg sm:text-xl tracking-[0.22em] font-medium transition-colors duration-300 ${
                  isTransparentHero ? "text-ivory" : "text-charcoal"
                }`}
              >
                KOLS ARCHITECTS
              </span>
              <span
                className={`font-mono text-[9px] tracking-[0.26em] uppercase transition-colors duration-300 ${
                  isTransparentHero ? "text-bronze-light" : "text-bronze-dark"
                }`}
              >
                DESIGN &amp; 3D VISUALIZATION
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav
            aria-label="Primary Navigation"
            className="hidden lg:flex items-center gap-9"
          >
            {NAV_LINKS.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname?.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative py-1 text-xs font-medium tracking-[0.2em] uppercase transition-colors duration-300 ${
                    isTransparentHero
                      ? isActive
                        ? "text-bronze-light"
                        : "text-ivory/85 hover:text-ivory"
                      : isActive
                      ? "text-bronze-dark font-semibold"
                      : "text-charcoal/80 hover:text-charcoal"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-bronze"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Primary CTA & Mobile Trigger */}
          <div className="flex items-center gap-4">
            <Link
              href="/get-a-quote"
              className={`hidden sm:inline-flex items-center gap-2.5 px-5 py-2.5 text-xs font-medium tracking-[0.18em] uppercase transition-all duration-300 ${
                isTransparentHero
                  ? "bg-bronze text-charcoal hover:bg-ivory hover:text-charcoal"
                  : "bg-charcoal text-ivory hover:bg-bronze hover:text-charcoal"
              }`}
            >
              <span>START A PROJECT</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-label={
                mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"
              }
              className={`inline-flex lg:hidden h-10 w-10 items-center justify-center border transition-colors ${
                isTransparentHero
                  ? "border-ivory/30 text-ivory hover:border-bronze"
                  : "border-charcoal/20 text-charcoal hover:border-bronze"
              }`}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Navigation Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-between bg-charcoal text-ivory px-6 pt-28 pb-10 sm:px-12 lg:hidden overflow-y-auto arch-grid-dark"
          >
            <div className="space-y-6">
              <p className="font-mono text-[10px] tracking-[0.28em] uppercase text-bronze">
                NAVIGATION DIRECTORY
              </p>
              <nav className="flex flex-col divide-y divide-ivory/10">
                {NAV_LINKS.map(
                  (item, index) => {
                    const isActive =
                      item.href === "/"
                        ? pathname === "/"
                        : pathname?.startsWith(item.href);

                    return (
                      <motion.div
                        key={item.href}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.08 + index * 0.05 }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="group flex items-center justify-between py-4"
                        >
                          <div className="flex items-baseline gap-4">
                            <span className="font-mono text-xs text-bronze">
                              0{index + 1}
                            </span>
                            <span
                              className={`font-serif text-3xl tracking-wider transition-colors ${
                                isActive
                                  ? "text-bronze"
                                  : "text-ivory group-hover:text-bronze"
                              }`}
                            >
                              {item.label}
                            </span>
                          </div>
                          <ArrowUpRight className="h-5 w-5 text-concrete group-hover:text-bronze" />
                        </Link>
                      </motion.div>
                    );
                  }
                )}
              </nav>
            </div>

            <div className="mt-8 space-y-6 border-t border-ivory/15 pt-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/get-a-quote"
                  onClick={() => setMobileMenuOpen(false)}
                  className="inline-flex items-center justify-center gap-2 bg-bronze px-6 py-4 text-xs font-semibold tracking-[0.2em] uppercase text-charcoal transition hover:bg-ivory"
                >
                  <span>START A PROJECT</span>
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
                <a
                  href="https://wa.me/2348067403009"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border border-ivory/25 px-6 py-4 text-xs font-medium tracking-[0.2em] uppercase text-ivory transition hover:border-bronze hover:text-bronze"
                >
                  <span>WHATSAPP STUDIO</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
              <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-concrete">
                DESIGNING SPACES. VISUALIZING POSSIBILITIES.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
