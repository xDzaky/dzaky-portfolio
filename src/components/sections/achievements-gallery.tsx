'use client';

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { RevealSection } from "@/components/shared/reveal-section";
import { isLowEndDevice, getDevicePerformanceTier } from "@/lib/performance";
import achievementsData from "@content/data/achievements.json";

// ✅ CRITICAL FIX: Default to fallback, ALWAYS use it for better performance
const CircularGalleryFallback = dynamic(
  () => import("@/components/sections/CircularGalleryFallback"),
  { 
    ssr: false,
    loading: () => (
      <div className="h-[600px] flex items-center justify-center bg-background/50 rounded-lg border border-border/50">
        <div className="text-center space-y-2">
          <div className="h-8 w-8 mx-auto border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm text-muted-foreground">Loading achievements...</p>
        </div>
      </div>
    )
  }
);

export function AchievementsGallery() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // ✅ Log performance info for debugging
    const performanceTier = getDevicePerformanceTier();
    const isLowEnd = isLowEndDevice();
    
    console.log('🎯 Gallery Mode: Fallback (CSS) for optimal performance', {
      tier: performanceTier,
      isLowEnd,
      cores: navigator.hardwareConcurrency,
      // @ts-expect-error - deviceMemory not in types
      memory: navigator.deviceMemory,
      reason: 'WebGL too heavy - using lightweight CSS gallery'
    });
  }, []);

  // Server-side or initial render - show placeholder with fixed height
  if (!isClient) {
    return (
      <RevealSection className="py-16">
        <div className="mt-12 h-[600px] w-full relative bg-background/50 rounded-lg border border-border/50">
          <div className="h-full flex items-center justify-center">
            <div className="text-center space-y-2">
              <div className="h-8 w-8 mx-auto border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              <p className="text-sm text-muted-foreground">Initializing...</p>
            </div>
          </div>
        </div>
      </RevealSection>
    );
  }

  // ✅ ALWAYS use fallback for best performance
  return (
    <RevealSection className="py-16">
      <div className="mt-12 h-[600px] w-full relative">
        <CircularGalleryFallback 
          items={achievementsData}
        />
      </div>
    </RevealSection>
  );
}
