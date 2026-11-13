import React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <section className="relative flex min-h-screen items-center justify-center bg-charcoal text-ivory px-6 py-32 arch-grid-dark">
      <div className="mx-auto max-w-3xl text-center space-y-8 border border-ivory/15 bg-charcoal/90 p-10 sm:p-16">
        <div className="mx-auto flex h-14 w-14 items-center justify-center border border-bronze text-bronze">
          <Compass className="h-6 w-6" />
        </div>

        <div className="space-y-2">
          <p className="font-mono text-xs tracking-[0.28em] uppercase text-bronze">
            DRAWING REFERENCE NOT FOUND · ERROR 404
          </p>
          <h1 className="font-serif text-4xl sm:text-6xl tracking-wide text-ivory">
            Unmapped Coordinates.
          </h1>
        </div>

        <p className="mx-auto max-w-xl text-sm sm:text-base leading-relaxed text-concrete-light">
          The architectural page, drawing sheet, or project archive you are
          looking for has been relocated or does not exist at this URL. Use the
          studio directory below to continue exploring KOLS ARCHITECTS.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-bronze px-7 py-4 text-xs font-semibold tracking-[0.2em] uppercase text-charcoal transition hover:bg-ivory"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>RETURN TO HOMEPAGE</span>
          </Link>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 border border-ivory/25 px-7 py-4 text-xs font-medium tracking-[0.2em] uppercase text-ivory transition hover:border-bronze hover:text-bronze"
          >
            <span>EXPLORE PORTFOLIO</span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
