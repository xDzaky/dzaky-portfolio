import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { certificates } from "@/data/portfolio";
import { ArrowLeft, Eye, X } from "lucide-react";
import { Button } from "@/components/ui/button";

type FilterType = "All" | "Competition" | "Bootcamp" | "Certificate" | "Course" | "Hardware" | "Training";

export function AllCertificates() {
  const [filter, setFilter] = useState<FilterType>("All");
  const [activeImage, setActiveImage] = useState<string | null>(null);

  const filteredCertificates = certificates.filter((cert) => {
    if (filter === "All") return true;
    return cert.category === filter;
  });

  return (
    <section className="py-24 bg-background text-foreground relative overflow-hidden min-h-screen">
      {/* Background radial glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 size-[600px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Back Button */}
        <div className="mb-10">
          <a
            href="#certificates"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors group"
          >
            <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
            Kembali ke Beranda
          </a>
        </div>

        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
          <div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground">
              Semua Sertifikasi &amp; Prestasi
            </h1>
            <p className="text-sm font-semibold tracking-widest uppercase text-primary mt-2">
              Pengakuan Resmi &amp; Penghargaan ({certificates.length})
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {(["All", "Competition", "Bootcamp", "Certificate", "Course", "Hardware", "Training"] as FilterType[]).map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`relative px-4 py-1.5 text-xs font-semibold rounded-full border transition-colors cursor-pointer ${
                  filter === cat
                    ? "border-primary text-primary bg-primary/5"
                    : "border-border text-muted-foreground hover:text-foreground hover:bg-card/50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredCertificates.map((cert) => (
              <motion.div
                key={cert.title}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -6 }}
                className="group relative overflow-hidden rounded-3xl border border-border bg-card/60 backdrop-blur-md shadow-md hover:shadow-primary/5 hover:border-primary/30 transition-all duration-300 flex flex-col h-full"
              >
                {/* Card top border glow on hover */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Certificate Image */}
                <div 
                  className="aspect-video w-full overflow-hidden relative cursor-pointer group/img bg-muted bg-cover bg-center"
                  onClick={() => setActiveImage(cert.image)}
                >
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/45 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                    <div className="size-10 rounded-full bg-background/90 text-foreground flex items-center justify-center shadow-lg transform translate-y-2 group-hover/img:translate-y-0 transition-transform duration-300">
                      <Eye className="size-5" />
                    </div>
                    <span className="text-white text-xs font-semibold">Lihat Gambar</span>
                  </div>
                </div>

                <div className="p-6 flex flex-col justify-between flex-grow">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                      {cert.category}
                    </span>
                    <h3 className="text-base font-bold text-foreground mt-3 leading-tight group-hover:text-primary transition-colors duration-200">
                      {cert.title}
                    </h3>
                    <p className="text-xs leading-relaxed text-muted-foreground mt-2 line-clamp-3">
                      {cert.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-4 border-t border-border/50">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full text-xs cursor-pointer"
                      onClick={() => setActiveImage(cert.image)}
                    >
                      Buka Pratinjau
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-md p-4 sm:p-6 md:p-10"
            onClick={() => setActiveImage(null)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="relative max-w-4xl max-h-[85vh] w-full bg-card border border-border rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={activeImage}
                alt="Certificate Full View"
                className="max-w-full max-h-[80vh] object-contain"
              />
              <button
                onClick={() => setActiveImage(null)}
                className="absolute top-4 right-4 p-2 rounded-full border border-border bg-background/80 hover:bg-accent text-foreground transition-colors cursor-pointer"
                aria-label="Close preview"
              >
                <X className="size-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
