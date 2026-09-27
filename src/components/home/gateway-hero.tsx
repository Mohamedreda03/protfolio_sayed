"use client";

import React from "react";
import { Profile } from "@/lib/types";
import { HeadingAccent } from "@/components/common/decorative-svgs";
import { FileDown, ArrowRight } from "lucide-react";

export function GatewayHero({ profile }: { profile: Profile }) {
  return (
    <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Centered Editorial Headline */}
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAAC18]/10 border border-[#D9730D]/20 text-[#D9730D] text-xs font-mono font-bold mb-6">
          <span className="w-2 h-2 rounded-full bg-[#D9730D] animate-pulse" />
          <span>OPEN FOR STAFF / PRINCIPAL DATA ROLES</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#37352F] leading-[1.08] font-heading">
          Architecting Distributed Systems. <br />
          <span className="text-[#D9730D]">Scaling Real-Time</span> Data Pipelines.
        </h1>

        {/* Dynamic SVG Accent Under Headline */}
        <div className="mt-4 mb-6 flex justify-center">
          <HeadingAccent className="w-72 sm:w-96 h-4" />
        </div>

        <p className="text-base sm:text-xl text-[#787774] max-w-3xl mx-auto leading-relaxed font-normal">
          The engineering portfolio of <span className="text-[#37352F] font-bold">{profile.name}</span>.
          Specializing in high-throughput event streaming topologies, Medallion cloud lakehouses,
          and distributed compute engines operating under strict sub-second SLAs and zero-loss guarantees.
        </p>

        {/* Action CTAs */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#showcase"
            className="px-6 py-3 rounded-xl bg-[#37352F] text-white font-medium text-sm hover:bg-[#201F1D] transition-colors shadow-xs inline-flex items-center gap-2"
          >
            <span>Explore Architectures</span>
            <ArrowRight className="w-4 h-4 text-[#FAAC18]" />
          </a>

          {profile.resumeUrl && profile.resumeUrl !== "#" && (
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-white border border-[rgba(55,53,47,0.16)] text-[#37352F] font-medium text-sm hover:bg-[#F7F6F3] transition-colors inline-flex items-center gap-2 shadow-xs"
            >
              <FileDown className="w-4 h-4 text-[#D9730D]" />
              <span>Download CV</span>
            </a>
          )}

          <a
            href="#contact"
            className="px-6 py-3 rounded-xl bg-white border border-[rgba(55,53,47,0.16)] text-[#37352F] font-medium text-sm hover:bg-[#F7F6F3] transition-colors"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  );
}
