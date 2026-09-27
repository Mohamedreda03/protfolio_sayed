"use client";

import React, { useState } from "react";

/**
 * Architectural vector datum accent with Notion Orange to Warm Amber Yellow gradient
 */
export function HeadingAccent({ className = "w-48 h-3" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="headingNotionGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#D9730D" />
          <stop offset="50%" stopColor="#E9972E" />
          <stop offset="100%" stopColor="#DFAB01" />
        </linearGradient>
      </defs>
      {/* Precision Datum Line */}
      <path
        d="M2 8H180C195 8 210 12 238 12"
        stroke="url(#headingNotionGrad)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Calibration Tick Marks */}
      <line x1="40" y1="4" x2="40" y2="12" stroke="#D9730D" strokeWidth="1" strokeOpacity="0.4" />
      <line x1="90" y1="4" x2="90" y2="12" stroke="#E9972E" strokeWidth="1" strokeOpacity="0.4" />
      <line x1="140" y1="4" x2="140" y2="12" stroke="#DFAB01" strokeWidth="1" strokeOpacity="0.4" />
      {/* Terminal Node */}
      <circle cx="236" cy="12" r="3" fill="#D9730D" />
      <circle cx="236" cy="12" r="1.5" fill="#FFFFFF" />
    </svg>
  );
}

/**
 * Dynamic technical swoosh with vector calipers for major section titles in Notion palette
 */
export function HeadingSwoosh({ className = "w-56 h-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 280 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="swooshNotionGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#D9730D" />
          <stop offset="45%" stopColor="#E9972E" />
          <stop offset="85%" stopColor="#DFAB01" />
          <stop offset="100%" stopColor="#CB9018" />
        </linearGradient>
      </defs>
      <path
        d="M3 10H200C225 10 250 14 277 14"
        stroke="url(#swooshNotionGrad)"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M15 15H170C195 15 220 18 250 18"
        stroke="#DFAB01"
        strokeOpacity="0.3"
        strokeWidth="1"
        strokeLinecap="round"
        strokeDasharray="4 4"
      />
      <circle cx="4" cy="10" r="2" fill="#D9730D" />
      <circle cx="277" cy="14" r="2.5" fill="#DFAB01" />
    </svg>
  );
}

/**
 * Ambient Notion Warm Paper background with subtle atmospheric amber/orange glow & micro-grid
 */
export function TechGridBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10" aria-hidden="true">
      {/* Warm Ambient Glow 1: Notion Amber top-left */}
      <div className="absolute -top-32 -left-32 w-[550px] h-[550px] rounded-full bg-[#DFAB01]/[0.035] blur-[120px]" />
      {/* Warm Ambient Glow 2: Notion Orange center-right */}
      <div className="absolute top-[30%] -right-32 w-[500px] h-[500px] rounded-full bg-[#D9730D]/[0.03] blur-[130px]" />
      {/* Warm Ambient Glow 3: Soft Amber near showcase */}
      <div className="absolute top-[65%] left-1/4 w-[650px] h-[650px] rounded-full bg-[#DFAB01]/[0.025] blur-[140px]" />

      {/* Notion Minimalist Architectural Micro-Dot Grid */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #37352F 1px, transparent 1px),
            linear-gradient(to bottom, #37352F 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          maskImage: "radial-gradient(ellipse at 50% 30%, black 40%, transparent 90%)",
          WebkitMaskImage: "radial-gradient(ellipse at 50% 30%, black 40%, transparent 90%)",
        }}
      />
    </div>
  );
}

/**
 * Visual architecture schematic banner for case study cards in Notion line-art style
 */
export function ProjectSchematicBanner({ type = "stream" }: { type?: string }) {
  const isLakehouse = type.toLowerCase().includes("lakehouse");
  const isGraph = type.toLowerCase().includes("graph") || type.toLowerCase().includes("ml");

  if (isLakehouse) {
    return (
      <div className="w-full h-36 rounded-xl bg-[#F7F6F3] p-3.5 relative overflow-hidden border border-[rgba(55,53,47,0.12)] group-hover:border-[#D9730D]/40 transition-colors">
        <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-[#DFAB01]/15 blur-2xl pointer-events-none" />

        {/* Medallion Architecture Schematic */}
        <svg className="w-full h-full relative z-10" viewBox="0 0 320 90" fill="none">
          <defs>
            <linearGradient id="lakehouseConduitNotion" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#787774" />
              <stop offset="40%" stopColor="#0B6E99" />
              <stop offset="75%" stopColor="#DFAB01" />
              <stop offset="100%" stopColor="#D9730D" />
            </linearGradient>
          </defs>

          {/* Flow Line with animated dashes */}
          <line
            x1="35"
            y1="45"
            x2="285"
            y2="45"
            stroke="url(#lakehouseConduitNotion)"
            strokeWidth="2"
            strokeDasharray="6 4"
            className="animate-conduit"
          />

          {/* Bronze Tier */}
          <g>
            <rect x="20" y="24" width="48" height="42" rx="8" fill="#FFFFFF" stroke="rgba(55,53,47,0.2)" strokeWidth="1.5" />
            <circle cx="44" cy="38" r="4" fill="#787774" />
            <text x="44" y="56" fill="#787774" fontSize="7" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
              BRONZE
            </text>
          </g>

          {/* Silver Tier */}
          <g>
            <rect x="105" y="24" width="50" height="42" rx="8" fill="#FFFFFF" stroke="#0B6E99" strokeWidth="1.5" />
            <circle cx="130" cy="38" r="4" fill="#0B6E99" />
            <text x="130" y="56" fill="#0B6E99" fontSize="7" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
              SILVER
            </text>
          </g>

          {/* Gold Tier */}
          <g>
            <rect x="190" y="24" width="48" height="42" rx="8" fill="#FFFFFF" stroke="#DFAB01" strokeWidth="1.5" />
            <circle cx="214" cy="38" r="4" fill="#DFAB01" />
            <text x="214" y="56" fill="#CB9018" fontSize="7" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
              GOLD
            </text>
          </g>

          {/* Query Engine (Trino) */}
          <g>
            <circle cx="285" cy="45" r="16" fill="#FFFFFF" stroke="#D9730D" strokeWidth="1.5" />
            <polygon points="285,36 292,45 285,54 278,45" fill="#D9730D" />
            <text x="285" y="72" fill="#D9730D" fontSize="7" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
              TRINO
            </text>
          </g>
        </svg>
      </div>
    );
  }

  if (isGraph) {
    return (
      <div className="w-full h-36 rounded-xl bg-[#F7F6F3] p-3.5 relative overflow-hidden border border-[rgba(55,53,47,0.12)] group-hover:border-[#DFAB01]/50 transition-colors">
        <div className="absolute -top-10 left-1/3 w-32 h-32 rounded-full bg-[#DFAB01]/15 blur-2xl pointer-events-none" />

        {/* Distributed Graph Schematic */}
        <svg className="w-full h-full relative z-10" viewBox="0 0 320 90" fill="none">
          {/* Interconnected Edges */}
          <line x1="50" y1="45" x2="120" y2="25" stroke="#DFAB01" strokeWidth="1.5" strokeDasharray="3 3" className="animate-conduit" />
          <line x1="50" y1="45" x2="120" y2="65" stroke="#D9730D" strokeWidth="1.5" strokeDasharray="3 3" className="animate-conduit-reverse" />
          <line x1="120" y1="25" x2="190" y2="45" stroke="#D9730D" strokeWidth="1.5" />
          <line x1="120" y1="65" x2="190" y2="45" stroke="#DFAB01" strokeWidth="1.5" />
          <line x1="190" y1="45" x2="260" y2="28" stroke="#DFAB01" strokeWidth="1.5" strokeDasharray="4 3" className="animate-conduit" />
          <line x1="190" y1="45" x2="260" y2="62" stroke="#D9730D" strokeWidth="1.5" strokeDasharray="4 3" className="animate-conduit" />

          {/* Graph Nodes */}
          <circle cx="50" cy="45" r="12" fill="#FFFFFF" stroke="rgba(55,53,47,0.25)" strokeWidth="1.5" />
          <circle cx="50" cy="45" r="4" fill="#787774" />
          <text x="50" y="68" fill="#787774" fontSize="7" fontFamily="monospace" textAnchor="middle">SOURCE</text>

          <circle cx="120" cy="25" r="10" fill="#FFFFFF" stroke="#DFAB01" strokeWidth="1.5" />
          <circle cx="120" cy="25" r="3" fill="#DFAB01" />

          <circle cx="120" cy="65" r="10" fill="#FFFFFF" stroke="#DFAB01" strokeWidth="1.5" />
          <circle cx="120" cy="65" r="3" fill="#DFAB01" />

          <circle cx="190" cy="45" r="14" fill="#FFFFFF" stroke="#D9730D" strokeWidth="2" />
          <circle cx="190" cy="45" r="5" fill="#D9730D" />
          <text x="190" y="70" fill="#D9730D" fontSize="7" fontFamily="monospace" fontWeight="bold" textAnchor="middle">RAY CORE</text>

          <circle cx="260" cy="28" r="9" fill="#FFFFFF" stroke="#DFAB01" strokeWidth="1.5" />
          <circle cx="260" cy="62" r="9" fill="#FFFFFF" stroke="#D9730D" strokeWidth="1.5" />
          <text x="260" y="80" fill="#787774" fontSize="7" fontFamily="monospace" textAnchor="middle">NEO4J</text>
        </svg>
      </div>
    );
  }

  // Default: Stream Processing Schematic in Notion Style
  return (
    <div className="w-full h-36 rounded-xl bg-[#F7F6F3] p-3.5 relative overflow-hidden border border-[rgba(55,53,47,0.12)] group-hover:border-[#D9730D]/40 transition-colors">
      <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-[#DFAB01]/15 blur-2xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-[#D9730D]/10 blur-2xl pointer-events-none" />

      {/* SVG Pipeline Diagram with Animated Packets */}
      <svg className="w-full h-full relative z-10" viewBox="0 0 320 90" fill="none">
        <defs>
          <linearGradient id="streamWireGradNotion" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#DFAB01" />
            <stop offset="50%" stopColor="#E9972E" />
            <stop offset="100%" stopColor="#D9730D" />
          </linearGradient>
        </defs>

        {/* Bus Line with Flow Animation */}
        <line
          x1="35"
          y1="45"
          x2="285"
          y2="45"
          stroke="url(#streamWireGradNotion)"
          strokeWidth="2.5"
          strokeDasharray="6 4"
          className="animate-conduit"
        />

        {/* Node 1: Ingestion */}
        <g>
          <circle cx="35" cy="45" r="14" fill="#FFFFFF" stroke="rgba(55,53,47,0.25)" strokeWidth="1.5" />
          <circle cx="35" cy="45" r="5" fill="#787774" />
          <text x="35" y="70" fill="#787774" fontSize="7" fontFamily="monospace" textAnchor="middle">
            INGEST
          </text>
        </g>

        {/* Node 2: Kafka Topic Partitions */}
        <g>
          <rect x="100" y="32" width="26" height="26" rx="6" fill="#FFFFFF" stroke="#D9730D" strokeWidth="1.5" />
          <line x1="108" y1="38" x2="118" y2="38" stroke="#D9730D" strokeWidth="1.5" />
          <line x1="108" y1="45" x2="118" y2="45" stroke="#D9730D" strokeWidth="1.5" />
          <line x1="108" y1="52" x2="118" y2="52" stroke="#D9730D" strokeWidth="1.5" />
          <text x="113" y="70" fill="#D9730D" fontSize="7" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
            KAFKA
          </text>
        </g>

        {/* Node 3: PyFlink CEP Scorer */}
        <g>
          <polygon points="195,30 209,45 195,60 181,45" fill="#FFFFFF" stroke="#DFAB01" strokeWidth="1.5" />
          <circle cx="195" cy="45" r="4" fill="#DFAB01" />
          <text x="195" y="70" fill="#CB9018" fontSize="7" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
            FLINK CEP
          </text>
        </g>

        {/* Node 4: S3 / Iceberg Lakehouse */}
        <g>
          <circle cx="280" cy="45" r="14" fill="#FFFFFF" stroke="#D9730D" strokeWidth="1.5" />
          <circle cx="280" cy="45" r="5" fill="#D9730D" />
          <text x="280" y="70" fill="#D9730D" fontSize="7" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
            ICEBERG
          </text>
        </g>
      </svg>
    </div>
  );
}

/**
 * Clean & Simple Notion-Style Data Processing & Cleansing Roadmap
 * Explains the data journey from raw chaotic data to clean decision-ready metrics in simple terms.
 */
export function DataCleaningRoadmap() {
  const steps = [
    {
      step: "01",
      name: "Collect",
      title: "Collect Raw Data",
      status: "Raw & Scattered",
      description: "Gather data from multiple databases, APIs, and app events into one reliable stream without losing a single record.",
      tags: "APIs • Databases • App Logs",
      accentColor: "#D9730D",
      badgeBg: "bg-[#FAECE0] text-[#D9730D]",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
          <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
        </svg>
      ),
    },
    {
      step: "02",
      name: "Clean",
      title: "Filter & Cleanse",
      status: "Verified & Deduplicated",
      description: "Remove duplicate records, fix missing fields, and validate formats so that bad or incomplete data never pollutes reports.",
      tags: "Deduplication • Null Fixes • Schema Rules",
      accentColor: "#DFAB01",
      badgeBg: "bg-[#FCF5E3] text-[#CB9018]",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
        </svg>
      ),
    },
    {
      step: "03",
      name: "Structure",
      title: "Structure & Model",
      status: "Organized & Indexed",
      description: "Transform raw records into clean, standardized tables and calculate business KPIs so data is easy and fast to query.",
      tags: "Standard Tables • Aggregations • KPIs",
      accentColor: "#0B6E99",
      badgeBg: "bg-[#EAF3F7] text-[#0B6E99]",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M3 9h18" />
          <path d="M9 21V9" />
        </svg>
      ),
    },
    {
      step: "04",
      name: "Deliver",
      title: "Deliver & Serve",
      status: "100% Decision-Ready",
      description: "Serve trusted numbers directly to executive dashboards, business teams, and AI models in milliseconds.",
      tags: "Live Dashboards • Fast SQL • AI Models",
      accentColor: "#0F7B6C",
      badgeBg: "bg-[#EDF6F3] text-[#0F7B6C]",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      ),
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto mt-10 relative">
      {/* Roadmap Canvas Card */}
      <div className="bg-white border border-[rgba(55,53,47,0.14)] rounded-2xl p-6 sm:p-8 shadow-xs">
        {/* Header Bar */}
        <div className="flex flex-wrap items-center justify-between border-b border-[rgba(55,53,47,0.08)] pb-4 mb-6 gap-3">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D9730D]" />
            <span className="font-mono text-xs font-bold text-[#37352F] uppercase tracking-wider">
              Data Journey Roadmap
            </span>
            <span className="text-[rgba(55,53,47,0.3)] hidden sm:inline">•</span>
            <span className="text-xs text-[#787774] hidden sm:inline font-medium">
              From Raw Noise to Clean, Trusted Value
            </span>
          </div>
          <span className="text-[11px] font-mono font-medium text-[#787774] bg-[#F7F6F3] px-2.5 py-1 rounded-md border border-[rgba(55,53,47,0.08)]">
            4 Simple Steps
          </span>
        </div>

        {/* The 4 Roadmap Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
          {steps.map((item, index) => (
            <div
              key={item.step}
              className="group relative bg-[#FBFBFA] hover:bg-white border border-[rgba(55,53,47,0.1)] hover:border-[#D9730D]/40 rounded-xl p-5 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                {/* Step Pill & Icon */}
                <div className="flex items-center justify-between mb-3.5">
                  <span className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-md ${item.badgeBg}`}>
                    STEP {item.step}
                  </span>
                  <div className="text-[#787774] group-hover:text-[#D9730D] transition-colors">
                    {item.icon}
                  </div>
                </div>

                {/* Step Title */}
                <h4 className="font-bold text-sm text-[#37352F] mb-1.5 group-hover:text-[#D9730D] transition-colors">
                  {item.title}
                </h4>

                {/* State Tag */}
                <span className="inline-block text-[10px] font-mono font-semibold text-[#787774] bg-[rgba(55,53,47,0.05)] px-2 py-0.5 rounded mb-2.5">
                  {item.status}
                </span>

                {/* Simple Plain-English Description */}
                <p className="text-xs text-[#5A5853] leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Bottom Tags */}
              <div className="mt-4 pt-3 border-t border-[rgba(55,53,47,0.07)] text-[10px] font-mono text-[#787774]">
                {item.tags}
              </div>

              {/* Connecting arrow for desktop between cards */}
              {index < steps.length - 1 && (
                <div
                  className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-white border border-[rgba(55,53,47,0.15)] items-center justify-center text-[10px] text-[#787774] shadow-xs pointer-events-none"
                  aria-hidden="true"
                >
                  →
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom Outcome Strip (Notion Callout Style) */}
        <div className="mt-6 p-3.5 sm:p-4 rounded-xl bg-[#F7F6F3] border border-[rgba(55,53,47,0.08)] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#37352F]">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <span className="text-base">🎯</span>
            <span className="font-medium text-[#37352F]">
              <strong className="font-bold text-[#37352F]">The Outcome:</strong> Accurate, validated data that powers business decisions with zero guesswork.
            </span>
          </div>
          <div className="flex items-center gap-2 font-mono text-[11px] text-[#0F7B6C] font-semibold shrink-0">
            <span className="w-2 h-2 rounded-full bg-[#0F7B6C]" />
            Clean & Verified Pipelines
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Alias export for backward compatibility
 */
export const HeroDataPipelineSVG = DataCleaningRoadmap;

