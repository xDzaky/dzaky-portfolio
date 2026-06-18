import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { motion, AnimatePresence } from "motion/react";
import { projects } from "@/data/portfolio";
import { ExternalLink, Github, BookOpen, ArrowLeft } from "lucide-react";

const scaleAnimation = {
  closed: {
    scale: 0,
    transition: { duration: 0.4, ease: [0.32, 0, 0.67, 0] as const },
    x: "-50%",
    y: "-50%",
  },
  enter: {
    scale: 1,
    transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] as const },
    x: "-50%",
    y: "-50%",
  },
  initial: { scale: 0, x: "-50%", y: "-50%" },
};

type ModalState = { active: boolean; index: number };
type FilterType = "All" | "Web" | "Web3" | "Tools";

export function AllProjects() {
  const [filter, setFilter] = useState<FilterType>("All");
  const [modal, setModal] = useState<ModalState>({ active: false, index: 0 });

  const filteredProjects = projects.filter((project) => {
    if (filter === "All") return true;
    return project.category.toLowerCase() === filter.toLowerCase();
  });

  useEffect(() => {
    setModal({ active: false, index: 0 });
  }, [filter]);

  return (
    <section className="py-24 bg-background text-foreground overflow-hidden min-h-screen">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-10">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors group"
          >
            <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
            Kembali ke Beranda
          </a>
        </div>

        {/* Header & Filter Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground">
              Semua Proyek &amp; Eksperimen
            </h1>
            <p className="text-sm font-semibold tracking-widest uppercase text-primary mt-2">
              Koleksi Lengkap Portofolio ({projects.length})
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {(["All", "Web", "Web3", "Tools"] as FilterType[]).map((cat) => (
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

        {/* Desktop View: Interactive Hover Rows */}
        <div className="hidden lg:block relative min-h-[40vh] border-b border-border">
          <div className="flex flex-col w-full">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <ProjectRow
                  key={project.title}
                  index={index}
                  project={project}
                  setModal={setModal}
                />
              ))}
            </AnimatePresence>
          </div>

          <HoverModal modal={modal} projects={filteredProjects} />
        </div>

        {/* Mobile & Tablet View: Static Cards */}
        <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              onClick={() => {
                window.location.hash = `#/project/${project.slug}`;
              }}
              className="rounded-3xl border border-border bg-card/40 backdrop-blur-sm overflow-hidden flex flex-col h-full shadow-md cursor-pointer group"
            >
              {/* Project Image */}
              <div className="h-48 w-full overflow-hidden relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 right-4 bg-background/80 backdrop-blur px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-primary border border-border">
                  {project.category}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2 leading-tight group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-4 line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech stack tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] font-semibold text-muted-foreground bg-muted border border-border/50 px-2 py-0.5 rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Project Links */}
                <div className="flex items-center gap-3 border-t border-border/50 pt-4 mt-auto" onClick={(e) => e.stopPropagation()}>
                  {project.links.caseStudy && (
                    <a
                      href={project.links.caseStudy}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                    >
                      <BookOpen className="size-3.5" />
                      Case Study
                    </a>
                  )}
                  {project.links.liveDemo && project.links.liveDemo !== "#" && (
                    <a
                      href={project.links.liveDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                    >
                      <ExternalLink className="size-3.5" />
                      Live Demo
                    </a>
                  )}
                  {project.links.code && project.links.code !== "#" && (
                    <a
                      href={project.links.code}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline ml-auto"
                    >
                      <Github className="size-3.5" />
                      Code
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

type ProjectRowProps = {
  index: number;
  project: typeof projects[0];
  setModal: (state: ModalState) => void;
};

function ProjectRow({ index, project, setModal }: ProjectRowProps) {
  return (
    <motion.div
      layout
      onMouseEnter={() => setModal({ active: true, index })}
      onMouseLeave={() => setModal({ active: false, index })}
      onClick={() => {
        window.location.hash = `#/project/${project.slug}`;
      }}
      className="group flex w-full items-center justify-between border-t border-border py-8 hover:opacity-40 transition-opacity duration-200 cursor-pointer"
    >
      {/* Title & Stack (Left Side) */}
      <div className="flex flex-col gap-2">
        <h3 className="text-3xl font-bold tracking-tight text-foreground transition-all duration-300 group-hover:translate-x-2.5">
          {project.title}
        </h3>
        <div className="flex flex-wrap gap-2 transition-all duration-300 group-hover:translate-x-2.5">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="text-[10px] font-semibold text-muted-foreground bg-muted border border-border/50 px-2.5 py-0.5 rounded-full hover:border-primary/30"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Category & Action links (Right Side) */}
      <div className="flex items-center gap-8 transition-all duration-300 group-hover:-translate-x-2.5">
        <span className="text-xs font-semibold uppercase tracking-widest text-primary/80 bg-primary/10 border border-primary/20 px-3 py-1 rounded-full">
          {project.category}
        </span>

        {/* Project links on row */}
        <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
          {project.links.caseStudy && (
            <a
              href={project.links.caseStudy}
              title="Case Study"
              className="p-2 rounded-full border border-border bg-background hover:bg-primary/10 hover:text-primary transition-colors"
            >
              <BookOpen className="size-4" />
            </a>
          )}
          {project.links.liveDemo && project.links.liveDemo !== "#" && (
            <a
              href={project.links.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              title="Live Demo"
              className="p-2 rounded-full border border-border bg-background hover:bg-primary/10 hover:text-primary transition-colors"
            >
              <ExternalLink className="size-4" />
            </a>
          )}
          {project.links.code && project.links.code !== "#" && (
            <a
              href={project.links.code}
              target="_blank"
              rel="noopener noreferrer"
              title="Code"
              className="p-2 rounded-full border border-border bg-background hover:bg-primary/10 hover:text-primary transition-colors"
            >
              <Github className="size-4" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

type HoverModalProps = {
  modal: ModalState;
  projects: typeof projects;
};

function HoverModal({ modal, projects }: HoverModalProps) {
  const { active, index } = modal;
  const modalContainer = useRef<HTMLDivElement>(null);
  const cursor = useRef<HTMLDivElement>(null);
  const cursorLabel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const xMoveContainer = gsap.quickTo(modalContainer.current, "left", {
      duration: 0.8,
      ease: "power3",
    });
    const yMoveContainer = gsap.quickTo(modalContainer.current, "top", {
      duration: 0.8,
      ease: "power3",
    });
    const xMoveCursor = gsap.quickTo(cursor.current, "left", {
      duration: 0.5,
      ease: "power3",
    });
    const yMoveCursor = gsap.quickTo(cursor.current, "top", {
      duration: 0.5,
      ease: "power3",
    });
    const xMoveCursorLabel = gsap.quickTo(cursorLabel.current, "left", {
      duration: 0.45,
      ease: "power3",
    });
    const yMoveCursorLabel = gsap.quickTo(cursorLabel.current, "top", {
      duration: 0.45,
      ease: "power3",
    });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      xMoveContainer(clientX);
      yMoveContainer(clientY);
      xMoveCursor(clientX);
      yMoveCursor(clientY);
      xMoveCursorLabel(clientX);
      yMoveCursorLabel(clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      <motion.div
        animate={active ? "enter" : "closed"}
        className="pointer-events-none fixed z-30 flex h-[280px] w-[380px] items-center justify-center overflow-hidden bg-background border border-border shadow-2xl rounded-2xl"
        initial="initial"
        ref={modalContainer}
        variants={scaleAnimation}
      >
        <div
          className="absolute h-full w-full transition-[top] duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
          style={{ top: `${index * -100}%` }}
        >
          {projects.map((project, idx) => (
            <div
              className="flex h-full w-full items-center justify-center relative bg-muted"
              key={idx}
            >
              <img
                alt={project.title}
                className="h-full w-full object-cover"
                src={project.image}
              />
            </div>
          ))}
        </div>
      </motion.div>
      <motion.div
        animate={active ? "enter" : "closed"}
        className="pointer-events-none fixed z-40 flex h-16 w-16 items-center justify-center rounded-full bg-primary font-bold text-xs text-primary-foreground shadow-lg shadow-primary/20"
        initial="initial"
        ref={cursor}
        variants={scaleAnimation}
      />
      <motion.div
        animate={active ? "enter" : "closed"}
        className="pointer-events-none fixed z-40 flex h-16 w-16 items-center justify-center rounded-full bg-transparent font-bold text-xs text-primary-foreground"
        initial="initial"
        ref={cursorLabel}
        variants={scaleAnimation}
      >
        Open
      </motion.div>
    </>
  );
}
