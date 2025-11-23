"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

import type { ProjectFrontmatter } from "@/types/content";
import { Badge } from "@/components/ui/badge";
import { HoverCard } from "@/components/ui/animations/HoverCard";

type Props = {
  project: ProjectFrontmatter;
  index?: number;
};

const categoryLabel: Record<NonNullable<ProjectFrontmatter["category"]>, string> = {
  web: "Web",
  web3: "Web3",
  tools: "Tools",
};

export function ProjectCard({ project, index = 0 }: Props) {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const category = project.category ? categoryLabel[project.category] : null;

  return (
    <HoverCard
      as="article"
      className="group h-full overflow-hidden rounded-2xl border border-border/60 bg-background/85 shadow-lg shadow-primary/5 backdrop-blur"
      enableGlow={!prefersReducedMotion}
      tilt={9}
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.45, ease: "easeOut", delay: Math.min(index, 5) * 0.06 }}
      whileHover={prefersReducedMotion ? undefined : { y: -6 }}
    >
      <div className="relative h-44 w-full overflow-hidden bg-muted/60">
        <Image
          src={project.cover}
          alt={project.title}
          fill
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
          priority={index === 0}
          onContextMenu={(e) => e.preventDefault()}
          draggable={false}
        />
        {!prefersReducedMotion && (
          <motion.span
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-primary/25 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        )}
        {category ? (
          <span className="absolute left-4 top-4 inline-flex items-center rounded-full border border-border/40 bg-background/90 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-primary shadow-sm">
            {category}
          </span>
        ) : null}
      </div>
      <div className="relative z-20 flex h-full flex-col gap-4 p-5">
        <div className="space-y-1.5">
          <h3 className="line-clamp-1 text-lg font-semibold text-foreground transition-colors duration-300 group-hover:text-primary">
            {project.title}
          </h3>
          <p className="line-clamp-3 text-sm text-muted-foreground">{project.summary}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {project.stack.slice(0, 4).map((tech) => (
            <Badge key={tech} variant="secondary" className="bg-background/70 text-[0.7rem] font-medium">
              {tech}
            </Badge>
          ))}
        </div>
        <div className="mt-auto flex flex-wrap gap-4 text-sm font-medium">
          <Link
            className="group/case inline-flex items-center gap-1 text-primary transition-colors hover:text-primary/80"
            href={`/projects/${project.slug}`}
          >
            <span className="relative z-10">Case study</span>
            <motion.span
              aria-hidden
              className="inline-block"
              initial={{ x: 0 }}
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 340, damping: 26 }}
            >
              →
            </motion.span>
          </Link>
          {project.demoUrl ? (
            <Link
              className="inline-flex items-center gap-1 text-muted-foreground transition-colors hover:text-foreground"
              href={project.demoUrl}
              target="_blank"
              rel="noreferrer noopener"
            >
              Live demo
              <span aria-hidden>↗</span>
            </Link>
          ) : null}
          {project.repoUrl ? (
            <Link
              className="inline-flex items-center gap-1 text-muted-foreground transition-colors hover:text-foreground"
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer noopener"
            >
              Code
              <span aria-hidden>↗</span>
            </Link>
          ) : null}
        </div>
      </div>
    </HoverCard>
  );
}
