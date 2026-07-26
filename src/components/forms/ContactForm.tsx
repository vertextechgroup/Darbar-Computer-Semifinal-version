"use client";
import * as React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, CheckCircle2, Loader2, UserRound, Mail, Phone, MessageSquare, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/toast";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const ContactFormSchema = z.object({
  name: z
    .string()
    .min(1, "Your name is required")
    .min(2, "Name must be at least 2 characters")
    .max(100),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email"),
  phone: z.string().optional().or(z.literal("")),
  subject: z
    .string()
    .min(1, "Subject is required")
    .min(3, "Subject is too short")
    .max(200),
  organization: z.string().max(100).optional().or(z.literal("")),
  message: z
    .string()
    .min(1, "Please enter a message")
    .min(10, "Message is too short (min 10 characters)")
    .max(2000, "Message is too long (max 2,000 characters)"),
});

export type ContactFormInput = z.infer<typeof ContactFormSchema>;

export function ContactForm() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = React.useState(false);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormInput>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      organization: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormInput) => {
    await new Promise((r) => setTimeout(r, 900));
    console.log("[ContactForm] Stub submit payload:", data);
    console.log("[ContactForm] TODO: POST /api/v1/contact once backend exists");

    const subject = encodeURIComponent(`[Website Contact] ${data.subject}`);
    const bodyLines = [
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      data.phone ? `Phone: ${data.phone}` : "",
      data.organization ? `Organization: ${data.organization}` : "",
      ``,
      `Message:`,
      data.message,
    ].filter(Boolean);
    const mailto = `mailto:info@darbarcomputer.edu.np?subject=${subject}&body=${encodeURIComponent(bodyLines.join("\r\n"))}`;
    try {
      window.location.href = mailto;
    } catch {}

    toast({
      title: "Message sent!",
      description: "Thanks for reaching out — we'll reply within 1 business day.",
      variant: "success",
    });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Card className="border-success/30 bg-success/5">
        <CardContent className="p-8 sm:p-10 text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-success/10 text-success">
            <CheckCircle2 className="size-8" />
          </div>
          <h3 className="text-xl font-bold text-neutral-900 text-balance">
            Thank you — message received!
          </h3>
          <p className="mt-3 text-neutral-700 max-w-lg mx-auto leading-relaxed">
            Your message has been sent to our team. We'll read it carefully and reply by email within 1 business day.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button variant="outline" onClick={() => { setSubmitted(false); reset(); }}>
              Send another message
            </Button>
            <Link href="/" className="w-full sm:w-auto">
              <Button>Back to Home</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  }

  const hasError = Object.keys(errors).length > 0;

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      {hasError && (
        <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive" role="alert">
          Please fix the errors marked below before submitting.
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        <div className="space-y-1.5">
          <Label htmlFor="name" className="flex items-center gap-1">
            <UserRound className="size-3.5 text-neutral-500" />
            Your Name
            <span className="text-destructive">*</span>
          </Label>
          <Input
            id="name"
            autoComplete="name"
            placeholder="Ram Sharma"
            aria-invalid={!!errors.name}
            className={cn(errors.name && "border-destructive focus-visible:ring-destructive/30")}
            {...register("name")}
          />
          {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="email" className="flex items-center gap-1">
            <Mail className="size-3.5 text-neutral-500" />
            Email
            <span className="text-destructive">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            aria-invalid={!!errors.email}
            className={cn(errors.email && "border-destructive focus-visible:ring-destructive/30")}
            {...register("email")}
          />
          {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="phone" className="flex items-center gap-1">
            <Phone className="size-3.5 text-neutral-500" />
            Phone <span className="text-neutral-400 font-normal">(optional)</span>
          </Label>
          <Input
            id="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+977-XX-XXXXXXX"
            aria-invalid={!!errors.phone}
            {...register("phone")}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="organization" className="flex items-center gap-1">
            <Building2 className="size-3.5 text-neutral-500" />
            Organization / School{" "}
            <span className="text-neutral-400 font-normal">(optional)</span>
          </Label>
          <Input
            id="organization"
            placeholder="Company, school, or 'Individual'"
            aria-invalid={!!errors.organization}
            {...register("organization")}
          />
        </div>

        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="subject" className="flex items-center gap-1">
            <MessageSquare className="size-3.5 text-neutral-500" />
            Subject
            <span className="text-destructive">*</span>
          </Label>
          <Input
            id="subject"
            placeholder="e.g. Corporate training inquiry, Feedback, Partnership proposal"
            aria-invalid={!!errors.subject}
            className={cn(errors.subject && "border-destructive focus-visible:ring-destructive/30")}
            {...register("subject")}
          />
          {errors.subject && <p className="text-xs text-destructive">{errors.subject.message}</p>}
        </div>

        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="message" className="flex items-center gap-1">
            <MessageSquare className="size-3.5 text-neutral-500" />
            Message
            <span className="text-destructive">*</span>
          </Label>
          <Textarea
            id="message"
            rows={6}
            placeholder="Write your message here — the more detail, the better we can help."
            aria-invalid={!!errors.message}
            className={cn(errors.message && "border-destructive focus-visible:ring-destructive/30")}
            {...register("message")}
          />
          {errors.message && <p className="text-xs text-destructive">{errors.message.message}</p>}
          <p className="text-[11px] text-neutral-500">
            {watch("message")?.length ?? 0}/2,000 characters
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 pt-2">
        <p className="text-[11px] text-neutral-500 leading-relaxed max-w-md">
          Your contact details are used only to reply to this message. We never share or sell personal information.
        </p>
        <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto h-12 px-6 shadow-lg shadow-primary/20">
          {isSubmitting ? (
            <>
              <Loader2 className="size-5 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="size-5" />
              Send Message
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
