import type { Metadata } from "next";

import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Resume",
  description: "Download my resume as PDF.",
};

export default function ResumePage() {
  return (
    <section className="py-16">
      <Container>
        <SectionHeading title="Resume" subtitle="Download a PDF of my resume." />
        <div className="mt-6 rounded-lg border p-6 text-sm text-muted-foreground">
          <p>Gunakan tombol berikut untuk melihat atau mengunduh CV terbaru.</p>
          <div className="mt-3 flex flex-wrap gap-4">
            <a
              className="inline-flex text-primary underline-offset-4 hover:underline"
              href={siteConfig.resumeUrl}
              target="_blank"
              rel="noreferrer noopener"
            >
              Lihat CV
            </a>
            <a
              className="inline-flex text-primary underline-offset-4 hover:underline"
              href={siteConfig.resumeUrl}
              download
            >
              Unduh CV
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
