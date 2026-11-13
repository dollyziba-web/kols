import { NextResponse } from "next/server";
import {
  getProjects,
  getServices,
  getTestimonials,
  getWebsiteSettings,
} from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  const [services, projects, testimonials, settings] = await Promise.all([
    getServices(true),
    getProjects(true),
    getTestimonials(true),
    getWebsiteSettings(),
  ]);

  return NextResponse.json({
    services,
    projects,
    testimonials,
    settings,
  });
}
