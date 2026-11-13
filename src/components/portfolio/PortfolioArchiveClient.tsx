"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Film, Search, X } from "lucide-react";
import { PortfolioProject } from "@/types/kols";

const PORTFOLIO_CATEGORIES = [
  "All Projects",
  "Residential Architecture",
  "Interior Design",
  "Kitchen Design",
  "Bathroom Design",
  "Healthcare Architecture",
  "Commercial Interiors",
  "2D Architectural Drawings",
  "3D Visualization",
];

interface PortfolioArchiveClientProps {
  projects: PortfolioProject[];
}

export default function PortfolioArchiveClient({
  projects,
}: PortfolioArchiveClientProps) {
  const [selectedCategory, setSelectedCategory] = useState("All Projects");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory =
        selectedCategory === "All Projects" ||
        project.category.toLowerCase() === selectedCategory.toLowerCase();

      const matchesStatus =
        statusFilter === "ALL" || project.projectStatus === statusFilter;

      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        project.title.toLowerCase().includes(q) ||
        project.category.toLowerCase().includes(q) ||
        project.shortDescription.toLowerCase().includes(q) ||
        project.drawingCode.toLowerCase().includes(q);

      return matchesCategory && matchesStatus && matchesSearch;
    });
  }, [projects, selectedCategory, statusFilter, searchQuery]);

  return (
    <div className="bg-ivory text-charcoal">
      {/* Portfolio Header & Interactive Filter Controls */}
      <section className="bg-charcoal text-ivory pt-40 pb-20 sm:pt-48 sm:pb-24 border-b border-ivory/10 arch-grid-dark">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16 space-y-12">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 items-end">
            <div className="lg:col-span-8 space-y-5">
              <div className="inline-flex items-center gap-2.5">
                <span className="h-[1.5px] w-8 bg-bronze" />
                <span className="font-mono text-xs tracking-[0.26em] uppercase text-bronze">
                  ARCHITECTURAL ARCHIVE &amp; VISUALIZATIONS
                </span>
              </div>
              <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl leading-[1.08] text-ivory">
                Portfolio &amp; Technical Case Studies.
              </h1>
            </div>
            <div className="lg:col-span-4 border-l-2 border-bronze pl-5 space-y-2">
              <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-bronze">
                PORTFOLIO INTEGRITY
              </p>
              <p className="text-xs sm:text-sm text-ivory/80 leading-relaxed">
                Every work in our archive is transparently badged by status—distinguishing{" "}
                <span className="text-ivory font-medium">
                  Completed Client Projects
                </span>{" "}
                from{" "}
                <span className="text-bronze">Conceptual Designs</span> and{" "}
                <span className="text-bronze">Speculative Demonstrations</span>.
              </p>
            </div>
          </div>

          {/* Search & Status Filter Bar */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 pt-4 border-t border-ivory/15">
            {/* Search Input */}
            <div className="lg:col-span-6 relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-bronze" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects by name, category, or drawing code (e.g. Aurelia, Kitchen, A-101)..."
                aria-label="Search portfolio projects by name"
                className="w-full border border-ivory/25 bg-charcoal-light pl-11 pr-10 py-3.5 text-sm text-ivory placeholder:text-concrete focus:border-bronze focus:outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search query"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-concrete hover:text-ivory"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Project Status Filter */}
            <div className="lg:col-span-6 flex flex-wrap items-center lg:justify-end gap-2">
              <span className="font-mono text-[10px] uppercase tracking-wider text-concrete mr-2">
                STATUS:
              </span>
              {[
                { id: "ALL", label: "All Statuses" },
                { id: "Completed Client Project", label: "Completed Client" },
                { id: "Conceptual Design", label: "Conceptual Design" },
                {
                  id: "Speculative Demonstration",
                  label: "Speculative Demo",
                },
              ].map((st) => (
                <button
                  key={st.id}
                  type="button"
                  onClick={() => setStatusFilter(st.id)}
                  className={`px-3 py-2 font-mono text-[10px] uppercase tracking-wider border transition ${
                    statusFilter === st.id
                      ? "border-bronze bg-bronze text-charcoal font-semibold"
                      : "border-ivory/20 text-ivory/75 hover:border-bronze"
                  }`}
                >
                  {st.label}
                </button>
              ))}
            </div>
          </div>

          {/* Category Filter Pills */}
          <div
            role="tablist"
            aria-label="Portfolio Category Filters"
            className="flex flex-wrap gap-2"
          >
            {PORTFOLIO_CATEGORIES.map((category) => {
              const isSelected = selectedCategory === category;
              return (
                <button
                  key={category}
                  role="tab"
                  aria-selected={isSelected}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.16em] border transition ${
                    isSelected
                      ? "border-ivory bg-ivory text-charcoal font-semibold"
                      : "border-ivory/20 bg-charcoal text-ivory/80 hover:border-bronze hover:text-bronze"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Portfolio Grid Section */}
      <section className="py-20 sm:py-28 arch-grid-light">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
          <div className="mb-8 flex items-center justify-between border-b border-charcoal/10 pb-4 font-mono text-xs uppercase tracking-[0.18em] text-charcoal/70">
            <span>
              SHOWING {filteredProjects.length} OF {projects.length} ARCHIVED
              PROJECTS
            </span>
            {(selectedCategory !== "All Projects" ||
              statusFilter !== "ALL" ||
              searchQuery) && (
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("All Projects");
                  setStatusFilter("ALL");
                  setSearchQuery("");
                }}
                className="text-bronze-dark hover:underline"
              >
                Reset All Filters ×
              </button>
            )}
          </div>

          {filteredProjects.length === 0 ? (
            <div className="border border-charcoal/15 bg-ivory-light p-16 text-center space-y-4">
              <p className="font-serif text-3xl text-charcoal">
                No matching architectural projects found.
              </p>
              <p className="text-sm text-charcoal/70 max-w-md mx-auto">
                Try clearing your search term or switching to another project
                category filter.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("All Projects");
                  setStatusFilter("ALL");
                  setSearchQuery("");
                }}
                className="inline-flex items-center gap-2 bg-charcoal px-6 py-3 font-mono text-xs uppercase tracking-widest text-ivory hover:bg-bronze hover:text-charcoal transition"
              >
                SHOW ALL PROJECTS
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project, index) => {
                  const isFeaturedSpan = index % 3 === 0;
                  const colClass = isFeaturedSpan
                    ? "lg:col-span-7"
                    : "lg:col-span-5";
                  const aspectClass = isFeaturedSpan
                    ? "aspect-[16/10]"
                    : "aspect-[4/3]";

                  return (
                    <motion.article
                      layout
                      key={project.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.4 }}
                      className={`${colClass} group flex flex-col justify-between border border-charcoal/15 bg-ivory-light hover:border-bronze hover:shadow-2xl transition duration-500`}
                    >
                      <div>
                        <Link
                          href={`/portfolio/${project.slug}`}
                          data-cursor="OPEN CASE"
                          className={`block relative w-full overflow-hidden bg-charcoal ${aspectClass}`}
                        >
                          <img
                            src={project.thumbnail}
                            alt={project.thumbnailAlt || project.title}
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-charcoal/30" />

                          {/* Top Status & Category Badges */}
                          <div className="absolute left-4 right-4 top-4 flex flex-wrap items-center justify-between gap-2">
                            <span className="bg-charcoal/90 border border-ivory/25 px-3 py-1 font-mono text-[10px] tracking-[0.18em] uppercase text-ivory">
                              {project.category}
                            </span>
                            <span className="bg-charcoal/90 border border-bronze px-3 py-1 font-mono text-[10px] tracking-[0.16em] uppercase text-bronze">
                              {project.projectStatus}
                            </span>
                          </div>

                          {/* Video Preview Indicator if project has walkthrough */}
                          {project.videoUrl && (
                            <div className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 bg-bronze px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-charcoal">
                              <Film className="h-3 w-3" />
                              <span>Walkthrough Available</span>
                            </div>
                          )}

                          <div className="absolute bottom-4 left-4 font-mono text-[10px] tracking-[0.18em] uppercase text-ivory/90">
                            {project.drawingCode} · {project.scaleSpec}
                          </div>
                        </Link>

                        <div className="p-7 sm:p-8 space-y-3">
                          <h2 className="font-serif text-2xl sm:text-3xl text-charcoal group-hover:text-bronze-dark transition-colors">
                            <Link href={`/portfolio/${project.slug}`}>
                              {project.title}
                            </Link>
                          </h2>
                          <p className="text-sm leading-relaxed text-charcoal/75">
                            {project.shortDescription}
                          </p>
                        </div>
                      </div>

                      <div className="px-7 pb-6 sm:px-8 pt-4 border-t border-charcoal/10 flex flex-wrap items-center justify-between gap-3">
                        <Link
                          href={`/portfolio/${project.slug}`}
                          className="inline-flex items-center gap-2 font-mono text-xs font-semibold tracking-[0.2em] uppercase text-charcoal group-hover:text-bronze-dark transition"
                        >
                          <span>VIEW PROJECT DETAILS</span>
                          <ArrowUpRight className="h-4 w-4" />
                        </Link>
                        <span className="font-mono text-[10px] uppercase tracking-wider text-concrete-dark">
                          {project.gallery.length} Visual Sheets
                        </span>
                      </div>
                    </motion.article>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
