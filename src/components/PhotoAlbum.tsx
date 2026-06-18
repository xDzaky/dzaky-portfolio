import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Eye, X, Image as ImageIcon, Sparkles } from "lucide-react";

type Achievement = {
  image: string;
  text: string;
};

export function PhotoAlbum() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [activeImage, setActiveImage] = useState<string | null>(null);

  useEffect(() => {
    fetch("/images/certificates/achievements.json")
      .then((res) => res.json())
      .then((data) => setAchievements(data))
      .catch((err) => console.error("Error loading achievements:", err));
  }, []);

  return (
    <section id="album" className="py-24 bg-card/10 border-y border-border/50 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 size-[500px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-foreground flex items-center justify-center gap-3">
            <Sparkles className="size-6 md:size-8 text-primary animate-pulse" />
            Galeri Kegiatan
          </h2>
          <p className="text-sm font-semibold tracking-widest uppercase text-primary mt-2">
            Dokumentasi Aktivitas &amp; Pencapaian
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {achievements.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-3xl border border-border bg-card/60 backdrop-blur-md shadow-md hover:shadow-primary/5 hover:border-primary/30 transition-all duration-300 flex flex-col cursor-pointer"
              onClick={() => setActiveImage(item.image)}
            >
              {/* Card top border glow on hover */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Image Container */}
              <div className="aspect-[4/3] w-full overflow-hidden relative bg-muted rounded-t-2xl">
                <img
                  src={item.image}
                  alt={item.text}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                  <div className="size-10 rounded-full bg-background/90 text-foreground flex items-center justify-center shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <Eye className="size-5" />
                  </div>
                  <span className="text-white text-xs font-semibold">Buka Foto</span>
                </div>
              </div>

              {/* Caption Footer */}
              <div className="p-4 flex items-center justify-between bg-card/40 backdrop-blur-sm border-t border-border/50">
                <span className="text-xs font-bold text-foreground tracking-wide line-clamp-1">
                  {item.text}
                </span>
                <ImageIcon className="size-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0 ml-2" />
              </div>
            </motion.div>
          ))}
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
                alt="Gallery Full View"
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
