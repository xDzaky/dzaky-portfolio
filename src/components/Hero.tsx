import {
  ArrowRightIcon,
  DownloadIcon,
  Github as GithubIcon,
  Instagram as InstagramIcon,
  Linkedin as LinkedinIcon,
  Mail as MailIcon,
  MessageCircle as MessageCircleIcon,
  SparklesIcon,
  MapPin as MapPinIcon,
  Code2 as Code2Icon,
  Youtube as YoutubeIcon,
} from "lucide-react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { LogoCloud } from "@/components/ui/logo-cloud";
import { cn } from "@/lib/utils";
import { personal } from "@/data/portfolio";

const TiktokIcon = (props: React.ComponentProps<"svg">) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

// SVG Logos for Floating Icons
const ReactIcon = (props: React.ComponentProps<"svg">) => (
  <svg viewBox="-11.5 -10.23174 23 20.46348" fill="none" stroke="currentColor" {...props}>
    <circle cx="0" cy="0" r="2.05" fill="currentColor"/>
    <g stroke="currentColor" strokeWidth="1" fill="none">
      <ellipse rx="11" ry="4.2"/>
      <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
      <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
    </g>
  </svg>
);

const LaravelIcon = (props: React.ComponentProps<"svg">) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M5.47 11.125V21.75a2.25 2.25 0 0 0 2.25 2.25h12v-1.5h-12a.75.75 0 0 1-.75-.75v-9.125l3.97-2.31 3.97 2.31v4.625l-2.47 1.436V18h1.5v-1.314l.97-.564.97.564v2.064h1.5v-2.936l2.47-1.436v-4.625l3.97-2.31V3.25A2.25 2.25 0 0 0 17.81.75H5.81a2.25 2.25 0 0 0-2.25 2.25v9.125l1.91-1zm12.34-8.875a.75.75 0 0 1 .75.75v5.375L14.59 10.7l-3.97-2.31v-5.14h1.5v3.636l2.47 1.436v-2.064l-.97-.564-.97.564V4.186h1.5v1.314l.97-.564.97.564V1.875h1.5zm-12.34.75a.75.75 0 0 1 .75-.75h4.5v1.5h-4.5a.75.75 0 0 1-.75-.75z"/>
  </svg>
);

const TypeScriptIcon = (props: React.ComponentProps<"svg">) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M0 0h24v24H0V0zm21.6 19.32c0-2.76-1.88-4.12-4.52-5.12-1.92-.72-2.52-1.32-2.52-2.28 0-.96.72-1.64 2-1.64 1.28 0 2 .56 2.36 1.64l2.44-1.44c-.76-1.96-2.52-3.12-4.8-3.12-3.08 0-4.96 1.88-4.96 4.64 0 2.84 1.88 4.24 4.8 5.36 1.96.76 2.28 1.44 2.28 2.24 0 1-.88 1.72-2.28 1.72-1.6 0-2.52-.84-2.92-2.12l-2.48 1.44c.76 2.24 2.88 3.52 5.4 3.52 3.28 0 5.2-1.8 5.2-4.8zM2.4 21.6h5.04v-2.16H4.8v-12H2.4v14.16z" />
  </svg>
);

const TailwindIcon = (props: React.ComponentProps<"svg">) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.201 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.537 6.182 15.176 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C7.666 17.818 9.027 19 12.201 19c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.737 13.382 9.376 12 6.201 12z"/>
  </svg>
);

const FigmaIcon = (props: React.ComponentProps<"svg">) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 0h-3.5a4.5 4.5 0 0 0 0 9H12V0z M12 9H8.5a4.5 4.5 0 0 0 0 9H12V9z M12 18h-3.5a4.5 4.5 0 0 0-4.5 4.5v0a4.5 4.5 0 0 0 9 0V18z M15.5 0H12v9h3.5a4.5 4.5 0 0 0 0-9z M15.5 9A4.5 4.5 0 0 0 12 13.5V18h3.5a4.5 4.5 0 0 0 0-9z"/>
  </svg>
);

export function Hero() {
  const socials = [
    { icon: InstagramIcon, href: personal.social.instagram, label: "Instagram" },
    { icon: TiktokIcon, href: personal.social.tiktok, label: "TikTok" },
    { icon: YoutubeIcon, href: personal.social.youtube, label: "YouTube" },
    { icon: GithubIcon, href: personal.social.github, label: "GitHub" },
    { icon: LinkedinIcon, href: personal.social.linkedin, label: "LinkedIn" },
    { icon: MailIcon, href: personal.social.email, label: "Email" },
  ];

  const chips = [
    { icon: ReactIcon, x: "-4%", top: "15%", delay: 0, color: "text-[#61DAFB] border-[#61DAFB]/20 hover:bg-[#61DAFB]/10" },
    { icon: LaravelIcon, x: "86%", top: "25%", delay: 0.5, color: "text-[#FF2D20] border-[#FF2D20]/20 hover:bg-[#FF2D20]/10" },
    { icon: TypeScriptIcon, x: "-2%", top: "60%", delay: 1, color: "text-[#3178C6] border-[#3178C6]/20 hover:bg-[#3178C6]/10" },
    { icon: TailwindIcon, x: "84%", top: "65%", delay: 1.5, color: "text-[#38BDF8] border-[#38BDF8]/20 hover:bg-[#38BDF8]/10" },
    { icon: FigmaIcon, x: "38%", top: "-12%", delay: 2, color: "text-[#F24E1E] border-[#F24E1E]/20 hover:bg-[#F24E1E]/10" },
  ];

  return (
    <>
      <section id="home" className="mx-auto w-full max-w-5xl relative px-4 sm:px-6 lg:px-8">
        <div
          aria-hidden="true"
          className="absolute inset-0 isolate hidden overflow-hidden contain-strict lg:block"
        >
          <div className="absolute inset-0 -top-14 isolate -z-10 bg-[radial-gradient(35%_80%_at_49%_0%,color-mix(in_oklch,var(--color-foreground)_8%,transparent),transparent)] contain-strict" />
        </div>

        <div
          aria-hidden="true"
          className="absolute inset-0 mx-auto hidden min-h-screen w-full max-w-5xl lg:block pointer-events-none"
        >
          <div className="[mask-image:linear-gradient(to_bottom,black_80%,transparent)] absolute inset-y-0 left-0 z-10 h-full w-px bg-foreground/15" />
          <div className="[mask-image:linear-gradient(to_bottom,black_80%,transparent)] absolute inset-y-0 right-0 z-10 h-full w-px bg-foreground/15" />
        </div>

        <div className="relative pt-16 pb-12 sm:pt-20 sm:pb-16 lg:pt-32 lg:pb-30">
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 size-full overflow-hidden pointer-events-none"
          >
            <div className="absolute inset-y-0 left-4 w-px bg-gradient-to-b from-transparent via-border to-border md:left-8" />
            <div className="absolute inset-y-0 right-4 w-px bg-gradient-to-b from-transparent via-border to-border md:right-8" />
            <div className="absolute inset-y-0 left-8 w-px bg-gradient-to-b from-transparent via-border/50 to-border/50 md:left-12" />
            <div className="absolute inset-y-0 right-8 w-px bg-gradient-to-b from-transparent via-border/50 to-border/50 md:right-12" />
          </div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8 items-center relative z-20">
            {/* Left Column: Copywriting & CTA */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:col-span-7 flex flex-col gap-6 text-left"
            >
              <a
                className={cn(
                  "group flex w-fit items-center gap-3 rounded-full border bg-card px-3 py-1 shadow transition-colors hover:bg-accent",
                  "animate-(--animate-fade-in) animate-(--animate-slide-in-from-bottom-10)"
                )}
                href="#contact"
              >
                <SparklesIcon className="size-3 text-primary animate-pulse" />
                <span className="text-xs font-medium text-foreground">{personal.status}</span>
                <span className="block h-5 border-l" />
                <ArrowRightIcon className="size-3 duration-150 ease-out group-hover:translate-x-1 text-muted-foreground" />
              </a>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance text-foreground leading-[1.1]">
                {personal.headline}
              </h1>

              <p className="max-w-2xl text-base text-foreground/80 tracking-wide sm:text-lg leading-relaxed text-muted-foreground">
                {personal.summary}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a href="#contact">
                  <Button className="rounded-full cursor-pointer" size="lg">
                    <MessageCircleIcon className="size-4 mr-2" />
                    Hubungi Saya
                  </Button>
                </a>
                <a href="#projects">
                  <Button className="rounded-full cursor-pointer" size="lg" variant="secondary">
                    Lihat Proyek
                    <ArrowRightIcon className="size-4 ms-2" />
                  </Button>
                </a>
                <a href={personal.cvUrl} target="_blank" rel="noopener noreferrer">
                  <Button className="rounded-full cursor-pointer" size="lg" variant="outline">
                    <DownloadIcon className="size-4 mr-2" />
                    Unduh CV
                  </Button>
                </a>
              </div>

              {/* Social Media Links */}
              <div className="flex items-center gap-4 pt-4 border-t border-border/40 w-fit">
                {socials.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors p-1"
                      aria-label={social.label}
                    >
                      <Icon className="size-5" />
                    </a>
                  );
                })}
              </div>
            </motion.div>

            {/* Right Column: Profile details & floating chips */}
            <div className="lg:col-span-5 flex justify-center items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                className="relative w-full max-w-sm"
              >
                {/* Floating Chips (Icons instead of text) */}
                {chips.map((chip, idx) => {
                  const Icon = chip.icon;
                  return (
                    <motion.div
                      key={idx}
                      className={cn(
                        "absolute z-20 rounded-2xl border bg-card/90 p-3 shadow-lg backdrop-blur-sm pointer-events-auto cursor-pointer transition-colors flex items-center justify-center",
                        chip.color
                      )}
                      style={{ left: chip.x, top: chip.top }}
                      animate={{
                        y: [0, -12, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut",
                        delay: chip.delay,
                      }}
                    >
                      <Icon className="size-6 sm:size-7 shrink-0" />
                    </motion.div>
                  );
                })}

                {/* Profile Card Container */}
                <div className="relative overflow-hidden rounded-3xl border border-border bg-card/30 p-8 backdrop-blur-md shadow-2xl shadow-primary/5 select-none">
                  {/* Glowing background decorators */}
                  <div className="absolute -right-10 -top-10 -z-10 size-40 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
                  <div className="absolute -left-10 -bottom-10 -z-10 size-40 rounded-full bg-secondary-foreground/5 blur-3xl pointer-events-none" />

                  <div className="flex flex-col items-center text-center gap-5">
                    {/* Initials Symbol */}
                    <div className="flex size-20 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-3xl font-extrabold tracking-tighter text-primary shadow-[0_0_15px_rgba(var(--color-primary),0.1)]">
                      {personal.initials}
                    </div>

                    <div>
                      <h3 className="text-xl font-bold tracking-tight text-foreground">{personal.name}</h3>
                      <p className="text-sm font-medium text-muted-foreground mt-1">{personal.role}</p>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground/80">
                      <MapPinIcon className="size-3.5" />
                      <span>{personal.location}</span>
                    </div>

                    {/* School & Grade info */}
                    <div className="w-full rounded-2xl border border-border/50 bg-background/50 p-4 text-left">
                      <div className="flex items-center gap-2 mb-2">
                        <Code2Icon className="size-4 text-primary" />
                        <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Education</span>
                      </div>
                      <p className="text-xs font-semibold text-foreground">{personal.school}</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">{personal.major} • {personal.grade}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <LogosSection />
    </>
  );
}

function LogosSection() {
  return (
    <section className="relative space-y-4 border-t pt-8 pb-12">
      <h2 className="text-center font-semibold text-base text-muted-foreground tracking-widest uppercase md:text-sm">
        Tech Stack &amp; Tools
      </h2>
      <div className="relative z-10 mx-auto max-w-4xl px-4">
        <LogoCloud logos={techLogos} />
      </div>
    </section>
  );
}

const techLogos = [
  { src: "https://cdn.simpleicons.org/html5/000000", alt: "HTML" },
  { src: "https://cdn.simpleicons.org/css3/000000", alt: "CSS" },
  { src: "https://cdn.simpleicons.org/javascript/000000", alt: "JavaScript" },
  { src: "https://cdn.simpleicons.org/typescript/000000", alt: "TypeScript" },
  { src: "https://cdn.simpleicons.org/react/000000", alt: "React" },
  { src: "https://cdn.simpleicons.org/nextdotjs/000000", alt: "Next.js" },
  { src: "https://cdn.simpleicons.org/tailwindcss/000000", alt: "Tailwind CSS" },
  { src: "https://cdn.simpleicons.org/vite/000000", alt: "Vite" },
  { src: "https://cdn.simpleicons.org/laravel/000000", alt: "Laravel" },
  { src: "https://cdn.simpleicons.org/php/000000", alt: "PHP" },
  { src: "https://cdn.simpleicons.org/python/000000", alt: "Python" },
  { src: "https://cdn.simpleicons.org/solana/000000", alt: "Solana" },
  { src: "https://cdn.simpleicons.org/figma/000000", alt: "Figma" },
  { src: "https://cdn.simpleicons.org/canva/000000", alt: "Canva" },
];
