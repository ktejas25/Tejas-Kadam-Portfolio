import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Github } from "lucide-react";
import { PROJECTS, PROFILE_INFO } from "@/data/portfolio";
import { ProjectCard } from "@/components/ProjectCard";

type ProjectCategoryFilter = "All" | "Full Stack" | "Frontend" | "Mobile";

const CATEGORIES: ProjectCategoryFilter[] = ["All", "Full Stack", "Frontend", "Mobile"];

export function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategoryFilter>("All");

  const filteredProjects =
    activeCategory === "All"
      ? PROJECTS
      : PROJECTS.filter((project) => project.category === activeCategory);

  return (
    <section id="projects" aria-label="Featured Projects" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">Featured Projects</h2>
            <div className="w-16 h-1 bg-primary mx-auto rounded-full mb-6" aria-hidden="true" />
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              Real-world web and mobile applications demonstrating architecture, state management, and user-centric design.
            </p>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap justify-center gap-2 mt-8" role="tablist" aria-label="Filter projects by category">
              {CATEGORIES.map((category) => {
                const isActive = activeCategory === category;
                const count =
                  category === "All"
                    ? PROJECTS.length
                    : PROJECTS.filter((p) => p.category === category).length;

                return (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    role="tab"
                    aria-selected={isActive}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                      isActive
                        ? "bg-primary text-primary-foreground shadow-md scale-105"
                        : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                    }`}
                  >
                    <span>{category}</span>
                    <Badge
                      variant={isActive ? "secondary" : "outline"}
                      className={`text-[10px] px-1.5 py-0 h-4 min-w-[16px] text-center font-bold ${
                        isActive ? "bg-primary-foreground/20 text-primary-foreground border-transparent" : ""
                      }`}
                    >
                      {count}
                    </Badge>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          {/* GitHub Profile CTA */}
          <div className="text-center mt-16">
            <Button variant="outline" size="lg" className="border-2 font-medium" asChild>
              <a
                href={PROFILE_INFO.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2"
              >
                <Github className="h-4 w-4" />
                View Full Repository Archive on GitHub
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
