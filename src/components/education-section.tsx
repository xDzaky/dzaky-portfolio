"use client";

import type { ReactNode } from "react";
import { GraduationCap } from "lucide-react";

import { GlowingEffect } from "@/components/ui/glowing-effect";
import type { EducationItem } from "@/types/content";
import { EducationVerticalTimeline } from "./sections/education-vertical-timeline";

interface EducationSectionProps {
  educationData: EducationItem[];
}

export function EducationSection({ educationData }: EducationSectionProps) {
  return (
    <section id="education" className="relative mb-[5px] overflow-hidden bg-background py-20">
      <div className="mb-8 flex items-center justify-center px-4 md:mb-10">
        <ul className="grid w-full max-w-6xl grid-cols-1 gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[14rem] xl:grid-rows-2">
          <GridItem
            area="md:[grid-area:2/3/3/11] xl:[grid-area:1/4/2/10]"
            icon={<GraduationCap className="h-6 w-6 text-black dark:text-neutral-400" />}
            title="Education"
            description="Formal education and learning journey."
          />
        </ul>
      </div>

      <div className="relative z-10 px-4">
        <EducationVerticalTimeline items={educationData} />
      </div>
    </section>
  );
}

interface GridItemProps {
  area: string;
  icon: ReactNode;
  title: string;
  description: ReactNode;
}

const GridItem = ({ area, icon, title, description }: GridItemProps) => {
  return (
    <li className={`min-h-[14rem] list-none ${area}`}>
      <div className="relative h-full rounded-2xl border p-2 md:rounded-3xl md:p-3">
        <GlowingEffect
          blur={0}
          borderWidth={3}
          spread={80}
          glow
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <div className="border-0.75 relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl p-6 md:p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D]">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="flex justify-center">
              <div className="w-fit rounded-lg border border-gray-700 bg-gradient-to-br from-gray-900 to-black p-3 shadow-lg">
                {icon}
              </div>
            </div>

            <div className="space-y-4 text-center">
              <h3 className="pt-0.5 font-sans text-xl font-semibold text-balance text-black dark:text-white md:text-2xl">
                {title}
              </h3>
              <p className="font-sans text-sm leading-relaxed text-black dark:text-neutral-400 md:text-base">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};
