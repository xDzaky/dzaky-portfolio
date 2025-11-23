import type { Metadata } from "next";

import { Container } from "@/components/shared/container";
import { RevealSection } from "@/components/shared/reveal-section";
import { SectionHeading } from "@/components/shared/section-heading";
import { CertificatesGrid } from "@/components/sections/certificates-grid";
import { certificatesData } from "@/lib/data/certificates";

export const metadata: Metadata = {
  title: "Certificates",
  description: "Kumpulan sertifikat yang mendokumentasikan perjalanan belajar teknologi.",
};

export default function CertificatesPage() {
  return (
    <section className="py-16">
      <Container>
        <SectionHeading
          title="Certificates"
          subtitle="Dokumentasi pencapaian belajar dari bootcamp, kelas online, dan kompetisi."
        />
        <CertificatesGrid items={certificatesData} className="mt-10" />
      </Container>
    </section>
  );
}
