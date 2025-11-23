"use client";

import Image from "next/image";
import type { ImageProps } from "next/image";

export function ProtectedImage({ alt, ...rest }: ImageProps) {
  return (
    <Image
      alt={alt}
      {...rest}
      onContextMenu={(e) => e.preventDefault()}
      draggable={false}
    />
  );
}
