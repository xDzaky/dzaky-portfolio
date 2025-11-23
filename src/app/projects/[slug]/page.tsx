import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { siteConfig } from "@/config/site";
import { getProjectBySlug, getProjectSlugs } from "@/lib/content/projects";
import { ProtectedImage } from "@/components/shared/protected-image";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Project" };
  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: project.title,
      description: project.summary,
      images: [{ url: project.cover }],
    },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return notFound();

  const coverSrc = project.cover.endsWith("-og.jpg") ? project.cover : project.cover.replace("-card", "-og");

  const projectLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.summary,
    datePublished: project.date,
    image: `https://dzaky.codes${coverSrc}`,
    url: `https://dzaky.codes/projects/${project.slug}`,
    creator: {
      "@type": "Person",
      name: siteConfig.name,
    },
    inLanguage: "id-ID",
    programmingLanguage: project.stack,
    sameAs: [project.demoUrl, project.repoUrl].filter(Boolean),
  };

  return (
    <section className="py-16">
      <Container>
        <SectionHeading title={project.title} subtitle={project.summary} />
        <div className="mt-8 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <article className="space-y-8">
            <div className="overflow-hidden rounded-xl border border-border/60">
              <ProtectedImage
                src={coverSrc}
                alt={project.title}
                width={1200}
                height={630}
                className="h-auto w-full object-cover"
                priority
              />
            </div>
            <div className="space-y-6 text-base leading-7 text-muted-foreground">
              {project.content}
            </div>
          </article>
          <aside className="space-y-6 rounded-xl border border-border/60 p-6 text-sm">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Stack</h4>
              <p className="mt-2 text-base text-foreground">{project.stack.join(", ")}</p>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Role</h4>
              <p className="mt-2 text-base text-foreground">{project.role}</p>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Features</h4>
              <ul className="mt-2 list-disc pl-4 text-foreground">
                {project.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Impact</h4>
              <p className="mt-2 text-foreground">{project.impact}</p>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Links</h4>
              <div className="mt-2 flex flex-col gap-2">
                <Link className="text-primary underline-offset-4 hover:underline" href="/projects">
                  Lihat proyek lain
                </Link>
                {project.demoUrl ? (
                  <a
                    className="text-primary underline-offset-4 hover:underline"
                    href={project.demoUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    Live demo
                  </a>
                ) : null}
                {project.repoUrl ? (
                  <a
                    className="text-primary underline-offset-4 hover:underline"
                    href={project.repoUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    Repository
                  </a>
                ) : null}
              </div>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Timeline</h4>
              <p className="mt-2 text-foreground">{new Date(project.date).toLocaleDateString(undefined, { month: "long", year: "numeric" })}</p>
            </div>
          </aside>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(projectLd) }} />
        </div>
      </Container>
    </section>
  );
}
