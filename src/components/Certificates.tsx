import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { certificates } from "@/data/portfolio";
import { Award, Sparkles, Eye, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Certificates() {
  const [activeImage, setActiveImage] = useState<string | null>(null);
  
  // Show only the 3 latest/first certificates
  const latestCertificates = certificates.slice(0, 3);

  return (
    <section id="certificates" className="py-24 bg-card/10 border-y border-border/50 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 size-[500px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-foreground">
            Sertifikasi &amp; Prestasi
          </h2>
          <p className="text-sm font-semibold tracking-widest uppercase text-primary mt-2">
            Pengakuan Resmi &amp; Penghargaan
          </p>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestCertificates.map((cert, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-3xl border border-border bg-card/60 backdrop-blur-md shadow-md hover:shadow-primary/5 hover:border-primary/30 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Card top border glow on hover */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div>
                {/* Certificate Image */}
                <div 
                  className="aspect-video w-full overflow-hidden relative cursor-pointer group/img bg-muted rounded-t-2xl"
                  onClick={() => setActiveImage(cert.image)}
                >
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
                    loading="lazy"
                    decoding="async"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/45 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                    <div className="size-10 rounded-full bg-background/90 text-foreground flex items-center justify-center shadow-lg transform translate-y-2 group-hover/img:translate-y-0 transition-transform duration-300">
                      <Eye className="size-5" />
                    </div>
                    <span className="text-white text-xs font-semibold">Lihat Gambar</span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:scale-115 transition-transform duration-300">
                      {idx === 0 ? (
                        <Sparkles className="size-4" />
                      ) : (
                        <Award className="size-4" />
                      )}
                    </div>
                    <div>
                      <span className="text-[9px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                        {cert.category}
                      </span>
                      <h3 className="text-sm font-bold text-foreground mt-1 leading-tight group-hover:text-primary transition-colors duration-200">
                        {cert.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs leading-relaxed text-muted-foreground mt-2 line-clamp-3">
                    {cert.description}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full text-xs cursor-pointer"
                  onClick={() => setActiveImage(cert.image)}
                >
                  Buka Pratinjau
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <div className="flex justify-center mt-12">
          <a href="#/certificates">
            <Button variant="outline" size="lg" className="group cursor-pointer">
              Lihat Semua Sertifikat ({certificates.length})
              <ArrowRight className="ml-2 size-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </a>
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
