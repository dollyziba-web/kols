"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  ArrowUpRight,
  CheckCircle2,
  FileUp,
  Loader2,
  MessageSquare,
  ShieldCheck,
  Trash2,
} from "lucide-react";
import { UploadedReferenceFile } from "@/types/kols";

const PROJECT_CATEGORIES = [
  "Architectural drawings",
  "Floor plans",
  "Kitchen design",
  "Bathroom design",
  "Clinic design",
  "Interior design",
  "DWG drafting",
  "Other services",
];

const PROPERTY_TYPES = [
  "Residential (Private Villa / Home / Apartment)",
  "Commercial (Office / Retail / Hospitality)",
  "Healthcare (Medical / Dental / Aesthetic Clinic)",
  "Multi-Unit / Real Estate Development",
  "Private Reception Hall / Event Space",
  "Renovation / Space Reconfiguration",
  "Other Property Type",
];

const PREFERRED_STYLES = [
  "Contemporary Minimalist",
  "Luxury Editorial & Warm Stone",
  "Modern Organic (Travertine, Timber & Bronze)",
  "Neoclassical / Modern Classical",
  "Architectural Concrete & Glass",
  "Biophilic / Wellness-Oriented",
  "Open to KOLS ARCHITECTS Recommendation",
];

const BUDGET_RANGES = [
  "Optional — Prefer Studio Proposal Based on Scope",
  "Single Room / 2D Plan or Individual 3D View",
  "Standard Residential / Clinical Visualization Package",
  "Full Architectural Drawing & 3D Visualization Suite",
  "Large-Scale Development / Commercial Commission",
];

export default function GetAQuoteClient() {
  const searchParams = useSearchParams();

  // All 11 required form fields
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [projectCategory, setProjectCategory] = useState(
    "Architectural drawings"
  );
  const [projectDescription, setProjectDescription] = useState("");
  const [propertyType, setPropertyType] = useState(PROPERTY_TYPES[0]);
  const [preferredStyle, setPreferredStyle] = useState(PREFERRED_STYLES[0]);
  const [projectBudget, setProjectBudget] = useState(BUDGET_RANGES[0]);
  const [projectDeadline, setProjectDeadline] = useState("");
  const [referenceFiles, setReferenceFiles] = useState<UploadedReferenceFile[]>(
    []
  );
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [honeypot, setHoneypot] = useState("");

  const [uploadingFiles, setUploadingFiles] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [submissionSuccess, setSubmissionSuccess] = useState<{
    id: string;
    timestamp: string;
  } | null>(null);

  useEffect(() => {
    const requestedService = searchParams.get("service");
    if (!requestedService) return;
    const lower = requestedService.toLowerCase();
    if (lower.includes("floor")) setProjectCategory("Floor plans");
    else if (lower.includes("kitchen")) setProjectCategory("Kitchen design");
    else if (lower.includes("bathroom")) setProjectCategory("Bathroom design");
    else if (lower.includes("clinic") || lower.includes("health"))
      setProjectCategory("Clinic design");
    else if (lower.includes("dwg") || lower.includes("draft"))
      setProjectCategory("DWG drafting");
    else if (
      lower.includes("interior") ||
      lower.includes("living") ||
      lower.includes("reception")
    )
      setProjectCategory("Interior design");
    else if (lower.includes("draw") || lower.includes("arch"))
      setProjectCategory("Architectural drawings");
    else setProjectCategory("Other services");
  }, [searchParams]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files;
    if (!selected || selected.length === 0) return;

    setUploadError(null);
    setUploadingFiles(true);

    try {
      const formData = new FormData();
      Array.from(selected).forEach((file) => {
        formData.append("files", file);
      });

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        setUploadError(data.error || "File upload failed.");
      } else if (Array.isArray(data.files)) {
        setReferenceFiles((prev) => [...prev, ...data.files]);
      }
    } catch {
      setUploadError("Error uploading files. Please check file size/format.");
    } finally {
      setUploadingFiles(false);
      e.target.value = "";
    }
  };

  const removeUploadedFile = (id: string) => {
    setReferenceFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const handleSubmitQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setSubmitting(true);

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          enquiryType: "quote",
          fullName,
          email,
          whatsappNumber,
          projectCategory,
          projectDescription,
          propertyType,
          preferredStyle,
          projectBudget,
          projectDeadline,
          referenceFiles,
          additionalInfo,
          websiteUrlHoneypot: honeypot,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setFormError(
          data.error || "Please check all required fields and try again."
        );
      } else {
        setSubmissionSuccess({
          id: data.enquiryId,
          timestamp: data.createdAt,
        });
        window.scrollTo({ top: 180, behavior: "smooth" });
      }
    } catch {
      setFormError("Unable to submit quotation request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-ivory text-charcoal">
      {/* Page Hero */}
      <section className="bg-charcoal text-ivory pt-40 pb-20 sm:pt-48 sm:pb-24 border-b border-ivory/10 arch-grid-dark">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-end">
            <div className="lg:col-span-8 space-y-5">
              <div className="inline-flex items-center gap-2.5">
                <span className="h-[1.5px] w-8 bg-bronze" />
                <span className="font-mono text-xs tracking-[0.26em] uppercase text-bronze">
                  COMMISSION BRIEF &amp; PROJECT QUOTATION
                </span>
              </div>
              <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl leading-[1.08] text-ivory">
                Request a Tailored Architectural Quote.
              </h1>
            </div>
            <div className="lg:col-span-4 border-l-2 border-bronze pl-5 space-y-3">
              <p className="text-xs sm:text-sm text-ivory/80 leading-relaxed">
                Complete the project specification form below or attach your
                sketches, PDF plans, or .DWG files. Prefer an instant conversation?
              </p>
              <a
                href="https://wa.me/2348067403009"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] px-4 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-white transition hover:opacity-95"
              >
                <MessageSquare className="h-3.5 w-3.5" />
                <span>WHATSAPP ENQUIRY SHORTCUT</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Quotation Form Section */}
      <section className="py-20 sm:py-28 arch-grid-light">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 items-start">
            {/* Left 8 Columns: The 11-Field Get a Quote Form */}
            <div className="lg:col-span-8">
              {submissionSuccess ? (
                <div
                  role="status"
                  className="border border-bronze bg-charcoal text-ivory p-10 sm:p-14 space-y-6 shadow-2xl"
                >
                  <div className="inline-flex items-center gap-3 border border-bronze/60 bg-bronze/15 px-4 py-2 font-mono text-xs uppercase tracking-[0.2em] text-bronze">
                    <CheckCircle2 className="h-5 w-5" />
                    <span>QUOTATION BRIEF RECEIVED · {submissionSuccess.id}</span>
                  </div>

                  <h2 className="font-serif text-3xl sm:text-5xl text-ivory">
                    Your Project Brief Has Been Logged with KOLS ARCHITECTS.
                  </h2>

                  <p className="text-sm sm:text-base text-concrete-light leading-relaxed max-w-2xl">
                    We have saved your quotation request and{" "}
                    {referenceFiles.length} attached reference file(s) in our
                    secure studio database. Our architectural team will review
                    your parameters and prepare a structured quotation and
                    milestone schedule.
                  </p>

                  <div className="border-t border-ivory/15 pt-6 flex flex-wrap gap-4">
                    <a
                      href={`https://wa.me/2348067403009?text=${encodeURIComponent(
                        `Hello KOLS ARCHITECTS, I just submitted a quotation request (${submissionSuccess.id}) for ${projectCategory}.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-[#25D366] px-6 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-white transition hover:opacity-95"
                    >
                      <span>EXPEDITE BRIEF ON WHATSAPP</span>
                      <ArrowUpRight className="h-4 w-4" />
                    </a>

                    <button
                      type="button"
                      onClick={() => {
                        setSubmissionSuccess(null);
                        setProjectDescription("");
                        setAdditionalInfo("");
                        setReferenceFiles([]);
                      }}
                      className="border border-ivory/30 px-6 py-4 text-xs font-medium uppercase tracking-[0.18em] text-ivory hover:border-bronze transition"
                    >
                      Submit Another Project Brief
                    </button>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmitQuote}
                  className="border border-charcoal/15 bg-ivory-light p-8 sm:p-12 shadow-xl space-y-10"
                >
                  {/* Honeypot anti-spam field */}
                  <input
                    type="text"
                    name="websiteUrlHoneypot"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                    className="hidden"
                    aria-hidden="true"
                  />

                  {formError && (
                    <div
                      role="alert"
                      className="border border-red-700 bg-red-50 px-5 py-4 text-xs font-medium text-red-900"
                    >
                      {formError}
                    </div>
                  )}

                  {/* SECTION A: Client Contact Information (Fields 1, 2, 3) */}
                  <div className="space-y-6">
                    <div className="border-b border-charcoal/15 pb-3">
                      <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-bronze-dark font-semibold block">
                        PART 01 OF 04
                      </span>
                      <h2 className="font-serif text-2xl sm:text-3xl text-charcoal">
                        Client &amp; Organization Details
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                      {/* 1. Full Name */}
                      <div>
                        <label
                          htmlFor="quote-fullName"
                          className="block font-mono text-[11px] uppercase tracking-[0.16em] text-charcoal mb-2"
                        >
                          1. Full Name{" "}
                          <span className="text-bronze-dark">*</span>
                        </label>
                        <input
                          id="quote-fullName"
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Your Full Name"
                          className="w-full border border-charcoal/25 bg-ivory px-4 py-3.5 text-sm text-charcoal focus:border-bronze focus:outline-none"
                        />
                      </div>

                      {/* 2. Email Address */}
                      <div>
                        <label
                          htmlFor="quote-email"
                          className="block font-mono text-[11px] uppercase tracking-[0.16em] text-charcoal mb-2"
                        >
                          2. Email Address{" "}
                          <span className="text-bronze-dark">*</span>
                        </label>
                        <input
                          id="quote-email"
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@domain.com"
                          className="w-full border border-charcoal/25 bg-ivory px-4 py-3.5 text-sm text-charcoal focus:border-bronze focus:outline-none"
                        />
                      </div>

                      {/* 3. WhatsApp Number */}
                      <div>
                        <label
                          htmlFor="quote-whatsapp"
                          className="block font-mono text-[11px] uppercase tracking-[0.16em] text-charcoal mb-2"
                        >
                          3. WhatsApp Number{" "}
                          <span className="text-bronze-dark">*</span>
                        </label>
                        <input
                          id="quote-whatsapp"
                          type="tel"
                          required
                          value={whatsappNumber}
                          onChange={(e) => setWhatsappNumber(e.target.value)}
                          placeholder="+234 800 000 0000"
                          className="w-full border border-charcoal/25 bg-ivory px-4 py-3.5 text-sm text-charcoal focus:border-bronze focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* SECTION B: Project Classification & Style (Fields 4, 6, 7) */}
                  <div className="space-y-6">
                    <div className="border-b border-charcoal/15 pb-3">
                      <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-bronze-dark font-semibold block">
                        PART 02 OF 04
                      </span>
                      <h2 className="font-serif text-2xl sm:text-3xl text-charcoal">
                        Architectural Discipline, Property &amp; Style
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                      {/* 4. Project Category */}
                      <div>
                        <label
                          htmlFor="quote-category"
                          className="block font-mono text-[11px] uppercase tracking-[0.16em] text-charcoal mb-2"
                        >
                          4. Project Category{" "}
                          <span className="text-bronze-dark">*</span>
                        </label>
                        <select
                          id="quote-category"
                          value={projectCategory}
                          onChange={(e) => setProjectCategory(e.target.value)}
                          className="w-full border border-charcoal/25 bg-ivory px-4 py-3.5 text-sm text-charcoal focus:border-bronze focus:outline-none"
                        >
                          {PROJECT_CATEGORIES.map((cat) => (
                            <option key={cat} value={cat}>
                              {cat}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* 6. Property/Project Type */}
                      <div>
                        <label
                          htmlFor="quote-propertyType"
                          className="block font-mono text-[11px] uppercase tracking-[0.16em] text-charcoal mb-2"
                        >
                          6. Property / Project Type{" "}
                          <span className="text-bronze-dark">*</span>
                        </label>
                        <select
                          id="quote-propertyType"
                          value={propertyType}
                          onChange={(e) => setPropertyType(e.target.value)}
                          className="w-full border border-charcoal/25 bg-ivory px-4 py-3.5 text-sm text-charcoal focus:border-bronze focus:outline-none"
                        >
                          {PROPERTY_TYPES.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* 7. Preferred Style */}
                      <div>
                        <label
                          htmlFor="quote-preferredStyle"
                          className="block font-mono text-[11px] uppercase tracking-[0.16em] text-charcoal mb-2"
                        >
                          7. Preferred Style{" "}
                          <span className="text-bronze-dark">*</span>
                        </label>
                        <select
                          id="quote-preferredStyle"
                          value={preferredStyle}
                          onChange={(e) => setPreferredStyle(e.target.value)}
                          className="w-full border border-charcoal/25 bg-ivory px-4 py-3.5 text-sm text-charcoal focus:border-bronze focus:outline-none"
                        >
                          {PREFERRED_STYLES.map((style) => (
                            <option key={style} value={style}>
                              {style}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* SECTION C: Project Description, Budget & Deadline (Fields 5, 8, 9) */}
                  <div className="space-y-6">
                    <div className="border-b border-charcoal/15 pb-3">
                      <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-bronze-dark font-semibold block">
                        PART 03 OF 04
                      </span>
                      <h2 className="font-serif text-2xl sm:text-3xl text-charcoal">
                        Scope Description, Budget &amp; Timeline
                      </h2>
                    </div>

                    {/* 5. Project Description */}
                    <div>
                      <label
                        htmlFor="quote-description"
                        className="block font-mono text-[11px] uppercase tracking-[0.16em] text-charcoal mb-2"
                      >
                        5. Project Description{" "}
                        <span className="text-bronze-dark">*</span>
                      </label>
                      <textarea
                        id="quote-description"
                        required
                        rows={5}
                        value={projectDescription}
                        onChange={(e) => setProjectDescription(e.target.value)}
                        placeholder="Describe your space, plot dimensions, number of floors/rooms, required 2D drawings or 3D camera views, and key goals..."
                        className="w-full border border-charcoal/25 bg-ivory p-4 text-sm text-charcoal focus:border-bronze focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      {/* 8. Project Budget (Optional) */}
                      <div>
                        <label
                          htmlFor="quote-budget"
                          className="block font-mono text-[11px] uppercase tracking-[0.16em] text-charcoal mb-2"
                        >
                          8. Project Budget / Scope Tier{" "}
                          <span className="text-concrete-dark">(Optional)</span>
                        </label>
                        <select
                          id="quote-budget"
                          value={projectBudget}
                          onChange={(e) => setProjectBudget(e.target.value)}
                          className="w-full border border-charcoal/25 bg-ivory px-4 py-3.5 text-sm text-charcoal focus:border-bronze focus:outline-none"
                        >
                          {BUDGET_RANGES.map((b) => (
                            <option key={b} value={b}>
                              {b}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* 9. Project Deadline */}
                      <div>
                        <label
                          htmlFor="quote-deadline"
                          className="block font-mono text-[11px] uppercase tracking-[0.16em] text-charcoal mb-2"
                        >
                          9. Target Project Deadline
                        </label>
                        <input
                          id="quote-deadline"
                          type="date"
                          value={projectDeadline}
                          onChange={(e) => setProjectDeadline(e.target.value)}
                          className="w-full border border-charcoal/25 bg-ivory px-4 py-3.5 text-sm text-charcoal focus:border-bronze focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* SECTION D: Reference Files & Additional Notes (Fields 10, 11) */}
                  <div className="space-y-6">
                    <div className="border-b border-charcoal/15 pb-3">
                      <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-bronze-dark font-semibold block">
                        PART 04 OF 04
                      </span>
                      <h2 className="font-serif text-2xl sm:text-3xl text-charcoal">
                        Reference Files, Sketches &amp; Additional Notes
                      </h2>
                    </div>

                    {/* 10. Reference Images / Files */}
                    <div>
                      <label
                        htmlFor="quote-files"
                        className="block font-mono text-[11px] uppercase tracking-[0.16em] text-charcoal mb-2"
                      >
                        10. Reference Images / CAD / PDF Files (Max 15MB per
                        file)
                      </label>
                      <div className="border-2 border-dashed border-charcoal/25 bg-ivory p-6 text-center hover:border-bronze transition">
                        <FileUp className="mx-auto h-7 w-7 text-bronze-dark mb-2" />
                        <p className="text-xs text-charcoal/80 mb-3">
                          Upload floor plan sketches, PDF drawings, moodboard
                          images, or .DWG/.DXF/.ZIP files
                        </p>
                        <label
                          htmlFor="quote-files"
                          className="inline-flex cursor-pointer items-center gap-2 bg-charcoal px-5 py-2.5 font-mono text-[11px] uppercase tracking-wider text-ivory hover:bg-bronze hover:text-charcoal transition"
                        >
                          {uploadingFiles ? (
                            <>
                              <Loader2 className="h-3.5 w-3.5 animate-spin" />
                              <span>Uploading Files...</span>
                            </>
                          ) : (
                            <span>Select Reference Files</span>
                          )}
                        </label>
                        <input
                          id="quote-files"
                          type="file"
                          multiple
                          accept=".pdf,.jpg,.jpeg,.png,.webp,.svg,.dwg,.dxf,.zip"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                      </div>

                      {uploadError && (
                        <p className="mt-2 text-xs text-red-700 font-medium">
                          {uploadError}
                        </p>
                      )}

                      {referenceFiles.length > 0 && (
                        <ul className="mt-4 space-y-2">
                          {referenceFiles.map((file) => (
                            <li
                              key={file.id}
                              className="flex items-center justify-between border border-charcoal/15 bg-ivory px-4 py-2.5 text-xs"
                            >
                              <div className="flex items-center gap-2 truncate">
                                <CheckCircle2 className="h-4 w-4 text-bronze-dark shrink-0" />
                                <span className="font-medium truncate">
                                  {file.originalName}
                                </span>
                                <span className="font-mono text-[10px] text-concrete-dark">
                                  ({(file.sizeBytes / 1024).toFixed(1)} KB)
                                </span>
                              </div>
                              <button
                                type="button"
                                onClick={() => removeUploadedFile(file.id)}
                                aria-label={`Remove ${file.originalName}`}
                                className="text-red-700 hover:text-red-900 ml-3"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    {/* 11. Additional Information */}
                    <div>
                      <label
                        htmlFor="quote-additionalInfo"
                        className="block font-mono text-[11px] uppercase tracking-[0.16em] text-charcoal mb-2"
                      >
                        11. Additional Information / Special Instructions
                      </label>
                      <textarea
                        id="quote-additionalInfo"
                        rows={3}
                        value={additionalInfo}
                        onChange={(e) => setAdditionalInfo(e.target.value)}
                        placeholder="Any specific CAD standards, rendering resolution requirements, or preferred consultation times..."
                        className="w-full border border-charcoal/25 bg-ivory p-4 text-sm text-charcoal focus:border-bronze focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="border-t border-charcoal/15 pt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                    <button
                      type="submit"
                      disabled={submitting || uploadingFiles}
                      className="inline-flex items-center justify-center gap-3 bg-charcoal px-9 py-4 text-xs font-semibold tracking-[0.22em] uppercase text-ivory transition hover:bg-bronze hover:text-charcoal disabled:opacity-60"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>SAVING PROJECT QUOTATION...</span>
                        </>
                      ) : (
                        <>
                          <span>SUBMIT QUOTATION REQUEST</span>
                          <ArrowUpRight className="h-4 w-4" />
                        </>
                      )}
                    </button>

                    <span className="font-mono text-[10px] uppercase tracking-wider text-charcoal/65">
                      Encrypted Transmission · Saved Directly to Studio CMS
                    </span>
                  </div>
                </form>
              )}
            </div>

            {/* Right 4 Columns: Studio Assurance & WhatsApp Shortcut */}
            <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
              <div className="border border-charcoal bg-charcoal text-ivory p-8 space-y-5">
                <div className="flex items-center gap-2.5 text-bronze font-mono text-xs uppercase tracking-[0.2em]">
                  <ShieldCheck className="h-5 w-5" />
                  <span>QUOTATION ASSURANCE</span>
                </div>
                <h3 className="font-serif text-2xl text-ivory">
                  What Happens After You Submit?
                </h3>
                <ol className="space-y-4 text-xs sm:text-sm text-concrete-light">
                  <li className="flex gap-3">
                    <span className="font-mono text-bronze font-bold">01</span>
                    <span>
                      Our architectural team reviews your project description
                      and uploaded reference files.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-mono text-bronze font-bold">02</span>
                    <span>
                      We prepare a clear scope breakdown, deliverable list (2D
                      CAD / 3D Views), and timeline proposal.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-mono text-bronze font-bold">03</span>
                    <span>
                      We contact you via Email or WhatsApp to finalize Stage 01
                      Discovery &amp; Consultation.
                    </span>
                  </li>
                </ol>
              </div>

              <div className="border border-charcoal/15 bg-ivory-light p-8 space-y-4">
                <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-bronze-dark font-semibold block">
                  DIRECT WHATSAPP SHORTCUT
                </span>
                <h3 className="font-serif text-2xl text-charcoal">
                  Prefer to Share Brief Details via WhatsApp?
                </h3>
                <p className="text-xs leading-relaxed text-charcoal/75">
                  Click below to start a direct WhatsApp conversation with KOLS
                  ARCHITECTS (+234 806 740 3009).
                </p>
                <a
                  href="https://wa.me/2348067403009"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-white transition hover:opacity-95"
                >
                  <span>OPEN WHATSAPP CHAT</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
