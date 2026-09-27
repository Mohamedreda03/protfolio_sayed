import React from "react";
import { redirect } from "next/navigation";
import { checkAdminAuth, fetchAdminData } from "@/app/actions/admin";
import { AdminDashboardClient } from "./dashboard-client";
import { APPWRITE_CONFIG } from "@/lib/appwrite/config";

export default async function AdminDashboardPage() {
  const isAuth = await checkAdminAuth();
  if (!isAuth) {
    redirect("/admin/login");
  }

  const { showcaseItems, inquiries, profile } = await fetchAdminData();

  return (
    <AdminDashboardClient
      initialItems={showcaseItems}
      initialInquiries={inquiries}
      initialProfile={profile}
      isAppwriteConfigured={APPWRITE_CONFIG.isConfigured}
    />
  );
}
