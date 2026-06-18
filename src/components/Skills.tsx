import { motion } from "motion/react";
import { skills } from "@/data/portfolio";
import { LogoCloud } from "@/components/ui/logo-cloud";

const techLogos = [
  { src: "https://cdn.simpleicons.org/html5/000000", alt: "HTML" },
  { src: "https://cdn.simpleicons.org/css/000000", alt: "CSS" },
  { src: "https://cdn.simpleicons.org/javascript/000000", alt: "JavaScript" },
  { src: "https://cdn.simpleicons.org/typescript/000000", alt: "TypeScript" },
  { src: "https://cdn.simpleicons.org/react/000000", alt: "React" },
  { src: "https://cdn.simpleicons.org/nextdotjs/000000", alt: "Next.js" },
  { src: "https://cdn.simpleicons.org/tailwindcss/000000", alt: "Tailwind CSS" },
  { src: "https://cdn.simpleicons.org/vite/000000", alt: "Vite" },
  { src: "https://cdn.simpleicons.org/laravel/000000", alt: "Laravel" },
  { src: "https://cdn.simpleicons.org/php/000000", alt: "PHP" },
  { src: "https://cdn.simpleicons.org/python/000000", alt: "Python" },
  { src: "https://cdn.simpleicons.org/figma/000000", alt: "Figma" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg", alt: "Canva" },
];

export function Skills() {
  // Group skills by category
  const categories = Array.from(new Set(skills.map((s) => s.category)));

  const getPercentage = (level: string) => {
    switch (level) {
      case "Advanced":
        return 90;
      case "Intermediate":
        return 70;
      case "Foundational":
        return 45;
      default:
        return 50;
    }
  };

  return (
    <section id="skills" className="py-24 bg-card/10 border-y border-border/50 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-0 right-1/4 -z-10 size-96 rounded-full bg-primary/5 blur-3xl pointer-events-none" />

      {/* Mini Marquee */}
      <div className="border-b border-border/40 pb-12 mb-16">
        <div className="max-w-4xl mx-auto px-4">
          <LogoCloud logos={techLogos} />
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-foreground">
            Keahlian &amp; Teknologi
          </h2>
          <p className="text-sm font-semibold tracking-widest uppercase text-primary mt-2">
            Skill Set &amp; Tools
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          {categories.map((cat, idx) => {
            const filteredSkills = skills.filter((s) => s.category === cat);
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -4 }}
                className="rounded-3xl border border-border bg-card/60 p-6 md:p-8 backdrop-blur-md shadow-md transition-all duration-300"
              >
                <h3 className="text-lg font-bold text-foreground mb-6 pb-2 border-b border-border/40">
                  {cat}
                </h3>
                <div className="space-y-5">
                  {filteredSkills.map((skill) => {
                    const pct = getPercentage(skill.level);
                    return (
                      <div key={skill.name} className="space-y-2">
                        <div className="flex justify-between items-end text-xs font-semibold">
                          <span className="text-foreground">{skill.name}</span>
                          <span className="text-muted-foreground text-[10px] uppercase">
                            {skill.level}
                          </span>
                        </div>
                        {/* Progress Bar */}
                        <div className="h-1.5 w-full rounded-full bg-border/40 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${pct}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                            className="h-full rounded-full bg-primary"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Disclaimer / Note */}
        <div className="mt-16 text-center max-w-xl mx-auto">
          <p className="text-sm text-muted-foreground leading-relaxed italic">
            "Saya terus mengasah skill melalui proyek nyata, pelatihan, dan eksperimen teknologi baru."
          </p>
        </div>
      </div>
    </section>
  );
}
