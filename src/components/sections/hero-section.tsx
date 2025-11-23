"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/container";
import { SocialLinks } from "@/components/shared/social-links";
import { cn } from "@/lib/utils";
import { Stagger, StaggerItem } from "@/components/ui/animations/Stagger";
import TiltedCard from "./TiltedCard";
import ScrollVelocity from "./ScrollVelocity";

const MotionButton = motion(Button);

export function HeroSection() {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const velocity = prefersReducedMotion ? 0 : 60;

  const gradientHeadingClass = cn(
    "text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl",
    !prefersReducedMotion &&
      "bg-gradient-to-br from-primary via-primary/70 to-sky-500/80 bg-[length:200%_200%] bg-clip-text text-transparent",
  );

  const ctaHover = prefersReducedMotion ? undefined : { scale: 1.05 };
  const ctaTap = prefersReducedMotion ? undefined : { scale: 0.98 };

  return (
    <section className="relative flex min-h-screen flex-col justify-center overflow-hidden py-16" id="hero">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 via-background to-background" />
      <Container className="grid items-center gap-12 lg:grid-cols-[1.4fr_1fr]">
        <Stagger className="space-y-6">
          <StaggerItem
            as="span"
            className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/80 px-4 py-2 text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground"
          >
            Available for {siteConfig.availability}
          </StaggerItem>
          <StaggerItem as="h1" className={gradientHeadingClass}>
            <span className={prefersReducedMotion ? "block" : "block bg-gradient-animate"}>{siteConfig.headline}</span>
          </StaggerItem>
          <StaggerItem
            as="p"
            className="max-w-xl text-base text-muted-foreground sm:text-lg"
          >
            {siteConfig.subHeadline}
          </StaggerItem>
          <StaggerItem as="div" className="flex flex-col gap-3 sm:flex-row">
            <MotionButton
              size="lg"
              asChild
              whileHover={ctaHover}
              whileTap={ctaTap}
              transition={{ type: "spring", stiffness: 240, damping: 18, mass: 0.4 }}
              className="group relative overflow-hidden bg-gradient-to-r from-primary via-primary/80 to-sky-500/70 text-primary-foreground shadow-[0_20px_45px_-25px_theme(colors.primary/70)]"
            >
              <Link href={siteConfig.heroCta.primary.href}>
                {!prefersReducedMotion && (
                  <span
                    className="pointer-events-none absolute inset-0 z-0 bg-[length:200%_200%] bg-gradient-to-r from-primary/60 via-sky-500/50 to-primary/80 transition-[background-position] duration-700 ease-out group-hover:bg-[position:100%_50%]"
                    aria-hidden
                  />
                )}
                <span className="relative z-10">{siteConfig.heroCta.primary.label}</span>
              </Link>
            </MotionButton>
            <MotionButton
              variant="outline"
              size="lg"
              asChild
              whileHover={ctaHover}
              whileTap={ctaTap}
              transition={{ type: "spring", stiffness: 240, damping: 18, mass: 0.4 }}
              className="group relative overflow-hidden border-border/70 bg-background/70"
            >
              <Link href={siteConfig.heroCta.secondary.href}>
                {!prefersReducedMotion && (
                  <span
                    className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    aria-hidden
                  />
                )}
                <span className="relative z-10">{siteConfig.heroCta.secondary.label}</span>
              </Link>
            </MotionButton>
            {siteConfig.heroCta.tertiary.href ? (
              <MotionButton
                variant="ghost"
                size="lg"
                asChild
                whileHover={ctaHover}
                whileTap={ctaTap}
                transition={{ type: "spring", stiffness: 240, damping: 18, mass: 0.4 }}
                className="group relative overflow-hidden text-muted-foreground"
              >
                <Link href={siteConfig.heroCta.tertiary.href}>
                  {!prefersReducedMotion && (
                    <span
                      className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-70"
                      aria-hidden
                    />
                  )}
                  <span className="relative z-10">{siteConfig.heroCta.tertiary.label}</span>
                </Link>
              </MotionButton>
            ) : null}
          </StaggerItem>
          <StaggerItem as="div" className="pt-4">
            <SocialLinks />
          </StaggerItem>
        </Stagger>
        <div className="relative flex w-full items-center justify-center lg:justify-end">
          <TiltedCard
            imageSrc="/images/profile/dzaky.jpg"
            altText="AchmadDzaki"
            captionText="Achmad Dzaki H.A. — Fullstack Developer"
            containerHeight="clamp(220px, 35vw, 340px)"
            containerWidth="clamp(220px, 35vw, 340px)"
            imageHeight="clamp(220px, 35vw, 340px)"
            imageWidth="clamp(220px, 35vw, 340px)"
            rotateAmplitude={12}
            scaleOnHover={1.2}
            showMobileWarning={false}
            showTooltip={true}
            displayOverlayContent={true}
            overlayContent={
              <div className="flex h-full w-full items-end justify-center rounded-[15px] bg-gradient-to-t from-black/70 via-black/20 to-transparent p-6">
                <p className="text-sm font-semibold text-white">Achmad Dzaki H.A.</p>
              </div>
            }
          />
        </div>
      </Container>
      <div className="mt-24 w-full">
        <ScrollVelocity
          texts={["Achmad Dzaki", "Web Development"]}
          velocity={velocity}
          className="custom-scroll-text"
        />
      </div>
    </section>
  );
}
