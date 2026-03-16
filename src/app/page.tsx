import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SiteHeader } from "@/components/public/site-header";
import {
  Trophy,
  Zap,
  Calendar,
  Users,
} from "lucide-react";

const features = [
  {
    icon: Trophy,
    title: "Tournament Management",
    description:
      "Create and manage badminton tournaments with set-based scoring, singles and doubles support, round robin, Swiss, and elimination formats.",
  },
  {
    icon: Calendar,
    title: "Coach Scheduler",
    description:
      "Publish your coaching availability and share a booking link. Parents and players book sessions without needing an account.",
  },
  {
    icon: Zap,
    title: "Real-time Scores",
    description:
      "Live set-by-set score updates, automatic standings calculations, and instant bracket advancement -- all updating in real time.",
  },
  {
    icon: Users,
    title: "Court & Team Management",
    description:
      "Manage teams, rosters, seedings, and court assignments. Handle multi-day badminton events with drag-and-drop scheduling.",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      {/* ─── Hero ─── */}
      <section className="relative mt-10 flex min-h-[100dvh] items-center justify-center overflow-hidden pb-16">
        {/* Hero image */}
        <div className="pointer-events-none absolute inset-0 flex items-start justify-center pt-0 sm:pt-6">
          <Image
            src="/MainPageBackground4.jpg"
            alt=""
            priority
            width={1600}
            height={900}
            sizes="(min-width: 1536px) 1200px, 92vw"
            className="h-[100dvh] w-auto max-w-none object-cover opacity-[1] landscape:h-auto landscape:w-full"
          />
        </div>

        {/* Adjustment layer */}
        <div className="pointer-events-none absolute inset-0 bg-black/35" />

        {/* Grid pattern */}

        {/* Gradient orbs */}
       
        <div className="pointer-events-none absolute right-1/4 top-2/3 h-[300px] w-[300px] rounded-full bg-chart-2/10 blur-[80px]" />

        <div className="relative mx-auto max-w-5xl px-6 text-center">
          {/* Headline */}
          <h1
            className="animate-fade-up text-5xl font-bold tracking-tight sm:text-7xl lg:text-8xl"
            style={{ animationDelay: "0.1s" }}
          >

            <br />
            <span className="text-[oklch(0.86_0.09_92)]">
              Book a coach. Compete like a pro.
            </span>
          </h1>

          {/* CTAs */}
          <div
            className="animate-fade-up mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
            style={{ animationDelay: "0.3s" }}
          >
            <Button
              size="lg"
              className="glow-mainpage-button h-14 px-10 text-lg font-bold hover:bg-[oklch(0.3283_0.012_222.36_/_1)] hover:text-[oklch(0.86_0.09_92)]"
              asChild
            >
              <Link href="/book">Book a Coach</Link>
            </Button>
            <Button
              size="lg"
              className="glow-mainpage-button h-14 px-10 text-lg font-bold hover:bg-[oklch(0.3283_0.012_222.36_/_1)] hover:text-[oklch(0.86_0.09_92)]"
              asChild
            >
              <Link href="/tournaments">Browse Tournaments</Link>
            </Button>
            {/* <Button
              size="lg"
              variant="outline"
              className="h-12 px-8 text-base"
              asChild
            >
              <Link href="/signup">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button> */}
          </div>
        </div>
      </section>

      {/* ─── How to Book ─── */}
      <section id="how-to-book" className="border-t border-border/40 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Booking
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              How to Book a Coach
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Booking a badminton coaching session is simple and takes only a
              few steps.
            </p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-border/50 bg-card/30 p-8 backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:bg-card/60">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">
                1
              </div>
              <h3 className="mt-4 text-lg font-semibold">Sign Up or Sign In</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Create a client account or sign in to access the booking system.
              </p>
            </div>

            {/* Step 2 */}
            <div className="rounded-xl border border-border/50 bg-card/30 p-8 backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:bg-card/60">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">
                2
              </div>
              <h3 className="mt-4 text-lg font-semibold">Choose a Schedule</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Browse available coaching slots and pick a time that works for
                you.
              </p>
            </div>

            {/* Step 3 */}
            <div className="rounded-xl border border-border/50 bg-card/30 p-8 backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:bg-card/60">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">
                3
              </div>
              <h3 className="mt-4 text-lg font-semibold">
                Enter Player Details
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Provide the player’s name and contact information for the
                session.
              </p>
            </div>

            {/* Step 4 */}
            <div className="rounded-xl border border-border/50 bg-card/30 p-8 backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:bg-card/60">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">
                4
              </div>
              <h3 className="mt-4 text-lg font-semibold">
                Confirm and Show Up
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Confirm your booking and arrive at the court on your scheduled
                time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Features ─── */}
      <section id="features" className="border-t border-border/40 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Features
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Everything you need to compete
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              From coaching sessions to live set-by-set scoring, RacketRulers
              handles every aspect of your badminton events.
            </p>
          </div>

          <div className="mt-16 grid gap-4 sm:grid-cols-2">
            {features.map((feature, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-xl border border-border/50 bg-card/30 p-8 backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:bg-card/60"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="relative">
                  <div className="inline-flex rounded-lg border border-border/50 bg-background/50 p-2.5">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      {/* <section className="border-t border-border/40">
        <div className="relative overflow-hidden py-24">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
          <div className="relative mx-auto max-w-6xl px-6 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to get started?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Whether you coach, organize, or compete -- RacketRulers has
              everything you need in one place.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button
                size="lg"
                className="glow-primary h-12 px-8 text-base"
                asChild
              >
                <Link href="/book">Book a Coach</Link>
              </Button>
              <Button
                size="lg"
                className="glow-primary h-12 px-8 text-base"
                asChild
              >
                <Link href="/tournaments">Browse Tournaments</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 px-8 text-base"
                asChild
              >
                <Link href="/signup">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section> */}

      {/* ─── Branch Card ─── */}
      <section className="border-t border-border/40 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-8 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Branches
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Our Main Branches
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="gap-0 overflow-hidden py-0">
              <CardHeader className="border-b border-border/70 py-5">
                <CardTitle className="text-xl">Smash Plus Branch</CardTitle>
                <CardDescription>7 doneza st., Valenzuela</CardDescription>
              </CardHeader>
              <iframe
                title="Smash Plus Map"
                src="https://www.google.com/maps?q=14.6977741,120.9656663&z=17&output=embed"
                className="h-72 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              <CardContent className="space-y-2 py-5 text-sm">
                <p className="font-medium">Thursday Saturday and Sunday</p>
                <p>5:00 pm - 12:00 Midnight</p>
                <a
                  href="https://maps.app.goo.gl/NnMPMCHLGNDL6dF1A"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block pt-2 font-medium text-primary underline-offset-4 hover:underline"
                >
                  Open in Google Maps
                </a>
              </CardContent>
            </Card>

            <Card className="gap-0 overflow-hidden py-0">
              <CardHeader className="border-b border-border/70 py-5">
                <CardTitle className="text-xl">Victoria Sports Tower</CardTitle>
                <CardDescription>
                  Along Edsa (Carousel and MRT GMA Kamuning station)
                </CardDescription>
              </CardHeader>
              <iframe
                title="Victoria Sports Tower Map"
                src="https://www.google.com/maps?q=14.636086,121.04254&z=17&output=embed"
                className="h-72 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              <CardContent className="space-y-2 py-5 text-sm">
                <p className="font-medium">Monday Wednesday and Friday</p>
                <p>5:00 pm - 12:00 Midnight</p>
                <a
                  href="https://maps.app.goo.gl/ieAQ1ymuqT1w7w1s7"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block pt-2 font-medium text-primary underline-offset-4 hover:underline"
                >
                  Open in Google Maps
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

    </div>
  );
}
