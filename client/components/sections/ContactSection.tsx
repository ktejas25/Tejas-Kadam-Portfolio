import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Linkedin, Github, MessageSquare, Send, Loader2, CheckCircle2 } from "lucide-react";
import { PROFILE_INFO } from "@/data/portfolio";
import { toast } from "sonner";

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters." })
    .max(50, { message: "Name cannot exceed 50 characters." }),
  email: z
    .string()
    .email({ message: "Please enter a valid email address." }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters." })
    .max(1000, { message: "Message cannot exceed 1000 characters." }),
});

export type ContactFormData = z.infer<typeof contactSchema>;

// Public Web3Forms submission access key
const WEB3FORMS_ACCESS_KEY = "a2afd3c9-849a-41ba-8b70-9068de605274";

export function ContactSection() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: data.name,
          email: data.email,
          message: data.message,
          subject: `Portfolio Contact from ${data.name}`,
          from_name: data.name,
          replyto: data.email,
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Thank you for reaching out! Your message has been sent successfully.");
        reset();
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        throw new Error(result.message || "Failed to deliver message via contact service.");
      }
    } catch (error: any) {
      console.error("Contact submission error:", error);
      toast.error(
        error.message || "An unexpected error occurred while sending your message. Please try emailing directly."
      );
    }
  };

  return (
    <section id="contact" aria-label="Contact Section" className="py-20 section-bg">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">Get In Touch</h2>
            <div className="w-16 h-1 bg-primary mx-auto rounded-full mb-6" aria-hidden="true" />
            <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto">
              Have an opportunity, question, or project idea? Send a message or reach out via direct channels.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10 items-start">
            {/* Direct Channels */}
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-2">Let's Connect</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  I am currently open to new software engineering opportunities, internships, and collaborative projects. Feel free to connect across any of these channels.
                </p>
              </div>

              <div className="space-y-3">
                <a
                  href={`mailto:${PROFILE_INFO.socials.email}`}
                  className="flex items-center gap-4 p-4 rounded-xl border bg-card hover:border-primary/60 hover:shadow-md transition-all group"
                  aria-label={`Email ${PROFILE_INFO.socials.email}`}
                >
                  <div className="p-2.5 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                      Email
                    </p>
                    <p className="text-xs text-muted-foreground font-mono">{PROFILE_INFO.socials.email}</p>
                  </div>
                </a>

                <a
                  href={PROFILE_INFO.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl border bg-card hover:border-primary/60 hover:shadow-md transition-all group"
                  aria-label="Connect on LinkedIn"
                >
                  <div className="p-2.5 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Linkedin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                      LinkedIn
                    </p>
                    <p className="text-xs text-muted-foreground">linkedin.com/in/tejas-kadam</p>
                  </div>
                </a>

                <a
                  href={PROFILE_INFO.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl border bg-card hover:border-primary/60 hover:shadow-md transition-all group"
                  aria-label="Explore GitHub Profile"
                >
                  <div className="p-2.5 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Github className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                      GitHub
                    </p>
                    <p className="text-xs text-muted-foreground">github.com/ktejas25</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Validated Contact Form */}
            <Card className="shadow-lg border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl font-bold">
                  <MessageSquare className="h-5 w-5 text-primary" aria-hidden="true" />
                  Send a Message
                </CardTitle>
                <CardDescription>
                  Fill out the form below and I'll respond as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isSubmitted && (
                  <div
                    role="alert"
                    className="mb-4 p-3 rounded-lg bg-primary/10 border border-primary/20 text-primary flex items-center gap-2 text-sm"
                  >
                    <CheckCircle2 className="h-4 w-4 shrink-0" />
                    <span>Message sent successfully! Thank you for getting in touch.</span>
                  </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
                  {/* Name field */}
                  <div className="space-y-1.5">
                    <Label htmlFor="contact-name" className="text-xs font-semibold">
                      Your Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="contact-name"
                      placeholder="e.g. Alex Morgan"
                      disabled={isSubmitting}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? "name-error" : undefined}
                      className={errors.name ? "border-destructive focus-visible:ring-destructive" : ""}
                      {...register("name")}
                    />
                    {errors.name && (
                      <p id="name-error" className="text-xs text-destructive font-medium mt-1">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  {/* Email field */}
                  <div className="space-y-1.5">
                    <Label htmlFor="contact-email" className="text-xs font-semibold">
                      Your Email <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="contact-email"
                      type="email"
                      placeholder="e.g. alex@example.com"
                      disabled={isSubmitting}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? "email-error" : undefined}
                      className={errors.email ? "border-destructive focus-visible:ring-destructive" : ""}
                      {...register("email")}
                    />
                    {errors.email && (
                      <p id="email-error" className="text-xs text-destructive font-medium mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Message field */}
                  <div className="space-y-1.5">
                    <Label htmlFor="contact-message" className="text-xs font-semibold">
                      Message <span className="text-destructive">*</span>
                    </Label>
                    <Textarea
                      id="contact-message"
                      rows={4}
                      placeholder="How can I assist you with your team or project?"
                      disabled={isSubmitting}
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={errors.message ? "message-error" : undefined}
                      className={errors.message ? "border-destructive focus-visible:ring-destructive resize-y" : "resize-y"}
                      {...register("message")}
                    />
                    {errors.message && (
                      <p id="message-error" className="text-xs text-destructive font-medium mt-1">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  {/* Submit button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full font-semibold shadow-sm transition-all"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" aria-hidden="true" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
