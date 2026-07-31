"use client";
import * as React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { UserPlus, Loader2, UserRound, Mail, Phone, KeyRound, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";

const StudentRegisterSchema = z
  .object({
    name: z.string().min(2, "Full name must be at least 2 characters").max(100),
    email: z.string().min(1, "Email is required").email("Please enter a valid email"),
    phone: z.string().optional().or(z.literal("")),
    password: z.string().min(6, "Password must be at least 6 characters").max(200),
    confirmPassword: z.string().min(6, "Confirm your password").max(200),
  })
  .refine((v) => v.password === v.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export type StudentRegisterInput = z.infer<typeof StudentRegisterSchema>;

export function StudentRegisterForm() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = React.useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<StudentRegisterInput>({
    resolver: zodResolver(StudentRegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: StudentRegisterInput) => {
    await new Promise((r) => setTimeout(r, 900));
    console.log("[StudentRegister] Stub submit payload:", data);
    toast({
      title: "Registration submitted",
      description: "Connect an auth backend to create real student accounts.",
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
                Registration submitted
              </h2>
              <p className="mt-1 text-sm text-neutral-700 leading-relaxed">
                Your registration form is ready. Add your backend auth provider to start creating accounts.
              </p>
            </div>
          </div>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Button variant="outline" onClick={() => { setSubmitted(false); reset(); }}>
              Register another
            </Button>
            <Link href="/student/login" className="w-full sm:w-auto">
              <Button className="w-full">Go to login</Button>
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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="name" className="flex items-center gap-1.5">
            <UserRound className="size-3.5 text-neutral-500" />
            Full name
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

        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="email" className="flex items-center gap-1.5">
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
            className={cn(errors.email && "border-destructive focus-visible:ring-destructive/30")}
            {...register("email")}
          />
          {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
        </div>

        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="phone" className="flex items-center gap-1.5">
            <Phone className="size-3.5 text-neutral-500" />
            Phone <span className="text-neutral-400 font-normal">(optional)</span>
          </Label>
          <Input
            id="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            placeholder="98XXXXXXXX"
            aria-invalid={!!errors.phone}
            {...register("phone")}
          />
          {errors.phone && <p className="text-xs text-destructive">{errors.phone.message}</p>}
        </div>

        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="password" className="flex items-center gap-1.5">
            <KeyRound className="size-3.5 text-neutral-500" />
            Password
            <span className="text-destructive">*</span>
          </Label>
          <Input
            id="password"
            type="password"
            autoComplete="new-password"
            placeholder="Create a password"
            aria-invalid={!!errors.password}
            className={cn(errors.password && "border-destructive focus-visible:ring-destructive/30")}
            {...register("password")}
          />
          {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
        </div>

        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="confirmPassword" className="flex items-center gap-1.5">
            <KeyRound className="size-3.5 text-neutral-500" />
            Confirm password
            <span className="text-destructive">*</span>
          </Label>
          <Input
            id="confirmPassword"
            type="password"
            autoComplete="new-password"
            placeholder="Re-enter your password"
            aria-invalid={!!errors.confirmPassword}
            className={cn(
              errors.confirmPassword && "border-destructive focus-visible:ring-destructive/30"
            )}
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className="text-xs text-destructive">{errors.confirmPassword.message}</p>
          )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 pt-1">
        <Button type="submit" className="w-full sm:w-auto" disabled={isSubmitting}>
          {isSubmitting ? <Loader2 className="size-4 animate-spin" /> : <UserPlus className="size-4" />}
          Student Register
        </Button>
        <Link href="/student/login" className="w-full sm:w-auto">
          <Button variant="outline" className="w-full">
            Already have an account?
          </Button>
        </Link>
      </div>
    </form>
  );
}

