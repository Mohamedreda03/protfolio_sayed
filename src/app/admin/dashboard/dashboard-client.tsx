"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ShowcaseItem, Inquiry, Profile, CertificationItem } from "@/lib/types";
import {
  adminLogoutAction,
  saveShowcaseItemServerAction,
  deleteShowcaseItemServerAction,
  saveProfileServerAction,
  uploadLogoServerAction,
  saveCertificationServerAction,
  deleteCertificationServerAction,
} from "@/app/actions/admin";
import {
  Cpu,
  Mail,
  Plus,
  LogOut,
  ExternalLink,
  CheckCircle2,
  X,
  Layers,
  User,
  Image as ImageIcon,
  Type,
  Upload,
  Trash2,
  Sparkles,
  Check,
  AlertCircle,
  Eye,
  FileText,
  Award,
  ShieldCheck,
  Edit3,
  BookmarkCheck,
  Compass,
} from "lucide-react";
import Link from "next/link";

interface AdminDashboardClientProps {
  initialItems: ShowcaseItem[];
  initialInquiries: Inquiry[];
  initialProfile: Profile;
  initialCertifications: CertificationItem[];
  isAppwriteConfigured?: boolean;
}

export function AdminDashboardClient({
  initialItems,
  initialInquiries,
  initialProfile,
  initialCertifications = [],
  isAppwriteConfigured = false,
}: AdminDashboardClientProps) {
  const router = useRouter();
  const [items, setItems] = useState<ShowcaseItem[]>(initialItems);
  const [inquiries, setInquiries] = useState<Inquiry[]>(initialInquiries);
  const [certifications, setCertifications] = useState<CertificationItem[]>(initialCertifications);
  const [activeTab, setActiveTab] = useState<"profile" | "certifications" | "items" | "inquiries">("profile");

  // Profile & Hero State
  const [profile, setProfile] = useState<Profile>(initialProfile);
  const [ownerName, setOwnerName] = useState(initialProfile.name || "Mohamed Reda");
  const [ownerTitle, setOwnerTitle] = useState(
    initialProfile.title || "Lead Big Data & Distributed Systems Engineer"
  );
  const [ownerSummary, setOwnerSummary] = useState(initialProfile.summary || "");

  // Hero Section Customization State
  const [heroBadge, setHeroBadge] = useState(
    initialProfile.heroBadge || "OPEN FOR STAFF / PRINCIPAL DATA ROLES"
  );
  const [heroHeadline, setHeroHeadline] = useState(
    initialProfile.heroHeadline || "Architecting Distributed Systems."
  );
  const [heroHighlight, setHeroHighlight] = useState(
    initialProfile.heroHighlight || "Scaling Real-Time Data Pipelines."
  );
  const [heroDescription, setHeroDescription] = useState(
    initialProfile.heroDescription ||
      initialProfile.summary ||
      "Specializing in high-throughput event streaming topologies, Medallion cloud lakehouses, and distributed compute engines operating under strict sub-second SLAs and zero-loss guarantees."
  );

  // Logo & Links
  const [logoMode, setLogoMode] = useState<"text" | "image">(
    initialProfile.logoUrl ? "image" : "text"
  );
  const [logoText, setLogoText] = useState(initialProfile.logoText || "MR");
  const [logoUrl, setLogoUrl] = useState(initialProfile.logoUrl || "");
  const [resumeUrl, setResumeUrl] = useState(initialProfile.resumeUrl || "");
  const [githubUrl, setGithubUrl] = useState(initialProfile.socials?.github || "");
  const [linkedinUrl, setLinkedinUrl] = useState(initialProfile.socials?.linkedin || "");
  const [email, setEmail] = useState(initialProfile.socials?.email || "");

  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isUploadingLogo, setIsUploadingLogo] = useState(false);
  const [profileSaveSuccess, setProfileSaveSuccess] = useState(false);
  const [profileError, setProfileError] = useState("");

  // Project Modal & Form State
  const [showModal, setShowModal] = useState(false);
  const [formTitle, setFormTitle] = useState("");
  const [formCategory, setFormCategory] = useState("Stream Processing");
  const [formSummary, setFormSummary] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formClient, setFormClient] = useState("");
  const [formYear, setFormYear] = useState(new Date().getFullYear().toString());
  const [formThumbnailUrl, setFormThumbnailUrl] = useState("");
  const [formTags, setFormTags] = useState("");
  const [formMetrics, setFormMetrics] = useState("");
  const [formGithubUrl, setFormGithubUrl] = useState("");
  const [formLiveUrl, setFormLiveUrl] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Certification Modal & Form State
  const [showCertModal, setShowCertModal] = useState(false);
  const [editingCertId, setEditingCertId] = useState<string | null>(null);
  const [certTitle, setCertTitle] = useState("");
  const [certIssuer, setCertIssuer] = useState("");
  const [certIssueDate, setCertIssueDate] = useState("2024");
  const [certCredentialId, setCertCredentialId] = useState("");
  const [certCredentialUrl, setCertCredentialUrl] = useState("");
  const [certBadgeType, setCertBadgeType] = useState<CertificationItem["badgeType"]>("aws");
  const [certSkills, setCertSkills] = useState("");
  const [isSavingCert, setIsSavingCert] = useState(false);
  const [certSaveSuccess, setCertSaveSuccess] = useState(false);
  const [certError, setCertError] = useState("");

  const handleLogout = async () => {
    await adminLogoutAction();
    router.push("/admin/login");
    router.refresh();
  };

  const handleAutoGenerateMonogram = () => {
    if (!ownerName.trim()) return;
    const words = ownerName.trim().split(/\s+/);
    const initials = words.map((w) => w[0]).join("").toUpperCase().slice(0, 4);
    setLogoText(initials || "MR");
    setLogoMode("text");
  };

  const handleLogoFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingLogo(true);
    setProfileError("");

    try {
      const formData = new FormData();
      formData.append("logoFile", file);

      const res = await uploadLogoServerAction(formData);
      if (res.success && res.url) {
        setLogoUrl(res.url);
        setLogoMode("image");
      } else {
        setProfileError(res.error || "Failed to upload logo image to Appwrite storage.");
      }
    } catch (err: any) {
      setProfileError(err?.message || "Failed to upload logo image.");
    } finally {
      setIsUploadingLogo(false);
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingProfile(true);
    setProfileError("");
    setProfileSaveSuccess(false);

    try {
      const payload: Partial<Profile> = {
        $id: profile.$id,
        name: ownerName.trim(),
        title: ownerTitle.trim(),
        summary: ownerSummary.trim(),
        heroBadge: heroBadge.trim(),
        heroHeadline: heroHeadline.trim(),
        heroHighlight: heroHighlight.trim(),
        heroDescription: heroDescription.trim(),
        logoText: logoMode === "text" ? logoText.trim() : "",
        logoUrl: logoMode === "image" ? logoUrl.trim() : "",
        resumeUrl: resumeUrl.trim(),
        socials: {
          email: email.trim(),
          linkedin: linkedinUrl.trim(),
          github: githubUrl.trim(),
        },
      };

      const res = await saveProfileServerAction(payload);
      if (res.success && res.profile) {
        setProfile(res.profile);
        setProfileSaveSuccess(true);
        setTimeout(() => setProfileSaveSuccess(false), 5000);
      } else {
        setProfileError(res.error || "Failed to update profile settings.");
      }
    } catch (err: any) {
      setProfileError(err?.message || "An unexpected error occurred while saving profile.");
    } finally {
      setIsSavingProfile(false);
    }
  };

  // Projects Handlers
  const handleSaveItem = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const parsedTags = formTags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const parsedMetrics = formMetrics
      .split(",")
      .map((m) => {
        const [label, value] = m.split(":");
        return label && value ? { label: label.trim(), value: value.trim() } : null;
      })
      .filter(Boolean) as { label: string; value: string }[];

    const newItemPayload = {
      title: formTitle,
      slug: formTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      category: formCategory,
      summary: formSummary,
      description: formDescription,
      clientOrCompany: formClient,
      year: formYear,
      featured: true,
      tags: parsedTags.length > 0 ? parsedTags : [formCategory],
      thumbnailUrl: formThumbnailUrl,
      githubUrl: formGithubUrl,
      liveUrl: formLiveUrl,
      impactMetrics: parsedMetrics,
    };

    const res = await saveShowcaseItemServerAction(newItemPayload);

    if (res.success && res.item) {
      setItems([res.item, ...items]);
      setSaveSuccess(true);
      setTimeout(() => {
        setSaveSuccess(false);
        setShowModal(false);
        setFormTitle("");
        setFormSummary("");
        setFormDescription("");
        setFormThumbnailUrl("");
        setFormTags("");
        setFormMetrics("");
        setFormGithubUrl("");
        setFormLiveUrl("");
      }, 1000);
    }
    setIsSaving(false);
  };

  const handleDeleteItem = async (idOrDocId: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    const res = await deleteShowcaseItemServerAction(idOrDocId);
    if (res.success) {
      setItems(items.filter((it) => it.id !== idOrDocId && it.$id !== idOrDocId));
    } else {
      alert(res.error || "Failed to delete project.");
    }
  };

  // Certifications Handlers
  const openNewCertModal = () => {
    setEditingCertId(null);
    setCertTitle("");
    setCertIssuer("");
    setCertIssueDate(new Date().getFullYear().toString());
    setCertCredentialId("");
    setCertCredentialUrl("");
    setCertBadgeType("aws");
    setCertSkills("");
    setCertError("");
    setCertSaveSuccess(false);
    setShowCertModal(true);
  };

  const openEditCertModal = (cert: CertificationItem) => {
    setEditingCertId(cert.$id || cert.id);
    setCertTitle(cert.title);
    setCertIssuer(cert.issuer);
    setCertIssueDate(cert.issueDate);
    setCertCredentialId(cert.credentialId || "");
    setCertCredentialUrl(cert.credentialUrl || "");
    setCertBadgeType(cert.badgeType);
    setCertSkills(cert.skillsCovered.join(", "));
    setCertError("");
    setCertSaveSuccess(false);
    setShowCertModal(true);
  };

  const handleSaveCertification = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingCert(true);
    setCertError("");

    const parsedSkills = certSkills
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const payload: Omit<CertificationItem, "id"> & { id?: string; $id?: string } = {
      id: editingCertId || `cert-${Date.now()}`,
      $id: editingCertId || undefined,
      title: certTitle.trim(),
      issuer: certIssuer.trim(),
      issueDate: certIssueDate.trim(),
      credentialId: certCredentialId.trim(),
      credentialUrl: certCredentialUrl.trim(),
      badgeType: certBadgeType,
      skillsCovered: parsedSkills,
    };

    const res = await saveCertificationServerAction(payload);
    if (res.success && res.item) {
      if (editingCertId) {
        setCertifications(
          certifications.map((c) =>
            c.id === editingCertId || c.$id === editingCertId ? res.item! : c
          )
        );
      } else {
        setCertifications([...certifications, res.item]);
      }
      setCertSaveSuccess(true);
      setTimeout(() => {
        setShowCertModal(false);
        setCertSaveSuccess(false);
      }, 800);
    } else {
      setCertError(res.error || "Failed to save certification.");
    }
    setIsSavingCert(false);
  };

  const handleDeleteCertification = async (idOrDocId: string) => {
    if (!confirm("Are you sure you want to delete this certification?")) return;
    const res = await deleteCertificationServerAction(idOrDocId);
    if (res.success) {
      setCertifications(certifications.filter((c) => c.id !== idOrDocId && c.$id !== idOrDocId));
    } else {
      alert(res.error || "Failed to delete certification.");
    }
  };

  const getBadgeBadgeStyle = (badgeType: CertificationItem["badgeType"]) => {
    switch (badgeType) {
      case "aws":
        return { bg: "bg-[#FF9900]/10", border: "border-[#FF9900]/30", text: "text-[#D9730D]", label: "AWS" };
      case "databricks":
        return { bg: "bg-[#FF3621]/10", border: "border-[#FF3621]/30", text: "text-[#D9381E]", label: "Databricks" };
      case "confluent":
        return { bg: "bg-[#00A4E4]/10", border: "border-[#00A4E4]/30", text: "text-[#0B6E99]", label: "Confluent" };
      case "kubernetes":
        return { bg: "bg-[#326CE5]/10", border: "border-[#326CE5]/30", text: "text-[#326CE5]", label: "Kubernetes" };
      default:
        return { bg: "bg-[#0F7B6C]/10", border: "border-[#0F7B6C]/30", text: "text-[#0F7B6C]", label: "Verified" };
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans pb-20">
      {/* Top Header */}
      <header className="border-b border-slate-200 bg-white sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#0066FF] font-bold text-xs shadow-xs">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <span className="text-sm font-bold text-slate-900 block leading-none">
                Data Platform Console
              </span>
              <span className="text-[11px] text-slate-500 font-medium">
                Appwrite Management Portal
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 text-slate-600 hover:text-[#0066FF] transition-colors"
            >
              <span>Live Portfolio</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 text-red-600 hover:text-red-700 transition-colors cursor-pointer font-semibold"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-8">
        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-white border-2 border-slate-200/90 shadow-sm space-y-1">
            <span className="text-xs font-bold text-slate-500 font-mono uppercase tracking-wider">
              Portfolio Owner
            </span>
            <div className="text-xl font-extrabold text-slate-900 font-heading truncate">
              {ownerName || "Not Set"}
            </div>
            <div className="text-[11px] text-[#0066FF] font-mono truncate">
              {logoMode === "image" && logoUrl ? "Image Logo Active" : `Monogram: "${logoText}"`}
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border-2 border-slate-200/90 shadow-sm space-y-1">
            <span className="text-xs font-bold text-slate-500 font-mono uppercase tracking-wider">
              Certifications
            </span>
            <div className="text-3xl font-extrabold text-[#0F7B6C] font-mono">
              {certifications.length}
            </div>
            <div className="text-[11px] text-slate-400 font-mono">Verified Credentials</div>
          </div>

          <div className="p-6 rounded-2xl bg-white border-2 border-slate-200/90 shadow-sm space-y-1">
            <span className="text-xs font-bold text-slate-500 font-mono uppercase tracking-wider">
              Data Architectures
            </span>
            <div className="text-3xl font-extrabold text-slate-900 font-mono">
              {items.length}
            </div>
            <div className="text-[11px] text-slate-400 font-mono">Active Showcase Items</div>
          </div>

          <div className="p-6 rounded-2xl bg-white border-2 border-slate-200/90 shadow-sm space-y-1">
            <span className="text-xs font-bold text-slate-500 font-mono uppercase tracking-wider">
              Received Inquiries
            </span>
            <div className="text-3xl font-extrabold text-[#D9730D] font-mono">
              {inquiries.length}
            </div>
            <div className="text-[11px] text-slate-400 font-mono">Direct Messages</div>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap items-center justify-between border-b border-slate-200 pb-4 gap-4">
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium">
            <button
              onClick={() => setActiveTab("profile")}
              className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer font-mono font-bold flex items-center gap-2 ${
                activeTab === "profile"
                  ? "bg-slate-900 text-[#FAAC18] shadow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <User className="w-4 h-4" />
              <span>Hero & Identity (الـ Hero والملف)</span>
            </button>

            <button
              onClick={() => setActiveTab("certifications")}
              className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer font-mono font-bold flex items-center gap-2 ${
                activeTab === "certifications"
                  ? "bg-slate-900 text-[#FAAC18] shadow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <Award className="w-4 h-4" />
              <span>Certifications ({certifications.length}) (الشهادات)</span>
            </button>

            <button
              onClick={() => setActiveTab("items")}
              className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer font-mono font-bold flex items-center gap-2 ${
                activeTab === "items"
                  ? "bg-slate-900 text-[#FAAC18] shadow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Architectures ({items.length}) (المشاريع)</span>
            </button>

            <button
              onClick={() => setActiveTab("inquiries")}
              className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer font-mono font-bold flex items-center gap-2 ${
                activeTab === "inquiries"
                  ? "bg-slate-900 text-[#FAAC18] shadow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <Mail className="w-4 h-4" />
              <span>Inquiries ({inquiries.length}) (الرسائل)</span>
            </button>
          </div>

          {activeTab === "items" && (
            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-[#0066FF] hover:bg-[#0052CC] text-white transition-all shadow-md shadow-[#0066FF]/20 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Architecture Project</span>
            </button>
          )}

          {activeTab === "certifications" && (
            <button
              onClick={openNewCertModal}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-[#0F7B6C] hover:bg-[#0c6256] text-white transition-all shadow-md shadow-[#0F7B6C]/20 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Certification (إضافة شهادة)</span>
            </button>
          )}
        </div>

        {/* Tab 1: Profile & Hero Content */}
        {activeTab === "profile" && (
          <div className="space-y-8">
            {/* Live Hero & Header Preview */}
            <div className="p-6 rounded-2xl bg-white border-2 border-slate-200/90 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-700 font-mono uppercase tracking-wider">
                  <Eye className="w-4 h-4 text-[#D9730D]" />
                  <span>Live Hero & Header Preview (معاينة حية فورية للـ Hero كما يراه الزوار)</span>
                </div>
                <span className="text-[11px] font-mono text-slate-400">Updates in real-time</span>
              </div>

              {/* Mockup Preview Area */}
              <div className="rounded-xl border border-slate-200 bg-[#FBFBFA] p-6 shadow-inner space-y-6">
                {/* Header Mockup */}
                <div className="flex items-center justify-between border-b border-slate-200/70 pb-3">
                  <div className="flex items-center gap-2.5">
                    {logoMode === "image" && logoUrl ? (
                      <img
                        src={logoUrl}
                        alt="Logo"
                        className="h-7 max-h-7 max-w-[120px] object-contain"
                      />
                    ) : (
                      <span className="font-heading font-extrabold text-xl tracking-tighter text-[#37352F]">
                        {logoText || "MR"}
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D9730D] inline-block ml-0.5" />
                      </span>
                    )}
                    <span className="text-xs font-bold text-[#37352F] border-l border-slate-300 pl-2">
                      {ownerName || "Mohamed Reda"}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-slate-400">Navigation Bar</span>
                </div>

                {/* Hero Mockup */}
                <div className="text-center max-w-2xl mx-auto space-y-4 py-4">
                  {heroBadge && (
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAAC18]/10 border border-[#D9730D]/20 text-[#D9730D] text-[11px] font-mono font-bold">
                      <span className="w-2 h-2 rounded-full bg-[#D9730D] animate-pulse" />
                      <span>{heroBadge}</span>
                    </div>
                  )}

                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#37352F] leading-tight font-heading">
                    {heroHeadline || "Architecting Distributed Systems."}
                    {heroHighlight && (
                      <span className="block text-[#D9730D]">{heroHighlight}</span>
                    )}
                  </h2>

                  <p className="text-xs sm:text-sm text-[#787774] leading-relaxed max-w-xl mx-auto">
                    The engineering portfolio of{" "}
                    <span className="text-[#37352F] font-bold">{ownerName || "Mohamed Reda"}</span>.{" "}
                    {heroDescription || ownerSummary}
                  </p>
                </div>
              </div>
            </div>

            {/* Profile & Hero Form */}
            <form onSubmit={handleSaveProfile} className="space-y-6">
              {/* Section A: Hero Messaging */}
              <div className="p-6 rounded-2xl bg-white border-2 border-slate-200/90 shadow-sm space-y-5">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                  <Compass className="w-4 h-4 text-[#D9730D]" />
                  <h3 className="font-bold text-sm text-slate-900 font-heading">
                    1. Hero Section Messaging (نصوص وتفاصيل واجهة البداية والـ Hero)
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-slate-800 mb-1.5">
                      Status Badge Text (شارة الحالة العلوية)
                    </label>
                    <input
                      type="text"
                      value={heroBadge}
                      onChange={(e) => setHeroBadge(e.target.value)}
                      placeholder="e.g. OPEN FOR STAFF / PRINCIPAL DATA ROLES"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-[#D9730D] focus:ring-2 focus:ring-[#D9730D]/10 text-xs font-mono font-medium"
                    />
                    <p className="text-[11px] text-slate-500 mt-1">
                      النص الصغير الذي يظهر أعلى العنوان مع نقطة نبض باللون البرتقالي.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1.5">
                      Main Headline Line 1 (العنوان الرئيسي للـ Hero) *
                    </label>
                    <input
                      type="text"
                      required
                      value={heroHeadline}
                      onChange={(e) => setHeroHeadline(e.target.value)}
                      placeholder="e.g. Architecting Distributed Systems."
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF]/10 text-xs font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1.5">
                      Headline Highlight Accent (النص الملون البارز في العنوان)
                    </label>
                    <input
                      type="text"
                      value={heroHighlight}
                      onChange={(e) => setHeroHighlight(e.target.value)}
                      placeholder="e.g. Scaling Real-Time Data Pipelines."
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[#D9730D] font-bold focus:bg-white focus:outline-none focus:border-[#D9730D] focus:ring-2 focus:ring-[#D9730D]/10 text-xs"
                    />
                    <p className="text-[11px] text-slate-500 mt-1">
                      يظهر في السطر الثاني من العنوان باللون البرتقالي اللامع.
                    </p>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-slate-800 mb-1.5">
                      Hero Paragraph / Narrative (الفقرة الوصفية في الـ Hero)
                    </label>
                    <textarea
                      rows={3}
                      value={heroDescription}
                      onChange={(e) => setHeroDescription(e.target.value)}
                      placeholder="Specializing in high-throughput event streaming topologies..."
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF]/10 text-xs leading-relaxed"
                    />
                    <p className="text-[11px] text-slate-500 mt-1">
                      يتم دمج اسمك تلقائياً في بداية هذه الفقرة بالخط العريض.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section B: Identity & Brand */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Column 1: Owner Identity */}
                <div className="p-6 rounded-2xl bg-white border-2 border-slate-200/90 shadow-sm space-y-5">
                  <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                    <User className="w-4 h-4 text-[#0066FF]" />
                    <h3 className="font-bold text-sm text-slate-900 font-heading">
                      2. Personal Details (البيانات الشخصية والمهنية)
                    </h3>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1.5">
                      Owner Full Name (اسم صاحب البورتفوليو) *
                    </label>
                    <input
                      type="text"
                      required
                      value={ownerName}
                      onChange={(e) => setOwnerName(e.target.value)}
                      placeholder="e.g. Mohamed Reda"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF]/10 text-xs font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1.5">
                      Professional Title (المسمى الوظيفي) *
                    </label>
                    <input
                      type="text"
                      required
                      value={ownerTitle}
                      onChange={(e) => setOwnerTitle(e.target.value)}
                      placeholder="e.g. Lead Big Data & Distributed Systems Engineer"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF]/10 text-xs font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1.5">
                      Executive Summary (النبذة العامة للـ Meta SEO)
                    </label>
                    <textarea
                      rows={2}
                      value={ownerSummary}
                      onChange={(e) => setOwnerSummary(e.target.value)}
                      placeholder="Architecting petabyte-scale real-time ingestion pipelines..."
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF]/10 text-xs leading-relaxed"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1.5">
                      CV / Resume URL (رابط السيرة الذاتية)
                    </label>
                    <div className="relative">
                      <FileText className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        type="text"
                        value={resumeUrl}
                        onChange={(e) => setResumeUrl(e.target.value)}
                        placeholder="/resume.pdf or https://drive.google.com/..."
                        className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF]/10 text-xs font-mono"
                      />
                    </div>
                  </div>
                </div>

                {/* Column 2: Logo & Visual Brand */}
                <div className="p-6 rounded-2xl bg-white border-2 border-slate-200/90 shadow-sm space-y-5">
                  <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                    <Sparkles className="w-4 h-4 text-[#D9730D]" />
                    <h3 className="font-bold text-sm text-slate-900 font-heading">
                      3. Logo & Brand (الشعار واللوجو وقنوات التواصل)
                    </h3>
                  </div>

                  {/* Mode Selector */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-2">
                      Logo Format Type (نوع الشعار)
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setLogoMode("text")}
                        className={`p-3 rounded-xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                          logoMode === "text"
                            ? "border-[#0066FF] bg-blue-50/50 text-[#0066FF] font-bold shadow-xs"
                            : "border-slate-200 hover:border-slate-300 text-slate-700 bg-white"
                        }`}
                      >
                        <Type className="w-5 h-5" />
                        <div>
                          <span className="block text-xs">Text Monogram</span>
                          <span className="text-[10px] text-slate-500 font-normal">
                            نص اللوجو أو الحروف الأولى
                          </span>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setLogoMode("image")}
                        className={`p-3 rounded-xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                          logoMode === "image"
                            ? "border-[#0066FF] bg-blue-50/50 text-[#0066FF] font-bold shadow-xs"
                            : "border-slate-200 hover:border-slate-300 text-slate-700 bg-white"
                        }`}
                      >
                        <ImageIcon className="w-5 h-5" />
                        <div>
                          <span className="block text-xs">Image Logo</span>
                          <span className="text-[10px] text-slate-500 font-normal">
                            صورة لوجو (PNG / SVG)
                          </span>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Text Logo Options */}
                  {logoMode === "text" && (
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label className="text-xs font-bold text-slate-800">
                            Logo Text / Monogram Initials
                          </label>
                          <button
                            type="button"
                            onClick={handleAutoGenerateMonogram}
                            className="text-[11px] font-bold text-[#0066FF] hover:underline cursor-pointer flex items-center gap-1"
                          >
                            <Sparkles className="w-3 h-3" />
                            <span>توليد تلقائي من الاسم</span>
                          </button>
                        </div>
                        <input
                          type="text"
                          maxLength={8}
                          value={logoText}
                          onChange={(e) => setLogoText(e.target.value.toUpperCase())}
                          placeholder="e.g. MR or DATA"
                          className="w-full px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-900 focus:outline-none focus:border-[#0066FF] text-base font-extrabold tracking-widest font-heading"
                        />
                      </div>
                    </div>
                  )}

                  {/* Image Logo Options */}
                  {logoMode === "image" && (
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-800 mb-1.5">
                          Upload Logo to Appwrite Storage (رفع ملف اللوجو)
                        </label>
                        <label className="border-2 border-dashed border-slate-300 hover:border-[#0066FF] rounded-xl p-4 flex flex-col items-center justify-center gap-2 cursor-pointer bg-white transition-colors">
                          <Upload className="w-5 h-5 text-slate-400" />
                          <span className="text-xs font-bold text-slate-700">
                            {isUploadingLogo ? "جاري الرفع..." : "اختر ملف الشعار (PNG, SVG, JPG)"}
                          </span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleLogoFileUpload}
                            disabled={isUploadingLogo}
                            className="hidden"
                          />
                        </label>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-800 mb-1.5">
                          Or Enter Logo URL directly (أو رابط خارجي للصورة)
                        </label>
                        <input
                          type="url"
                          value={logoUrl}
                          onChange={(e) => setLogoUrl(e.target.value)}
                          placeholder="https://.../logo.svg"
                          className="w-full px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-900 focus:outline-none focus:border-[#0066FF] text-xs font-mono"
                        />
                      </div>

                      {logoUrl && (
                        <div className="flex items-center justify-between p-3 rounded-lg bg-white border border-slate-200">
                          <img src={logoUrl} alt="Logo" className="h-7 max-h-7 object-contain" />
                          <button
                            type="button"
                            onClick={() => {
                              setLogoUrl("");
                              setLogoMode("text");
                            }}
                            className="p-1 rounded text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Social Channels */}
                  <div className="pt-2 border-t border-slate-100 space-y-3">
                    <span className="block text-xs font-bold text-slate-800">
                      Social & Channels
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] text-slate-600 mb-1">Work Email</label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="contact@..."
                          className="w-full px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-slate-600 mb-1">LinkedIn URL</label>
                        <input
                          type="url"
                          value={linkedinUrl}
                          onChange={(e) => setLinkedinUrl(e.target.value)}
                          placeholder="https://linkedin.com/in/..."
                          className="w-full px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status and Action Buttons */}
              <div className="p-6 rounded-2xl bg-white border-2 border-slate-200/90 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  {profileSaveSuccess && (
                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-2 rounded-xl border border-emerald-200">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>تم حفظ نصوص الـ Hero والبيانات بنجاح في Appwrite Cloud!</span>
                    </div>
                  )}
                  {profileError && (
                    <div className="flex items-center gap-2 text-xs font-bold text-red-600 bg-red-50 px-3 py-2 rounded-xl border border-red-200">
                      <AlertCircle className="w-4 h-4" />
                      <span>{profileError}</span>
                    </div>
                  )}
                  {!profileSaveSuccess && !profileError && (
                    <span className="text-xs text-slate-500">
                      يتم تطبيق التعديلات فورياً على الموقع الحي عند الضغط على الحفظ.
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSavingProfile || isUploadingLogo}
                  className="w-full sm:w-auto px-8 py-3 rounded-xl font-bold bg-[#0066FF] hover:bg-[#0052CC] text-white transition-all shadow-md shadow-[#0066FF]/20 cursor-pointer text-xs flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSavingProfile ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>جاري الحفظ في Appwrite...</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      <span>حفظ التعديلات (Save All Changes)</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tab 2: Certifications Management */}
        {activeTab === "certifications" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-base text-slate-900 font-heading">
                  Verified Certifications & Cloud Badges ({certifications.length})
                </h3>
                <p className="text-xs text-slate-500">
                  إدارة الشهادات والاعتمادات السحابية وتعديلها أو حذفها أو إضافة شهادات جديدة.
                </p>
              </div>

              <button
                onClick={openNewCertModal}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-[#0F7B6C] hover:bg-[#0c6256] text-white transition-all shadow-md shadow-[#0F7B6C]/20 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>إضافة شهادة جديدة</span>
              </button>
            </div>

            {certifications.length === 0 ? (
              <div className="py-20 text-center text-slate-400 font-mono text-xs border-2 border-slate-200 rounded-2xl bg-white space-y-3">
                <Award className="w-8 h-8 mx-auto text-slate-300" />
                <p>لا توجد شهادات مسجلة حالياً. اضغط على الزر أعلاه لإضافة شهادة.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {certifications.map((cert) => {
                  const badgeStyle = getBadgeBadgeStyle(cert.badgeType);
                  return (
                    <div
                      key={cert.id || cert.$id}
                      className="p-6 rounded-2xl bg-white border-2 border-slate-200/90 shadow-sm flex flex-col justify-between space-y-4 hover:border-slate-300 transition-all relative overflow-hidden"
                    >
                      <div className="space-y-3">
                        {/* Header: Issuer & Badge Type */}
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-2.5">
                            <div
                              className={`w-9 h-9 rounded-xl ${badgeStyle.bg} ${badgeStyle.border} border flex items-center justify-center ${badgeStyle.text} font-bold text-xs`}
                            >
                              <Award className="w-5 h-5" />
                            </div>
                            <div>
                              <span className="text-xs font-bold text-slate-900 block">
                                {cert.issuer}
                              </span>
                              <span className="text-[11px] text-slate-400 font-mono">
                                Year: {cert.issueDate}
                              </span>
                            </div>
                          </div>

                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${badgeStyle.bg} ${badgeStyle.text} border ${badgeStyle.border}`}
                          >
                            {cert.badgeType}
                          </span>
                        </div>

                        {/* Title */}
                        <h4 className="text-base font-extrabold text-slate-900 leading-snug">
                          {cert.title}
                        </h4>

                        {/* Credential ID */}
                        {cert.credentialId && (
                          <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-slate-600 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200">
                            <span className="font-bold text-slate-800">ID:</span>
                            <span>{cert.credentialId}</span>
                          </div>
                        )}

                        {/* Skills */}
                        {cert.skillsCovered && cert.skillsCovered.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 pt-2">
                            {cert.skillsCovered.map((skill, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-0.5 rounded-md text-[11px] font-mono font-medium bg-slate-50 border border-slate-200 text-slate-700"
                              >
                                #{skill}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Actions Footer */}
                      <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                        {cert.credentialUrl ? (
                          <a
                            href={cert.credentialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-[#0066FF] hover:underline font-mono"
                          >
                            <span>Verify URL</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        ) : (
                          <span className="text-[11px] text-slate-400 font-mono">No link</span>
                        )}

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => openEditCertModal(cert)}
                            className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 cursor-pointer transition-colors"
                            title="Edit Certification"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteCertification(cert.$id || cert.id)}
                            className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 cursor-pointer transition-colors"
                            title="Delete Certification"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Architecture Projects */}
        {activeTab === "items" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="p-6 rounded-2xl bg-white border-2 border-slate-200/90 shadow-sm flex flex-col justify-between space-y-4 hover:border-[#0066FF] transition-colors overflow-hidden"
              >
                <div>
                  {item.thumbnailUrl && (
                    <div className="w-full h-32 rounded-xl overflow-hidden mb-3 border border-slate-100 bg-slate-50">
                      <img
                        src={item.thumbnailUrl}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="flex items-center justify-between text-xs mb-2 font-mono">
                    <span className="text-[#D9730D] font-bold">// {item.category}</span>
                    <span className="text-slate-400">{item.year}</span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-base leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                    {item.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-mono">
                  <span>{item.tags?.length || 0} Tech Tags</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleDeleteItem(item.$id || item.id)}
                      className="p-1 rounded text-red-600 hover:bg-red-50 cursor-pointer"
                      title="Delete Project"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <span className="text-[#0066FF] font-bold">Published</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 4: Inquiries Inbox */}
        {activeTab === "inquiries" && (
          <div className="space-y-4">
            {inquiries.length === 0 ? (
              <div className="py-20 text-center text-slate-400 font-mono text-xs border-2 border-slate-200 rounded-2xl bg-white">
                No messages received yet.
              </div>
            ) : (
              <div className="divide-y divide-slate-100 border-2 border-slate-200 rounded-2xl bg-white overflow-hidden shadow-sm">
                {inquiries.map((inq) => (
                  <div key={inq.id} className="p-6 space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-slate-900">{inq.name}</span>
                        <span className="text-[#0066FF] font-mono">&lt;{inq.email}&gt;</span>
                      </div>
                      <span className="text-xs text-slate-400 font-mono">
                        {new Date(inq.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900">{inq.subject}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{inq.message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Add Project Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white border-2 border-slate-200 rounded-2xl w-full max-w-lg p-6 space-y-5 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-base text-slate-900 font-heading">
                Add Big Data Architecture Project
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-slate-900 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {saveSuccess ? (
              <div className="py-12 text-center text-[#0066FF] space-y-2">
                <CheckCircle2 className="w-12 h-12 mx-auto text-[#0066FF]" />
                <p className="text-sm font-bold">Project Successfully Stored in Appwrite</p>
              </div>
            ) : (
              <form onSubmit={handleSaveItem} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-800 font-bold mb-1">Project Title *</label>
                  <input
                    type="text"
                    required
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="e.g. Real-Time Fraud Streaming Topology"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF]/10 text-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-800 font-bold mb-1">Category</label>
                    <input
                      type="text"
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value)}
                      placeholder="e.g. Stream Processing"
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF]/10 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-800 font-bold mb-1">Year</label>
                    <input
                      type="text"
                      value={formYear}
                      onChange={(e) => setFormYear(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF]/10 text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-800 font-bold mb-1">
                    Architecture Image URL (Thumbnail)
                  </label>
                  <input
                    type="url"
                    value={formThumbnailUrl}
                    onChange={(e) => setFormThumbnailUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/... or cloud image URL"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF]/10 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-slate-800 font-bold mb-1">Summary *</label>
                  <textarea
                    required
                    rows={2}
                    value={formSummary}
                    onChange={(e) => setFormSummary(e.target.value)}
                    placeholder="Short architectural summary..."
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF]/10 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-slate-800 font-bold mb-1">
                    Tech Stack Tags (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={formTags}
                    onChange={(e) => setFormTags(e.target.value)}
                    placeholder="Apache Spark, Kafka, Iceberg, Rust"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF]/10 text-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-800 font-bold mb-1">GitHub Repo URL</label>
                    <input
                      type="url"
                      value={formGithubUrl}
                      onChange={(e) => setFormGithubUrl(e.target.value)}
                      placeholder="https://github.com/..."
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF]/10 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-800 font-bold mb-1">Live Dashboard URL</label>
                    <input
                      type="url"
                      value={formLiveUrl}
                      onChange={(e) => setFormLiveUrl(e.target.value)}
                      placeholder="https://grafana..."
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF]/10 text-xs"
                    />
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 rounded-lg text-slate-600 hover:text-slate-900 cursor-pointer font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="px-5 py-2.5 rounded-xl font-bold bg-[#0066FF] hover:bg-[#0052CC] text-white transition-all shadow-md shadow-[#0066FF]/20 cursor-pointer"
                  >
                    {isSaving ? "Saving..." : "Save Project"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Add / Edit Certification Modal */}
      {showCertModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white border-2 border-slate-200 rounded-2xl w-full max-w-lg p-6 space-y-5 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-base text-slate-900 font-heading">
                {editingCertId ? "Edit Certification (تعديل الشهادة)" : "Add Professional Certification (إضافة شهادة جديدة)"}
              </h3>
              <button
                onClick={() => setShowCertModal(false)}
                className="text-slate-400 hover:text-slate-900 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {certSaveSuccess ? (
              <div className="py-12 text-center text-[#0F7B6C] space-y-2">
                <CheckCircle2 className="w-12 h-12 mx-auto text-[#0F7B6C]" />
                <p className="text-sm font-bold">Certification Successfully Stored in Appwrite</p>
              </div>
            ) : (
              <form onSubmit={handleSaveCertification} className="space-y-4 text-xs">
                {certError && (
                  <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-600 font-medium">
                    {certError}
                  </div>
                )}

                <div>
                  <label className="block text-slate-800 font-bold mb-1">
                    Certification Title (اسم الشهادة) *
                  </label>
                  <input
                    type="text"
                    required
                    value={certTitle}
                    onChange={(e) => setCertTitle(e.target.value)}
                    placeholder="e.g. AWS Certified Solutions Architect – Professional"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-[#0F7B6C] focus:ring-2 focus:ring-[#0F7B6C]/10 text-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-800 font-bold mb-1">
                      Issuer Organization (الجهة المانحة) *
                    </label>
                    <input
                      type="text"
                      required
                      value={certIssuer}
                      onChange={(e) => setCertIssuer(e.target.value)}
                      placeholder="e.g. Amazon Web Services (AWS)"
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-[#0F7B6C] focus:ring-2 focus:ring-[#0F7B6C]/10 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-800 font-bold mb-1">
                      Issue Date / Year (سنة الإصدار) *
                    </label>
                    <input
                      type="text"
                      required
                      value={certIssueDate}
                      onChange={(e) => setCertIssueDate(e.target.value)}
                      placeholder="e.g. 2024"
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-[#0F7B6C] focus:ring-2 focus:ring-[#0F7B6C]/10 text-xs font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-800 font-bold mb-1">
                      Badge Provider Style (ستايل الشعار)
                    </label>
                    <select
                      value={certBadgeType}
                      onChange={(e) => setCertBadgeType(e.target.value as any)}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-[#0F7B6C] text-xs font-medium"
                    >
                      <option value="aws">AWS (Orange)</option>
                      <option value="databricks">Databricks (Red)</option>
                      <option value="confluent">Confluent Kafka (Cyan)</option>
                      <option value="kubernetes">Kubernetes / CNCF (Blue)</option>
                      <option value="other">Other / General (Teal)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-800 font-bold mb-1">
                      Credential ID (معرّف الشهادة)
                    </label>
                    <input
                      type="text"
                      value={certCredentialId}
                      onChange={(e) => setCertCredentialId(e.target.value)}
                      placeholder="e.g. AWS-SAP-984210"
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-[#0F7B6C] focus:ring-2 focus:ring-[#0F7B6C]/10 text-xs font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-800 font-bold mb-1">
                    Digital Verification URL (رابط التحقق الرسمي)
                  </label>
                  <input
                    type="url"
                    value={certCredentialUrl}
                    onChange={(e) => setCertCredentialUrl(e.target.value)}
                    placeholder="https://aws.amazon.com/verification or https://credly.com/..."
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-[#0F7B6C] focus:ring-2 focus:ring-[#0F7B6C]/10 text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-800 font-bold mb-1">
                    Tested Skills & Competencies (المهارات التي تغطيها الشهادة - مفصولة بفواصل)
                  </label>
                  <input
                    type="text"
                    value={certSkills}
                    onChange={(e) => setCertSkills(e.target.value)}
                    placeholder="Apache Spark, Delta Lake, Unity Catalog, Medallion Architecture"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-[#0F7B6C] focus:ring-2 focus:ring-[#0F7B6C]/10 text-xs"
                  />
                  <p className="text-[10px] text-slate-500 mt-1">
                    اكتب المهارات مفصولة بفاصلة (,) وستتحول إلى وسوم (#tag) أنيقة على كارت الشهادة.
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowCertModal(false)}
                    className="px-4 py-2 rounded-lg text-slate-600 hover:text-slate-900 cursor-pointer font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSavingCert}
                    className="px-5 py-2.5 rounded-xl font-bold bg-[#0F7B6C] hover:bg-[#0c6256] text-white transition-all shadow-md shadow-[#0F7B6C]/20 cursor-pointer flex items-center gap-1.5"
                  >
                    {isSavingCert ? "Saving..." : editingCertId ? "Update Certification" : "Save Certification"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
