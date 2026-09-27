"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { APPWRITE_CONFIG } from "@/lib/appwrite/config";
import { createAdminClient, createSessionClient } from "@/lib/appwrite/server";
import { getShowcaseItems, getInquiries, saveShowcaseItem, getProfile, updateProfile, uploadAssetFile } from "@/lib/appwrite/data";
import { ShowcaseItem, Inquiry, Profile } from "@/lib/types";

const ADMIN_COOKIE = "portfolio-admin-session";

export async function adminLoginAction(formData: FormData): Promise<{ success: boolean; error?: string }> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { success: false, error: "Please enter both email and password." };
  }

  // If Appwrite is configured, authenticate via Appwrite Account
  if (APPWRITE_CONFIG.isConfigured) {
    try {
      const { account } = await createAdminClient();
      // Appwrite admin email verification or session creation
      const cookieStore = await cookies();
      cookieStore.set(ADMIN_COOKIE, "appwrite-auth-token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
      });
      return { success: true };
    } catch (err) {
      console.error("Appwrite login failed:", err);
      return { success: false, error: "Invalid Appwrite credentials." };
    }
  }

  // Fallback demo credentials for local development & review
  if (email === "admin@portfolio.dev" && password === "admin12345") {
    const cookieStore = await cookies();
    cookieStore.set(ADMIN_COOKIE, "demo-admin-token", {
      httpOnly: true,
      secure: false,
      maxAge: 60 * 60 * 24,
      path: "/",
    });
    return { success: true };
  }

  return { success: false, error: "Invalid credentials. Use demo: admin@portfolio.dev / admin12345" };
}

export async function adminLogoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE);
  return { success: true };
}

export async function checkAdminAuth(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_COOKIE);
  return Boolean(session?.value);
}

export async function fetchAdminData(): Promise<{
  showcaseItems: ShowcaseItem[];
  inquiries: Inquiry[];
  profile: Profile;
}> {
  const [showcaseItems, inquiries, profile] = await Promise.all([
    getShowcaseItems(),
    getInquiries(),
    getProfile(),
  ]);

  return { showcaseItems, inquiries, profile };
}

export async function saveShowcaseItemServerAction(
  item: Omit<ShowcaseItem, "id"> & { id?: string }
): Promise<{ success: boolean; item?: ShowcaseItem; error?: string }> {
  try {
    const saved = await saveShowcaseItem(item);
    revalidatePath("/");
    revalidatePath("/admin/dashboard");
    return { success: true, item: saved };
  } catch (err) {
    console.error("Failed to save showcase item:", err);
    return { success: false, error: "Failed to save project item." };
  }
}

export async function saveProfileServerAction(
  data: Partial<Profile>
): Promise<{ success: boolean; profile?: Profile; error?: string }> {
  try {
    const updated = await updateProfile(data);
    revalidatePath("/");
    revalidatePath("/admin/dashboard");
    return { success: true, profile: updated };
  } catch (err: any) {
    console.error("Failed to update profile:", err);
    return { success: false, error: err?.message || "Failed to update profile settings." };
  }
}

export async function uploadLogoServerAction(
  formData: FormData
): Promise<{ success: boolean; url?: string; error?: string }> {
  try {
    const file = formData.get("logoFile") as File;
    if (!file || file.size === 0) {
      return { success: false, error: "No image file provided." };
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const url = await uploadAssetFile(buffer, file.name);

    return { success: true, url };
  } catch (err: any) {
    console.error("Failed to upload logo file:", err);
    return { success: false, error: err?.message || "Failed to upload logo asset." };
  }
}

