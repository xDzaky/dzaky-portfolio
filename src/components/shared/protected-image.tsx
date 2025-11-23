"use client";

import Image from "next/image";
import type { ImageProps } from "next/image";

export function ProtectedImage(props: ImageProps) {
  return (
    <Image
      {...props}
      onContextMenu={(e) => e.preventDefault()}
      draggable={false}
    />
  );
}
