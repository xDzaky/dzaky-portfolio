"use client";

import { forwardRef, useEffect, useState } from "react";
import type {
  ElementRef,
  ElementType,
  ForwardedRef,
  ReactElement,
  Ref,
} from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { DOMMotionComponents, HTMLMotionProps } from "framer-motion";

import { cn } from "@/lib/utils";

type MotionTag = Extract<keyof DOMMotionComponents, keyof HTMLElementTagNameMap>;

type RevealProps<Tag extends MotionTag = "div"> = Omit<HTMLMotionProps<Tag>, "ref"> & {
  as?: Tag;
};

function RevealInner<Tag extends MotionTag = "div">(
  {
    as = "div" as Tag,
    className,
    initial,
    whileInView,
    transition,
    viewport,
    children,
    ...rest
  }: RevealProps<Tag>,
  ref: ForwardedRef<ElementRef<DOMMotionComponents[Tag]>>,
) {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  const shouldAnimate = mounted && !prefersReducedMotion;

  const motionComponents = motion as unknown as DOMMotionComponents;
  const MotionComponent = (motionComponents[as] ?? motion.div) as ElementType;

  const defaultInitial = prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 24 };
  const defaultWhileInView = { opacity: 1, y: 0 };
  const defaultTransition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.4, ease: "easeOut" };
  const defaultViewport = { once: true, amount: 0.2 };

  return (
    <MotionComponent
      ref={ref}
      className={cn(className)}
      initial={initial ?? (shouldAnimate ? defaultInitial : false)}
      animate={!shouldAnimate ? defaultWhileInView : undefined}
      whileInView={whileInView ?? (shouldAnimate ? defaultWhileInView : undefined)}
      transition={transition ?? (shouldAnimate ? defaultTransition : undefined)}
      viewport={viewport ?? defaultViewport}
      {...(rest as HTMLMotionProps<Tag>)}
    >
      {children}
    </MotionComponent>
  );
}

export const Reveal = forwardRef(RevealInner) as <
  Tag extends MotionTag = "div"
>(
  props: RevealProps<Tag> & {
    ref?: Ref<ElementRef<DOMMotionComponents[Tag]>>;
  },
) => ReactElement | null;

export type { RevealProps };
