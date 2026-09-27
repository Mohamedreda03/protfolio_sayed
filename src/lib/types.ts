export interface ImpactMetric {
  label: string;
  value: string;
}

export interface PipelineNode {
  id: string;
  name: string;
  role: string;
  technology: string;
}

export interface ShowcaseItem {
  $id?: string;
  id: string;
  title: string;
  slug: string;
  category: string;
  summary: string;
  description: string;
  clientOrCompany?: string;
  year: string;
  featured: boolean;
  tags: string[];
  thumbnailUrl?: string;
  impactMetrics?: ImpactMetric[];
  pipelineNodes?: PipelineNode[];
  githubUrl?: string;
  liveUrl?: string;
}

export interface SkillItem {
  $id?: string;
  id: string;
  name: string;
  category: string;
  proficiency: number; // 0 to 100
  iconName?: string;
}

export interface CertificationItem {
  $id?: string;
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialId?: string;
  credentialUrl?: string;
  badgeType: "aws" | "databricks" | "confluent" | "kubernetes";
  skillsCovered: string[];
}

export interface Profile {
  $id?: string;
  name: string;
  title: string;
  summary: string;
  avatarUrl: string;
  logoUrl?: string;
  logoText?: string;
  resumeUrl: string;
  socials: {
    github?: string;
    linkedin?: string;
    email: string;
    twitter?: string;
  };
}

export interface Inquiry {
  $id?: string;
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}
