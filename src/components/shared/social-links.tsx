import Link from "next/link";
import { Github, Instagram, Linkedin, Mail, Youtube } from "lucide-react";

import { socialLinks } from "@/config/site";
import { cn } from "@/lib/utils";

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={className}
      fill="currentColor"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.22h-3.16v12.03a2.89 2.89 0 1 1-2.89-2.89c.31 0 .61.05.9.14V8.53a6.05 6.05 0 0 0-.9-.07A6.06 6.06 0 1 0 15.83 14.5V8.41a7.4 7.4 0 0 0 4.25 1.35V6.69h-.49Z" />
    </svg>
  );
}

const iconMap = {
  github: Github,
  instagram: Instagram,
  linkedin: Linkedin,
  tiktok: TikTokIcon,
  youtube: Youtube,
  email: Mail,
} as const;

export function SocialLinks({
  className,
  variant = "default",
}: {
  className?: string;
  variant?: "default" | "hero";
}) {
  const isHero = variant === "hero";

  return (
    <div
      className={cn(
        "flex items-center gap-3",
        isHero && "w-fit rounded-2xl border border-border/60 bg-background/85 p-2.5 shadow-[0_20px_40px_-28px_theme(colors.primary/70)] backdrop-blur-sm",
        className,
      )}
    >
      {socialLinks.map((link) => {
        const Icon = iconMap[link.platform as keyof typeof iconMap];
        if (!Icon) return null;
        return (
          <div key={link.href} className="group relative">
            <Link
              href={link.href}
              target={link.platform === "email" ? undefined : "_blank"}
              rel="noreferrer noopener"
              aria-label={link.label}
              title={link.label}
              className={cn(
                "inline-flex items-center justify-center overflow-hidden rounded-full border transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
                isHero
                  ? "h-12 w-12 border-primary/25 bg-background text-foreground shadow-[0_10px_24px_-16px_theme(colors.black)] hover:border-primary/55 hover:bg-primary/10 hover:text-primary"
                  : "h-11 w-11 border-border/60 bg-background/80 text-muted-foreground hover:text-primary",
              )}
            >
              <span className="pointer-events-none absolute inset-0 rounded-full bg-primary/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden />
              <span className="pointer-events-none absolute inset-0 rounded-full shadow-[0_12px_32px_-22px_theme(colors.primary/70)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden />
              <Icon className={cn("relative", isHero ? "h-[18px] w-[18px]" : "h-4 w-4")} />
            </Link>
            <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-border/60 bg-background/95 px-2 py-1 text-[11px] font-medium text-foreground opacity-0 shadow-sm transition-all duration-200 group-hover:-translate-y-0.5 group-hover:opacity-100 group-focus-within:opacity-100">
              {link.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
