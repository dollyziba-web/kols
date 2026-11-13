import React from "react";
import { Metadata } from "next";
import { getWebsiteSettings } from "@/lib/db";
import ContactClient from "@/components/contact/ContactClient";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getWebsiteSettings();
  return {
    title: settings.seo.contact.title,
    description: settings.seo.contact.description,
    alternates: { canonical: "/contact" },
  };
}

export default async function ContactPage() {
  const settings = await getWebsiteSettings();
  return <ContactClient settings={settings} />;
}
