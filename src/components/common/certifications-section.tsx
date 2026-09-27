"use client";

import React from "react";
import { CertificationItem } from "@/lib/types";
import { HeadingAccent } from "@/components/common/decorative-svgs";
import { ShieldCheck, ExternalLink, Award, CheckCircle2 } from "lucide-react";

interface CertificationsSectionProps {
  certifications: CertificationItem[];
}

export function CertificationsSection({ certifications }: CertificationsSectionProps) {
  const getBadgeStyle = (badgeType: CertificationItem["badgeType"]) => {
    switch (badgeType) {
      case "aws":
        return {
          bg: "bg-[#FF9900]/10",
          border: "border-[#FF9900]/30",
          text: "text-[#D9730D]",
          accent: "#FF9900",
          issuerBadge: "AWS Certified",
        };
      case "databricks":
        return {
          bg: "bg-[#FF3621]/10",
          border: "border-[#FF3621]/30",
          text: "text-[#D9381E]",
          accent: "#FF3621",
          issuerBadge: "Databricks Partner",
        };
      case "confluent":
        return {
          bg: "bg-[#00A4E4]/10",
          border: "border-[#00A4E4]/30",
          text: "text-[#0B6E99]",
          accent: "#00A4E4",
          issuerBadge: "Confluent Kafka",
        };
      case "kubernetes":
        return {
          bg: "bg-[#326CE5]/10",
          border: "border-[#326CE5]/30",
          text: "text-[#326CE5]",
          accent: "#326CE5",
          issuerBadge: "CNCF Certified",
        };
      default:
        return {
          bg: "bg-[#0F7B6C]/10",
          border: "border-[#0F7B6C]/30",
          text: "text-[#0F7B6C]",
          accent: "#0F7B6C",
          issuerBadge: "Certified",
        };
    }
  };

  return (
    <section id="certifications" className="py-24 border-t border-[rgba(55,53,47,0.1)] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="max-w-3xl mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0F7B6C]/10 border border-[#0F7B6C]/25 text-[#0F7B6C] text-xs font-mono font-bold mb-4">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>VERIFIED INDUSTRY CREDENTIALS</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold text-[#37352F] tracking-tight font-heading">
          Professional Certifications & Cloud Badges
        </h2>
        <div className="mt-3 mb-4">
          <HeadingAccent className="w-56 sm:w-72 h-4" />
        </div>
        <p className="text-[#787774] text-sm sm:text-base leading-relaxed">
          Accredited credentials confirming production expertise in distributed streaming architectures, open lakehouse platforms, and enterprise cloud infrastructure.
        </p>
      </div>

      {/* Certifications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {certifications.map((cert) => {
          const style = getBadgeStyle(cert.badgeType);

          return (
            <div
              key={cert.id}
              className="notion-card p-6 sm:p-7 rounded-2xl flex flex-col justify-between relative overflow-hidden group hover:border-[#D9730D]/40 transition-all duration-300"
            >
              {/* Top Accent Stripe */}
              <div
                className="absolute top-0 left-0 right-0 h-1.5 opacity-90 group-hover:opacity-100 transition-opacity"
                style={{ backgroundColor: style.accent }}
              />

              <div>
                {/* Header row: Issuer Badge & Status */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-9 h-9 rounded-xl ${style.bg} ${style.border} border flex items-center justify-center ${style.text} shadow-xs`}
                    >
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#37352F] block">
                        {cert.issuer}
                      </span>
                      <span className="text-[11px] text-[#787774] font-mono">
                        Issued {cert.issueDate}
                      </span>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-bold bg-[#EEF5F2] text-[#0F7B6C] border border-[#0F7B6C]/20 shadow-2xs">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>VERIFIED</span>
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold text-[#37352F] group-hover:text-[#D9730D] transition-colors leading-snug">
                  {cert.title}
                </h3>

                {/* Credential ID */}
                {cert.credentialId && (
                  <div className="mt-2.5 inline-flex items-center gap-1.5 text-[11px] font-mono text-[#787774] bg-[#F7F6F3] px-2.5 py-1 rounded-md border border-[rgba(55,53,47,0.08)]">
                    <span className="font-semibold text-[#37352F]">ID:</span>
                    <span>{cert.credentialId}</span>
                  </div>
                )}

                {/* Skills Covered */}
                <div className="mt-5 space-y-2">
                  <span className="text-[10px] font-bold font-mono uppercase tracking-wider text-[#787774] block">
                    Domain Competencies Tested:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {cert.skillsCovered.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg text-xs font-mono font-medium bg-[#F7F6F3] border border-[rgba(55,53,47,0.1)] text-[#37352F] group-hover:bg-white transition-colors"
                      >
                        #{skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Link */}
              {cert.credentialUrl && (
                <div className="mt-7 pt-4 border-t border-[rgba(55,53,47,0.08)] flex items-center justify-between">
                  <span className="text-xs font-mono text-[#787774]">Digital Verification Available</span>
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#37352F] hover:text-[#D9730D] group-hover:translate-x-0.5 transition-all"
                  >
                    <span>Verify Credential</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#D9730D]" />
                  </a>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
