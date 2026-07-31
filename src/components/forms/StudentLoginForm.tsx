"use client";
import * as React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { LogIn, Loader2, KeyRound, Mail, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";

const StudentLoginSchema = z.object({
  emailOrPhone: z
    .string()
    .min(1, "Email or phone is required")
    .max(200, "Email or phone is too long"),
  password: z.string().min(6, "Password must be at least 6 characters").max(200),
});

export type StudentLoginInput = z.infer<typeof StudentLoginSchema>;

export function StudentLoginForm() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = React.useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<StudentLoginInput>({
    resolver: zodResolver(StudentLoginSchema),
    defaultValues: { emailOrPhone: "", password: "" },
  });

  const onSubmit = async (data: StudentLoginInput) => {
    await new Promise((r) => setTimeout(r, 750));
    console.log("[StudentLogin] Stub submit payload:", data);
    toast({
      title: "Login submitted",
      description: "Student portal integration can be connected next.",
      variant: "success",
    });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Card className="border-success/30 bg-success/5">
        <CardContent className="p-7 sm:p-8">
          <div className="flex items-start gap-3">
            <div className="shrink-0 flex h-11 w-11 items-center justify-center rounded-full bg-success/10 text-success">
              <CheckCircle2 className="size-6" />
            </div>
            <div className="min-w-0">
              <h2 className="text-lg font-bold tracking-tight text-neutral-900">
                Login submitted
              </h2>
              <p className="mt-1 text-sm text-neutral-700 leading-relaxed">
                This UI is ready. Connect your preferred auth backend to enable real student sessions.
              </p>
            </div>
          </div>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Button variant="outline" onClick={() => { setSubmitted(false); reset(); }}>
              Try again
            </Button>
            <Link href="/student/register" className="w-full sm:w-auto">
              <Button className="w-full">Create account</Button>
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
        <div
          className="rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive"
          role="alert"
        >
          Please fix the errors marked below before submitting.
        </div>
      )}

      <div className="space-y-1.5">
        <Label htmlFor="emailOrPhone" className="flex items-center gap-1.5">
          <Mail className="size-3.5 text-neutral-500" />
          Email or phone
          <span className="text-destructive">*</span>
        </Label>
        <Input
          id="emailOrPhone"
          autoComplete="username"
          placeholder="you@example.com or 98XXXXXXXX"
          aria-invalid={!!errors.emailOrPhone}
          className={cn(errors.emailOrPhone && "border-destructive focus-visible:ring-destructive/30")}
          {...register("emailOrPhone")}
        />
        {errors.emailOrPhone && <p className="text-xs text-destructive">{errors.emailOrPhone.message}</p>}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="password" className="flex items-center gap-1.5">
          <KeyRound className="size-3.5 text-neutral-500" />
          Password
          <span className="text-destructive">*</span>
        </Label>
        <Input
          id="password"
          type="password"
          autoComplete="current-password"
          placeholder="Enter your password"
          aria-invalid={!!errors.password}
          className={cn(errors.password && "border-destructive focus-visible:ring-destructive/30")}
          {...register("password")}
        />
        {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 pt-1">
        <Button type="submit" className="w-full sm:w-auto" disabled={isSubmitting}>
          {isSubmitting ? <Loader2 className="size-4 animate-spin" /> : <LogIn className="size-4" />}
          Student Login
        </Button>
        <Link href="/student/register" className="w-full sm:w-auto">
          <Button variant="outline" className="w-full">
            Create account
          </Button>
        </Link>
      </div>
    </form>
  );
}

