"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { GraduationCap, School, BookOpen } from "lucide-react";

import type { EducationItem } from "@/types/content";
import { cn } from "@/lib/utils";

type EducationVerticalTimelineProps = {
  items: EducationItem[];
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const highlightVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

function parseDateString(value: string) {
  if (!value) {
    return null;
  }
  const [yearPart, monthPart] = value.split("-").map(Number);
  if (!yearPart || !monthPart) {
    return null;
  }

  return new Date(Date.UTC(yearPart, monthPart - 1, 1));
}

function formatPeriod(start: string, end: string | null) {
  const formatter = new Intl.DateTimeFormat("id-ID", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

  const startDate = parseDateString(start);
  const endDate = end ? parseDateString(end) : null;
  const startLabel = !startDate ? start : formatter.format(startDate);
  const endLabel = !endDate ? "Sekarang" : formatter.format(endDate);
  return `${startLabel.toUpperCase()} • ${endLabel.toUpperCase()}`;
}

const educationIconMap: Record<string, typeof GraduationCap> = {
  smk: School,
  sma: School,
  "smk negeri 1 kota probolinggo": School,
  mts: BookOpen,
  smp: BookOpen,
  "mtsn 1 kota probolinggo": BookOpen,
  sd: GraduationCap,
  "sd negeri wiroborang 1 probolinggo": GraduationCap,
};

function getEducationIcon(level: string) {
  const key = level.toLowerCase();
  const Icon = educationIconMap[key] ?? GraduationCap;
  return <Icon className="h-4 w-4" />;
}

type EducationCardProps = {
  item: EducationItem;
  align?: "left" | "right" | "center";
};

function EducationCard({ item, align = "left" }: EducationCardProps) {
  return (
    <motion.article
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.35 }}
      className={cn(
        "w-full max-w-xl rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-background/30 to-background/80 p-5 text-white shadow-[0_25px_60px_rgba(2,6,23,0.45)] backdrop-blur-2xl sm:p-7 md:max-w-[420px]",
        align === "center" && "mx-auto",
        align === "right" && "md:text-right",
      )}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-white/80 sm:text-sm">{formatPeriod(item.start, item.end)}</p>
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-[11px] uppercase tracking-[0.4em] text-white/70">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white">
            {getEducationIcon(item.school)}
          </span>
          Track
        </div>
      </div>
      <h3 className="mt-3 text-2xl font-semibold tracking-tight">{item.school}</h3>
      <p className="text-sm text-white/70">{item.major}</p>
      <motion.ul
        variants={highlightVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="mt-5 grid gap-2.5 text-sm text-white/85"
      >
        {item.highlights.map((highlight) => (
          <li
            key={highlight}
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 leading-relaxed transition duration-300 hover:border-white/30 hover:bg-white/10"
          >
            {highlight}
          </li>
        ))}
      </motion.ul>
    </motion.article>
  );
}

export function EducationVerticalTimeline({ items }: EducationVerticalTimelineProps) {
  const timelineItems = useMemo(
    () => items.slice().sort((a, b) => (a.start > b.start ? -1 : 1)),
    [items],
  );

  return (
    <div className="relative">
      <div className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-white/25 bg-gradient-to-b from-transparent via-white/40 to-transparent md:block" />

      <div className="space-y-16">
        {timelineItems.map((item, index) => {
          const align = index % 2 === 0 ? "left" : "right";

          return (
            <div key={`${item.school}-${item.start}`} className="relative">
              {/* Desktop layout */}
              <div className="hidden md:grid md:grid-cols-[minmax(0,0.85fr)_100px_minmax(0,0.85fr)] md:items-center md:gap-8">
                <div className={cn("md:col-span-1", align === "left" ? "md:justify-self-end" : "md:opacity-0 md:pointer-events-none")}>
                  {align === "left" ? <EducationCard item={item} align="left" /> : null}
                </div>

                <div className="relative hidden h-full w-full md:flex md:flex-col md:items-center md:justify-between">
                  <div className="flex-1">
                    <div className="mx-auto h-full w-px bg-white/30 bg-gradient-to-b from-transparent via-white/30 to-white/60" />
                  </div>
                  <motion.div
                    className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border border-white/30 bg-background/90 shadow-[0_20px_40px_rgba(15,23,42,0.45)] backdrop-blur"
                    animate={{ scale: [1, 1.08, 1] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <span className="absolute inset-0 rounded-full bg-primary/20 blur-xl" />
                    <span className="absolute inset-0 rounded-full bg-primary/10" />
                    <span className="relative z-10 text-white">{getEducationIcon(item.school)}</span>
                  </motion.div>
                  <div className="flex-1">
                    <div className="mx-auto h-full w-px bg-white/30 bg-gradient-to-b from-white/60 via-white/30 to-transparent" />
                  </div>
                </div>

                <div className={cn("md:col-span-1", align === "right" ? "md:justify-self-start" : "md:opacity-0 md:pointer-events-none")}>
                  {align === "right" ? <EducationCard item={item} align="right" /> : null}
                </div>
              </div>

              {/* Mobile layout */}
              <div className="md:hidden">
                <EducationCard item={item} align="center" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
