-- ==============================================================================
-- KOLS ARCHITECTS — SUPABASE POSTGRESQL SCHEMA & ROW LEVEL SECURITY (RLS)
-- ==============================================================================

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. ADMIN PROFILES
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('admin', 'editor')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. SERVICE CATEGORIES
CREATE TABLE IF NOT EXISTS public.service_categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. SERVICES
CREATE TABLE IF NOT EXISTS public.services (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  category_id TEXT REFERENCES public.service_categories(id) ON DELETE SET NULL,
  category_name TEXT NOT NULL,
  short_description TEXT NOT NULL,
  introduction TEXT NOT NULL,
  detailed_explanation TEXT NOT NULL,
  hero_image TEXT NOT NULL,
  gallery_images JSONB NOT NULL DEFAULT '[]'::JSONB,
  inclusions JSONB NOT NULL DEFAULT '[]'::JSONB,
  deliverables JSONB NOT NULL DEFAULT '[]'::JSONB,
  faqs JSONB NOT NULL DEFAULT '[]'::JSONB,
  published BOOLEAN NOT NULL DEFAULT TRUE,
  display_order INT NOT NULL DEFAULT 0,
  seo_title TEXT,
  seo_description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_services_slug ON public.services(slug);
CREATE INDEX IF NOT EXISTS idx_services_published ON public.services(published);

-- 4. PROJECT CATEGORIES
CREATE TABLE IF NOT EXISTS public.project_categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. PORTFOLIO PROJECTS
CREATE TABLE IF NOT EXISTS public.projects (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  short_description TEXT NOT NULL,
  overview TEXT NOT NULL,
  design_objective TEXT NOT NULL,
  design_approach TEXT NOT NULL,
  thumbnail TEXT NOT NULL,
  thumbnail_alt TEXT NOT NULL DEFAULT '',
  gallery JSONB NOT NULL DEFAULT '[]'::JSONB,
  video_url TEXT,
  deliverables JSONB NOT NULL DEFAULT '[]'::JSONB,
  project_status TEXT NOT NULL DEFAULT 'Conceptual Design' CHECK (
    project_status IN ('Completed Client Project', 'Conceptual Design', 'Speculative Demonstration')
  ),
  featured BOOLEAN NOT NULL DEFAULT FALSE,
  published BOOLEAN NOT NULL DEFAULT TRUE,
  display_order INT NOT NULL DEFAULT 0,
  location TEXT,
  area_sqm TEXT,
  year TEXT,
  seo_title TEXT,
  seo_description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_projects_slug ON public.projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_category ON public.projects(category);
CREATE INDEX IF NOT EXISTS idx_projects_published ON public.projects(published);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON public.projects(featured);

-- 6. TESTIMONIALS (VERIFIED CLIENT REVIEWS)
CREATE TABLE IF NOT EXISTS public.testimonials (
  id TEXT PRIMARY KEY,
  client_name TEXT NOT NULL,
  client_initials TEXT NOT NULL,
  client_photo TEXT,
  project_category TEXT NOT NULL,
  quote TEXT NOT NULL,
  verified BOOLEAN NOT NULL DEFAULT TRUE,
  published BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. ENQUIRIES & QUOTATION SUBMISSIONS
CREATE TABLE IF NOT EXISTS public.enquiries (
  id TEXT PRIMARY KEY,
  enquiry_type TEXT NOT NULL DEFAULT 'quote' CHECK (enquiry_type IN ('quote', 'contact')),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  whatsapp_number TEXT NOT NULL,
  project_category TEXT NOT NULL,
  project_description TEXT NOT NULL,
  property_type TEXT,
  preferred_style TEXT,
  project_budget TEXT,
  project_deadline TEXT,
  additional_info TEXT,
  reference_files JSONB NOT NULL DEFAULT '[]'::JSONB,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'in_progress', 'completed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_enquiries_status ON public.enquiries(status);
CREATE INDEX IF NOT EXISTS idx_enquiries_created_at ON public.enquiries(created_at DESC);

-- 8. WEBSITE SETTINGS & SEO METADATA
CREATE TABLE IF NOT EXISTS public.website_settings (
  id TEXT PRIMARY KEY DEFAULT 'global',
  brand_name TEXT NOT NULL DEFAULT 'KOLS ARCHITECTS',
  primary_tagline TEXT NOT NULL DEFAULT 'DESIGNING SPACES. VISUALIZING POSSIBILITIES.',
  hero_headline TEXT NOT NULL DEFAULT 'WE DESIGN SPACES THAT DEFINE EXPERIENCES.',
  hero_subheadline TEXT NOT NULL DEFAULT 'From architectural drawings to immersive 3D visualizations, we transform ideas into extraordinary spaces.',
  about_headline TEXT NOT NULL DEFAULT 'WE TURN ARCHITECTURAL IDEAS INTO VISUAL REALITIES.',
  about_intro TEXT NOT NULL,
  about_philosophy TEXT NOT NULL,
  footer_statement TEXT NOT NULL DEFAULT 'We create architectural experiences through thoughtful design, technical precision and immersive visualization.',
  business_email TEXT NOT NULL DEFAULT 'Contact email configured via Studio Admin',
  whatsapp_number TEXT NOT NULL DEFAULT '+234 806 740 3009',
  whatsapp_url TEXT NOT NULL DEFAULT 'https://wa.me/2348067403009',
  service_coverage TEXT NOT NULL DEFAULT 'International Remote Architectural Studio & Private Consultations',
  social_links JSONB NOT NULL DEFAULT '{}'::JSONB,
  seo_metadata JSONB NOT NULL DEFAULT '{}'::JSONB,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.website_settings ENABLE ROW LEVEL SECURITY;

-- Public Read Policies for Published Content
CREATE POLICY "Public can view service categories" ON public.service_categories FOR SELECT USING (true);
CREATE POLICY "Public can view published services" ON public.services FOR SELECT USING (published = true);
CREATE POLICY "Public can view project categories" ON public.project_categories FOR SELECT USING (true);
CREATE POLICY "Public can view published projects" ON public.projects FOR SELECT USING (published = true);
CREATE POLICY "Public can view published testimonials" ON public.testimonials FOR SELECT USING (published = true);
CREATE POLICY "Public can view website settings" ON public.website_settings FOR SELECT USING (true);

-- Public Enquiry Submission Policy (Insert Only — Public cannot read enquiries)
CREATE POLICY "Public can submit enquiries" ON public.enquiries FOR INSERT WITH CHECK (true);

-- Authenticated Admin Full Access Policies
CREATE POLICY "Admins have full access to services" ON public.services FOR ALL
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role IN ('admin', 'editor')));

CREATE POLICY "Admins have full access to projects" ON public.projects FOR ALL
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role IN ('admin', 'editor')));

CREATE POLICY "Admins have full access to testimonials" ON public.testimonials FOR ALL
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role IN ('admin', 'editor')));

CREATE POLICY "Admins have full access to enquiries" ON public.enquiries FOR ALL
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role IN ('admin', 'editor')));

CREATE POLICY "Admins have full access to website settings" ON public.website_settings FOR ALL
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role IN ('admin', 'editor')));
