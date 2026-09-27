"use client";

import React from "react";
import { SkillItem } from "@/lib/types";
import { HeadingAccent } from "@/components/common/decorative-svgs";

export function SkillsMatrix({ skills }: { skills: SkillItem[] }) {
  const categories = [
    {
      title: "Distributed Compute & Query",
      accent: "#D9730D",
      description: "Batch & continuous distributed engines for petabyte-scale processing.",
      items: [
        { name: "Apache Spark (Structured Streaming & Core)", level: "Production Architect" },
        { name: "PySpark & Scala", level: "Core Implementation" },
        { name: "Trino / Starburst SQL Engine", level: "Federated Analytics" },
        { name: "Ray Distributed Compute", level: "Graph & ML Infrastructure" },
      ],
    },
    {
      title: "Event Streaming & Real-Time",
      accent: "#DFAB01",
      description: "Fault-tolerant messaging topologies with sub-second SLA.",
      items: [
        { name: "Apache Kafka & Kafka Connect", level: "Cluster Design & Partitioning" },
        { name: "Apache Flink (Stateful CEP)", level: "Complex Event Scoring" },
        { name: "Debezium CDC (Change Data Capture)", level: "Zero-Downtime Replication" },
        { name: "Schema Registry & Avro / Protobuf", level: "Contract Enforcement" },
      ],
    },
    {
      title: "Modern Lakehouse & Warehouses",
      accent: "#0B6E99",
      description: "Open table formats, schema evolution, and cost optimization.",
      items: [
        { name: "Delta Lake (Medallion Architecture)", level: "Bronze / Silver / Gold Pipelines" },
        { name: "Apache Iceberg", level: "ACID Transactions on Object Storage" },
        { name: "Snowflake & Google BigQuery", level: "Data Marts & Sharing" },
        { name: "Databricks Unity Catalog", level: "Governance & Lineage" },
      ],
    },
    {
      title: "Transformation & Infrastructure",
      accent: "#0F7B6C",
      description: "Data modeling, container orchestration, and IaC deployment.",
      items: [
        { name: "DBT (Data Build Tool)", level: "Dimensional Modeling & Testing" },
        { name: "Kubernetes & Docker", level: "Containerized Engine Clusters" },
        { name: "Apache Airflow", level: "DAG Orchestration & Monitoring" },
        { name: "AWS Cloud (EMR, S3, Glue, Athena)", level: "Cloud Architecture" },
      ],
    },
  ];

  return (
    <section id="skills" className="py-24 border-t border-[rgba(55,53,47,0.1)] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="max-w-3xl mb-12">
        <h2 className="text-3xl sm:text-5xl font-extrabold text-[#37352F] tracking-tight font-heading">
          Data Engineering Stack & Competencies
        </h2>
        <div className="mt-3 mb-4">
          <HeadingAccent className="w-56 sm:w-72 h-4" />
        </div>
        <p className="text-[#787774] text-sm sm:text-base leading-relaxed">
          Production-tested frameworks, distributed query engines, and cloud storage systems powering modern data platforms.
        </p>
      </div>

      {/* Grid of 4 Core Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat, idx) => (
          <div
            key={idx}
            className="p-6 rounded-xl notion-card flex flex-col justify-between relative overflow-hidden"
          >
            <div
              className="absolute top-0 left-0 right-0 h-1"
              style={{ backgroundColor: cat.accent }}
            />
            <div>
              <h3 className="text-base font-bold text-[#37352F] border-b border-[rgba(55,53,47,0.08)] pb-3">
                {cat.title}
              </h3>
              <p className="text-xs text-[#787774] mt-2 mb-5 leading-relaxed">
                {cat.description}
              </p>

              <ul className="space-y-3.5">
                {cat.items.map((item, i) => (
                  <li key={i} className="text-xs">
                    <span className="font-bold text-[#37352F] block">
                      {item.name}
                    </span>
                    <span
                      className="text-[11px] font-mono font-bold"
                      style={{ color: cat.accent }}
                    >
                      {item.level}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
