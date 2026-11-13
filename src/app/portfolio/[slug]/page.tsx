import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectBySlug, getProjects } from "@/lib/db";
import ProjectDetailClient from "@/components/portfolio/ProjectDetailClient";

export const dynamic = "force-dynamic";

interface ProjectPageProps {
  params: { slug: string };
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug);
  if (!project) {
    return { title: "Project Not Found | KOLS ARCHITECTS" };
  }
  return {
    title:
      project.seoTitle ||
      `${project.title} — ${project.category} | KOLS ARCHITECTS`,
    description: project.seoDescription || project.shortDescription,
    alternates: { canonical: `/portfolio/${project.slug}` },
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const [project, allProjects] = await Promise.all([
    getProjectBySlug(params.slug),
    getProjects(true),
  ]);

  if (!project) {
    notFound();
  }

  const relatedProjects = allProjects
    .filter((p) => p.slug !== project.slug)
    .slice(0, 3);

  return (
    <ProjectDetailClient project={project} relatedProjects={relatedProjects} />
  );
}
