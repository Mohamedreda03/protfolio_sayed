import { APPWRITE_CONFIG } from "./config";
import { getBrowserAppwriteClient } from "./client";
import { createAdminClient } from "./server";
import { SEED_PROFILE, SEED_SHOWCASE_ITEMS, SEED_SKILLS, SEED_CERTIFICATIONS } from "../seed-data";
import { Profile, ShowcaseItem, SkillItem, Inquiry, CertificationItem } from "../types";
import { ID, Query } from "appwrite";

// In-memory runtime cache for seamless local testing and admin edits before Appwrite is hooked
let memoryShowcaseItems: ShowcaseItem[] = [...SEED_SHOWCASE_ITEMS];
let memorySkills: SkillItem[] = [...SEED_SKILLS];
let memoryCertifications: CertificationItem[] = [...SEED_CERTIFICATIONS];
let memoryInquiries: Inquiry[] = [];
let memoryProfile: Profile = { ...SEED_PROFILE };

export async function getCertifications(): Promise<CertificationItem[]> {
  if (!APPWRITE_CONFIG.isConfigured) {
    return memoryCertifications;
  }

  try {
    const { databases } = await createAdminClient();
    const result = await databases.listDocuments(
      APPWRITE_CONFIG.databaseId,
      APPWRITE_CONFIG.collections.certifications,
      [Query.orderAsc("$createdAt"), Query.limit(20)]
    );

    if (result.documents.length > 0) {
      return result.documents.map((doc) => ({
        $id: doc.$id,
        id: doc.$id,
        title: doc.title,
        issuer: doc.issuer,
        issueDate: doc.issueDate,
        credentialId: doc.credentialId,
        credentialUrl: doc.credentialUrl,
        badgeType: (doc.badgeType as any) || "aws",
        skillsCovered: Array.isArray(doc.skillsCovered) ? doc.skillsCovered : [],
      }));
    }
  } catch (error) {
    console.warn("Appwrite getCertifications fallback to memory/seed:", error);
  }

  return memoryCertifications;
}

export async function getProfile(): Promise<Profile> {
  if (!APPWRITE_CONFIG.isConfigured) {
    return memoryProfile;
  }

  try {
    const { databases } = await createAdminClient();
    const result = await databases.listDocuments(
      APPWRITE_CONFIG.databaseId,
      APPWRITE_CONFIG.collections.profiles,
      [Query.limit(1)]
    );

    if (result.documents.length > 0) {
      const doc = result.documents[0];
      return {
        $id: doc.$id,
        name: doc.name || memoryProfile.name,
        title: doc.title || memoryProfile.title,
        summary: doc.summary || memoryProfile.summary,
        avatarUrl: doc.avatarUrl || memoryProfile.avatarUrl,
        logoUrl: doc.logoUrl ?? memoryProfile.logoUrl,
        logoText: doc.logoText ?? memoryProfile.logoText,
        resumeUrl: doc.resumeUrl || memoryProfile.resumeUrl,
        socials: {
          github: doc.githubUrl || memoryProfile.socials.github,
          linkedin: doc.linkedinUrl || memoryProfile.socials.linkedin,
          email: doc.email || memoryProfile.socials.email,
        },
      };
    }
  } catch (error) {
    console.warn("Appwrite getProfile fallback to memory/seed:", error);
  }

  return memoryProfile;
}

export async function updateProfile(data: Partial<Profile>): Promise<Profile> {
  // Update in-memory fallback
  memoryProfile = {
    ...memoryProfile,
    ...data,
    socials: {
      ...memoryProfile.socials,
      ...(data.socials || {}),
    },
  };

  if (!APPWRITE_CONFIG.isConfigured) {
    return memoryProfile;
  }

  try {
    const { databases } = await createAdminClient();
    let docId = data.$id;

    if (!docId) {
      const existing = await databases.listDocuments(
        APPWRITE_CONFIG.databaseId,
        APPWRITE_CONFIG.collections.profiles,
        [Query.limit(1)]
      );
      if (existing.documents.length > 0) {
        docId = existing.documents[0].$id;
      }
    }

    const payload: Record<string, any> = {};
    if (data.name !== undefined) payload.name = data.name;
    if (data.title !== undefined) payload.title = data.title;
    if (data.summary !== undefined) payload.summary = data.summary;
    if (data.avatarUrl !== undefined) payload.avatarUrl = data.avatarUrl;
    if (data.logoUrl !== undefined) payload.logoUrl = data.logoUrl;
    if (data.logoText !== undefined) payload.logoText = data.logoText;
    if (data.resumeUrl !== undefined) payload.resumeUrl = data.resumeUrl;
    if (data.socials?.github !== undefined) payload.githubUrl = data.socials.github;
    if (data.socials?.linkedin !== undefined) payload.linkedinUrl = data.socials.linkedin;
    if (data.socials?.email !== undefined) payload.email = data.socials.email;

    if (docId) {
      const updated = await databases.updateDocument(
        APPWRITE_CONFIG.databaseId,
        APPWRITE_CONFIG.collections.profiles,
        docId,
        payload
      );
      return {
        $id: updated.$id,
        name: updated.name,
        title: updated.title,
        summary: updated.summary,
        avatarUrl: updated.avatarUrl,
        logoUrl: updated.logoUrl,
        logoText: updated.logoText,
        resumeUrl: updated.resumeUrl,
        socials: {
          github: updated.githubUrl,
          linkedin: updated.linkedinUrl,
          email: updated.email,
        },
      };
    } else {
      const created = await databases.createDocument(
        APPWRITE_CONFIG.databaseId,
        APPWRITE_CONFIG.collections.profiles,
        ID.unique(),
        {
          name: data.name || memoryProfile.name,
          title: data.title || memoryProfile.title,
          summary: data.summary || memoryProfile.summary,
          avatarUrl: data.avatarUrl || "",
          logoUrl: data.logoUrl || "",
          logoText: data.logoText || "",
          resumeUrl: data.resumeUrl || "",
          githubUrl: data.socials?.github || "",
          linkedinUrl: data.socials?.linkedin || "",
          email: data.socials?.email || "",
        }
      );
      return {
        $id: created.$id,
        name: created.name,
        title: created.title,
        summary: created.summary,
        avatarUrl: created.avatarUrl,
        logoUrl: created.logoUrl,
        logoText: created.logoText,
        resumeUrl: created.resumeUrl,
        socials: {
          github: created.githubUrl,
          linkedin: created.linkedinUrl,
          email: created.email,
        },
      };
    }
  } catch (error) {
    console.error("Appwrite updateProfile error:", error);
    return memoryProfile;
  }
}

export async function uploadAssetFile(fileBuffer: Buffer, fileName: string): Promise<string> {
  const { storage } = await createAdminClient();
  const { InputFile } = await import("node-appwrite/file");

  const fileId = ID.unique();
  const inputFile = InputFile.fromBuffer(fileBuffer, fileName);

  await storage.createFile(
    APPWRITE_CONFIG.bucketId,
    fileId,
    inputFile
  );

  return `${APPWRITE_CONFIG.endpoint}/storage/buckets/${APPWRITE_CONFIG.bucketId}/files/${fileId}/view?project=${APPWRITE_CONFIG.projectId}`;
}

export async function getShowcaseItems(): Promise<ShowcaseItem[]> {
  if (!APPWRITE_CONFIG.isConfigured) {
    return memoryShowcaseItems;
  }

  try {
    const { databases } = await createAdminClient();
    const queries = [Query.orderDesc("$createdAt"), Query.limit(50)];

    const result = await databases.listDocuments(
      APPWRITE_CONFIG.databaseId,
      APPWRITE_CONFIG.collections.showcaseItems,
      queries
    );

    if (result.documents.length > 0) {
      return result.documents.map((doc) => ({
        $id: doc.$id,
        id: doc.$id,
        title: doc.title,
        slug: doc.slug,
        category: doc.category,
        summary: doc.summary,
        description: doc.description,
        clientOrCompany: doc.clientOrCompany,
        year: doc.year,
        featured: doc.featured ?? false,
        tags: Array.isArray(doc.tags) ? doc.tags : [],
        thumbnailUrl: doc.thumbnailUrl,
        impactMetrics: doc.impactMetrics ? JSON.parse(doc.impactMetrics) : [],
        pipelineNodes: doc.pipelineNodes ? JSON.parse(doc.pipelineNodes) : [],
        githubUrl: doc.githubUrl,
        liveUrl: doc.liveUrl,
      }));
    }
  } catch (error) {
    console.warn("Appwrite getShowcaseItems fallback to memory/seed:", error);
  }

  return memoryShowcaseItems;
}

export async function getSkills(): Promise<SkillItem[]> {
  if (!APPWRITE_CONFIG.isConfigured) {
    return memorySkills;
  }

  try {
    const { databases } = await createAdminClient();
    const queries = [Query.limit(100)];

    const result = await databases.listDocuments(
      APPWRITE_CONFIG.databaseId,
      APPWRITE_CONFIG.collections.skills,
      queries
    );

    if (result.documents.length > 0) {
      return result.documents.map((doc) => ({
        $id: doc.$id,
        id: doc.$id,
        name: doc.name,
        category: doc.category,
        proficiency: doc.proficiency,
        iconName: doc.iconName,
      }));
    }
  } catch (error) {
    console.warn("Appwrite getSkills fallback to memory/seed:", error);
  }

  return memorySkills;
}

export async function createInquiry(inquiry: Omit<Inquiry, "id" | "createdAt">): Promise<Inquiry> {
  const newInquiry: Inquiry = {
    ...inquiry,
    id: `inq-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };

  if (APPWRITE_CONFIG.isConfigured) {
    try {
      const { databases } = getBrowserAppwriteClient();
      const doc = await databases.createDocument(
        APPWRITE_CONFIG.databaseId,
        APPWRITE_CONFIG.collections.inquiries,
        ID.unique(),
        {
          name: inquiry.name,
          email: inquiry.email,
          subject: inquiry.subject,
          message: inquiry.message,
        }
      );
      return {
        ...newInquiry,
        $id: doc.$id,
        id: doc.$id,
      };
    } catch (error) {
      console.warn("Appwrite createInquiry fallback to local state:", error);
    }
  }

  memoryInquiries.unshift(newInquiry);
  return newInquiry;
}

export async function getInquiries(): Promise<Inquiry[]> {
  if (APPWRITE_CONFIG.isConfigured) {
    try {
      const { databases } = await createAdminClient();
      const result = await databases.listDocuments(
        APPWRITE_CONFIG.databaseId,
        APPWRITE_CONFIG.collections.inquiries,
        [Query.orderDesc("$createdAt"), Query.limit(100)]
      );
      if (result.documents.length > 0) {
        return result.documents.map((doc) => ({
          $id: doc.$id,
          id: doc.$id,
          name: doc.name,
          email: doc.email,
          subject: doc.subject,
          message: doc.message,
          createdAt: doc.$createdAt,
        }));
      }
    } catch (error) {
      console.warn("Appwrite getInquiries fallback to memory:", error);
    }
  }

  return memoryInquiries;
}

export async function saveShowcaseItem(item: Omit<ShowcaseItem, "id"> & { id?: string }): Promise<ShowcaseItem> {
  const generatedId = item.id || `item-${Date.now()}`;
  const fullItem: ShowcaseItem = {
    ...item,
    id: generatedId,
  };

  if (APPWRITE_CONFIG.isConfigured) {
    try {
      const { databases } = await createAdminClient();
      const payload = {
        title: item.title,
        slug: item.slug || item.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        category: item.category,
        summary: item.summary,
        description: item.description,
        clientOrCompany: item.clientOrCompany || "",
        year: item.year,
        featured: item.featured,
        tags: item.tags,
        thumbnailUrl: item.thumbnailUrl || "",
        impactMetrics: item.impactMetrics ? JSON.stringify(item.impactMetrics) : "[]",
        pipelineNodes: item.pipelineNodes ? JSON.stringify(item.pipelineNodes) : "[]",
        githubUrl: item.githubUrl || "",
        liveUrl: item.liveUrl || "",
      };

      if (item.$id) {
        const doc = await databases.updateDocument(
          APPWRITE_CONFIG.databaseId,
          APPWRITE_CONFIG.collections.showcaseItems,
          item.$id,
          payload
        );
        return { ...fullItem, $id: doc.$id };
      } else {
        const doc = await databases.createDocument(
          APPWRITE_CONFIG.databaseId,
          APPWRITE_CONFIG.collections.showcaseItems,
          ID.unique(),
          payload
        );
        return { ...fullItem, $id: doc.$id };
      }
    } catch (error) {
      console.warn("Appwrite saveShowcaseItem fallback to memory:", error);
    }
  }

  const existingIndex = memoryShowcaseItems.findIndex((x) => x.id === item.id);
  if (existingIndex >= 0) {
    memoryShowcaseItems[existingIndex] = fullItem;
  } else {
    memoryShowcaseItems.unshift(fullItem);
  }

  return fullItem;
}
