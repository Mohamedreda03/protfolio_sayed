"use server";

import { createInquiry } from "@/lib/appwrite/data";
import { Inquiry } from "@/lib/types";

export async function submitInquiryAction(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): Promise<{ success: boolean; inquiry?: Inquiry; error?: string }> {
  try {
    const inquiry = await createInquiry(data);
    return { success: true, inquiry };
  } catch (error) {
    console.error("submitInquiryAction error:", error);
    return { success: false, error: "Failed to submit inquiry. Please try again." };
  }
}
