import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";
import CustomCursor from "@/components/ui/CustomCursor";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://kolsarchitects.com"
  ),
  title: {
    default:
      "KOLS ARCHITECTS | Designing Spaces. Visualizing Possibilities.",
    template: "%s | KOLS ARCHITECTS",
  },
  description:
    "KOLS ARCHITECTS is a contemporary architectural design and visualization studio specializing in architectural drawings, 2D floor plan design, photorealistic 3D architectural visualization, interior design, and AutoCAD DWG documentation.",
  keywords: [
    "Architectural design services",
    "Architectural drawing services",
    "2D floor plan design",
    "3D architectural visualization",
    "3D kitchen design",
    "3D bathroom design",
    "3D clinic design",
    "Interior design services",
    "Residential architectural design",
    "Commercial interior design",
    "AutoCAD DWG drafting",
    "Architectural rendering services",
    "KOLS ARCHITECTS",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "KOLS ARCHITECTS",
    title: "KOLS ARCHITECTS — Designing Spaces. Visualizing Possibilities.",
    description:
      "Contemporary architectural design and visualization studio specializing in 2D floor plans, architectural drawings, photorealistic 3D renders, and luxury interiors.",
    images: [
      {
        url: "/images/renders/hero-residence.png",
        width: 1600,
        height: 900,
        alt: "KOLS ARCHITECTS — Contemporary Architectural Visualization",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KOLS ARCHITECTS | Architectural Design & 3D Visualization Studio",
    description:
      "From architectural drawings to immersive 3D visualizations, we transform ideas into extraordinary spaces.",
    images: ["/images/renders/hero-residence.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "KOLS ARCHITECTS",
    slogan: "DESIGNING SPACES. VISUALIZING POSSIBILITIES.",
    description:
      "A contemporary architectural design and visualization studio specializing in transforming concepts into functional, aesthetically refined and visually compelling spaces.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://kolsarchitects.com",
    sameAs: ["https://wa.me/2348067403009"],
    knowsAbout: [
      "Architectural Drawing",
      "2D Floor Plan Design",
      "3D Architectural Visualization",
      "3D Kitchen Design",
      "3D Bathroom Design",
      "3D Clinic Design",
      "Interior Design",
      "DWG Drafting and Documentation",
    ],
  };

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=JetBrains+Mono:wght@400;500&family=Manrope:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans bg-ivory text-charcoal antialiased selection:bg-bronze selection:text-charcoal">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <CustomCursor />
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
