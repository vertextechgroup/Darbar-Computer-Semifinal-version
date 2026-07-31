import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Card, CardContent } from "@/components/ui/card";
import { StudentRegisterForm } from "@/components/forms/StudentRegisterForm";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Student Register",
  path: "/student/register",
  description:
    "Create your DarbarTech student account to manage your course journey, inquiries, and future learning updates.",
});

export default function StudentRegisterPage() {
  return (
    <>
      <div className="bg-neutral-50 border-b border-neutral-200">
        <Container size="xl" className="pt-4 pb-8 sm:pb-10">
          <Breadcrumbs items={[{ label: "Student" }, { label: "Register" }]} />
          <SectionHeading
            eyebrow="Student Portal"
            title="Student Registration"
            description="Create your student account. Already registered? Sign in anytime."
            className="mt-2"
          />
        </Container>
      </div>

      <section className="py-10 sm:py-14">
        <Container size="xl">
          <div className="mx-auto w-full max-w-xl">
            <Card>
              <CardContent className="p-6 sm:p-8">
                <h2 className="text-lg font-bold tracking-tight text-neutral-900 mb-1">
                  Create an account
                </h2>
                <p className="text-sm text-neutral-600 mb-5">
                  Fill in the details below to register your student profile.
                </p>
                <StudentRegisterForm />
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>
    </>
  );
}

