import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail } from "lucide-react";
import { PROFILE_INFO } from "@/data/portfolio";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-border bg-background/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="text-sm text-muted-foreground">
              © {currentYear} {PROFILE_INFO.name}. Built with React, TypeScript & Tailwind CSS.
            </p>
          </div>

          <div className="flex space-x-2">
            <Button size="icon" variant="ghost" asChild>
              <a
                href={PROFILE_INFO.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
              >
                <Github className="h-4 w-4" aria-hidden="true" />
              </a>
            </Button>
            <Button size="icon" variant="ghost" asChild>
              <a
                href={PROFILE_INFO.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="h-4 w-4" aria-hidden="true" />
              </a>
            </Button>
            <Button size="icon" variant="ghost" asChild>
              <a
                href={`mailto:${PROFILE_INFO.socials.email}`}
                aria-label={`Send email to ${PROFILE_INFO.socials.email}`}
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
