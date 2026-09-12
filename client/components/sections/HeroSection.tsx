import { Button } from "@/components/ui/button";
import { Code, Database, Server } from "lucide-react";
import { PROFILE_INFO } from "@/data/portfolio";

interface HeroSectionProps {
  onNavigate: (sectionId: string) => void;
}

export function HeroSection({ onNavigate }: HeroSectionProps) {
  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="relative min-h-[90vh] flex items-center justify-center hero-gradient overflow-hidden pt-20 pb-16"
    >
      <div className="absolute inset-0 bg-black/20" aria-hidden="true" />

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-sm font-medium">
            👋 Welcome to my portfolio
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
            Hi, I'm <span className="text-white drop-shadow-sm">{PROFILE_INFO.name}</span>
          </h1>

          <h2 className="text-xl sm:text-2xl md:text-3xl text-white/95 mb-6 font-medium max-w-3xl mx-auto leading-snug">
            {PROFILE_INFO.role}
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-white/85 mb-10 max-w-2xl mx-auto leading-relaxed">
            {PROFILE_INFO.shortBio}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              onClick={() => onNavigate("projects")}
              className="w-full sm:w-auto bg-white text-primary hover:bg-white/90 font-semibold px-8 py-3 text-base shadow-lg transition-transform hover:-translate-y-0.5"
            >
              View My Work
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => onNavigate("contact")}
              className="w-full sm:w-auto border-2 border-white text-white hover:bg-white hover:text-primary font-semibold px-8 py-3 text-base backdrop-blur-sm transition-transform hover:-translate-y-0.5"
            >
              Contact Me
            </Button>
          </div>
        </div>
      </div>

      {/* Floating subtle ambient icons */}
      <div className="absolute top-24 left-8 text-white/20 animate-pulse pointer-events-none" aria-hidden="true">
        <Code className="h-10 w-10" />
      </div>
      <div className="absolute bottom-16 right-10 text-white/20 animate-pulse delay-1000 pointer-events-none" aria-hidden="true">
        <Database className="h-10 w-10" />
      </div>
      <div className="absolute top-36 right-16 text-white/20 animate-pulse delay-500 pointer-events-none" aria-hidden="true">
        <Server className="h-8 w-8" />
      </div>
    </section>
  );
}
