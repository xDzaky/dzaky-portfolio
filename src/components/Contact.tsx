import { motion } from "motion/react";
import { personal } from "@/data/portfolio";
import { Button } from "@/components/ui/button";
import { Mail, Github, Linkedin, Instagram, MessageCircle } from "lucide-react";

export function Contact() {
  const socials = [
    { icon: Mail, href: personal.social.email, label: "Email" },
    { icon: Github, href: personal.social.github, label: "GitHub" },
    { icon: Linkedin, href: personal.social.linkedin, label: "LinkedIn" },
    { icon: Instagram, href: personal.social.instagram, label: "Instagram" },
  ];

  return (
    <section id="contact" className="py-24 bg-background text-foreground relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute bottom-0 right-0 -z-10 size-[400px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />
      <div className="absolute top-0 left-0 -z-10 size-[400px] rounded-full bg-secondary/5 blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-foreground">
            Hubungi Saya
          </h2>
          <p className="text-sm font-semibold tracking-widest uppercase text-primary mt-2">
            Hubungi &amp; Kolaborasi
          </p>
        </div>

        {/* Contact Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative overflow-hidden rounded-3xl border border-border bg-card/40 p-8 md:p-12 max-w-3xl mx-auto backdrop-blur-md shadow-2xl shadow-primary/5 text-center flex flex-col items-center gap-8"
        >
          {/* Decorative absolute element */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />

          <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-2">
            <MessageCircle className="size-8" />
          </div>

          <h3 className="text-xl md:text-3xl font-bold tracking-tight text-foreground max-w-xl leading-snug">
            Mari Bekerja Sama atau Berdiskusi!
          </h3>

          <p className="text-sm md:text-base leading-relaxed text-muted-foreground max-w-xl">
            Punya ide project, kolaborasi, internship, atau sekadar ingin diskusi teknologi? Saya terbuka untuk peluang baru.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-wrap justify-center gap-4 w-full pt-4">
            <a href={personal.social.email}>
              <Button size="lg" className="rounded-full cursor-pointer shadow-md">
                <Mail className="size-4 mr-2" />
                Kirim Email
              </Button>
            </a>

            <a href={personal.social.github} target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="secondary" className="rounded-full cursor-pointer shadow-md">
                <Github className="size-4 mr-2" />
                Lihat GitHub
              </Button>
            </a>

            <a href={personal.social.linkedin} target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="rounded-full cursor-pointer shadow-md">
                <Linkedin className="size-4 mr-2" />
                LinkedIn
              </Button>
            </a>
          </div>

          {/* Social Icons row */}
          <div className="flex items-center gap-5 pt-8 border-t border-border/40 w-full justify-center">
            {socials.map((item, idx) => {
              const Icon = item.icon;
              return (
                <a
                  key={idx}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full border border-border bg-background hover:bg-primary/10 hover:text-primary transition-all duration-300 shadow-sm"
                  aria-label={item.label}
                >
                  <Icon className="size-5" />
                </a>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
