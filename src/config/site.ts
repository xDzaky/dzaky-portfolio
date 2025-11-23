import profile from "@content/data/profile.json";
import socials from "@content/data/socials.json";

import type { SocialLink } from "@/types/content";

export const siteConfig = {
  name: profile.name,
  title: profile.headline,
  headline: profile.headline,
  subHeadline: profile.about,
  description: profile.about,
  location: profile.location,
  timezone: profile.timezone,
  availability: profile.availability.join(" & "),
  email: profile.email,
  resumeUrl: profile.resumeUrl,
  heroCta: {
    primary: {
      label: "Hubungi Saya",
      href: "/contact",
    },
    secondary: {
      label: "Lihat Proyek",
      href: "/projects",
    },
    tertiary: {
      label: "Unduh CV",
      href: profile.resumeUrl,
    },
  },
};

const labelMap: Record<string, string> = {
  github: "GitHub",
  instagram: "Instagram",
  linkedin: "LinkedIn",
  tiktok: "TikTok",
  youtube: "YouTube",
};

export const socialLinks: SocialLink[] = (
  Object.entries(socials) as [keyof typeof socials, string][]
)
  .filter(([, href]) => typeof href === "string" && href.trim().length > 0)
  .map(([platform, href]) => ({
    platform: platform as SocialLink["platform"],
    href,
    label: labelMap[platform] ?? platform,
  }))
  .concat({
    platform: "email",
    href: `mailto:${profile.email}`,
    label: "Email",
  });

export const resumeLinks = siteConfig.resumeUrl
  ? [{ label: "Unduh CV", href: siteConfig.resumeUrl }]
  : [];
