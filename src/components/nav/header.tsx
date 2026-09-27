"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FileText } from "lucide-react";

import { Profile } from "@/lib/types";

interface HeaderProps {
  profile?: Profile;
  resumeUrl?: string;
}

export function Header({ profile, resumeUrl }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const effectiveResumeUrl = resumeUrl || profile?.resumeUrl;
  const logoUrl = profile?.logoUrl?.trim();
  const logoText =
    profile?.logoText?.trim() ||
    (profile?.name
      ? profile.name
          .split(" ")
          .map((w) => w[0])
          .join("")
          .toUpperCase()
          .slice(0, 3)
      : "MR");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#FBFBFA]/85 backdrop-blur-xl backdrop-saturate-150 border-b border-black/[0.04] py-3.5 shadow-[0_8px_30px_rgba(0,0,0,0.02)]"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Dynamic Logo — Image Logo or Minimalist Monogram */}
        <Link
          href="/"
          className="flex items-center gap-3 group select-none"
          aria-label={profile?.name || "Home"}
        >
          {logoUrl ? (
            <div className="flex items-center gap-2.5">
              <img
                src={logoUrl}
                alt={profile?.name || "Logo"}
                className="h-8 max-h-9 max-w-[150px] object-contain transition-transform group-hover:scale-105"
              />
              {profile?.name && (
                <span className="hidden sm:inline-block font-heading font-bold text-sm tracking-tight text-[#37352F] group-hover:text-[#D9730D] transition-colors border-l border-[rgba(55,53,47,0.15)] pl-2.5">
                  {profile.name}
                </span>
              )}
            </div>
          ) : (
            <div className="font-heading font-extrabold text-2xl tracking-tighter text-[#37352F] hover:text-[#D9730D] transition-colors flex items-baseline gap-0.5">
              <span>{logoText}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#D9730D] inline-block group-hover:scale-125 transition-transform" />
            </div>
          )}
        </Link>

        {/* Clear Navigation Links */}
        <nav className="flex items-center gap-4 sm:gap-7">
          <a
            href="#showcase"
            className="text-xs sm:text-sm font-medium text-[#787774] hover:text-[#37352F] transition-colors"
          >
            Architectures
          </a>
          <a
            href="#skills"
            className="text-xs sm:text-sm font-medium text-[#787774] hover:text-[#37352F] transition-colors"
          >
            Tech Stack
          </a>
          <a
            href="#certifications"
            className="text-xs sm:text-sm font-medium text-[#787774] hover:text-[#37352F] transition-colors"
          >
            Certifications
          </a>

          {effectiveResumeUrl && effectiveResumeUrl !== "#" && (
            <a
              href={effectiveResumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-[#787774] hover:text-[#D9730D] transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume</span>
            </a>
          )}

          <a
            href="#contact"
            className="px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold bg-[#37352F] hover:bg-[#201F1D] text-white transition-all shadow-xs"
          >
            Get in Touch
          </a>
        </nav>
      </div>
    </header>
  );
}
