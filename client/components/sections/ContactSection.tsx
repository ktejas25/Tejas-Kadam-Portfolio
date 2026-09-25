import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Mail,
  Linkedin,
  Github,
  MessageSquare,
  Send,
  Loader2,
  CheckCircle2,
  Copy,
  Check,
  ExternalLink,
  AlertCircle,
  RotateCcw,
} from "lucide-react";
import { PROFILE_INFO } from "@/data/portfolio";
import { toast } from "sonner";

/**
 * Validation schema for the portfolio contact form.
 * Enforces length boundaries and realistic email formatting to prevent spam and invalid submissions.
 */
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Name must be at least 2 characters." })
    .max(50, { message: "Name cannot exceed 50 characters." }),
  email: z
    .string()
    .trim()
    .email({ message: "Please enter a valid email address (e.g. name@domain.com)." }),
  message: z
    .string()
    .trim()
    .min(10, { message: "Message must be at least 10 characters." })
    .max(1000, { message: "Message cannot exceed 1000 characters." }),
});

export type ContactFormData = z.infer<typeof contactSchema>;

/** Public Web3Forms submission access key */
const WEB3FORMS_ACCESS_KEY =
  (import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string | undefined) ||
  "a2afd3c9-849a-41ba-8b70-9068de605274";

export function ContactSection() {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const messageValue = watch("message") || "";
  const messageLength = messageValue.length;

  /**
   * One-click clipboard copy utility for the user's email address
   */
  const handleCopyEmail = useCallback(async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(PROFILE_INFO.socials.email);
      } else {
        // Fallback for non-secure contexts
        const textArea = document.createElement("textarea");
        textArea.value = PROFILE_INFO.socials.email;
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      setCopiedEmail(true);
      toast.success("Email address copied to clipboard!");
      setTimeout(() => setCopiedEmail(false), 2500);
    } catch {
      toast.info(`Direct email: ${PROFILE_INFO.socials.email}`);
    }
  }, []);

  /**
   * Submits the sanitized contact message to Web3Forms with offline resilience and error handling
   */
  const onSubmit = useCallback(
    async (data: ContactFormData) => {
      // Check offline status
      if (typeof navigator !== "undefined" && !navigator.onLine) {
        toast.error("You appear to be offline. Please verify your connection and try again.");
        return;
      }

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

        const result: { success: boolean; message?: string } = await response.json();

        if (result.success) {
          toast.success("Thank you for reaching out! Your message has been sent successfully.");
          reset();
          setIsSubmitted(true);
          const timer = setTimeout(() => setIsSubmitted(false), 6000);
          return () => clearTimeout(timer);
        } else {
          throw new Error(result.message || "Failed to deliver message via contact service.");
        }
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "An unexpected error occurred while sending your message. Please try emailing directly.";
        console.error("Contact submission error:", error);
        toast.error(errorMessage);
      }
    },
    [reset]
  );

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="py-20 section-bg transition-colors"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2
              id="contact-heading"
              className="text-3xl sm:text-4xl font-bold tracking-tight mb-4"
            >
              Get In Touch
            </h2>
            <div className="w-16 h-1 bg-primary mx-auto rounded-full mb-6" aria-hidden="true" />
            <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Have an engineering opportunity, question, or project idea? Send a message or connect directly.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10 items-start">
            {/* Direct Channels */}
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-2">Let's Connect</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  I am currently open to new software engineering opportunities, internships, and collaborative
                  projects. Reach out directly or send a message using the form.
                </p>
              </div>

              <div className="space-y-3" role="list" aria-label="Direct contact channels">
                {/* Email with mailto and one-click copy button */}
                <div
                  role="listitem"
                  className="flex items-center justify-between p-4 min-h-[64px] rounded-xl border bg-card hover:border-primary/60 hover:shadow-md transition-all group"
                >
                  <a
                    href={`mailto:${PROFILE_INFO.socials.email}`}
                    className="flex items-center gap-4 flex-grow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg pr-2"
                    aria-label={`Send email to ${PROFILE_INFO.socials.email}`}
                  >
                    <div
                      className="p-2.5 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors shrink-0"
                      aria-hidden="true"
                    >
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                        Email
                      </p>
                      <p className="text-xs text-muted-foreground font-mono break-all">
                        {PROFILE_INFO.socials.email}
                      </p>
                    </div>
                  </a>

                  {/* Copy Email Button */}
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={handleCopyEmail}
                    className="h-10 w-10 shrink-0 text-muted-foreground hover:text-primary hover:bg-primary/10 focus-visible:ring-2 focus-visible:ring-primary"
                    aria-label={copiedEmail ? "Email address copied" : "Copy email address to clipboard"}
                    title={copiedEmail ? "Copied!" : "Copy email address"}
                  >
                    {copiedEmail ? (
                      <Check className="h-4 w-4 text-green-500" aria-hidden="true" />
                    ) : (
                      <Copy className="h-4 w-4" aria-hidden="true" />
                    )}
                  </Button>
                </div>

                {/* LinkedIn Link */}
                <div role="listitem">
                  <a
                    href={PROFILE_INFO.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 min-h-[64px] rounded-xl border bg-card hover:border-primary/60 hover:shadow-md transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    aria-label="Connect on LinkedIn (opens in a new tab)"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="p-2.5 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors shrink-0"
                        aria-hidden="true"
                      >
                        <Linkedin className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                          LinkedIn
                        </p>
                        <p className="text-xs text-muted-foreground font-mono">linkedin.com/in/tejas-kadam</p>
                      </div>
                    </div>
                    <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" aria-hidden="true" />
                  </a>
                </div>

                {/* GitHub Link */}
                <div role="listitem">
                  <a
                    href={PROFILE_INFO.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 min-h-[64px] rounded-xl border bg-card hover:border-primary/60 hover:shadow-md transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    aria-label="Explore GitHub profile (opens in a new tab)"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="p-2.5 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors shrink-0"
                        aria-hidden="true"
                      >
                        <Github className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                          GitHub
                        </p>
                        <p className="text-xs text-muted-foreground font-mono">github.com/ktejas25</p>
                      </div>
                    </div>
                    <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>

            {/* Validated Contact Form */}
            <Card className="shadow-lg border-2">
              <CardHeader className="space-y-1.5 pb-4">
                <CardTitle className="flex items-center gap-2 text-xl font-bold">
                  <MessageSquare className="h-5 w-5 text-primary shrink-0" aria-hidden="true" />
                  <span>Send a Message</span>
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  Fill out the form below and I'll respond as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Accessible Success State Alert */}
                {isSubmitted && (
                  <div
                    role="status"
                    aria-live="polite"
                    className="mb-4 p-3.5 rounded-lg bg-primary/10 border border-primary/20 text-foreground flex items-center gap-3 text-sm animate-in fade-in duration-200"
                  >
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0" aria-hidden="true" />
                    <span>Message sent successfully! Thank you for getting in touch.</span>
                  </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
                  {/* Name field */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="contact-name" className="text-xs font-semibold text-foreground">
                        Your Name <span className="text-destructive" aria-hidden="true">*</span>
                      </Label>
                    </div>
                    <Input
                      id="contact-name"
                      autoComplete="name"
                      placeholder="e.g. Alex Morgan"
                      disabled={isSubmitting}
                      aria-required="true"
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? "name-error" : undefined}
                      className={`min-h-[44px] transition-colors ${
                        errors.name ? "border-destructive focus-visible:ring-destructive" : ""
                      }`}
                      {...register("name")}
                    />
                    {errors.name && (
                      <p
                        id="name-error"
                        role="alert"
                        aria-live="assertive"
                        className="text-xs text-destructive font-medium mt-1 flex items-center gap-1.5"
                      >
                        <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                        <span>{errors.name.message}</span>
                      </p>
                    )}
                  </div>

                  {/* Email field */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="contact-email" className="text-xs font-semibold text-foreground">
                        Your Email <span className="text-destructive" aria-hidden="true">*</span>
                      </Label>
                    </div>
                    <Input
                      id="contact-email"
                      type="email"
                      autoComplete="email"
                      placeholder="e.g. alex@example.com"
                      disabled={isSubmitting}
                      aria-required="true"
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? "email-error" : undefined}
                      className={`min-h-[44px] transition-colors ${
                        errors.email ? "border-destructive focus-visible:ring-destructive" : ""
                      }`}
                      {...register("email")}
                    />
                    {errors.email && (
                      <p
                        id="email-error"
                        role="alert"
                        aria-live="assertive"
                        className="text-xs text-destructive font-medium mt-1 flex items-center gap-1.5"
                      >
                        <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                        <span>{errors.email.message}</span>
                      </p>
                    )}
                  </div>

                  {/* Message field with live character counter */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="contact-message" className="text-xs font-semibold text-foreground">
                        Message <span className="text-destructive" aria-hidden="true">*</span>
                      </Label>
                      <span
                        id="message-counter"
                        aria-live="polite"
                        className={`text-[11px] font-mono transition-colors ${
                          messageLength > 900
                            ? "text-amber-500 font-semibold"
                            : "text-muted-foreground"
                        }`}
                      >
                        {messageLength}/1000
                      </span>
                    </div>
                    <Textarea
                      id="contact-message"
                      rows={4}
                      placeholder="How can I assist you with your project or team?"
                      disabled={isSubmitting}
                      aria-required="true"
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={
                        errors.message ? "message-error message-counter" : "message-counter"
                      }
                      className={`resize-y min-h-[100px] transition-colors ${
                        errors.message ? "border-destructive focus-visible:ring-destructive" : ""
                      }`}
                      {...register("message")}
                    />
                    {errors.message && (
                      <p
                        id="message-error"
                        role="alert"
                        aria-live="assertive"
                        className="text-xs text-destructive font-medium mt-1 flex items-center gap-1.5"
                      >
                        <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                        <span>{errors.message.message}</span>
                      </p>
                    )}
                  </div>

                  {/* Form Action Buttons */}
                  <div className="pt-2 flex items-center gap-3">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-grow min-h-[44px] font-semibold shadow-sm transition-all focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                          <span>Sending Message...</span>
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" aria-hidden="true" />
                          <span>Send Message</span>
                        </>
                      )}
                    </Button>

                    {isDirty && !isSubmitting && (
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => reset()}
                        className="min-h-[44px] min-w-[44px] shrink-0 text-muted-foreground hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary"
                        title="Clear form inputs"
                        aria-label="Clear form inputs"
                      >
                        <RotateCcw className="h-4 w-4" aria-hidden="true" />
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
