"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  CheckCircle2,
  Globe,
  HelpCircle,
  Loader2,
  Mail,
  MessageSquare,
} from "lucide-react";
import { WebsiteSettings } from "@/types/kols";

interface ContactClientProps {
  settings: WebsiteSettings;
}

const CONTACT_FAQS = [
  {
    q: "How do we start a project with KOLS ARCHITECTS?",
    a: "You can submit your project details and reference files through our Get a Quote page, send an enquiry using the contact form on this page, or message us directly on WhatsApp (+234 806 740 3009) for an immediate consultation.",
  },
  {
    q: "Do you work with international clients remotely?",
    a: "Yes. KOLS ARCHITECTS operates a streamlined digital studio workflow, collaborating with homeowners, developers, architects, and healthcare operators worldwide via digital design reviews, video briefings, and cloud CAD/render delivery.",
  },
  {
    q: "What file formats do you accept as input and deliver upon completion?",
    a: "You can send us hand sketches, PDF plans, site survey drawings, photographs, or existing .DWG files. Depending on your commissioned service, we deliver scaled PDF drawing sets, native editable AutoCAD (.DWG) files, and high-resolution 4K/8K 3D renderings.",
  },
  {
    q: "How are revisions handled during the design and visualization process?",
    a: "Stage 04 of our five-stage workflow is dedicated to Review & Refinement, allowing you to provide structured feedback on layouts, materials, and lighting before final file delivery.",
  },
];

export default function ContactClient({ settings }: ContactClientProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [projectCategory, setProjectCategory] = useState(
    "Architectural drawings"
  );
  const [projectDescription, setProjectDescription] = useState("");
  const [honeypot, setHoneypot] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSubmitting(true);

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          enquiryType: "contact",
          fullName,
          email,
          whatsappNumber,
          projectCategory,
          projectDescription,
          websiteUrlHoneypot: honeypot,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setErrorMessage(
          data.error || "Please verify your details and try again."
        );
      } else {
        setSubmittedId(data.enquiryId || "CONFIRMED");
        setFullName("");
        setEmail("");
        setWhatsappNumber("");
        setProjectDescription("");
      }
    } catch {
      setErrorMessage("Network error while submitting your enquiry.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-ivory text-charcoal">
      {/* Page Hero */}
      <section className="bg-charcoal text-ivory pt-40 pb-24 sm:pt-48 sm:pb-32 border-b border-ivory/10 arch-grid-dark">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-end">
            <div className="lg:col-span-8 space-y-6">
              <div className="inline-flex items-center gap-2.5">
                <span className="h-[1.5px] w-8 bg-bronze" />
                <span className="font-mono text-xs tracking-[0.26em] uppercase text-bronze">
                  STUDIO CONSULTATIONS &amp; ENQUIRIES
                </span>
              </div>
              <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl leading-[1.08] text-ivory">
                Connect with KOLS ARCHITECTS.
              </h1>
            </div>
            <div className="lg:col-span-4 border-l-2 border-bronze pl-5 space-y-3">
              <p className="text-sm text-ivory/80 leading-relaxed">
                Reach out to discuss residential or commercial architecture, 2D
                floor plans, AutoCAD DWG documentation, or photorealistic 3D
                visualization.
              </p>
              <Link
                href="/get-a-quote"
                className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-bronze hover:text-ivory transition"
              >
                <span>NEED A DETAILED QUOTE? USE OUR QUOTATION FORM</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Contact Grid: Studio Details + Contact Enquiry Form */}
      <section className="py-24 sm:py-32 border-b border-charcoal/10 arch-grid-light">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-12">
            {/* Left 5 Columns: Configurable Contact Channels */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-3">
                <span className="font-mono text-xs tracking-[0.24em] uppercase text-bronze-dark font-semibold">
                  DIRECT CHANNELS
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl text-charcoal">
                  Studio Communication &amp; Coverage
                </h2>
                <p className="text-sm leading-relaxed text-charcoal/75">
                  All studio contact channels are managed through our official
                  portal. Choose your preferred channel below or submit a direct
                  consultation message.
                </p>
              </div>

              <div className="space-y-5">
                {/* Verified WhatsApp Direct Card */}
                <div className="border border-charcoal/15 bg-charcoal text-ivory p-7 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-bronze">
                      INSTANT STUDIO MESSAGING
                    </span>
                    <MessageSquare className="h-4 w-4 text-[#25D366]" />
                  </div>
                  <h3 className="font-serif text-2xl">
                    WhatsApp Studio Direct
                  </h3>
                  <p className="text-xs text-concrete-light">
                    Verified Studio Number: {settings.whatsappNumberDisplay}
                  </p>
                  <div className="pt-2">
                    <a
                      href={settings.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-[#25D366] px-5 py-3 text-xs font-semibold tracking-[0.18em] uppercase text-white transition hover:opacity-95"
                    >
                      <span>CHAT WITH US ON WHATSAPP</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>

                {/* Configurable Business Email Card */}
                <div className="border border-charcoal/15 bg-ivory-light p-7 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-bronze-dark font-semibold">
                      BUSINESS EMAIL
                    </span>
                    <Mail className="h-4 w-4 text-bronze-dark" />
                  </div>
                  <h3 className="font-serif text-xl text-charcoal">
                    Official Electronic Correspondence
                  </h3>
                  <p className="text-xs font-mono text-charcoal/80">
                    {settings.businessEmailPlaceholder}
                  </p>
                </div>

                {/* Service Coverage Card */}
                <div className="border border-charcoal/15 bg-ivory-light p-7 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-bronze-dark font-semibold">
                      SERVICE COVERAGE
                    </span>
                    <Globe className="h-4 w-4 text-bronze-dark" />
                  </div>
                  <h3 className="font-serif text-xl text-charcoal">
                    Local &amp; International Remote Collaboration
                  </h3>
                  <p className="text-xs leading-relaxed text-charcoal/75">
                    {settings.serviceCoveragePlaceholder}
                  </p>
                </div>

                {/* Social Media Profiles */}
                <div
                  id="channels"
                  className="border border-charcoal/15 bg-ivory-light p-7 space-y-3"
                >
                  <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-bronze-dark font-semibold block">
                    SOCIAL MEDIA PROFILES
                  </span>
                  <div className="grid grid-cols-2 gap-2.5">
                    {(
                      [
                        {
                          label: "Instagram",
                          url: settings.socialLinks.instagram,
                        },
                        {
                          label: "LinkedIn",
                          url: settings.socialLinks.linkedin,
                        },
                        { label: "Behance", url: settings.socialLinks.behance },
                        {
                          label: "Pinterest",
                          url: settings.socialLinks.pinterest,
                        },
                      ] as const
                    ).map((soc) =>
                      soc.url ? (
                        <a
                          key={soc.label}
                          href={soc.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between border border-charcoal/15 bg-ivory px-3.5 py-2.5 font-mono text-xs uppercase tracking-wider hover:border-bronze"
                        >
                          <span>{soc.label}</span>
                          <ArrowUpRight className="h-3.5 w-3.5 text-bronze-dark" />
                        </a>
                      ) : (
                        <div
                          key={soc.label}
                          className="flex items-center justify-between border border-charcoal/10 bg-ivory/60 px-3.5 py-2.5 font-mono text-[11px] uppercase tracking-wider text-charcoal/60"
                        >
                          <span>{soc.label}</span>
                          <span className="text-[9px] text-bronze-dark">
                            CMS Ready
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Right 7 Columns: Contact Enquiry Form */}
            <div className="lg:col-span-7">
              <div className="border border-charcoal/15 bg-ivory-light p-8 sm:p-12 shadow-lg">
                <div className="mb-8 space-y-2 border-b border-charcoal/10 pb-6">
                  <span className="font-mono text-xs tracking-[0.22em] uppercase text-bronze-dark font-semibold">
                    DIRECT CONSULTATION MESSAGE
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl text-charcoal">
                    Send a Project Enquiry
                  </h2>
                  <p className="text-xs sm:text-sm text-charcoal/70">
                    Looking to upload reference files, site plans, or specify a
                    project deadline? Use our{" "}
                    <Link
                      href="/get-a-quote"
                      className="text-bronze-dark font-medium underline"
                    >
                      Full Quotation Request Form
                    </Link>
                    .
                  </p>
                </div>

                {submittedId ? (
                  <div
                    role="status"
                    className="border border-bronze bg-charcoal text-ivory p-8 space-y-5"
                  >
                    <div className="flex items-center gap-3 text-bronze">
                      <CheckCircle2 className="h-6 w-6" />
                      <span className="font-mono text-xs tracking-[0.22em] uppercase">
                        ENQUIRY LOGGED · REF #{submittedId}
                      </span>
                    </div>
                    <h3 className="font-serif text-3xl">
                      Thank You for Contacting KOLS ARCHITECTS.
                    </h3>
                    <p className="text-sm text-concrete-light leading-relaxed">
                      Your message has been securely saved to our studio
                      database. A senior architect or visualization specialist
                      will review your enquiry and respond promptly.
                    </p>
                    <div className="flex flex-wrap gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setSubmittedId(null)}
                        className="bg-bronze px-6 py-3 font-mono text-xs font-semibold uppercase tracking-widest text-charcoal hover:bg-ivory transition"
                      >
                        Send Another Message
                      </button>
                      <a
                        href={settings.whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border border-ivory/30 px-6 py-3 font-mono text-xs uppercase tracking-widest text-ivory hover:border-bronze transition"
                      >
                        Follow Up on WhatsApp →
                      </a>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-6">
                    {/* Honeypot field */}
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

                    {errorMessage && (
                      <div
                        role="alert"
                        className="border border-red-700 bg-red-50 px-4 py-3 text-xs font-medium text-red-900"
                      >
                        {errorMessage}
                      </div>
                    )}

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="contact-fullName"
                          className="block font-mono text-[11px] uppercase tracking-[0.18em] text-charcoal mb-2"
                        >
                          Full Name <span className="text-bronze-dark">*</span>
                        </label>
                        <input
                          id="contact-fullName"
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g. Architect / Client Name"
                          className="w-full border border-charcoal/25 bg-ivory px-4 py-3.5 text-sm text-charcoal focus:border-bronze focus:outline-none"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="contact-email"
                          className="block font-mono text-[11px] uppercase tracking-[0.18em] text-charcoal mb-2"
                        >
                          Email Address{" "}
                          <span className="text-bronze-dark">*</span>
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="name@company.com"
                          className="w-full border border-charcoal/25 bg-ivory px-4 py-3.5 text-sm text-charcoal focus:border-bronze focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="contact-whatsapp"
                          className="block font-mono text-[11px] uppercase tracking-[0.18em] text-charcoal mb-2"
                        >
                          WhatsApp / Telephone Number{" "}
                          <span className="text-bronze-dark">*</span>
                        </label>
                        <input
                          id="contact-whatsapp"
                          type="tel"
                          required
                          value={whatsappNumber}
                          onChange={(e) => setWhatsappNumber(e.target.value)}
                          placeholder="+234 800 000 0000"
                          className="w-full border border-charcoal/25 bg-ivory px-4 py-3.5 text-sm text-charcoal focus:border-bronze focus:outline-none"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="contact-category"
                          className="block font-mono text-[11px] uppercase tracking-[0.18em] text-charcoal mb-2"
                        >
                          Service of Interest{" "}
                          <span className="text-bronze-dark">*</span>
                        </label>
                        <select
                          id="contact-category"
                          value={projectCategory}
                          onChange={(e) => setProjectCategory(e.target.value)}
                          className="w-full border border-charcoal/25 bg-ivory px-4 py-3.5 text-sm text-charcoal focus:border-bronze focus:outline-none"
                        >
                          <option value="Architectural drawings">
                            Architectural drawings
                          </option>
                          <option value="Floor plans">Floor plans</option>
                          <option value="Kitchen design">Kitchen design</option>
                          <option value="Bathroom design">
                            Bathroom design
                          </option>
                          <option value="Clinic design">Clinic design</option>
                          <option value="Interior design">
                            Interior design
                          </option>
                          <option value="DWG drafting">DWG drafting</option>
                          <option value="Other services">Other services</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="contact-description"
                        className="block font-mono text-[11px] uppercase tracking-[0.18em] text-charcoal mb-2"
                      >
                        Message / Project Overview{" "}
                        <span className="text-bronze-dark">*</span>
                      </label>
                      <textarea
                        id="contact-description"
                        required
                        rows={5}
                        value={projectDescription}
                        onChange={(e) => setProjectDescription(e.target.value)}
                        placeholder="Tell us about your project, space requirements, or consultation question..."
                        className="w-full border border-charcoal/25 bg-ivory p-4 text-sm text-charcoal focus:border-bronze focus:outline-none"
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2">
                      <button
                        type="submit"
                        disabled={submitting}
                        className="inline-flex items-center justify-center gap-3 bg-charcoal px-8 py-4 text-xs font-semibold tracking-[0.2em] uppercase text-ivory transition hover:bg-bronze hover:text-charcoal disabled:opacity-60"
                      >
                        {submitting ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span>SUBMITTING ENQUIRY...</span>
                          </>
                        ) : (
                          <>
                            <span>SEND CONSULTATION ENQUIRY</span>
                            <ArrowUpRight className="h-4 w-4" />
                          </>
                        )}
                      </button>

                      <Link
                        href="/get-a-quote"
                        className="font-mono text-[11px] uppercase tracking-wider text-bronze-dark hover:underline text-center"
                      >
                        Need File Upload? Go to Get a Quote →
                      </Link>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-4xl px-6 sm:px-10">
          <div className="text-center space-y-3 mb-14">
            <span className="font-mono text-xs tracking-[0.24em] uppercase text-bronze-dark font-semibold">
              CONSULTATION FAQ
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-charcoal">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-5">
            {CONTACT_FAQS.map((item, idx) => (
              <div
                key={idx}
                className="border border-charcoal/15 bg-ivory-light p-7 space-y-2.5"
              >
                <div className="flex items-start gap-3">
                  <HelpCircle className="h-5 w-5 text-bronze-dark shrink-0 mt-0.5" />
                  <h3 className="font-serif text-xl sm:text-2xl text-charcoal">
                    {item.q}
                  </h3>
                </div>
                <p className="pl-8 text-sm leading-relaxed text-charcoal/75">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
