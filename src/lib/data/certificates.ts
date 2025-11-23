import type { CertificateItem } from "@/types/content";
import certificatesJson from "@content/data/certificates.json";

export const certificatesData = certificatesJson as CertificateItem[];

export function getFeaturedCertificates(limit = 4): CertificateItem[] {
  return certificatesData.slice(0, limit);
}
