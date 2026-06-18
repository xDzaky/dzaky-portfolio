import { projects } from "@/data/portfolio";
import { ArrowLeft, ExternalLink, Github, BookOpen, Cpu, Trophy, Sparkles, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";

type ProjectDetailProps = {
  slug: string | null;
};

export function ProjectDetail({ slug }: ProjectDetailProps) {
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-8">
        <h2 className="text-2xl font-bold text-foreground">Proyek Tidak Ditemukan</h2>
        <p className="text-muted-foreground mt-2">Maaf, detail proyek yang Anda cari tidak tersedia.</p>
        <a href="#/projects" className="mt-6">
          <Button>Kembali ke Proyek</Button>
        </a>
      </div>
    );
  }

  return (
    <section className="py-20 bg-background text-foreground relative overflow-hidden min-h-screen">
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 size-[600px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Back Button */}
        <div className="mb-8">
          <button
            onClick={() => {
              if (window.history.length > 1) {
                window.history.back();
              } else {
                window.location.hash = "#/projects";
              }
            }}
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors group cursor-pointer"
          >
            <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
            Kembali
          </button>
        </div>

        {/* Project Header */}
        <div className="space-y-4 mb-12">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full">
              {project.category}
            </span>
            <span className="text-xs text-muted-foreground">{project.date}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground leading-tight">
            {project.title}
          </h1>

          <p className="text-lg text-muted-foreground leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Cover Image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative aspect-video w-full rounded-3xl overflow-hidden border border-border shadow-2xl bg-muted mb-12"
        >
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
        </motion.div>

        {/* Metadata Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-y border-border/60 py-8 mb-12 bg-card/25 backdrop-blur-sm rounded-3xl px-6 md:px-8">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary flex items-center gap-1.5 mb-2">
              <Cpu className="size-3.5" /> Peran / Role
            </span>
            <p className="text-sm font-bold text-foreground">{project.role}</p>
          </div>

          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary flex items-center gap-1.5 mb-2">
              <Sparkles className="size-3.5" /> Dampak / Impact
            </span>
            <p className="text-sm font-bold text-foreground leading-relaxed">{project.impact}</p>
          </div>

          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary flex items-center gap-1.5 mb-2">
              <Trophy className="size-3.5" /> Tech Stack
            </span>
            <div className="flex flex-wrap gap-1.5">
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
        </div>

        {/* Detail Content */}
        <div className="space-y-12 leading-relaxed text-muted-foreground">
          {/* Narrative Body */}
          <div className="prose dark:prose-invert max-w-none space-y-6">
            <h2 className="text-2xl font-black text-foreground tracking-tight border-b border-border/50 pb-2">
              Tentang Proyek
            </h2>
            {project.longDescription ? (
              project.longDescription.map((pText, i) => (
                <p key={i} className="text-base leading-relaxed">
                  {pText}
                </p>
              ))
            ) : (
              <p className="text-base leading-relaxed">
                Detail narrative proyek ini belum dikonfigurasi. Anda dapat melihat repositori kode atau demo langsung.
              </p>
            )}
          </div>

          {/* Features */}
          {project.features && project.features.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-black text-foreground tracking-tight border-b border-border/50 pb-2">
                Fitur Utama / Highlights
              </h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 p-4 rounded-2xl border border-border bg-card/20 backdrop-blur-sm"
                  >
                    <CheckCircle2 className="size-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground/90">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Action Links */}
          <div className="pt-8 border-t border-border/50 flex flex-wrap gap-4 items-center">
            {project.links.liveDemo && project.links.liveDemo !== "#" && (
              <a href={project.links.liveDemo} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="rounded-full cursor-pointer">
                  <ExternalLink className="size-4 mr-2" />
                  Kunjungi Demo
                </Button>
              </a>
            )}
            {project.links.code && project.links.code !== "#" && (
              <a href={project.links.code} target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="secondary" className="rounded-full cursor-pointer">
                  <Github className="size-4 mr-2" />
                  Lihat Kode Sumber
                </Button>
              </a>
            )}
            {project.links.caseStudy && project.links.caseStudy !== "#" && (
              <a href={project.links.caseStudy}>
                <Button size="lg" variant="outline" className="rounded-full cursor-pointer">
                  <BookOpen className="size-4 mr-2" />
                  Case Study
                </Button>
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
