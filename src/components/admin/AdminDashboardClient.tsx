"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowUpRight,
  CheckCircle2,
  Eye,
  FileText,
  FolderKanban,
  Globe,
  LayoutDashboard,
  LogOut,
  MessageSquareQuote,
  Plus,
  Save,
  Settings,
  Trash2,
  Upload,
} from "lucide-react";
import {
  EnquiryStatus,
  EnquirySubmission,
  KolsDatabaseSchema,
  PortfolioProject,
  ProjectStatus,
  ServiceCategoryGroup,
  ServiceItem,
  TestimonialItem,
  WebsiteSettings,
} from "@/types/kols";

type AdminTab =
  | "overview"
  | "projects"
  | "services"
  | "enquiries"
  | "testimonials"
  | "settings";

interface AdminDashboardClientProps {
  initialData: KolsDatabaseSchema;
  adminEmail: string;
}

export default function AdminDashboardClient({
  initialData,
  adminEmail,
}: AdminDashboardClientProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");

  const [projects, setProjects] = useState<PortfolioProject[]>(
    initialData.projects
  );
  const [services, setServices] = useState<ServiceItem[]>(initialData.services);
  const [enquiries, setEnquiries] = useState<EnquirySubmission[]>(
    initialData.enquiries
  );
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(
    initialData.testimonials
  );
  const [settings, setSettings] = useState<WebsiteSettings>(
    initialData.settings
  );

  const [statusBanner, setStatusBanner] = useState<string | null>(null);
  const [selectedEnquiry, setSelectedEnquiry] =
    useState<EnquirySubmission | null>(initialData.enquiries[0] || null);

  // Project Editor State
  const [editingProject, setEditingProject] =
    useState<PortfolioProject | null>(null);

  // Service Editor State
  const [editingService, setEditingService] = useState<ServiceItem | null>(
    null
  );

  // Testimonial Form State
  const [newTestimonialName, setNewTestimonialName] = useState("");
  const [newTestimonialInitials, setNewTestimonialInitials] = useState("");
  const [newTestimonialCategory, setNewTestimonialCategory] = useState(
    "Residential Architecture"
  );
  const [newTestimonialQuote, setNewTestimonialQuote] = useState("");

  const notify = (msg: string) => {
    setStatusBanner(msg);
    setTimeout(() => setStatusBanner(null), 4000);
  };

  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/admin/login");
    router.refresh();
  };

  // Real Database Metrics (Zero Fabricated Numbers)
  const totalProjects = projects.length;
  const publishedProjectsCount = projects.filter((p) => p.published).length;
  const draftProjectsCount = projects.filter((p) => !p.published).length;
  const totalServices = services.length;
  const totalEnquiries = enquiries.length;

  // ==========================================================================
  // PROJECT MANAGEMENT HANDLERS
  // ==========================================================================
  const startNewProject = () => {
    const now = new Date().toISOString();
    setEditingProject({
      id: `prj-${Date.now()}`,
      slug: `new-architectural-study-${Date.now().toString().slice(-4)}`,
      title: "New Architectural Study",
      category: "Residential Architecture",
      shortDescription:
        "Brief architectural summary of the project concept and deliverables.",
      overview:
        "Detailed project overview describing context, spatial organization, and materiality.",
      designObjective: "Primary architectural and client brief objective.",
      designApproach:
        "Methodology combining 2D CAD planning and 3D visualization.",
      thumbnail: "/images/renders/hero-residence.png",
      thumbnailAlt: "Architectural Project Thumbnail",
      gallery: [
        {
          id: `img-${Date.now()}`,
          url: "/images/renders/hero-residence.png",
          alt: "Primary Perspective View",
          caption: "Primary Architectural Visualization Plate",
          order: 1,
        },
      ],
      deliverables: [
        "2D Architectural Floor Plans & Elevations",
        "Photorealistic 3D Renderings",
      ],
      projectStatus: "Conceptual Design",
      featured: false,
      published: true,
      displayOrder: projects.length + 1,
      scaleSpec: "SCALE 1:100",
      drawingCode: `KOLS-ARC-${projects.length + 101}`,
      createdAt: now,
      updatedAt: now,
    });
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    const res = await fetch("/api/admin/cms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ entity: "project", payload: editingProject }),
    });

    if (res.ok) {
      const data = await res.json();
      setProjects((prev) => {
        const idx = prev.findIndex((p) => p.id === data.project.id);
        if (idx >= 0) {
          const copy = [...prev];
          copy[idx] = data.project;
          return copy;
        }
        return [...prev, data.project];
      });
      setEditingProject(null);
      notify("Project saved and published to database.");
    }
  };

  const handleDeleteProject = async (id: string) => {
    const res = await fetch(`/api/admin/cms?entity=project&id=${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      setProjects((prev) => prev.filter((p) => p.id !== id));
      notify("Project deleted from database.");
    }
  };

  const handleProjectImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!editingProject || !e.target.files?.length) return;
    const formData = new FormData();
    Array.from(e.target.files).forEach((f) => formData.append("files", f));
    const res = await fetch("/api/upload", { method: "POST", body: formData });
    if (res.ok) {
      const data = await res.json();
      if (data.files?.length) {
        const firstUrl = data.files[0].url;
        const addedGallery = data.files.map(
          (f: { id: string; url: string; originalName: string }, i: number) => ({
            id: f.id,
            url: f.url,
            alt: f.originalName,
            caption: f.originalName,
            order: editingProject.gallery.length + i + 1,
          })
        );
        setEditingProject({
          ...editingProject,
          thumbnail: editingProject.thumbnail || firstUrl,
          gallery: [...editingProject.gallery, ...addedGallery],
        });
        notify("Media uploaded and attached to project gallery.");
      }
    }
  };

  // ==========================================================================
  // SERVICE MANAGEMENT HANDLERS
  // ==========================================================================
  const startNewService = () => {
    const nextNum = String(services.length + 1).padStart(2, "0");
    setEditingService({
      id: `srv-${Date.now()}`,
      slug: `custom-service-${Date.now().toString().slice(-4)}`,
      number: nextNum,
      title: "New Architectural Service",
      categoryGroup: "Architecture & Technical Documentation",
      shortDescription: "Concise overview of this architectural service.",
      introduction: "Editorial introduction explaining the value of this service.",
      detailedExplanation:
        "Detailed technical explanation of methodology, standards, and execution.",
      heroImage: "/images/renders/studio-intro.png",
      galleryImages: [
        {
          url: "/images/renders/studio-intro.png",
          alt: "Service Sample Visualization",
          caption: "Representative studio deliverable.",
        },
      ],
      inclusions: [
        "Initial spatial consultation and brief alignment",
        "2D technical layout and 3D visualization",
      ],
      deliverables: [
        "Scaled PDF drawing sheets",
        "High-resolution 3D visualizations",
      ],
      faqs: [
        {
          question: "How do we commission this service?",
          answer:
            "Use the Get a Quote form to submit your project brief and reference files.",
        },
      ],
      published: true,
      displayOrder: services.length + 1,
    });
  };

  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;

    const res = await fetch("/api/admin/cms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ entity: "service", payload: editingService }),
    });

    if (res.ok) {
      const data = await res.json();
      setServices((prev) => {
        const idx = prev.findIndex((s) => s.id === data.service.id);
        if (idx >= 0) {
          const copy = [...prev];
          copy[idx] = data.service;
          return copy;
        }
        return [...prev, data.service];
      });
      setEditingService(null);
      notify("Service saved to database.");
    }
  };

  const handleDeleteService = async (id: string) => {
    const res = await fetch(`/api/admin/cms?entity=service&id=${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      setServices((prev) => prev.filter((s) => s.id !== id));
      notify("Service removed.");
    }
  };

  // ==========================================================================
  // ENQUIRY MANAGEMENT HANDLERS
  // ==========================================================================
  const handleEnquiryStatusChange = async (
    id: string,
    status: EnquiryStatus
  ) => {
    const res = await fetch("/api/enquiries", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    if (res.ok) {
      const data = await res.json();
      setEnquiries((prev) =>
        prev.map((e) => (e.id === id ? data.enquiry : e))
      );
      if (selectedEnquiry?.id === id) {
        setSelectedEnquiry(data.enquiry);
      }
      notify(`Enquiry status updated to "${status.toUpperCase()}".`);
    }
  };

  const handleDeleteEnquiry = async (id: string) => {
    const res = await fetch(`/api/enquiries?id=${id}`, { method: "DELETE" });
    if (res.ok) {
      const remaining = enquiries.filter((e) => e.id !== id);
      setEnquiries(remaining);
      setSelectedEnquiry(remaining[0] || null);
      notify("Enquiry deleted.");
    }
  };

  // ==========================================================================
  // TESTIMONIAL MANAGEMENT HANDLERS
  // ==========================================================================
  const handleAddTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTestimonialName.trim() || !newTestimonialQuote.trim()) return;

    const payload: TestimonialItem = {
      id: `tst-${Date.now()}`,
      clientName: newTestimonialName.trim(),
      clientInitials:
        newTestimonialInitials.trim().toUpperCase() ||
        newTestimonialName
          .trim()
          .split(" ")
          .map((n) => n[0])
          .join("")
          .slice(0, 2)
          .toUpperCase(),
      projectCategory: newTestimonialCategory,
      quote: newTestimonialQuote.trim(),
      verified: true,
      published: true,
      createdAt: new Date().toISOString(),
    };

    const res = await fetch("/api/admin/cms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ entity: "testimonial", payload }),
    });

    if (res.ok) {
      const data = await res.json();
      setTestimonials((prev) => [data.testimonial, ...prev]);
      setNewTestimonialName("");
      setNewTestimonialInitials("");
      setNewTestimonialQuote("");
      notify("Verified client testimonial published.");
    }
  };

  const handleToggleTestimonialPublish = async (item: TestimonialItem) => {
    const updated = { ...item, published: !item.published };
    const res = await fetch("/api/admin/cms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ entity: "testimonial", payload: updated }),
    });
    if (res.ok) {
      setTestimonials((prev) =>
        prev.map((t) => (t.id === item.id ? updated : t))
      );
      notify("Testimonial visibility updated.");
    }
  };

  const handleDeleteTestimonial = async (id: string) => {
    const res = await fetch(`/api/admin/cms?entity=testimonial&id=${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      setTestimonials((prev) => prev.filter((t) => t.id !== id));
      notify("Testimonial deleted.");
    }
  };

  // ==========================================================================
  // WEBSITE SETTINGS & SEO HANDLER
  // ==========================================================================
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/admin/cms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ entity: "settings", payload: settings }),
    });
    if (res.ok) {
      notify("Website content, contact details, and SEO metadata updated.");
    }
  };

  return (
    <div className="min-h-screen bg-ivory text-charcoal flex flex-col lg:flex-row">
      {/* Left Sidebar Navigation */}
      <aside className="w-full lg:w-72 bg-charcoal text-ivory border-b lg:border-b-0 lg:border-r border-ivory/15 flex flex-col justify-between p-6 shrink-0">
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center border border-bronze text-ivory font-serif text-lg">
                K
              </div>
              <div>
                <span className="block font-serif text-base tracking-[0.2em]">
                  KOLS CMS
                </span>
                <span className="block font-mono text-[9px] tracking-[0.22em] uppercase text-bronze">
                  STUDIO ADMIN
                </span>
              </div>
            </Link>
          </div>

          <nav className="space-y-1.5">
            {(
              [
                {
                  id: "overview",
                  label: "Dashboard Overview",
                  icon: LayoutDashboard,
                },
                {
                  id: "projects",
                  label: `Portfolio (${projects.length})`,
                  icon: FolderKanban,
                },
                {
                  id: "services",
                  label: `Services (${services.length})`,
                  icon: FileText,
                },
                {
                  id: "enquiries",
                  label: `Enquiries (${enquiries.length})`,
                  icon: Globe,
                },
                {
                  id: "testimonials",
                  label: `Testimonials (${testimonials.length})`,
                  icon: MessageSquareQuote,
                },
                {
                  id: "settings",
                  label: "Website Content & SEO",
                  icon: Settings,
                },
              ] as const
            ).map((item) => {
              const Icon = item.icon;
              const active = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 font-mono text-xs uppercase tracking-wider transition ${
                    active
                      ? "bg-bronze text-charcoal font-semibold"
                      : "text-ivory/80 hover:bg-ivory/10"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="mt-8 pt-6 border-t border-ivory/15 space-y-4">
          <div className="font-mono text-[10px] text-concrete truncate">
            SIGNED IN: {adminEmail}
          </div>
          <div className="flex flex-col gap-2">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center justify-center gap-2 border border-ivory/25 px-4 py-2.5 font-mono text-[10px] uppercase tracking-widest text-ivory hover:border-bronze"
            >
              <Eye className="h-3.5 w-3.5" />
              <span>VIEW LIVE WEBSITE</span>
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center justify-center gap-2 border border-red-500/40 px-4 py-2.5 font-mono text-[10px] uppercase tracking-widest text-red-300 hover:bg-red-950/50"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>SIGN OUT</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 p-6 sm:p-10 lg:p-12 overflow-y-auto">
        {statusBanner && (
          <div
            role="status"
            className="mb-6 flex items-center justify-between border border-bronze bg-charcoal px-5 py-3.5 text-xs font-mono uppercase tracking-wider text-ivory shadow-lg"
          >
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="h-4 w-4 text-bronze" />
              <span>{statusBanner}</span>
            </div>
          </div>
        )}

        {/* ===================================================================
            TAB 1: DASHBOARD OVERVIEW (11.2 — REAL DATABASE COUNTS ONLY)
        =================================================================== */}
        {activeTab === "overview" && (
          <div className="space-y-10">
            <div className="border-b border-charcoal/15 pb-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                <span className="font-mono text-xs uppercase tracking-[0.22em] text-bronze-dark font-semibold">
                  STUDIO MANAGEMENT SYSTEM
                </span>
                <h1 className="font-serif text-3xl sm:text-5xl text-charcoal mt-1">
                  Executive Dashboard Overview
                </h1>
              </div>
              <button
                type="button"
                onClick={() => {
                  setActiveTab("projects");
                  startNewProject();
                }}
                className="inline-flex items-center gap-2 bg-charcoal px-5 py-3 font-mono text-xs uppercase tracking-wider text-ivory hover:bg-bronze hover:text-charcoal transition"
              >
                <Plus className="h-4 w-4" />
                <span>ADD PORTFOLIO PROJECT</span>
              </button>
            </div>

            {/* Real Database Stat Cards */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
              {[
                { label: "Total Projects", value: totalProjects },
                { label: "Published Projects", value: publishedProjectsCount },
                { label: "Draft Projects", value: draftProjectsCount },
                { label: "Total Services", value: totalServices },
                { label: "Total Enquiries", value: totalEnquiries },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="border border-charcoal/15 bg-ivory-light p-6 space-y-2"
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-bronze-dark block">
                    {stat.label}
                  </span>
                  <p className="font-serif text-4xl text-charcoal">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Recent Enquiries Table */}
            <div className="border border-charcoal/15 bg-ivory-light p-7 space-y-5">
              <div className="flex items-center justify-between border-b border-charcoal/10 pb-4">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-bronze-dark block">
                    LIVE DATABASE SUBMISSIONS
                  </span>
                  <h2 className="font-serif text-2xl text-charcoal">
                    Recent Client Enquiries &amp; Quote Requests
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab("enquiries")}
                  className="font-mono text-xs uppercase tracking-wider text-bronze-dark hover:underline"
                >
                  Manage All Enquiries →
                </button>
              </div>

              {enquiries.length === 0 ? (
                <p className="py-8 text-center text-sm text-charcoal/65">
                  No enquiries submitted yet. Submissions from the Get a Quote
                  and Contact forms appear here in real time.
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-charcoal/15 font-mono text-[10px] uppercase tracking-wider text-charcoal/70">
                        <th className="py-3 pr-4">Client</th>
                        <th className="py-3 pr-4">Category</th>
                        <th className="py-3 pr-4">Type</th>
                        <th className="py-3 pr-4">Status</th>
                        <th className="py-3 pr-4">Date</th>
                        <th className="py-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-charcoal/10">
                      {enquiries.slice(0, 6).map((enq) => (
                        <tr key={enq.id}>
                          <td className="py-3.5 pr-4 font-medium">
                            {enq.fullName}
                            <span className="block font-mono text-[10px] text-charcoal/60">
                              {enq.email}
                            </span>
                          </td>
                          <td className="py-3.5 pr-4">{enq.projectCategory}</td>
                          <td className="py-3.5 pr-4 font-mono uppercase text-[10px]">
                            {enq.enquiryType}
                          </td>
                          <td className="py-3.5 pr-4">
                            <span className="border border-bronze/50 bg-ivory px-2.5 py-1 font-mono text-[10px] uppercase">
                              {enq.status}
                            </span>
                          </td>
                          <td className="py-3.5 pr-4 font-mono text-[10px]">
                            {new Date(enq.createdAt).toLocaleDateString()}
                          </td>
                          <td className="py-3.5 text-right">
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedEnquiry(enq);
                                setActiveTab("enquiries");
                              }}
                              className="font-mono text-[10px] uppercase tracking-wider text-bronze-dark hover:underline"
                            >
                              Open →
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ===================================================================
            TAB 2: PORTFOLIO MANAGEMENT (11.3)
        =================================================================== */}
        {activeTab === "projects" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-charcoal/15 pb-5">
              <div>
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-bronze-dark font-semibold">
                  11.3 PORTFOLIO CMS
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl text-charcoal">
                  Manage Architectural Projects
                </h1>
              </div>
              <button
                type="button"
                onClick={startNewProject}
                className="inline-flex items-center gap-2 bg-charcoal px-5 py-3 font-mono text-xs uppercase tracking-wider text-ivory hover:bg-bronze hover:text-charcoal transition"
              >
                <Plus className="h-4 w-4" />
                <span>NEW PROJECT</span>
              </button>
            </div>

            {editingProject && (
              <form
                onSubmit={handleSaveProject}
                className="border-2 border-bronze bg-ivory-light p-7 space-y-6 shadow-xl"
              >
                <div className="flex items-center justify-between border-b border-charcoal/15 pb-4">
                  <h2 className="font-serif text-2xl text-charcoal">
                    Edit Project: {editingProject.title}
                  </h2>
                  <button
                    type="button"
                    onClick={() => setEditingProject(null)}
                    className="font-mono text-xs uppercase text-charcoal/70 hover:text-charcoal"
                  >
                    Cancel ×
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-wider mb-1.5">
                      Project Title
                    </label>
                    <input
                      type="text"
                      required
                      value={editingProject.title}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          title: e.target.value,
                        })
                      }
                      className="w-full border border-charcoal/25 bg-ivory px-3.5 py-2.5 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-wider mb-1.5">
                      URL Slug
                    </label>
                    <input
                      type="text"
                      required
                      value={editingProject.slug}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          slug: e.target.value,
                        })
                      }
                      className="w-full border border-charcoal/25 bg-ivory px-3.5 py-2.5 text-sm font-mono"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-wider mb-1.5">
                      Category
                    </label>
                    <select
                      value={editingProject.category}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          category: e.target.value,
                        })
                      }
                      className="w-full border border-charcoal/25 bg-ivory px-3.5 py-2.5 text-sm"
                    >
                      <option value="Residential Architecture">
                        Residential Architecture
                      </option>
                      <option value="Interior Design">Interior Design</option>
                      <option value="Kitchen Design">Kitchen Design</option>
                      <option value="Bathroom Design">Bathroom Design</option>
                      <option value="Healthcare Architecture">
                        Healthcare Architecture
                      </option>
                      <option value="Commercial Interiors">
                        Commercial Interiors
                      </option>
                      <option value="2D Architectural Drawings">
                        2D Architectural Drawings
                      </option>
                      <option value="3D Visualization">3D Visualization</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-wider mb-1.5">
                      Project Status (Integrity Label)
                    </label>
                    <select
                      value={editingProject.projectStatus}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          projectStatus: e.target.value as ProjectStatus,
                        })
                      }
                      className="w-full border border-charcoal/25 bg-ivory px-3.5 py-2.5 text-sm"
                    >
                      <option value="Completed Client Project">
                        Completed Client Project
                      </option>
                      <option value="Conceptual Design">
                        Conceptual Design
                      </option>
                      <option value="Speculative Demonstration">
                        Speculative Demonstration
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-wider mb-1.5">
                      Thumbnail Image URL
                    </label>
                    <input
                      type="text"
                      value={editingProject.thumbnail}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          thumbnail: e.target.value,
                        })
                      }
                      className="w-full border border-charcoal/25 bg-ivory px-3.5 py-2.5 text-sm font-mono"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-wider mb-1.5">
                      Thumbnail Alt Text
                    </label>
                    <input
                      type="text"
                      value={editingProject.thumbnailAlt}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          thumbnailAlt: e.target.value,
                        })
                      }
                      className="w-full border border-charcoal/25 bg-ivory px-3.5 py-2.5 text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-wider mb-1.5">
                      Short Description
                    </label>
                    <textarea
                      rows={2}
                      value={editingProject.shortDescription}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          shortDescription: e.target.value,
                        })
                      }
                      className="w-full border border-charcoal/25 bg-ivory p-3 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-wider mb-1.5">
                      Full Overview
                    </label>
                    <textarea
                      rows={2}
                      value={editingProject.overview}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          overview: e.target.value,
                        })
                      }
                      className="w-full border border-charcoal/25 bg-ivory p-3 text-sm"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 border-t border-charcoal/10 pt-4">
                  <div className="flex items-center gap-6">
                    <label className="inline-flex items-center gap-2 text-xs font-mono uppercase">
                      <input
                        type="checkbox"
                        checked={editingProject.published}
                        onChange={(e) =>
                          setEditingProject({
                            ...editingProject,
                            published: e.target.checked,
                          })
                        }
                      />
                      <span>Published</span>
                    </label>
                    <label className="inline-flex items-center gap-2 text-xs font-mono uppercase">
                      <input
                        type="checkbox"
                        checked={editingProject.featured}
                        onChange={(e) =>
                          setEditingProject({
                            ...editingProject,
                            featured: e.target.checked,
                          })
                        }
                      />
                      <span>Featured on Homepage</span>
                    </label>
                    <label className="inline-flex cursor-pointer items-center gap-2 border border-charcoal/25 bg-ivory px-3 py-1.5 font-mono text-[10px] uppercase hover:border-bronze">
                      <Upload className="h-3.5 w-3.5" />
                      <span>Upload Project Images</span>
                      <input
                        type="file"
                        multiple
                        accept="image/*,.svg"
                        onChange={handleProjectImageUpload}
                        className="hidden"
                      />
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 bg-charcoal px-6 py-3 font-mono text-xs uppercase tracking-wider text-ivory hover:bg-bronze hover:text-charcoal transition"
                  >
                    <Save className="h-4 w-4" />
                    <span>SAVE PROJECT</span>
                  </button>
                </div>
              </form>
            )}

            <div className="grid grid-cols-1 gap-4">
              {projects.map((prj) => (
                <div
                  key={prj.id}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-charcoal/15 bg-ivory-light p-5"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={prj.thumbnail}
                      alt={prj.title}
                      className="h-16 w-24 object-cover border border-charcoal/15 bg-charcoal"
                    />
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-[10px] uppercase tracking-wider text-bronze-dark font-semibold">
                          {prj.category}
                        </span>
                        <span className="border border-charcoal/20 px-2 py-0.5 font-mono text-[9px] uppercase">
                          {prj.projectStatus}
                        </span>
                        <span
                          className={`px-2 py-0.5 font-mono text-[9px] uppercase ${
                            prj.published
                              ? "bg-green-900 text-white"
                              : "bg-concrete text-charcoal"
                          }`}
                        >
                          {prj.published ? "Published" : "Draft"}
                        </span>
                      </div>
                      <h3 className="font-serif text-xl text-charcoal mt-1">
                        {prj.title}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setEditingProject(prj)}
                      className="border border-charcoal/25 px-4 py-2 font-mono text-[10px] uppercase tracking-wider hover:border-bronze"
                    >
                      Edit
                    </button>
                    <Link
                      href={`/portfolio/${prj.slug}`}
                      target="_blank"
                      className="border border-charcoal/25 px-3 py-2 font-mono text-[10px] uppercase tracking-wider hover:border-bronze"
                    >
                      View ↗
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleDeleteProject(prj.id)}
                      className="border border-red-600/30 px-3 py-2 text-red-700 hover:bg-red-50"
                      aria-label={`Delete ${prj.title}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===================================================================
            TAB 3: SERVICES MANAGEMENT (11.4)
        =================================================================== */}
        {activeTab === "services" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-charcoal/15 pb-5">
              <div>
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-bronze-dark font-semibold">
                  11.4 SERVICES CMS
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl text-charcoal">
                  Manage Studio Services ({services.length})
                </h1>
              </div>
              <button
                type="button"
                onClick={startNewService}
                className="inline-flex items-center gap-2 bg-charcoal px-5 py-3 font-mono text-xs uppercase tracking-wider text-ivory hover:bg-bronze hover:text-charcoal transition"
              >
                <Plus className="h-4 w-4" />
                <span>ADD SERVICE</span>
              </button>
            </div>

            {editingService && (
              <form
                onSubmit={handleSaveService}
                className="border-2 border-bronze bg-ivory-light p-7 space-y-5 shadow-xl"
              >
                <div className="flex items-center justify-between border-b border-charcoal/15 pb-3">
                  <h2 className="font-serif text-2xl">
                    Edit Service: {editingService.title}
                  </h2>
                  <button
                    type="button"
                    onClick={() => setEditingService(null)}
                    className="font-mono text-xs uppercase"
                  >
                    Cancel ×
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                  <div>
                    <label className="block font-mono text-[10px] uppercase mb-1">
                      Service Title
                    </label>
                    <input
                      type="text"
                      required
                      value={editingService.title}
                      onChange={(e) =>
                        setEditingService({
                          ...editingService,
                          title: e.target.value,
                        })
                      }
                      className="w-full border border-charcoal/25 bg-ivory px-3.5 py-2.5 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] uppercase mb-1">
                      Slug
                    </label>
                    <input
                      type="text"
                      required
                      value={editingService.slug}
                      onChange={(e) =>
                        setEditingService({
                          ...editingService,
                          slug: e.target.value,
                        })
                      }
                      className="w-full border border-charcoal/25 bg-ivory px-3.5 py-2.5 text-sm font-mono"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] uppercase mb-1">
                      Category Division
                    </label>
                    <select
                      value={editingService.categoryGroup}
                      onChange={(e) =>
                        setEditingService({
                          ...editingService,
                          categoryGroup: e.target.value as ServiceCategoryGroup,
                        })
                      }
                      className="w-full border border-charcoal/25 bg-ivory px-3.5 py-2.5 text-sm"
                    >
                      <option value="Architecture & Technical Documentation">
                        Architecture &amp; Technical Documentation
                      </option>
                      <option value="3D Architectural Visualization">
                        3D Architectural Visualization
                      </option>
                      <option value="Interior Design">Interior Design</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-[10px] uppercase mb-1">
                    Short Description
                  </label>
                  <textarea
                    rows={2}
                    value={editingService.shortDescription}
                    onChange={(e) =>
                      setEditingService({
                        ...editingService,
                        shortDescription: e.target.value,
                      })
                    }
                    className="w-full border border-charcoal/25 bg-ivory p-3 text-sm"
                  />
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-charcoal/10">
                  <label className="inline-flex items-center gap-2 font-mono text-xs uppercase">
                    <input
                      type="checkbox"
                      checked={editingService.published}
                      onChange={(e) =>
                        setEditingService({
                          ...editingService,
                          published: e.target.checked,
                        })
                      }
                    />
                    <span>Published on Website</span>
                  </label>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 bg-charcoal px-6 py-3 font-mono text-xs uppercase tracking-wider text-ivory hover:bg-bronze hover:text-charcoal transition"
                  >
                    <Save className="h-4 w-4" />
                    <span>SAVE SERVICE</span>
                  </button>
                </div>
              </form>
            )}

            <div className="grid grid-cols-1 gap-4">
              {services.map((srv) => (
                <div
                  key={srv.id}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-charcoal/15 bg-ivory-light p-5"
                >
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-bronze-dark font-semibold">
                      {srv.number} · {srv.categoryGroup}
                    </span>
                    <h3 className="font-serif text-xl text-charcoal">
                      {srv.title}
                    </h3>
                    <p className="text-xs text-charcoal/70 mt-0.5">
                      {srv.shortDescription}
                    </p>
                  </div>
                  <div className="flex items-center gap-2.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => setEditingService(srv)}
                      className="border border-charcoal/25 px-4 py-2 font-mono text-[10px] uppercase tracking-wider hover:border-bronze"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteService(srv.id)}
                      className="border border-red-600/30 px-3 py-2 text-red-700 hover:bg-red-50"
                      aria-label={`Delete ${srv.title}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===================================================================
            TAB 4: ENQUIRY MANAGEMENT (11.6)
        =================================================================== */}
        {activeTab === "enquiries" && (
          <div className="space-y-8">
            <div className="border-b border-charcoal/15 pb-5">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-bronze-dark font-semibold">
                11.6 ENQUIRIES &amp; REFERENCE FILES
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl text-charcoal">
                Client Quotation &amp; Contact Submissions
              </h1>
            </div>

            {enquiries.length === 0 ? (
              <div className="border border-charcoal/15 bg-ivory-light p-12 text-center">
                <p className="font-serif text-2xl">
                  No enquiries recorded yet.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                <div className="lg:col-span-5 space-y-3">
                  {enquiries.map((enq) => (
                    <button
                      key={enq.id}
                      type="button"
                      onClick={() => setSelectedEnquiry(enq)}
                      className={`w-full text-left border p-5 transition ${
                        selectedEnquiry?.id === enq.id
                          ? "border-bronze bg-charcoal text-ivory"
                          : "border-charcoal/15 bg-ivory-light hover:border-bronze"
                      }`}
                    >
                      <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-wider mb-1">
                        <span className="text-bronze">{enq.projectCategory}</span>
                        <span>{enq.status.toUpperCase()}</span>
                      </div>
                      <h3 className="font-serif text-xl">{enq.fullName}</h3>
                      <p className="text-xs opacity-75 truncate mt-1">
                        {enq.projectDescription}
                      </p>
                    </button>
                  ))}
                </div>

                <div className="lg:col-span-7">
                  {selectedEnquiry && (
                    <div className="border border-charcoal/15 bg-ivory-light p-8 space-y-6">
                      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-charcoal/15 pb-5">
                        <div>
                          <span className="font-mono text-[10px] uppercase tracking-widest text-bronze-dark">
                            REF: {selectedEnquiry.id} ·{" "}
                            {new Date(selectedEnquiry.createdAt).toLocaleString()}
                          </span>
                          <h2 className="font-serif text-3xl text-charcoal mt-1">
                            {selectedEnquiry.fullName}
                          </h2>
                          <p className="font-mono text-xs text-charcoal/75">
                            {selectedEnquiry.email} · WhatsApp:{" "}
                            {selectedEnquiry.whatsappNumber}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <select
                            value={selectedEnquiry.status}
                            onChange={(e) =>
                              handleEnquiryStatusChange(
                                selectedEnquiry.id,
                                e.target.value as EnquiryStatus
                              )
                            }
                            aria-label="Update enquiry status"
                            className="border border-charcoal/30 bg-ivory px-3 py-2 font-mono text-xs uppercase"
                          >
                            <option value="new">Status: NEW</option>
                            <option value="contacted">Status: CONTACTED</option>
                            <option value="in_progress">
                              Status: IN PROGRESS
                            </option>
                            <option value="completed">Status: COMPLETED</option>
                          </select>

                          <button
                            type="button"
                            onClick={() =>
                              handleDeleteEnquiry(selectedEnquiry.id)
                            }
                            className="border border-red-600/30 p-2 text-red-700 hover:bg-red-50"
                            aria-label="Delete enquiry"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs">
                        <div className="border border-charcoal/10 bg-ivory p-3">
                          <span className="text-[9px] text-concrete-dark block uppercase">
                            CATEGORY
                          </span>
                          <span>{selectedEnquiry.projectCategory}</span>
                        </div>
                        <div className="border border-charcoal/10 bg-ivory p-3">
                          <span className="text-[9px] text-concrete-dark block uppercase">
                            PROPERTY TYPE
                          </span>
                          <span>{selectedEnquiry.propertyType || "N/A"}</span>
                        </div>
                        <div className="border border-charcoal/10 bg-ivory p-3">
                          <span className="text-[9px] text-concrete-dark block uppercase">
                            STYLE
                          </span>
                          <span>{selectedEnquiry.preferredStyle || "N/A"}</span>
                        </div>
                        <div className="border border-charcoal/10 bg-ivory p-3">
                          <span className="text-[9px] text-concrete-dark block uppercase">
                            DEADLINE
                          </span>
                          <span>
                            {selectedEnquiry.projectDeadline || "Flexible"}
                          </span>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-mono text-[10px] uppercase tracking-widest text-bronze-dark mb-2">
                          PROJECT DESCRIPTION
                        </h3>
                        <p className="border border-charcoal/10 bg-ivory p-4 text-sm leading-relaxed whitespace-pre-wrap">
                          {selectedEnquiry.projectDescription}
                        </p>
                      </div>

                      {selectedEnquiry.additionalInfo && (
                        <div>
                          <h3 className="font-mono text-[10px] uppercase tracking-widest text-bronze-dark mb-2">
                            ADDITIONAL NOTES
                          </h3>
                          <p className="border border-charcoal/10 bg-ivory p-4 text-xs leading-relaxed">
                            {selectedEnquiry.additionalInfo}
                          </p>
                        </div>
                      )}

                      <div>
                        <h3 className="font-mono text-[10px] uppercase tracking-widest text-bronze-dark mb-2">
                          UPLOADED REFERENCE FILES (
                          {selectedEnquiry.referenceFiles.length})
                        </h3>
                        {selectedEnquiry.referenceFiles.length === 0 ? (
                          <p className="text-xs text-charcoal/60">
                            No reference files attached.
                          </p>
                        ) : (
                          <ul className="space-y-2">
                            {selectedEnquiry.referenceFiles.map((file) => (
                              <li
                                key={file.id}
                                className="flex items-center justify-between border border-charcoal/15 bg-ivory px-4 py-2.5 text-xs"
                              >
                                <span>{file.originalName}</span>
                                <a
                                  href={file.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 font-mono text-[10px] uppercase text-bronze-dark hover:underline"
                                >
                                  <span>Open / Download</span>
                                  <ArrowUpRight className="h-3.5 w-3.5" />
                                </a>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ===================================================================
            TAB 5: TESTIMONIAL MANAGEMENT (11.5)
        =================================================================== */}
        {activeTab === "testimonials" && (
          <div className="space-y-8">
            <div className="border-b border-charcoal/15 pb-5">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-bronze-dark font-semibold">
                11.5 VERIFIED CLIENT REVIEWS
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl text-charcoal">
                Manage Client Testimonials
              </h1>
            </div>

            <form
              onSubmit={handleAddTestimonial}
              className="border border-charcoal/15 bg-ivory-light p-7 space-y-5"
            >
              <h2 className="font-serif text-2xl">
                Add Verified Client Testimonial
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <input
                  type="text"
                  required
                  value={newTestimonialName}
                  onChange={(e) => setNewTestimonialName(e.target.value)}
                  placeholder="Client Name"
                  className="border border-charcoal/25 bg-ivory px-3.5 py-2.5 text-sm"
                />
                <input
                  type="text"
                  value={newTestimonialInitials}
                  onChange={(e) => setNewTestimonialInitials(e.target.value)}
                  placeholder="Initials (e.g. A.O.)"
                  className="border border-charcoal/25 bg-ivory px-3.5 py-2.5 text-sm"
                />
                <input
                  type="text"
                  value={newTestimonialCategory}
                  onChange={(e) => setNewTestimonialCategory(e.target.value)}
                  placeholder="Project Category"
                  className="border border-charcoal/25 bg-ivory px-3.5 py-2.5 text-sm"
                />
              </div>
              <textarea
                rows={3}
                required
                value={newTestimonialQuote}
                onChange={(e) => setNewTestimonialQuote(e.target.value)}
                placeholder="Verified client testimonial text..."
                className="w-full border border-charcoal/25 bg-ivory p-3.5 text-sm"
              />
              <button
                type="submit"
                className="inline-flex items-center gap-2 bg-charcoal px-6 py-3 font-mono text-xs uppercase tracking-wider text-ivory hover:bg-bronze hover:text-charcoal transition"
              >
                <Plus className="h-4 w-4" />
                <span>PUBLISH VERIFIED TESTIMONIAL</span>
              </button>
            </form>

            <div className="space-y-4">
              {testimonials.map((tst) => (
                <div
                  key={tst.id}
                  className="flex items-center justify-between border border-charcoal/15 bg-ivory-light p-5"
                >
                  <div className="space-y-1">
                    <span className="font-mono text-[10px] uppercase text-bronze-dark">
                      {tst.projectCategory} ·{" "}
                      {tst.published ? "PUBLISHED" : "UNPUBLISHED"}
                    </span>
                    <h3 className="font-serif text-xl">{tst.clientName}</h3>
                    <p className="text-xs text-charcoal/75">“{tst.quote}”</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => handleToggleTestimonialPublish(tst)}
                      className="border border-charcoal/25 px-3 py-1.5 font-mono text-[10px] uppercase"
                    >
                      {tst.published ? "Unpublish" : "Publish"}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteTestimonial(tst.id)}
                      className="text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===================================================================
            TAB 6: WEBSITE CONTENT & SEO MANAGEMENT (11.7)
        =================================================================== */}
        {activeTab === "settings" && (
          <form onSubmit={handleSaveSettings} className="space-y-8">
            <div className="flex items-center justify-between border-b border-charcoal/15 pb-5">
              <div>
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-bronze-dark font-semibold">
                  11.7 GLOBAL CONTENT &amp; SEO CMS
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl text-charcoal">
                  Website Copy, Contact Channels &amp; SEO Metadata
                </h1>
              </div>
              <button
                type="submit"
                className="inline-flex items-center gap-2 bg-charcoal px-6 py-3 font-mono text-xs uppercase tracking-wider text-ivory hover:bg-bronze hover:text-charcoal transition"
              >
                <Save className="h-4 w-4" />
                <span>SAVE ALL SETTINGS</span>
              </button>
            </div>

            <div className="border border-charcoal/15 bg-ivory-light p-7 space-y-5">
              <h2 className="font-serif text-2xl">
                Homepage Hero &amp; Studio Introduction
              </h2>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className="block font-mono text-[10px] uppercase mb-1">
                    Hero Headline
                  </label>
                  <input
                    type="text"
                    value={settings.heroHeadline}
                    onChange={(e) =>
                      setSettings({ ...settings, heroHeadline: e.target.value })
                    }
                    className="w-full border border-charcoal/25 bg-ivory px-3.5 py-2.5 text-sm"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] uppercase mb-1">
                    Primary Tagline
                  </label>
                  <input
                    type="text"
                    value={settings.primaryTagline}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        primaryTagline: e.target.value,
                      })
                    }
                    className="w-full border border-charcoal/25 bg-ivory px-3.5 py-2.5 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-[10px] uppercase mb-1">
                  Hero Supporting Copy
                </label>
                <textarea
                  rows={2}
                  value={settings.heroSubheadline}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      heroSubheadline: e.target.value,
                    })
                  }
                  className="w-full border border-charcoal/25 bg-ivory p-3 text-sm"
                />
              </div>

              <div>
                <label className="block font-mono text-[10px] uppercase mb-1">
                  About Introduction Paragraph
                </label>
                <textarea
                  rows={3}
                  value={settings.aboutIntro}
                  onChange={(e) =>
                    setSettings({ ...settings, aboutIntro: e.target.value })
                  }
                  className="w-full border border-charcoal/25 bg-ivory p-3 text-sm"
                />
              </div>
            </div>

            <div className="border border-charcoal/15 bg-ivory-light p-7 space-y-5">
              <h2 className="font-serif text-2xl">
                Contact Details &amp; WhatsApp Configuration
              </h2>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                <div>
                  <label className="block font-mono text-[10px] uppercase mb-1">
                    Business Email Display
                  </label>
                  <input
                    type="text"
                    value={settings.businessEmailPlaceholder}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        businessEmailPlaceholder: e.target.value,
                      })
                    }
                    className="w-full border border-charcoal/25 bg-ivory px-3.5 py-2.5 text-sm"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] uppercase mb-1">
                    WhatsApp Number Display
                  </label>
                  <input
                    type="text"
                    value={settings.whatsappNumberDisplay}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        whatsappNumberDisplay: e.target.value,
                      })
                    }
                    className="w-full border border-charcoal/25 bg-ivory px-3.5 py-2.5 text-sm"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] uppercase mb-1">
                    WhatsApp Direct URL
                  </label>
                  <input
                    type="text"
                    value={settings.whatsappUrl}
                    onChange={(e) =>
                      setSettings({ ...settings, whatsappUrl: e.target.value })
                    }
                    className="w-full border border-charcoal/25 bg-ivory px-3.5 py-2.5 text-sm font-mono"
                  />
                </div>
              </div>
            </div>

            <div className="border border-charcoal/15 bg-ivory-light p-7 space-y-5">
              <h2 className="font-serif text-2xl">Homepage SEO Metadata</h2>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block font-mono text-[10px] uppercase mb-1">
                    Homepage Meta Title
                  </label>
                  <input
                    type="text"
                    value={settings.seo.home.title}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        seo: {
                          ...settings.seo,
                          home: {
                            ...settings.seo.home,
                            title: e.target.value,
                          },
                        },
                      })
                    }
                    className="w-full border border-charcoal/25 bg-ivory px-3.5 py-2.5 text-sm"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] uppercase mb-1">
                    Homepage Meta Description
                  </label>
                  <textarea
                    rows={2}
                    value={settings.seo.home.description}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        seo: {
                          ...settings.seo,
                          home: {
                            ...settings.seo.home,
                            description: e.target.value,
                          },
                        },
                      })
                    }
                    className="w-full border border-charcoal/25 bg-ivory p-3 text-sm"
                  />
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
