"use client";

import Image from "next/image";
import { ArrowUpRight, X } from "lucide-react";
import { useState } from "react";

import type { CertificateItem } from "@/types/content";
import { cn } from "@/lib/utils";

type CertificatesGridProps = {
  items: CertificateItem[];
  className?: string;
};

export function CertificatesGrid({ items, className }: CertificatesGridProps) {
  const [selected, setSelected] = useState<CertificateItem | null>(null);

  const handleOpen = (certificate: CertificateItem) => {
    setSelected(certificate);
  };

  const handleClose = () => {
    setSelected(null);
  };

  return (
    <>
      <div className={cn("grid gap-6 sm:grid-cols-2 xl:grid-cols-3", className)}>
        {items.length === 0 ? (
          <div className="col-span-full rounded-2xl border border-dashed border-border/60 bg-background/60 p-8 text-center text-sm text-muted-foreground">
            Tidak ada sertifikat yang bisa ditampilkan saat ini.
          </div>
        ) : null}
        <noscript className="col-span-full text-center text-sm text-muted-foreground">
          JavaScript dimatikan. Aktifkan untuk melihat galeri sertifikat.
        </noscript>
        {items.map((certificate, index) => (
          <button
            key={certificate.title}
            type="button"
            onClick={() => handleOpen(certificate)}
            className="group block text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/80 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 via-background to-background shadow-[0_25px_80px_rgba(2,6,23,0.45)] transition-all duration-300 group-hover:-translate-y-2 group-hover:border-white/30">
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={certificate.file}
                  alt={certificate.title}
                  fill
                  sizes="(min-width: 1280px) 320px, (min-width: 768px) 45vw, 90vw"
                  className="bg-muted/40 object-cover transition duration-500 group-hover:scale-105"
                  priority={index === 0}
                  loading={index === 0 ? "eager" : "lazy"}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-70" />
                <span className="absolute left-4 top-4 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-white/80">
                  Preview
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-3 p-5">
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground/80">
                  Certificate
                </span>
                <h3 className="text-lg font-semibold leading-snug text-white">{certificate.title}</h3>
                <p className="text-sm text-muted-foreground">
                  Pengakuan resmi atas pembelajaran intensif yang mendukung karya portofolio.
                </p>
                <div className="mt-auto flex items-center justify-between text-xs text-muted-foreground">
                  <span>Tap untuk melihat</span>
                  <span className="inline-flex items-center gap-1 text-white">
                    <span className="text-sm font-medium">Buka</span>
                    <ArrowUpRight className="h-4 w-4" aria-hidden />
                  </span>
                </div>
              </div>
            </article>
          </button>
        ))}
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={`Certificate ${selected.title}`}
          onClick={handleClose}
        >
          <div
            className="relative w-full max-w-[min(96vw,1100px)] overflow-hidden rounded-2xl border border-white/20 bg-black/80 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={handleClose}
              className="absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/80 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              aria-label="Close certificate"
            >
              <X className="h-5 w-5" aria-hidden />
            </button>
            <div className="relative mx-auto aspect-[4/3] w-full max-h-[78vh] overflow-hidden sm:max-h-[82vh] md:max-h-[85vh]">
              <Image
                src={selected.file}
                alt={selected.title}
                fill
                sizes="90vw"
                className="object-contain"
                priority
              />
            </div>
            <div className="p-4 text-center text-sm text-white/80">{selected.title}</div>
          </div>
        </div>
      )}
    </>
  );
}
