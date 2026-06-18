import { motion } from "motion/react";
import { Quote, Star, Sparkles, ExternalLink } from "lucide-react";

const testimonials = [
  {
    name: "Neezar Abdurrahman",
    role: "Fullstack Developer",
    portfolioUrl: "https://neezar.tech/",
    text: "Dzaki itu tipe partner yang cepat tanggap jika mengerjakan project. Mulai dari kolaborasi di Robotik Bootcamp hingga ExplorAItion, kontribusinya di codingan selalu solid dan solutif. Codingannya bagus dan seru banget diajak brainstorming bareng.",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    rating: 5,
  },
  {
    name: "Mahesa Ridhoutan Farhan Tafriyan",
    role: "Cyber Security & Web Developer",
    text: "Pernah setim sama Dzaki pas persiapan Lomba Kompetensi Siswa (LKS). Kerja samanya bener-bener bagus. Kombinasi skill fullstack dia dan pemahaman security dari saya bikin development system jadi aman, cepat, dan matang.",
    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80",
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-24 bg-card/5 border-t border-border/50 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 size-[600px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-foreground flex items-center justify-center gap-3">
            <Sparkles className="size-6 md:size-8 text-primary animate-pulse" />
            Wall of Love
          </h2>
          <p className="text-sm font-semibold tracking-widest uppercase text-primary mt-2">
            Rekomendasi &amp; Testimoni Rekan Kerja
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-3xl border border-border bg-card/60 p-6 md:p-8 backdrop-blur-md shadow-md hover:shadow-primary/5 hover:border-primary/30 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Card top border glow on hover */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative">
                {/* Quote Icon */}
                <Quote className="absolute -top-2 -left-2 size-8 text-primary/10 group-hover:text-primary/20 transition-colors pointer-events-none" />
                
                {/* Stars */}
                <div className="flex gap-1 mb-4 pl-6">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star key={i} className="size-3.5 fill-primary text-primary" />
                  ))}
                </div>

                {/* Text */}
                <p className="text-sm leading-relaxed text-muted-foreground pl-6 relative z-10 italic">
                  &ldquo;{item.text}&rdquo;
                </p>
              </div>

              {/* User Profile Info */}
              <div className="flex items-center justify-between mt-8 pt-4 border-t border-border/50 pl-6">
                <div className="flex items-center gap-4">
                  <div className="size-10 rounded-full overflow-hidden border border-border bg-muted shrink-0">
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div>
                    {item.portfolioUrl ? (
                      <a 
                        href={item.portfolioUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-bold text-foreground hover:text-primary transition-colors flex items-center gap-1 group/link"
                      >
                        {item.name}
                        <ExternalLink className="size-3 text-muted-foreground group-hover/link:text-primary transition-colors shrink-0" />
                      </a>
                    ) : (
                      <h4 className="text-sm font-bold text-foreground">
                        {item.name}
                      </h4>
                    )}
                    <p className="text-[11px] text-muted-foreground mt-0.5">
                      {item.role}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
