import fs from "fs";
import path from "path";
import { INITIAL_DB_DATA } from "@/lib/initial-data";
import { getSupabaseAdminClient, isSupabaseConfigured } from "@/lib/supabase";
import {
  EnquiryStatus,
  EnquirySubmission,
  KolsDatabaseSchema,
  PortfolioProject,
  ServiceItem,
  TestimonialItem,
  WebsiteSettings,
} from "@/types/kols";

const DATA_DIR = path.join(process.cwd(), "data");
const DB_FILE_PATH = path.join(DATA_DIR, "kols-db.json");

function ensureLocalDb(): KolsDatabaseSchema {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(DB_FILE_PATH)) {
    fs.writeFileSync(DB_FILE_PATH, JSON.stringify(INITIAL_DB_DATA, null, 2), "utf-8");
    return structuredClone(INITIAL_DB_DATA);
  }
  try {
    const raw = fs.readFileSync(DB_FILE_PATH, "utf-8");
    const parsed = JSON.parse(raw) as KolsDatabaseSchema;
    return {
      services: parsed.services ?? INITIAL_DB_DATA.services,
      projects: parsed.projects ?? INITIAL_DB_DATA.projects,
      testimonials: parsed.testimonials ?? [],
      enquiries: parsed.enquiries ?? [],
      settings: { ...INITIAL_DB_DATA.settings, ...(parsed.settings ?? {}) },
    };
  } catch {
    return structuredClone(INITIAL_DB_DATA);
  }
}

function saveLocalDb(data: KolsDatabaseSchema): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  fs.writeFileSync(DB_FILE_PATH, JSON.stringify(data, null, 2), "utf-8");
}

// ============================================================================
// UNIFIED DATABASE OPERATIONS (Supabase + Local Persistent Store)
// ============================================================================

export async function getAllData(): Promise<KolsDatabaseSchema> {
  return ensureLocalDb();
}

export async function getServices(onlyPublished = true): Promise<ServiceItem[]> {
  const db = ensureLocalDb();
  const list = [...db.services].sort((a, b) => a.displayOrder - b.displayOrder);
  return onlyPublished ? list.filter((s) => s.published) : list;
}

export async function getServiceBySlug(slug: string): Promise<ServiceItem | null> {
  const db = ensureLocalDb();
  return db.services.find((s) => s.slug === slug) ?? null;
}

export async function upsertService(service: ServiceItem): Promise<ServiceItem> {
  const db = ensureLocalDb();
  const idx = db.services.findIndex((s) => s.id === service.id || s.slug === service.slug);
  if (idx >= 0) {
    db.services[idx] = service;
  } else {
    db.services.push(service);
  }
  saveLocalDb(db);
  return service;
}

export async function deleteService(id: string): Promise<boolean> {
  const db = ensureLocalDb();
  const prevLen = db.services.length;
  db.services = db.services.filter((s) => s.id !== id);
  saveLocalDb(db);
  return db.services.length < prevLen;
}

export async function getProjects(onlyPublished = true): Promise<PortfolioProject[]> {
  const db = ensureLocalDb();
  const list = [...db.projects].sort((a, b) => a.displayOrder - b.displayOrder);
  return onlyPublished ? list.filter((p) => p.published) : list;
}

export async function getProjectBySlug(slug: string): Promise<PortfolioProject | null> {
  const db = ensureLocalDb();
  return db.projects.find((p) => p.slug === slug) ?? null;
}

export async function upsertProject(project: PortfolioProject): Promise<PortfolioProject> {
  const db = ensureLocalDb();
  const updated = {
    ...project,
    updatedAt: new Date().toISOString(),
  };
  const idx = db.projects.findIndex((p) => p.id === project.id);
  if (idx >= 0) {
    db.projects[idx] = updated;
  } else {
    db.projects.push(updated);
  }
  saveLocalDb(db);
  return updated;
}

export async function deleteProject(id: string): Promise<boolean> {
  const db = ensureLocalDb();
  const prevLen = db.projects.length;
  db.projects = db.projects.filter((p) => p.id !== id);
  saveLocalDb(db);
  return db.projects.length < prevLen;
}

export async function getTestimonials(onlyPublished = true): Promise<TestimonialItem[]> {
  const db = ensureLocalDb();
  return onlyPublished ? db.testimonials.filter((t) => t.published) : db.testimonials;
}

export async function upsertTestimonial(testimonial: TestimonialItem): Promise<TestimonialItem> {
  const db = ensureLocalDb();
  const idx = db.testimonials.findIndex((t) => t.id === testimonial.id);
  if (idx >= 0) {
    db.testimonials[idx] = testimonial;
  } else {
    db.testimonials.unshift(testimonial);
  }
  saveLocalDb(db);
  return testimonial;
}

export async function deleteTestimonial(id: string): Promise<boolean> {
  const db = ensureLocalDb();
  const prevLen = db.testimonials.length;
  db.testimonials = db.testimonials.filter((t) => t.id !== id);
  saveLocalDb(db);
  return db.testimonials.length < prevLen;
}

export async function getEnquiries(): Promise<EnquirySubmission[]> {
  const db = ensureLocalDb();
  return [...db.enquiries].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function createEnquiry(enquiry: EnquirySubmission): Promise<EnquirySubmission> {
  const db = ensureLocalDb();
  db.enquiries.unshift(enquiry);
  saveLocalDb(db);

  // Also sync to Supabase if configured
  if (isSupabaseConfigured) {
    try {
      const supabase = getSupabaseAdminClient();
      if (supabase) {
        await supabase.from("enquiries").insert({
          id: enquiry.id,
          enquiry_type: enquiry.enquiryType,
          full_name: enquiry.fullName,
          email: enquiry.email,
          whatsapp_number: enquiry.whatsappNumber,
          project_category: enquiry.projectCategory,
          project_description: enquiry.projectDescription,
          property_type: enquiry.propertyType || null,
          preferred_style: enquiry.preferredStyle || null,
          project_budget: enquiry.projectBudget || null,
          project_deadline: enquiry.projectDeadline || null,
          additional_info: enquiry.additionalInfo || null,
          reference_files: enquiry.referenceFiles,
          status: enquiry.status,
        });
      }
    } catch (err) {
      console.warn("Supabase sync skipped or failed, saved to local persistent database:", err);
    }
  }

  return enquiry;
}

export async function updateEnquiryStatus(
  id: string,
  status: EnquiryStatus
): Promise<EnquirySubmission | null> {
  const db = ensureLocalDb();
  const idx = db.enquiries.findIndex((e) => e.id === id);
  if (idx < 0) return null;
  db.enquiries[idx].status = status;
  db.enquiries[idx].updatedAt = new Date().toISOString();
  saveLocalDb(db);
  return db.enquiries[idx];
}

export async function deleteEnquiry(id: string): Promise<boolean> {
  const db = ensureLocalDb();
  const prevLen = db.enquiries.length;
  db.enquiries = db.enquiries.filter((e) => e.id !== id);
  saveLocalDb(db);
  return db.enquiries.length < prevLen;
}

export async function getWebsiteSettings(): Promise<WebsiteSettings> {
  const db = ensureLocalDb();
  return db.settings;
}

export async function updateWebsiteSettings(
  partial: Partial<WebsiteSettings>
): Promise<WebsiteSettings> {
  const db = ensureLocalDb();
  db.settings = {
    ...db.settings,
    ...partial,
    updatedAt: new Date().toISOString(),
  };
  saveLocalDb(db);
  return db.settings;
}
