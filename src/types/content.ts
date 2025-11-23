import type { ReactNode } from "react";

export type ProjectFrontmatter = {
  slug: string;
  title: string;
  summary: string;
  stack: string[];
  category?: "web" | "web3" | "tools";
  role: string;
  features: string[];
  impact: string;
  demoUrl?: string;
  repoUrl?: string;
  cover: string;
  date: string;
  status?: "draft" | "published";
};

export type ProjectDocument = ProjectFrontmatter & {
  content: ReactNode;
};

export type SkillLevel = "Foundational" | "Intermediate" | "Advanced" | "Expert";

export type SkillFrequency = "Daily" | "Weekly" | "Occasionally" | "Learning";

export type SkillEvidenceLinkType = "repo" | "demo" | "case" | "certificate" | "article";

export type SkillEvidenceLink = {
  type: SkillEvidenceLinkType;
  url: string;
  label?: string;
};

export type SkillItem = {
  name: string;
  category: string;
  level: SkillLevel;
  frequency: SkillFrequency;
  since: number;
  projects: number;
  lastUsed?: string;
  links?: SkillEvidenceLink[];
  description?: string;
  icon?: string;
};

export type SkillsCollection = {
  skills: SkillItem[];
};

export type EducationItem = {
  school: string;
  major: string;
  start: string;
  end: string | null;
  highlights: string[];
};

export type CertificateItem = {
  title: string;
  file: string;
};

export type SocialLink = {
  platform: "github" | "linkedin" | "instagram" | "tiktok" | "youtube" | "x" | "email";
  href: string;
  label: string;
};

export type Testimonial = {
  name: string;
  role: string;
  content: string;
  avatar?: string;
  sourceLink?: string;
};

export type BlogPostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  readingTime: string;
  cover?: string;
};
