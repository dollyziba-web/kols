import React, { Suspense } from "react";
import { Metadata } from "next";
import { getWebsiteSettings } from "@/lib/db";
import GetAQuoteClient from "@/components/quote/GetAQuoteClient";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getWebsiteSettings();
  return {
    title: settings.seo.quote.title,
    description: settings.seo.quote.description,
    alternates: { canonical: "/get-a-quote" },
  };
}

export default function GetAQuotePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-charcoal text-ivory flex items-center justify-center font-mono text-xs uppercase tracking-widest">
          Loading KOLS ARCHITECTS Quotation Portal...
        </div>
      }
    >
      <GetAQuoteClient />
    </Suspense>
  );
}
