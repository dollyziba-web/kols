export type ProjectStatus =
  | "Completed Client Project"
  | "Conceptual Design"
  | "Speculative Demonstration";

export type ServiceCategoryGroup =
  | "Architecture & Technical Documentation"
  | "3D Architectural Visualization"
  | "Interior Design";

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface ServiceItem {
  id: string;
  slug: string;
  number: string;
  title: string;
  categoryGroup: ServiceCategoryGroup;
  shortDescription: string;
  introduction: string;
  detailedExplanation: string;
  heroImage: string;
  galleryImages: {
    url: string;
    alt: string;
    caption: string;
  }[];
  inclusions: string[];
  deliverables: string[];
  faqs: ServiceFAQ[];
  published: boolean;
  displayOrder: number;
  seoTitle?: string;
  seoDescription?: string;
}

export interface ProjectGalleryImage {
  id: string;
  url: string;
  alt: string;
  caption: string;
  order: number;
}

export interface PortfolioProject {
  id: string;
  slug: string;
  title: string;
  category: string;
  shortDescription: string;
  overview: string;
  designObjective: string;
  designApproach: string;
  thumbnail: string;
  thumbnailAlt: string;
  gallery: ProjectGalleryImage[];
  videoUrl?: string;
  deliverables: string[];
  projectStatus: ProjectStatus;
  featured: boolean;
  published: boolean;
  displayOrder: number;
  scaleSpec: string;
  drawingCode: string;
  createdAt: string;
  updatedAt: string;
  seoTitle?: string;
  seoDescription?: string;
}

export interface TestimonialItem {
  id: string;
  clientName: string;
  clientInitials: string;
  clientPhoto?: string;
  projectCategory: string;
  quote: string;
  verified: boolean;
  published: boolean;
  createdAt: string;
}

export interface UploadedReferenceFile {
  id: string;
  originalName: string;
  storedName: string;
  url: string;
  mimeType: string;
  sizeBytes: number;
}

export type EnquiryStatus = "new" | "contacted" | "in_progress" | "completed";

export interface EnquirySubmission {
  id: string;
  enquiryType: "quote" | "contact";
  fullName: string;
  email: string;
  whatsappNumber: string;
  projectCategory: string;
  projectDescription: string;
  propertyType?: string;
  preferredStyle?: string;
  projectBudget?: string;
  projectDeadline?: string;
  additionalInfo?: string;
  referenceFiles: UploadedReferenceFile[];
  status: EnquiryStatus;
  createdAt: string;
  updatedAt: string;
}

export interface PageSEOMetadata {
  title: string;
  description: string;
  ogImage?: string;
}

export interface WebsiteSettings {
  brandName: string;
  primaryTagline: string;
  alternativeTaglines: string[];
  heroHeadline: string;
  heroSubheadline: string;
  aboutLabel: string;
  aboutHeadline: string;
  aboutIntro: string;
  aboutPhilosophy: string;
  aboutDesignApproach: string;
  footerStatement: string;
  businessEmailPlaceholder: string;
  whatsappNumberDisplay: string;
  whatsappUrl: string;
  serviceCoveragePlaceholder: string;
  socialLinks: {
    instagram: string;
    linkedin: string;
    behance: string;
    pinterest: string;
  };
  seo: {
    home: PageSEOMetadata;
    about: PageSEOMetadata;
    services: PageSEOMetadata;
    portfolio: PageSEOMetadata;
    process: PageSEOMetadata;
    contact: PageSEOMetadata;
    quote: PageSEOMetadata;
  };
  updatedAt: string;
}

export interface KolsDatabaseSchema {
  services: ServiceItem[];
  projects: PortfolioProject[];
  testimonials: TestimonialItem[];
  enquiries: EnquirySubmission[];
  settings: WebsiteSettings;
}
