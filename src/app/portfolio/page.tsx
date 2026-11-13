import React from "react";
import { Metadata } from "next";
import { getProjects, getWebsiteSettings } from "@/lib/db";
import PortfolioArchiveClient from "@/components/portfolio/PortfolioArchiveClient";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getWebsiteSettings();
  return {
    title: settings.seo.portfolio.title,
    description: settings.seo.portfolio.description,
    alternates: { canonical: "/portfolio" },
  };
}

export default async function PortfolioPage() {
  const projects = await getProjects(true);
  return <PortfolioArchiveClient projects={projects} />;
}
