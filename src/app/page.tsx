import dynamic from 'next/dynamic';
import { Suspense } from 'react';

import { HeroSection } from "@/components/sections/hero-section";
import AboutPage from "@/app/about/page";
import { educationData } from "@/lib/data/education";

// ✅ Lazy load heavy components to improve INP
const EducationSection = dynamic(
  () => import('@/components/education-section').then(mod => ({ default: mod.EducationSection })),
  { 
    loading: () => <div className="h-[400px] py-16 animate-pulse" />,
  }
);

const CertificatesPreview = dynamic(
  () => import('@/components/sections/certificates-preview').then(mod => ({ default: mod.CertificatesPreview })),
  { 
    loading: () => <div className="h-[300px] py-16 animate-pulse" />,
  }
);

const AchievementsGallery = dynamic(
  () => import('@/components/sections/achievements-gallery').then(mod => ({ default: mod.AchievementsGallery })),
  { 
    loading: () => (
      <div className="py-16">
        <div className="h-[600px] flex items-center justify-center">
          <p className="text-muted-foreground animate-pulse">Loading gallery...</p>
        </div>
      </div>
    )
  }
);

const ProjectsPreview = dynamic(
  () => import('@/components/sections/projects-preview').then(mod => ({ default: mod.ProjectsPreview })),
  { 
    loading: () => <div className="h-[400px] py-16 animate-pulse" />,
  }
);

const SkillsPreview = dynamic(
  () => import('@/components/sections/skills-preview').then(mod => ({ default: mod.SkillsPreview })),
  { 
    loading: () => <div className="h-[400px] py-16 animate-pulse" />,
  }
);

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutPage />
      <Suspense fallback={<div className="h-[400px] py-16" />}>
        <EducationSection educationData={educationData} />
      </Suspense>
      <Suspense fallback={<div className="h-[300px] py-16" />}>
        <CertificatesPreview />
      </Suspense>
      <Suspense fallback={<div className="h-[600px] py-16" />}>
        <AchievementsGallery />
      </Suspense>
      <Suspense fallback={<div className="h-[400px] py-16" />}>
        <ProjectsPreview />
      </Suspense>
      <Suspense fallback={<div className="h-[400px] py-16" />}>
        <SkillsPreview />
      </Suspense>
    </>
  );
}
