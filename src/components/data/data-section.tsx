"use client";

import React, { useState } from "react";
import { ShowcaseItem } from "@/lib/types";
import { DataModal } from "./data-modal";
import { ArrowRight } from "lucide-react";
import { HeadingSwoosh, ProjectSchematicBanner } from "@/components/common/decorative-svgs";

export function DataSection({ items }: { items: ShowcaseItem[] }) {
  const [selectedItem, setSelectedItem] = useState<ShowcaseItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", ...Array.from(new Set(items.map((i) => i.category)))];

  const filteredItems =
    activeCategory === "All"
      ? items
      : items.filter((item) => item.category === activeCategory);

  return (
    <div className="space-y-12">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-[rgba(55,53,47,0.1)] pb-8">
        <div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#37352F] tracking-tight font-heading">
            Distributed Systems & Architecture
          </h2>
          <div className="mt-2.5 mb-3">
            <HeadingSwoosh className="w-56 sm:w-72 h-4" />
          </div>
          <p className="text-[#787774] text-sm sm:text-base max-w-xl leading-relaxed">
            Production case studies covering petabyte lakehouses, stateful streaming topologies, and high-throughput real-time event backbones.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 border-b md:border-b-0 border-[rgba(55,53,47,0.1)] pb-2 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-2 text-xs font-bold font-mono transition-all cursor-pointer rounded-lg ${
                activeCategory === cat
                  ? "bg-[#D9730D] text-white shadow-xs font-bold"
                  : "bg-[#F7F6F3] text-[#37352F] hover:bg-[#EAE8E3] border border-[rgba(55,53,47,0.1)]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedItem(item)}
            className="group cursor-pointer flex flex-col justify-between rounded-xl notion-card p-6"
          >
            <div>
              {/* Architecture Project Image */}
              <div className="w-full h-44 rounded-xl overflow-hidden bg-[#F7F6F3] border border-[rgba(55,53,47,0.12)] relative group-hover:border-[#D9730D]/40 transition-colors">
                {item.thumbnailUrl ? (
                  <img
                    src={item.thumbnailUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                    loading="lazy"
                  />
                ) : (
                  <ProjectSchematicBanner type={item.category} />
                )}
              </div>

              {/* Header Info */}
              <div className="flex items-center justify-between text-xs mt-5 mb-2 font-mono">
                <span className="text-[11px] font-bold text-[#D9730D] uppercase tracking-wider">
                  // {item.category}
                </span>
                <span className="font-semibold text-[#787774]">{item.year}</span>
              </div>

              {/* Title & Summary */}
              <h3 className="text-lg font-bold text-[#37352F] group-hover:text-[#D9730D] transition-colors leading-snug">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#787774] mt-2.5 leading-relaxed line-clamp-3">
                {item.summary}
              </p>
            </div>

            {/* Action Trigger */}
            <div className="mt-6 pt-4 border-t border-[rgba(55,53,47,0.08)] flex items-center justify-between text-xs font-bold text-[#37352F] group-hover:text-[#D9730D]">
              <span>View Architecture Blueprint</span>
              <ArrowRight className="w-4 h-4 text-[#D9730D] group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>

      {/* Case Study Modal */}
      <DataModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </div>
  );
}
