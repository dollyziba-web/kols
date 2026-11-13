import React from "react";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getServerAdminSession } from "@/lib/auth";
import { getAllData } from "@/lib/db";
import AdminDashboardClient from "@/components/admin/AdminDashboardClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Studio CMS & Admin Dashboard | KOLS ARCHITECTS",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const session = getServerAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  const data = await getAllData();

  return (
    <AdminDashboardClient initialData={data} adminEmail={session.email} />
  );
}
