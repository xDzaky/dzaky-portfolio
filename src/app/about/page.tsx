import type { Metadata } from "next";

import profile from "@content/data/profile.json";

import Image from "next/image";

import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { SocialLinks } from "@/components/shared/social-links";
import { RevealSection } from "@/components/shared/reveal-section";
import { resumeLinks, siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { SiteName } from "@/components/shared/site-name";

export const metadata: Metadata = {
  title: "About",
  description: "About Dzaky — mission, interests, and highlights.",
};

export default function AboutPage() {
  return (
    <RevealSection className="py-16">
      <Container>
        <SectionHeading title="About" subtitle="A brief of who I am and what I value." />
        <div className="mt-8 grid gap-10 md:grid-cols-[1.2fr_1fr]">
          <div className="space-y-4 text-base leading-7 text-muted-foreground">
            <p>
              Saya <SiteName className="font-medium text-foreground" /> — {siteConfig.title} yang berbasis di {siteConfig.location}.
              {" "}Saat ini fokus pada pengembangan antarmuka web yang ringan, konsisten, dan mudah diakses sembari terus
              memperdalam dasar backend.
            </p>
            <p>{profile.about}</p>
            <p>
              Di luar kelas, saya aktif mengikuti pelatihan sekaligus eksperimen teknologi baru. Tujuannya sederhana:
              membawa kebiasaan belajar cepat ke setiap proyek yang saya tangani, baik itu tugas sekolah maupun
              kolaborasi freelance.
            </p>
            <div className="flex gap-3 pt-2">
              {resumeLinks.map((r) => (
                <Button key={r.href} asChild variant="outline">
                  <a href={r.href} target={r.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer noopener">
                    {r.label}
                  </a>
                </Button>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-center gap-5 rounded-3xl border border-border/50 bg-gradient-to-br from-primary/10 via-background to-background/60 p-4 sm:p-5 shadow-[0_35px_70px_-45px_theme(colors.primary/60)] w-full max-w-xs md:ml-auto">
            <div className="relative aspect-square w-full max-w-xs overflow-hidden rounded-[2.5rem] border border-border/50 shadow-lg">
              <Image
                src="https://res.cloudinary.com/dzpa07b4h/image/upload/v1763888924/dzaky_acxfnm.jpg"
                alt={`Foto ${siteConfig.name}`}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 320px, 240px"
                priority
              />
            </div>
              <SocialLinks className="gap-3" />
          </div>
        </div>
      </Container>
    </RevealSection>
  );
}
