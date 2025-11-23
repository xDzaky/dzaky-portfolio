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

type StaggerProps<Tag extends MotionTag = "div"> = Omit<HTMLMotionProps<Tag>, "ref"> & {
  as?: Tag;
  delayChildren?: number;
  staggerChildren?: number;
};

type StaggerItemProps<Tag extends MotionTag = "div"> = Omit<HTMLMotionProps<Tag>, "ref"> & {
  as?: Tag;
};

function StaggerInner<Tag extends MotionTag = "div">(
  {
    as = "div" as Tag,
    className,
    variants,
    initial,
    whileInView,
    viewport,
    delayChildren = 0.12,
    staggerChildren = 0.08,
    children,
    ...rest
  }: StaggerProps<Tag>,
  ref: ForwardedRef<ElementRef<DOMMotionComponents[Tag]>>,
) {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  const shouldAnimate = mounted && !prefersReducedMotion;
  const motionComponents = motion as unknown as DOMMotionComponents;
  const MotionComponent = (motionComponents[as] ?? motion.div) as ElementType;

  const containerVariants = variants ?? {
    hidden: prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: prefersReducedMotion
        ? { duration: 0 }
        : {
            duration: 0.3,
            ease: "easeOut",
            when: "beforeChildren",
            staggerChildren,
            delayChildren,
          },
    },
  };

  const defaultViewport = { once: true, amount: 0.2 };

  return (
    <MotionComponent
      ref={ref}
      className={cn(className)}
      variants={containerVariants}
      initial={initial ?? (shouldAnimate ? "hidden" : false)}
      animate={!shouldAnimate ? "visible" : undefined}
      whileInView={whileInView ?? (shouldAnimate ? "visible" : undefined)}
      viewport={viewport ?? defaultViewport}
      {...(rest as HTMLMotionProps<Tag>)}
    >
      {children}
    </MotionComponent>
  );
}

function StaggerItemInner<Tag extends MotionTag = "div">(
  { as = "div" as Tag, className, variants, children, ...rest }: StaggerItemProps<Tag>,
  ref: ForwardedRef<ElementRef<DOMMotionComponents[Tag]>>,
) {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const shouldAnimate = mounted && !prefersReducedMotion;
  const motionComponents = motion as unknown as DOMMotionComponents;
  const MotionComponent = (motionComponents[as] ?? motion.div) as ElementType;

  const itemVariants = variants ??
    (prefersReducedMotion
      ? {
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        }
      : {
          hidden: { opacity: 0, y: 24 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.4, ease: "easeOut" },
          },
        });

  return (
    <MotionComponent
      ref={ref}
      className={cn(className)}
      variants={itemVariants}
      initial={!shouldAnimate ? false : undefined}
      animate={!shouldAnimate ? "visible" : undefined}
      {...(rest as HTMLMotionProps<Tag>)}
    >
      {children}
    </MotionComponent>
  );
}

export const Stagger = forwardRef(StaggerInner) as <
  Tag extends MotionTag = "div"
>(
  props: StaggerProps<Tag> & {
    ref?: Ref<ElementRef<DOMMotionComponents[Tag]>>;
  },
) => ReactElement | null;

export const StaggerItem = forwardRef(StaggerItemInner) as <
  Tag extends MotionTag = "div"
>(
  props: StaggerItemProps<Tag> & {
    ref?: Ref<ElementRef<DOMMotionComponents[Tag]>>;
  },
) => ReactElement | null;

export type { StaggerProps, StaggerItemProps };
