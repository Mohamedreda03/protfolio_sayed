"use client";

import React, { useState } from "react";
import { PipelineNode } from "@/lib/types";
import { ArrowRight, ShieldCheck } from "lucide-react";

interface PipelineBlueprintProps {
  nodes?: PipelineNode[];
  title?: string;
}

export function PipelineBlueprint({ nodes, title }: PipelineBlueprintProps) {
  const [activeNode, setActiveNode] = useState<PipelineNode | null>(
    nodes && nodes.length > 0 ? nodes[0] : null
  );

  if (!nodes || nodes.length === 0) return null;

  return (
    <div className="bg-[#F7F6F3] border border-[rgba(55,53,47,0.12)] rounded-2xl p-6 space-y-4 shadow-sm">
      <div className="flex items-center justify-between border-b border-[rgba(55,53,47,0.08)] pb-3">
        <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-[#37352F]">
          Architecture Topology {title ? `// ${title}` : ""}
        </h4>
        <span className="text-xs text-[#D9730D] font-mono font-bold flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#D9730D] animate-pulse" />
          Interactive Flow Nodes
        </span>
      </div>

      {/* Nodes Flow Chain */}
      <div className="flex flex-wrap md:flex-nowrap items-center gap-2.5 overflow-x-auto py-2">
        {nodes.map((node, index) => {
          const isSelected = activeNode?.id === node.id;
          return (
            <React.Fragment key={node.id}>
              <button
                onClick={() => setActiveNode(node)}
                className={`flex-1 min-w-[140px] p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? "bg-white border-[#D9730D] text-[#37352F] shadow-sm ring-2 ring-[#D9730D]/20 scale-[1.02]"
                    : "bg-white border-[rgba(55,53,47,0.12)] text-[#787774] hover:text-[#37352F] hover:border-[#D9730D]/40"
                }`}
              >
                <span className="text-[10px] text-[#787774] font-mono block mb-1 font-bold">
                  STAGE 0{index + 1}
                </span>
                <div className="font-bold text-xs text-[#37352F] truncate">
                  {node.name}
                </div>
                <div className="text-[11px] text-[#D9730D] font-bold truncate mt-0.5 font-mono">
                  {node.technology}
                </div>
              </button>

              {index < nodes.length - 1 && (
                <div className="hidden md:flex items-center text-[#D9730D] px-1">
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Node Detail */}
      {activeNode && (
        <div className="mt-4 p-4 rounded-xl bg-white border border-[rgba(55,53,47,0.12)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs shadow-xs">
          <div>
            <span className="text-[10px] text-[#787774] uppercase tracking-wider block font-mono font-bold">
              Active Stage Role
            </span>
            <span className="font-bold text-[#37352F]">
              {activeNode.role} — <span className="text-[#D9730D] font-mono">{activeNode.technology}</span>
            </span>
          </div>
          <span className="text-[#0F7B6C] font-mono font-bold flex items-center gap-1.5 text-xs">
            <ShieldCheck className="w-4 h-4 text-[#0F7B6C]" />
            ZERO-LOSS VERIFIED
          </span>
        </div>
      )}
    </div>
  );
}
