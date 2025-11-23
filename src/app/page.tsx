import AboutPage from "@/app/about/page";
import { HeroSection } from "@/components/sections/hero-section";
import { ProjectsPreview } from "@/components/sections/projects-preview";
import { SkillsPreview } from "@/components/sections/skills-preview";
import { EducationSection } from "@/components/education-section";
import { educationData } from "@/lib/data/education";
import { CertificatesPreview } from "@/components/sections/certificates-preview";
export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutPage />
      <EducationSection educationData={educationData} />
      <CertificatesPreview />
      <ProjectsPreview />
      <SkillsPreview />
    </>
  );
}
