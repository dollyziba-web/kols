# KOLS ARCHITECTS — Official Website & Content Management System

**Brand Tagline:** *DESIGNING SPACES. VISUALIZING POSSIBILITIES.*  
**Positioning:** Architecture · Architectural Drawings · 2D Floor Plan Design · 3D Architectural Visualization · Interior Design · Technical Drawings · DWG Drafting & Documentation

---

## 1. Architecture & Technology Stack
- **Frontend & Routing:** Next.js 14 (App Router), React 18, TypeScript
- **Styling & Design System:** Tailwind CSS (`#17191B` Charcoal, `#F3F0E9` Ivory, `#A9A9A3` Concrete Grey, `#A58B62` Bronze) + `Cormorant Garamond`, `Manrope`, and `JetBrains Mono` typography
- **Motion & 3D Experience:** Framer Motion + Three.js real-time interactive 3D architectural massing and lighting viewer (`Architectural3DViewer`) with automatic WebGL fallback and `prefers-reduced-motion` support
- **Database & Persistence:**
  - **Supabase PostgreSQL Schema:** Full SQL DDL and Row Level Security (RLS) policies in [`supabase/schema.sql`](./supabase/schema.sql)
  - **Hybrid Persistence Engine (`src/lib/db.ts`):** Automatically synchronizes with Supabase when `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are supplied, while maintaining a persistent local JSON database (`data/kols-db.json`) and secure upload directory (`public/uploads/`) out of the box.

---

## 2. Complete Route Sitemap
- `/` — Homepage (Hero, Studio Intro, 14 Services Showcase, Featured Portfolio, Walkthrough Video & 2D/3D Split Player, Interactive 3D Viewer, Capabilities, 5-Stage Process, Why Choose Us, Verified Testimonials Archive, Conversion CTA)
- `/about` — About Us (Philosophy, Design Approach, Areas of Expertise, Creative & Technical Synergy, Working Principles)
- `/services` — Complete 14-Service Directory grouped by division
- `/services/[slug]` — Individual Service Detail Pages for all 14 services
- `/portfolio` — Interactive Portfolio Archive with Category Filters, Status Filters (`Completed Client Project`, `Conceptual Design`, `Speculative Demonstration`), and Real-Time Search
- `/portfolio/[slug]` — Individual Project Case Studies with Full-Screen Keyboard-Accessible Lightbox
- `/process` — Five-Stage Architectural & Visualization Workflow
- `/contact` — Studio Contact Channels, WhatsApp Direct (`https://wa.me/2348067403009`), FAQ, and Contact Form
- `/get-a-quote` — 11-Field Project Quotation Portal with Secure Multi-File Upload
- `/admin/login` & `/admin` — Protected Studio Admin Dashboard & CMS
- `/privacy-policy` & `/terms` — Legal Governance Pages

---

## 3. Setup, Development & Production Build

```bash
# Install dependencies
npm install

# Run local development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start
```

---

## 4. Environment Configuration & Admin Handover

Copy `.env.example` to `.env.local` and configure:

- `ADMIN_EMAIL` (Default configured in `.env.local`: `admin@kolsarchitects.com`)
- `ADMIN_PASSWORD` (Default configured in `.env.local`: `KolsStudioAdmin!2026`)
- `AUTH_SECRET` (HMAC-SHA256 session cookie signing key)
- `NEXT_PUBLIC_SUPABASE_URL` & `SUPABASE_SERVICE_ROLE_KEY` (For cloud Supabase PostgreSQL)
- `RESEND_API_KEY` & `NOTIFICATION_EMAIL_TO` (For live email notifications on quote submission)
