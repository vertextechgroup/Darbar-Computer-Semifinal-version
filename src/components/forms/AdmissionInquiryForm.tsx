"use client";
import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, CheckCircle2, Loader2, Phone, Mail, UserRound, BookOpenCheck, MessageSquare, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/toast";
import { Badge } from "@/components/common/Badge";
import { Card, CardContent } from "@/components/ui/card";
import { courses } from "@/content/courses";
import { cn } from "@/lib/utils";

export const CreateLeadSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name is required")
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name is too long")
    .regex(/^[a-zA-Z\s.'-]+$/, "Name can only contain letters, spaces, hyphens, periods, and apostrophes"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .min(7, "Phone number seems too short")
    .max(20, "Phone number is too long")
    .regex(/^[+\d\s()-]+$/, "Please enter a valid phone number"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  courseSlug: z.string().optional(),
  preferredBatch: z
    .enum(["morning", "day", "evening", "weekend", "any"])
    .default("any"),
  message: z
    .string()
    .max(1000, "Message is too long (max 1,000 characters)")
    .optional(),
});

export type CreateLeadInput = z.infer<typeof CreateLeadSchema>;

const batchOptions = [
  { value: "morning", label: "Morning (7–10 AM)" },
  { value: "day", label: "Day (10 AM – 4 PM)" },
  { value: "evening", label: "Evening (4–8 PM)" },
  { value: "weekend", label: "Weekend (Sat–Sun)" },
  { value: "any", label: "Any — I'm flexible" },
];

const courseOptions = [
  { value: "", label: "Not sure yet — need counseling" },
  ...courses.map((c) => ({ value: c.slug, label: `${c.title} (${c.category})` })),
];

export function AdmissionInquiryForm() {
  const searchParams = useSearchParams();
  const prefilledCourse = searchParams.get("course") ?? "";
  const { toast } = useToast();
  const [submitted, setSubmitted] = React.useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CreateLeadInput>({
    resolver: zodResolver(CreateLeadSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      courseSlug: prefilledCourse,
      preferredBatch: "any",
      message: "",
    },
  });

  React.useEffect(() => {
    if (prefilledCourse) setValue("courseSlug", prefilledCourse);
  }, [prefilledCourse, setValue]);

  const selectedCourseSlug = watch("courseSlug");
  const selectedCourse = selectedCourseSlug
    ? courses.find((c) => c.slug === selectedCourseSlug)
    : null;

  const onSubmit = async (data: CreateLeadInput) => {
    await new Promise((r) => setTimeout(r, 900));
    console.log("[AdmissionInquiryForm] Stub submit payload:", data);
    console.log("[AdmissionInquiryForm] TODO: POST /api/v1/leads once backend exists");

    const subject = encodeURIComponent(`Admission Inquiry — ${selectedCourse?.title ?? "General Counseling"}`);
    const bodyLines = [
      `Hi Darbar Computer team,`,
      ``,
      `I'd like to inquire about admission.`,
      `Name: ${data.fullName}`,
      `Phone: ${data.phone}`,
      `Email: ${data.email}`,
      `Course of interest: ${selectedCourse?.title ?? "Undecided — need counseling"}`,
      `Preferred batch: ${batchOptions.find((b) => b.value === data.preferredBatch)?.label ?? data.preferredBatch}`,
      data.message ? `Message: ${data.message}` : "",
    ].filter(Boolean);
    const mailto = `mailto:info@darbarcomputer.edu.np?subject=${subject}&body=${encodeURIComponent(bodyLines.join("\r\n"))}`;
    try {
      window.location.href = mailto;
    } catch {}

    toast({
      title: "Inquiry sent!",
      description: "Thanks! Our counselor will contact you within 1 business day. Your email client should have opened with the message pre-drafted.",
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
            Thank you for your inquiry!
          </h3>
          <p className="mt-3 text-neutral-700 max-w-lg mx-auto leading-relaxed">
            We&apos;ve received your admission inquiry. Our counselor will reach out to you by phone or email within 1 business day to schedule your free counseling and demo class.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button variant="outline" onClick={() => { setSubmitted(false); reset(); }}>
              Submit another inquiry
            </Button>
            <Link href="/courses" className="w-full sm:w-auto">
              <Button>
                Browse all courses
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  }

  const hasError = Object.keys(errors).length > 0;

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      {selectedCourse && (
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 flex items-center gap-3">
          <BookOpenCheck className="size-5 text-primary shrink-0" />
          <div className="min-w-0">
            <div className="text-xs font-semibold uppercase tracking-wider text-primary mb-0.5">
              Pre-selected course
            </div>
            <div className="text-sm font-semibold text-neutral-900 truncate">
              {selectedCourse.title}
            </div>
          </div>
          <Badge variant="outline" className="ml-auto shrink-0">
            {selectedCourse.level}
          </Badge>
        </div>
      )}

      {hasError && (
        <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive" role="alert">
          Please fix the errors marked below before submitting.
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="fullName" className="flex items-center gap-1">
            <UserRound className="size-3.5 text-neutral-500" />
            Full Name
            <span className="text-destructive">*</span>
          </Label>
          <Input
            id="fullName"
            autoComplete="name"
            placeholder="e.g. Ram Sharma"
            aria-invalid={!!errors.fullName}
            aria-describedby={errors.fullName ? "fullName-error" : undefined}
            className={cn(errors.fullName && "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/30")}
            {...register("fullName")}
          />
          {errors.fullName && (
            <p id="fullName-error" className="text-xs text-destructive">
              {errors.fullName.message}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="phone" className="flex items-center gap-1">
            <Phone className="size-3.5 text-neutral-500" />
            Phone
            <span className="text-destructive">*</span>
          </Label>
          <Input
            id="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            placeholder="+977-XX-XXXXXXX"
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            className={cn(errors.phone && "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/30")}
            {...register("phone")}
          />
          {errors.phone && (
            <p id="phone-error" className="text-xs text-destructive">
              {errors.phone.message}
            </p>
          )}
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
            inputMode="email"
            placeholder="you@example.com"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={cn(errors.email && "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/30")}
            {...register("email")}
          />
          {errors.email && (
            <p id="email-error" className="text-xs text-destructive">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="courseSlug" className="flex items-center gap-1">
            <BookOpenCheck className="size-3.5 text-neutral-500" />
            Course of interest
          </Label>
          <Select
            value={watch("courseSlug") ?? ""}
            onChange={(e) => setValue("courseSlug", e.target.value, { shouldValidate: true })}
            options={courseOptions}
            placeholder="Select a course (optional)"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="preferredBatch" className="flex items-center gap-1">
            <Clock className="size-3.5 text-neutral-500" />
            Preferred batch time
            <span className="text-destructive">*</span>
          </Label>
          <Select
            value={watch("preferredBatch")}
            onChange={(e) => setValue("preferredBatch", e.target.value as CreateLeadInput["preferredBatch"], { shouldValidate: true })}
            options={batchOptions}
          />
          {errors.preferredBatch && (
            <p className="text-xs text-destructive">{errors.preferredBatch.message}</p>
          )}
        </div>

        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="message" className="flex items-center gap-1">
            <MessageSquare className="size-3.5 text-neutral-500" />
            Message
            <span className="text-neutral-400 font-normal"> (optional)</span>
          </Label>
          <Textarea
            id="message"
            rows={4}
            placeholder="Tell us a bit about yourself, your goals, or any questions you have..."
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "message-error" : undefined}
            className={cn(errors.message && "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/30")}
            {...register("message")}
          />
          {errors.message && (
            <p id="message-error" className="text-xs text-destructive">
              {errors.message.message}
            </p>
          )}
          <p className="text-[11px] text-neutral-500">
            {watch("message")?.length ?? 0}/1,000 characters
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
        <p className="text-[11px] text-neutral-500 leading-relaxed">
          By submitting this form, you agree that {`Darbar Computer`} may contact you by phone/email about your inquiry.
        </p>
        <Button type="submit" size="lg" disabled={isSubmitting} className="shadow-lg shadow-primary/20 sm:w-auto w-full h-12 px-6">
          {isSubmitting ? (
            <>
              <Loader2 className="size-5 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <Send className="size-5" />
              Send Admission Inquiry
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
