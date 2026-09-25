import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, FolderGit2 } from "lucide-react";
import { Project } from "@/data/portfolio";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [imgError, setImgError] = useState(false);

  const hasValidDemo = Boolean(project.demoUrl && project.demoUrl.trim() !== "#");

  return (
    <Card className="group flex flex-col justify-between hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/30 overflow-hidden">
      <div>
        {/* Project Thumbnail / Banner */}
        <div className="aspect-video bg-gradient-to-br from-primary/15 via-primary/5 to-muted relative overflow-hidden flex items-center justify-center">
          {!imgError && project.image ? (
            <img
              src={project.image}
              alt={`${project.title} preview`}
              loading="lazy"
              onError={() => setImgError(true)}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-muted-foreground p-6 text-center">
              <FolderGit2 className="h-12 w-12 mb-2 text-primary/60" aria-hidden="true" />
              <span className="text-xs font-medium uppercase tracking-wider">{project.category}</span>
            </div>
          )}

          {/* Category Badge overlay */}
          <div className="absolute top-3 right-3">
            <Badge variant="secondary" className="backdrop-blur-md bg-background/80 text-xs font-semibold shadow-sm">
              {project.category}
            </Badge>
          </div>
        </div>

        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
              {project.title}
            </CardTitle>
            <div className="flex items-center gap-1 shrink-0">
              {hasValidDemo && (
                <Button size="icon" variant="ghost" className="h-9 w-9 min-h-[44px] min-w-[44px] text-muted-foreground hover:text-primary focus-visible:ring-2 focus-visible:ring-primary" asChild>
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Live demo for ${project.title} (opens in a new tab)`}
                    title="Live Demo"
                  >
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  </a>
                </Button>
              )}
              {project.githubUrl && (
                <Button size="icon" variant="ghost" className="h-9 w-9 min-h-[44px] min-w-[44px] text-muted-foreground hover:text-primary focus-visible:ring-2 focus-visible:ring-primary" asChild>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`GitHub repository for ${project.title} (opens in a new tab)`}
                    title="View Source Code"
                  >
                    <Github className="h-4 w-4" aria-hidden="true" />
                  </a>
                </Button>
              )}
            </div>
          </div>
          <CardDescription className="text-sm leading-relaxed text-muted-foreground line-clamp-3">
            {project.description}
          </CardDescription>
        </CardHeader>
      </div>

      <CardContent className="pt-0">
        <div className="flex flex-wrap gap-1.5 mt-2" aria-label="Technologies used">
          {project.tech.map((tech) => (
            <Badge
              key={tech}
              variant="outline"
              className="text-xs px-2 py-0.5 bg-muted/30 hover:bg-muted font-normal text-muted-foreground"
            >
              {tech}
            </Badge>
          ))}
        </div>

        {/* Footer Actions */}
        <div className="mt-4 pt-2 border-t border-border/60 flex items-center justify-between">
          {project.githubUrl && (
            <Button
              variant="link"
              size="sm"
              className="p-0 h-auto min-h-[44px] text-xs text-primary flex items-center gap-1.5 font-medium focus-visible:ring-2 focus-visible:ring-primary"
              asChild
            >
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View source code for ${project.title} on GitHub (opens in a new tab)`}
              >
                <Github className="h-3.5 w-3.5" aria-hidden="true" />
                <span>View Code</span>
              </a>
            </Button>
          )}

          {hasValidDemo ? (
            <Button
              variant="link"
              size="sm"
              className="p-0 h-auto min-h-[44px] text-xs text-primary flex items-center gap-1.5 font-medium focus-visible:ring-2 focus-visible:ring-primary"
              asChild
            >
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open live demo for ${project.title} (opens in a new tab)`}
              >
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Live Demo</span>
              </a>
            </Button>
          ) : (
            <span className="text-[11px] text-muted-foreground/70 font-mono">Open Source</span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
