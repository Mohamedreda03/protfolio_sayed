"use client";

import React from "react";
import { Profile, ShowcaseItem, SkillItem, CertificationItem } from "@/lib/types";
import { Header } from "@/components/nav/header";
import { GatewayHero } from "@/components/home/gateway-hero";
import { DataSection } from "@/components/data/data-section";
import { SkillsMatrix } from "@/components/common/skills-matrix";
import { CertificationsSection } from "@/components/common/certifications-section";
import { ContactSection } from "@/components/common/contact-section";
import Link from "next/link";
import { TechGridBackground } from "@/components/common/decorative-svgs";

interface PortfolioShellProps {
  profile: Profile;
  showcaseItems: ShowcaseItem[];
  skills: SkillItem[];
  certifications: CertificationItem[];
}

export function PortfolioShell({ profile, showcaseItems, skills, certifications }: PortfolioShellProps) {
  return (
    <div className="min-h-screen bg-[#FBFBFA] text-[#37352F] font-sans relative selection:bg-[#FAEBDD] selection:text-[#D9730D]">
      <TechGridBackground />
      <Header profile={profile} resumeUrl={profile.resumeUrl} />

      <main>
        {/* Executive Hero */}
        <GatewayHero profile={profile} />

        {/* Data Engineering Architecture Case Studies */}
        <section id="showcase" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <DataSection items={showcaseItems} />
        </section>

        {/* Technical Stack & Competencies */}
        <SkillsMatrix skills={skills} />

        {/* Verified Professional Certifications & Credentials */}
        <CertificationsSection certifications={certifications} />

        {/* Direct Contact Transmission */}
        <ContactSection profile={profile} />
      </main>

      {/* Footer */}
      <footer className="border-t border-[rgba(55,53,47,0.1)] py-12 bg-white/70 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-[#787774] font-medium">
          <div className="flex items-center gap-2">
            <span className="text-[#37352F] font-semibold">{profile.name}</span>
            <span>•</span>
            <span>Lead Big Data & Distributed Systems Engineer</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 text-[#787774]">
              <span className="w-2 h-2 rounded-full bg-[#0F7B6C] animate-pulse" />
              Powered by Appwrite
            </span>
            <span>•</span>
            <Link
              href="/admin/login"
              className="text-[#787774] hover:text-[#D9730D] transition-colors underline underline-offset-4"
            >
              Admin Dashboard
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
