import React from "react";
import { Metadata } from "next";
import {
  getProjects,
  getServices,
  getTestimonials,
  getWebsiteSettings,
} from "@/lib/db";
import HomeClient from "@/components/home/HomeClient";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getWebsiteSettings();
  return {
    title: settings.seo.home.title,
    description: settings.seo.home.description,
    alternates: {
      canonical: "/",
    },
  };
}

export default async function HomePage() {
  const [services, projects, testimonials, settings] = await Promise.all([
    getServices(true),
    getProjects(true),
    getTestimonials(true),
    getWebsiteSettings(),
  ]);

  return (
    <HomeClient
      services={services}
      projects={projects}
      testimonials={testimonials}
      settings={settings}
    />
  );
}
