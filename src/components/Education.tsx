import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion } from "motion/react";
import { education } from "@/data/portfolio";
import { GraduationCap, Calendar, MapPin, Code2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function Education() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!lineRef.current || !containerRef.current) return;

      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 30%",
            end: "bottom 70%",
            scrub: true,
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section id="education" className="py-24 bg-background relative overflow-hidden" ref={containerRef}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center md:text-left mb-16">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-foreground">
            Riwayat Pendidikan
          </h2>
          <p className="text-sm font-semibold tracking-widest uppercase text-primary mt-2">
            Pendidikan &amp; Perjalanan Akademik
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Static Background Line */}
          <div className="absolute left-6 md:left-10 top-4 bottom-4 w-0.5 bg-border/60 pointer-events-none" />

          {/* Animated GSAP Progress Line */}
          <div
            ref={lineRef}
            className="absolute left-6 md:left-10 top-4 bottom-4 w-0.5 bg-primary origin-top pointer-events-none"
            style={{ transformOrigin: "top" }}
          />

          {/* Timeline Items */}
          <div className="space-y-12">
            {education.map((item, idx) => {
              // Alternate icons for visuals
              const isSchool = idx === 0 || idx === 2;
              const Icon = isSchool ? GraduationCap : Code2;

              return (
                <div key={idx} className="relative pl-16 md:pl-24">
                  {/* Timeline Dot/Icon */}
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="absolute left-6 md:left-10 -translate-x-1/2 top-1 z-20 flex size-10 md:size-12 items-center justify-center rounded-full border border-border bg-card text-primary shadow-md"
                  >
                    <Icon className="size-5 md:size-6" />
                  </motion.div>

                  {/* Card content */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ type: "spring", stiffness: 100, damping: 15, delay: idx * 0.15 }}
                    className="rounded-3xl border border-border bg-card/30 p-6 md:p-8 backdrop-blur-sm shadow-lg shadow-primary/5 hover:shadow-primary/10 transition-shadow duration-300"
                  >
                    {/* Period badge */}
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                      <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                        <Calendar className="size-4 text-primary" />
                        <span>{item.period}</span>
                      </div>
                      <span className="rounded-full bg-primary/10 border border-primary/20 px-3 py-1 text-xs font-semibold text-primary">
                        {item.type}
                      </span>
                    </div>

                    {/* School/Title & Program */}
                    <h3 className="text-xl md:text-2xl font-bold text-foreground mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm font-medium text-muted-foreground flex items-center gap-1.5 mb-4">
                      <MapPin className="size-3.5 text-muted-foreground/60" />
                      <span>{item.program}</span>
                    </p>

                    {/* Description Points */}
                    <ul className="space-y-2 text-sm text-muted-foreground list-none pl-0">
                      {item.points.map((pt, pIdx) => (
                        <li key={pIdx} className="relative pl-5 before:content-['✦'] before:absolute before:left-0 before:text-primary/70 before:font-bold">
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
