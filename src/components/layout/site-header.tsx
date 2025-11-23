"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

import { mainNavigation } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Container } from "@/components/shared/container";
import { SiteName } from "@/components/shared/site-name";

export function SiteHeader() {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 20,
    mass: 0.2,
  });
  const initials = siteConfig.name
    .split(" ")
    .map((part) => part.trim()[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur">
      {!prefersReducedMotion && (
        <motion.span
          className="pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-primary/80"
          style={{ scaleX: progress, transformOrigin: "0% 50%" }}
        />
      )}
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-sm font-semibold">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
            {initials}
          </span>
          <SiteName className="hidden sm:inline-flex" />
        </Link>
        <div className="flex items-center gap-3">
          <nav className="hidden md:flex">
            <NavigationMenu>
              <NavigationMenuList>
                {mainNavigation.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <NavigationMenuItem key={item.href}>
                      <NavigationMenuLink
                        href={item.href}
                        className={cn(
                          "group/nav relative rounded-md px-3 py-2 text-sm font-medium transition-colors",
                          isActive
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground",
                        )}
                        data-active={isActive}
                      >
                        {item.label}
                        <span
                          className="pointer-events-none absolute inset-x-3 -bottom-1 h-0.5 origin-left scale-x-0 rounded-full bg-primary transition-transform duration-300 ease-out group-hover/nav:scale-x-100 group-data-[active=true]/nav:scale-x-100"
                          aria-hidden
                        />
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  );
                })}
              </NavigationMenuList>
            </NavigationMenu>
          </nav>
          <Button asChild size="sm" className="hidden md:inline-flex">
            <Link href={siteConfig.heroCta.primary.href}>
              {siteConfig.heroCta.primary.label}
            </Link>
          </Button>
          <MobileMenu />
        </div>
      </Container>
    </header>
  );
}

function MobileMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Open navigation</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-sm">
        <SheetHeader className="text-left">
          <SheetTitle>
            <SiteName />
          </SheetTitle>
        </SheetHeader>
        <nav className="mt-6 flex flex-col gap-2">
          {mainNavigation.map((item) => (
            <Button key={item.href} variant="ghost" asChild className="justify-start">
              <Link href={item.href}>{item.label}</Link>
            </Button>
          ))}
        </nav>
        <Button className="mt-6 w-full" asChild>
          <Link href={siteConfig.heroCta.primary.href}>
            {siteConfig.heroCta.primary.label}
          </Link>
        </Button>
      </SheetContent>
    </Sheet>
  );
}
