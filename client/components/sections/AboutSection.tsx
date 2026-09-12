import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Download,
  Coffee,
  Code,
  Smartphone,
  Server,
  Zap,
  MessageSquare,
  GraduationCap,
  CheckCircle2,
} from "lucide-react";
import { PROFILE_INFO, SKILL_CATEGORIES } from "@/data/portfolio";
import { toast } from "sonner";

export function AboutSection() {
  const [downloading, setDownloading] = useState(false);

  const handleDownloadResume = async () => {
    try {
      setDownloading(true);
      // Verify local file availability
      const response = await fetch(PROFILE_INFO.resumePath, { method: "HEAD" });
      if (!response.ok) {
        throw new Error("Resume file not found");
      }

      // Download anchor
      const link = document.createElement("a");
      link.href = PROFILE_INFO.resumePath;
      link.download = "Tejas-Kadam-Resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success("Resume download initiated successfully!");
    } catch (error) {
      console.error("Resume download error:", error);
      toast.error("Could not download resume file. Please try contacting me directly.");
    } finally {
      setDownloading(false);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Frontend Development":
        return <Smartphone className="h-4 w-4 text-primary" aria-hidden="true" />;
      case "Backend & Database":
        return <Server className="h-4 w-4 text-primary" aria-hidden="true" />;
      case "Mobile Development":
        return <Code className="h-4 w-4 text-primary" aria-hidden="true" />;
      case "Development Tools":
        return <Zap className="h-4 w-4 text-primary" aria-hidden="true" />;
      case "Languages":
        return <MessageSquare className="h-4 w-4 text-primary" aria-hidden="true" />;
      default:
        return <Code className="h-4 w-4 text-primary" aria-hidden="true" />;
    }
  };

  return (
    <section id="about" aria-label="About Me" className="py-20 section-bg">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">About Me</h2>
            <div className="w-16 h-1 bg-primary mx-auto rounded-full mb-8" aria-hidden="true" />

            {PROFILE_INFO.fullBio.map((paragraph, idx) => (
              <p key={idx} className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-4">
                {paragraph}
              </p>
            ))}

            <div className="mt-8 flex justify-center">
              <Button
                onClick={handleDownloadResume}
                disabled={downloading}
                size="lg"
                className="flex items-center gap-2 shadow-md hover:shadow-lg transition-all"
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                {downloading ? "Preparing Resume..." : "Download Resume"}
              </Button>
            </div>
          </div>

          {/* Main Details Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Experience & Expertise (2 Cols) */}
            <Card className="lg:col-span-2 shadow-sm border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl font-bold">
                  <Coffee className="h-5 w-5 text-primary" aria-hidden="true" />
                  Experience & Focus
                </CardTitle>
                <CardDescription>
                  My engineering principles and continuous learning journey
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold text-base mb-2 text-primary flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" aria-hidden="true" />
                    Full-Stack Engineering
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Specialized in modern web architecture using React, Node.js, TypeScript, and Express. I construct scalable applications from initial conceptualization to deployment, emphasizing clean code separation, responsiveness, and resilient error handling.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-base mb-2 text-primary flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-primary" aria-hidden="true" />
                    Education & Academic Foundation
                  </h3>
                  <p className="text-sm font-medium text-foreground mb-1">
                    {PROFILE_INFO.education.degree}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {PROFILE_INFO.education.description}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-base mb-2 text-primary flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" aria-hidden="true" />
                    Community & Growth Mindset
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Actively engaged with developer communities, exploring modern AI integrations and web tooling. I believe in writing readable, maintainable software and staying adaptable in an evolving technology ecosystem.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Technical Skills (1 Col) */}
            <Card className="shadow-sm border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl font-bold">
                  <Code className="h-5 w-5 text-primary" aria-hidden="true" />
                  Technical Skills
                </CardTitle>
                <CardDescription>
                  Tools and frameworks I work with regularly
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {Object.entries(SKILL_CATEGORIES).map(([category, techs]) => (
                  <div key={category} className="space-y-2">
                    <div className="flex items-center gap-2">
                      {getCategoryIcon(category)}
                      <h4 className="font-semibold text-xs text-primary uppercase tracking-wider">
                        {category}
                      </h4>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {techs.map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="text-xs px-2.5 py-0.5 font-medium transition-transform hover:scale-105"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
