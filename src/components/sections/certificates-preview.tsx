import Link from "next/link";

import { Container } from "@/components/shared/container";
import { RevealSection } from "@/components/shared/reveal-section";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { CertificatesGrid } from "@/components/sections/certificates-grid";
import { getFeaturedCertificates } from "@/lib/data/certificates";

export function CertificatesPreview() {
  const featuredCertificates = getFeaturedCertificates(4);

  return (
    <RevealSection className="py-16">
      <Container>
        <SectionHeading
          eyebrow="Validation"
          title="Certificates"
          subtitle="Pengakuan resmi dari lembaga dan pelatihan teknologi."
        />
        <CertificatesGrid items={featuredCertificates} className="mt-10 xl:grid-cols-4" />
        <div className="mt-8 flex justify-end">
          <Button asChild>
            <Link href="/certificates">Lihat semua certificates</Link>
          </Button>
        </div>
      </Container>
    </RevealSection>
  );
}
