import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Story } from "@/components/Story";
import { Education } from "@/components/Education";
import { Certificates } from "@/components/Certificates";
import { PhotoAlbum } from "@/components/PhotoAlbum";
import { Projects } from "@/components/Projects";
import { StoreSection } from "@/components/StoreSection";
import { Skills } from "@/components/Skills";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { ThemeProvider } from "@/providers/theme-provider";
import { AllCertificates } from "@/components/AllCertificates";
import { AllProjects } from "@/components/AllProjects";
import { ProjectDetail } from "@/components/ProjectDetail";
import { Store } from "@/components/Store";
import { StoreDetail } from "@/components/StoreDetail";

export default function App() {
  const [currentView, setCurrentView] = useState<"home" | "certificates" | "projects" | "project-detail" | "store" | "store-detail">("home");
  const [selectedProjectSlug, setSelectedProjectSlug] = useState<string | null>(null);
  const [selectedProductSlug, setSelectedProductSlug] = useState<string | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      const path = window.location.pathname;

      // 1. Project Detail (specific sub-route check first)
      if (hash.startsWith("#/project/") || (path.startsWith("/project/") && path !== "/project/")) {
        const slug = hash.startsWith("#/project/")
          ? hash.replace("#/project/", "")
          : path.replace("/project/", "");
        if (path.startsWith("/project/") && !hash.startsWith("#/project/")) {
          window.location.hash = `#/project/${slug}`;
        }
        setSelectedProjectSlug(slug);
        setCurrentView("project-detail");
        window.scrollTo({ top: 0, behavior: "instant" });
      }
      // 2. Store Detail (specific sub-route check first)
      else if (hash.startsWith("#/store/") || (path.startsWith("/store/") && path !== "/store/")) {
        const slug = hash.startsWith("#/store/")
          ? hash.replace("#/store/", "")
          : path.replace("/store/", "");
        if (path.startsWith("/store/") && !hash.startsWith("#/store/")) {
          window.location.hash = `#/store/${slug}`;
        }
        setSelectedProductSlug(slug);
        setCurrentView("store-detail");
        window.scrollTo({ top: 0, behavior: "instant" });
      }
      // 3. Certificates List
      else if (hash === "#/certificates" || path === "/certificates") {
        if (path === "/certificates" && hash !== "#/certificates") {
          window.location.hash = "#/certificates";
        }
        setCurrentView("certificates");
        window.scrollTo({ top: 0, behavior: "instant" });
      }
      // 4. Projects List
      else if (hash === "#/projects" || path === "/projects") {
        if (path === "/projects" && hash !== "#/projects") {
          window.location.hash = "#/projects";
        }
        setCurrentView("projects");
        window.scrollTo({ top: 0, behavior: "instant" });
      }
      // 5. Store Catalog
      else if (hash === "#/store" || path === "/store") {
        if (path === "/store" && hash !== "#/store") {
          window.location.hash = "#/store";
        }
        setCurrentView("store");
        window.scrollTo({ top: 0, behavior: "instant" });
      }
      // 6. Home / Fallback
      else {
        setCurrentView("home");
        // If the hash is an anchor on the homepage, scroll to it after rendering
        if (hash && hash.startsWith("#") && hash !== "#home") {
          const targetId = hash.substring(1);
          setTimeout(() => {
            const element = document.getElementById(targetId);
            if (element) {
              element.scrollIntoView({ behavior: "smooth" });
            }
          }, 100);
        }
      }
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground flex w-full flex-col overflow-x-hidden pt-14">
        <Header />
        <main className="grow">
          {currentView === "certificates" && <AllCertificates />}
          {currentView === "projects" && <AllProjects />}
          {currentView === "project-detail" && <ProjectDetail slug={selectedProjectSlug} />}
          {currentView === "store" && <Store />}
          {currentView === "store-detail" && <StoreDetail slug={selectedProductSlug} />}
          {currentView === "home" && (
            <>
              <Hero />
              <Story />
              <Education />
              <Certificates />
              <PhotoAlbum />
              <Projects />
              <StoreSection />
              <Skills />
              <TestimonialsSection />
              <Contact />
            </>
          )}
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

