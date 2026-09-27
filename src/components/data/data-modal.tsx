"use client";

import React, { useEffect, useCallback } from "react";
import { ShowcaseItem } from "@/lib/types";
import { X, ExternalLink, Activity } from "lucide-react";
import { GithubIcon } from "@/components/common/social-icons";
import { PipelineBlueprint } from "./pipeline-blueprint";

interface DataModalProps {
  item: ShowcaseItem | null;
  onClose: () => void;
}

export function DataModal({ item, onClose }: DataModalProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (item) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [item, handleKeyDown]);

  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/50 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-white border border-[rgba(55,53,47,0.16)] rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[rgba(55,53,47,0.09)] bg-[#F7F6F3]">
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="font-bold uppercase tracking-wider text-[#D9730D]">
              // {item.category}
            </span>
            <span className="text-[#787774]">•</span>
            <span className="text-[#787774] font-semibold">{item.year}</span>
            {item.clientOrCompany && (
              <>
                <span className="text-[#787774]">•</span>
                <span className="text-[#37352F] font-semibold">{item.clientOrCompany}</span>
              </>
            )}
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="p-1.5 text-[#787774] hover:text-[#37352F] rounded-lg hover:bg-[#EAE8E3] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto flex-1 p-6 sm:p-8 space-y-7">
          {/* Architecture Showcase Visual */}
          {item.thumbnailUrl && (
            <div className="w-full h-56 sm:h-72 rounded-xl overflow-hidden border border-[rgba(55,53,47,0.12)] bg-[#F7F6F3]">
              <img
                src={item.thumbnailUrl}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Title & Summary */}
          <div className="space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#37352F] tracking-tight font-heading leading-tight">
              {item.title}
            </h2>
            <p className="text-[#787774] text-sm sm:text-base leading-relaxed">
              {item.summary}
            </p>
          </div>

          {/* Impact Metrics Grid */}
          {item.impactMetrics && item.impactMetrics.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-[#787774] flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-[#D9730D]" />
                <span>Production Impact & Engineering Metrics</span>
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {item.impactMetrics.map((metric, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-xl bg-[#F7F6F3] border border-[rgba(55,53,47,0.1)] text-center space-y-1"
                  >
                    <span className="text-[11px] text-[#787774] font-mono block uppercase truncate">
                      {metric.label}
                    </span>
                    <span className="text-lg sm:text-xl font-extrabold text-[#37352F] font-mono block">
                      {metric.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Interactive Pipeline Architecture Flow Topology */}
          {item.pipelineNodes && item.pipelineNodes.length > 0 && (
            <PipelineBlueprint nodes={item.pipelineNodes} title={item.title} />
          )}

          {/* Detailed Description */}
          {item.description && item.description !== item.summary && (
            <div className="p-5 rounded-xl bg-[#F7F6F3] border border-[rgba(55,53,47,0.08)]">
              <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-[#787774] mb-2">
                Architecture Blueprint & Implementation Notes
              </h3>
              <p className="text-sm text-[#37352F] leading-relaxed">
                {item.description}
              </p>
            </div>
          )}

          {/* Technology Badges & Links */}
          <div className="pt-4 border-t border-[rgba(55,53,47,0.09)] flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              {item.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-lg text-xs font-mono font-medium bg-[#F7F6F3] border border-[rgba(55,53,47,0.1)] text-[#37352F]"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-3">
              {item.githubUrl && (
                <a
                  href={item.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-white hover:bg-[#F7F6F3] text-[#37352F] border border-[rgba(55,53,47,0.14)] hover:border-[#D9730D] transition-all shadow-xs"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
              )}
              {item.liveUrl && (
                <a
                  href={item.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-[#D9730D] hover:bg-[#C26207] text-white transition-all shadow-xs"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Live Project</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
