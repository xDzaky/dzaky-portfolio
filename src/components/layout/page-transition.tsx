"use client";

import type { PropsWithChildren } from "react";
import { useEffect, useState } from "react";

import { motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";

export function PageTransition({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion() ?? false;
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  const shouldAnimate = mounted && !prefersReducedMotion;

  return (
    <motion.div
      key={pathname}
      initial={shouldAnimate ? { opacity: 0, y: 20 } : false}
      animate={shouldAnimate ? { opacity: 1, y: 0 } : undefined}
      transition={shouldAnimate ? { duration: 0.25, ease: "easeOut" } : undefined}
      className="min-h-[calc(100vh-12rem)]"
    >
      {children}
    </motion.div>
  );
}
