import { motion } from "motion/react";
import TextBlockAnimation from "@/components/ui/text-block-animation";
import { values, personal } from "@/data/portfolio";
import { Target, Zap, Users2 } from "lucide-react";

export function Story() {
  const valueIcons = [Target, Zap, Users2];

  return (
    <section id="about" className="relative w-full bg-background text-foreground overflow-hidden">
      {/* Visual background decorators */}
      <div className="absolute top-10 right-10 -z-10 size-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-10 left-10 -z-10 size-96 rounded-full bg-secondary/5 blur-3xl" />

      {/* Main cinematic text reveal */}
      <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 py-24 max-w-5xl mx-auto">
        <div className="max-w-4xl w-full">
          <TextBlockAnimation
            blockColor="var(--color-primary)"
            animateOnScroll={true}
            duration={0.8}
          >
            <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-none">
              I turn ideas
              <br />
              into web products.
              <br />
              <span className="inline-block bg-foreground text-background dark:bg-foreground dark:text-background px-4 py-2 rounded-2xl mt-6 text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                Clean, interactive, and easy to use.
              </span>
            </h2>
          </TextBlockAnimation>
        </div>
      </div>

      {/* Story content & value cards */}
      <div className="min-h-[80vh] flex flex-col justify-center items-center px-6 py-24 bg-card/10 border-y border-border/50">
        <div className="max-w-5xl w-full space-y-16">
          
          {/* Grid Layout for Photo and About Details */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
            
            {/* Left Column: Photo Dummy */}
            <div className="md:col-span-4 flex justify-center md:justify-start">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="relative group w-64 h-80 sm:w-72 sm:h-96 md:w-full md:h-[400px] rounded-3xl overflow-hidden border border-border bg-card/60 backdrop-blur-md shadow-lg p-2"
              >
                {/* Glow border top on hover */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Image Wrapper */}
                <div className="w-full h-full rounded-2xl overflow-hidden relative">
                  <img 
                    src="/images/profile/profile.jpg" 
                    alt="Achmad Dzaki H.A. Portrait"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-750 filter grayscale contrast-110 group-hover:grayscale-0"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      // Fallback if the user hasn't uploaded their custom profile.jpg yet
                      e.currentTarget.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-300" />
                  
                  {/* Info Badge overlay */}
                  <div className="absolute bottom-4 left-4 right-4 bg-background/80 backdrop-blur-md border border-border/50 p-3 rounded-xl shadow-md">
                    <p className="text-xs font-black text-foreground text-center">Achmad Dzaki H.A.</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Column: Narrative details */}
            <div className="md:col-span-8 space-y-6">
              <div className="space-y-2">
                <TextBlockAnimation blockColor="var(--color-primary)" duration={0.7}>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-foreground">
                    Tentang Saya
                  </h3>
                </TextBlockAnimation>
                <div className="h-1 w-12 bg-primary rounded-full animate-pulse" />
              </div>

              <TextBlockAnimation blockColor="var(--color-primary)" stagger={0.02}>
                <p className="text-base sm:text-lg md:text-xl leading-relaxed text-muted-foreground">
                  {personal.about}
                </p>
              </TextBlockAnimation>

              <TextBlockAnimation blockColor="var(--color-primary)" stagger={0.02}>
                <p className="text-base sm:text-lg md:text-xl leading-relaxed text-muted-foreground">
                  {personal.story}
                </p>
              </TextBlockAnimation>
            </div>
          </div>

          {/* Value cards container */}
          <div className="pt-8">
            <TextBlockAnimation blockColor="var(--color-primary)" duration={0.6}>
              <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-8 text-center md:text-left">
                Prinsip &amp; Nilai Utama
              </h4>
            </TextBlockAnimation>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {values.map((val, idx) => {
                const Icon = valueIcons[idx % valueIcons.length];
                return (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="group relative p-6 rounded-2xl border border-border bg-card/40 backdrop-blur-sm shadow-md hover:shadow-primary/5 hover:border-primary/30 transition-all duration-300 flex flex-col gap-4 overflow-hidden"
                  >
                    {/* Glowing border top on hover */}
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Large index number background */}
                    <div className="text-primary/5 dark:text-primary/5 text-8xl font-black absolute right-4 bottom-2 select-none pointer-events-none group-hover:text-primary/10 group-hover:scale-105 transition-all duration-300">
                      0{idx + 1}
                    </div>

                    <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-300">
                      <Icon className="size-6" />
                    </div>
                    
                    <div className="relative z-10">
                      <h5 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-200">
                        {val.title}
                      </h5>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {val.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
