import { Profile, ShowcaseItem, SkillItem, CertificationItem } from "./types";

export const SEED_PROFILE: Profile = {
  name: "Mohamed Reda",
  title: "Lead Big Data & Distributed Systems Engineer",
  summary:
    "Architecting petabyte-scale real-time ingestion pipelines, resilient lakehouse platforms, and distributed streaming engines with zero-data-loss guarantees.",
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80",
  logoUrl: "",
  logoText: "MR",
  resumeUrl: "/resume.pdf",
  socials: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    email: "contact@mohamedreda.dev",
  },
};

export const SEED_SHOWCASE_ITEMS: ShowcaseItem[] = [
  {
    id: "data-1",
    title: "Global FinTech Real-Time Streaming & Fraud Engine",
    slug: "fintech-realtime-fraud-engine",
    category: "Stream Processing",
    summary:
      "Distributed event-driven architecture ingesting 350,000 tx/sec with Apache Kafka, PyFlink, and Apache Iceberg for sub-50ms fraud scoring.",
    description:
      "Built a fault-tolerant streaming topology handling credit card authorizations across 4 global regions. Leveraged Flink stateful CEP (Complex Event Processing) to detect synthetic identity anomalies in under 45 milliseconds with exactly-once semantics.",
    clientOrCompany: "NovaPay Global",
    year: "2025",
    featured: true,
    thumbnailUrl:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80",
    tags: ["Apache Kafka", "Apache Flink", "Apache Iceberg", "Kubernetes", "Rust"],
    githubUrl: "https://github.com",
    liveUrl: "https://grafana.com",
    impactMetrics: [
      { label: "Throughput", value: "350K msg/s" },
      { label: "P99 Latency", value: "38 ms" },
      { label: "Data Volume", value: "4.2 TB/day" },
      { label: "Uptime", value: "99.999%" },
    ],
    pipelineNodes: [
      { id: "p1", name: "Transaction Gateway", role: "Edge Ingestion", technology: "Go & Envoy" },
      { id: "p2", name: "Event Backbone", role: "Message Queue", technology: "Apache Kafka" },
      { id: "p3", name: "Stateful Scorer", role: "Stream Processing", technology: "PyFlink on K8s" },
      { id: "p4", name: "Low-Latency Store", role: "Feature Cache", technology: "Redis Cluster" },
      { id: "p5", name: "Lakehouse Storage", role: "Historical Audit", technology: "Apache Iceberg on S3" },
    ],
  },
  {
    id: "data-2",
    title: "Multi-Petabyte Cloud Delta Lakehouse Platform",
    slug: "multi-petabyte-delta-lakehouse",
    category: "Lakehouse Architecture",
    summary:
      "Unified batch & streaming Lakehouse consolidating 14 siloed data marts into an automated Delta Lake on AWS with DBT and Trino.",
    description:
      "Migrated legacy Oracle and Redshift data warehouse to an open Delta Lake. Designed Medallion architecture (Bronze -> Silver -> Gold) with schema evolution, Z-order indexing, and cost-efficient partition pruning saving 58% monthly infrastructure expenses.",
    clientOrCompany: "Enterprise Omnichannel",
    year: "2024",
    featured: true,
    thumbnailUrl:
      "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&auto=format&fit=crop&q=80",
    tags: ["Apache Spark", "Databricks", "Delta Lake", "DBT", "AWS EMR"],
    githubUrl: "https://github.com",
    impactMetrics: [
      { label: "Total Storage", value: "8.6 PB" },
      { label: "Cost Savings", value: "58% MoM" },
      { label: "Query Speedup", value: "14x Faster" },
      { label: "Daily Jobs", value: "4,200+" },
    ],
    pipelineNodes: [
      { id: "d1", name: "CDC Ingestion", role: "Debezium Connect", technology: "Kafka Connect" },
      { id: "d2", name: "Bronze Lake", role: "Raw Landing", technology: "AWS S3 / Delta" },
      { id: "d3", name: "Silver Cleanser", role: "Spark Structured Streaming", technology: "Databricks" },
      { id: "d4", name: "Gold Marts", role: "Dimensional Modeling", technology: "DBT Core" },
      { id: "d5", name: "Federated SQL", role: "Ad-hoc Analytics", technology: "Trino / Starburst" },
    ],
  },
  {
    id: "data-3",
    title: "Distributed Graph Analytics & Recommendation Engine",
    slug: "distributed-graph-analytics",
    category: "Graph & ML Infrastructure",
    summary:
      "High-performance distributed graph compute cluster processing 2.5 Billion edges for real-time customer influence and churn modeling.",
    description:
      "Constructed a high-throughput graph compute topology using Apache Arrow Flight, Ray, and Neo4j. Reduced multi-hop relationship extraction from 12 seconds down to 320 milliseconds.",
    clientOrCompany: "Synthetix AI",
    year: "2024",
    featured: false,
    thumbnailUrl:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80",
    tags: ["Ray", "Apache Arrow", "Neo4j", "Python", "Docker"],
    githubUrl: "https://github.com",
    impactMetrics: [
      { label: "Graph Size", value: "2.5B Edges" },
      { label: "Hop Latency", value: "320 ms" },
      { label: "Node Cluster", value: "64 Nodes" },
    ],
    pipelineNodes: [
      { id: "g1", name: "Entity Extractor", role: "Token Pipeline", technology: "FastAPI / Kafka" },
      { id: "g2", name: "Graph Ingestion", role: "Zero-Copy Arrow", technology: "PyArrow Flight" },
      { id: "g3", name: "Parallel Compute", role: "Distributed Traversal", technology: "Ray Core" },
      { id: "g4", name: "Graph DB", role: "Persistence", technology: "Neo4j Enterprise" },
    ],
  },
];

export const SEED_SKILLS: SkillItem[] = [
  { id: "s-d1", name: "Apache Spark & PySpark", category: "Distributed Compute", proficiency: 96 },
  { id: "s-d2", name: "Apache Kafka & Event Streaming", category: "Message Brokers", proficiency: 94 },
  { id: "s-d3", name: "Apache Flink (Stateful CEP)", category: "Real-Time Streaming", proficiency: 88 },
  { id: "s-d4", name: "Delta Lake & Apache Iceberg", category: "Table Formats", proficiency: 92 },
  { id: "s-d5", name: "Snowflake & AWS Athena/EMR", category: "Cloud Data Warehouses", proficiency: 90 },
  { id: "s-d6", name: "DBT (Data Build Tool)", category: "Transformation", proficiency: 93 },
  { id: "s-d7", name: "Kubernetes, Docker & CI/CD", category: "DevOps & Orchestration", proficiency: 88 },
  { id: "s-d8", name: "Python, SQL & Scala", category: "Programming Languages", proficiency: 95 },
  { id: "s-d9", name: "Trino & Starburst SQL", category: "Distributed Compute", proficiency: 90 },
  { id: "s-d10", name: "Ray Core & Distributed ML", category: "Distributed Compute", proficiency: 85 },
];

export const SEED_CERTIFICATIONS: CertificationItem[] = [
  {
    id: "cert-1",
    title: "AWS Certified Solutions Architect – Professional",
    issuer: "Amazon Web Services (AWS)",
    issueDate: "2024",
    credentialId: "AWS-PSA-984210",
    credentialUrl: "https://aws.amazon.com/verification",
    badgeType: "aws",
    skillsCovered: ["Amazon EMR", "AWS Glue", "Amazon S3 Lake", "Athena", "Kinesis Streaming", "Cloud Security"],
  },
  {
    id: "cert-2",
    title: "Databricks Certified Data Engineer Professional",
    issuer: "Databricks",
    issueDate: "2024",
    credentialId: "DB-DEP-883912",
    credentialUrl: "https://credentials.databricks.com",
    badgeType: "databricks",
    skillsCovered: ["Apache Spark", "Delta Lake", "Unity Catalog", "Medallion Architecture", "Auto Loader"],
  },
  {
    id: "cert-3",
    title: "Confluent Certified Administrator for Apache Kafka (CCAK)",
    issuer: "Confluent",
    issueDate: "2023",
    credentialId: "CCAK-410925",
    credentialUrl: "https://www.confluent.io/certification/",
    badgeType: "confluent",
    skillsCovered: ["Kafka Cluster Design", "Partition Rebalancing", "Schema Registry", "Kafka Connect", "Security ACLs"],
  },
  {
    id: "cert-4",
    title: "Certified Kubernetes Application Developer (CKAD)",
    issuer: "Cloud Native Computing Foundation (CNCF)",
    issueDate: "2023",
    credentialId: "CKAD-551042",
    credentialUrl: "https://www.cncf.io/certification/ckad/",
    badgeType: "kubernetes",
    skillsCovered: ["Pod Lifecycle", "StatefulSets", "Deployments & Services", "ConfigMaps & Secrets", "K8s Operators"],
  },
];
