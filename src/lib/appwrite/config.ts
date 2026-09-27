export const APPWRITE_CONFIG = {
  endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "https://cloud.appwrite.io/v1",
  projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || "",
  databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "portfolio_db",
  apiKey: process.env.APPWRITE_API_KEY || "",
  collections: {
    profiles: process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_PROFILES || "profiles",
    showcaseItems: process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_SHOWCASE || "showcase_items",
    skills: process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_SKILLS || "skills",
    inquiries: process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_INQUIRIES || "inquiries",
    certifications: process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_CERTIFICATIONS || "certifications",
  },
  bucketId: process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ASSETS || "portfolio_assets",
  isConfigured: Boolean(
    process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID &&
    process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID !== "placeholder"
  ),
};
