"use client";
import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  motion,
  useInView,
  type Variants,
} from "framer-motion";
import {
  MessageCircle,
  ArrowRight,
} from "lucide-react";
import { Container } from "@/components/common/Container";
import { Button } from "@/components/ui/button";

const HERO_IMG =
  "https://cdn.prod.website-files.com/640021754b75fb0c4b535941/64539e138771820ebcb7619d_hero-image.png";

const STAGGER = {
  eyebrow: 0.08,
  heading: 0.18,
  body: 0.3,
  cta: 0.44,
  visual: 0.56,
} as const;

const fadeUp: Variants = {
  offscreen: { opacity: 0, y: 18, filter: "blur(6px)" },
  onscreen: (d: number = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      delay: d,
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export function Hero() {
  const ref = React.useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const state = inView ? "onscreen" : "offscreen";

  return (
    <section
      ref={ref}
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden bg-white"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute -top-24 left-1/2 h-[360px] w-[720px] max-w-[90vw] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(34,199,232,0.08),transparent_55%)]" />
      </div>

      <Container size="xl" className="relative w-full">
        <div className="mx-auto grid grid-cols-1 items-center gap-10 py-14 sm:gap-12 sm:py-16 lg:grid-cols-12 lg:gap-12 lg:py-20 xl:gap-16">
          {/* LEFT — Content */}
          <motion.div
            variants={fadeUp}
            initial="offscreen"
            animate={state}
            custom={0}
            className="relative order-1 w-full text-left lg:order-1 lg:col-span-7 xl:col-span-7"
          >
            <motion.p
              variants={fadeUp}
              initial="offscreen"
              animate={state}
              custom={STAGGER.eyebrow}
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-primary"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              37 Career-Focused Courses · Certified Trainers
            </motion.p>

            <motion.h1
              id="hero-heading"
              variants={fadeUp}
              initial="offscreen"
              animate={state}
              custom={STAGGER.heading}
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-[56px] font-bold tracking-tight leading-[1.1] text-neutral-900 text-balance"
            >
              Learn the Digital Skills That{" "}
              <span className="bg-gradient-to-r from-primary to-[#0A1729] bg-clip-text text-transparent">
                Actually Get You Hired
              </span>
              {" "}
              — Right Here in Kathmandu
            </motion.h1>

            <motion.p
              variants={fadeUp}
              initial="offscreen"
              animate={state}
              custom={STAGGER.body}
              className="mt-5 mb-7 max-w-xl text-[15px] sm:text-base leading-relaxed text-neutral-600 text-pretty"
            >
              DarbarTech&rsquo;s hands-on training turns beginners into job-ready professionals. Small batches, flexible morning-to-evening timings, and trainers with real industry experience.
            </motion.p>

            <motion.div
              variants={fadeUp}
              initial="offscreen"
              animate={state}
              custom={STAGGER.cta}
              className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-4"
            >
              <Link href="/courses" className="w-full sm:w-auto block">
                <Button size="lg" className="w-full sm:w-auto group/btn shadow-[0_8px_24px_-10px_rgba(21,103,142,0.55)] hover:shadow-[0_12px_32px_-10px_rgba(21,103,142,0.7)]">
                  Explore Courses
                  <ArrowRight className="size-5 transition-transform duration-300 group-hover/btn:translate-x-0.5" aria-hidden="true" />
                </Button>
              </Link>

              <div className="flex flex-col gap-2 w-full sm:w-auto">
                <Link href="/contact" className="w-full sm:w-auto block">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto group/btn">
                    <MessageCircle className="size-5" aria-hidden="true" />
                    Book a Free Consultation
                  </Button>
                </Link>
                <span className="text-xs text-neutral-500 text-center sm:text-left">
                  5-min call · No pressure
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT — Visual */}
          <motion.div
            variants={fadeUp}
            initial="offscreen"
            animate={state}
            custom={STAGGER.visual}
            className="relative order-2 mx-auto w-full max-w-[440px] sm:max-w-[520px] lg:order-2 lg:col-span-5 xl:col-span-5 lg:max-w-none"
          >
            <div className="relative mx-auto aspect-[425/440] w-full max-w-[440px] sm:max-w-[520px] lg:max-w-none">
              <Image
                src={HERO_IMG}
                alt="Students learning at DarbarTech institute"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain drop-shadow-[0_24px_60px_-24px_rgba(23,43,72,0.25)]"
              />
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

export default Hero;
