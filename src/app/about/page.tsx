import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const values = [
  {
    index: "01",
    title: "Purposeful Competition",
    description:
      "We build tools that make tournaments fair, transparent, and simple to run.",
  },
  {
    index: "02",
    title: "Powered by RacketRulers",
    description:
      "A platform built to help players play, compete, and improve.",
  },
  {
    index: "03",
    title: "Built for Performance",
    description:
      "From scheduling to live scores, we reduce friction so you can focus on the game.",
  },
];

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
      <section>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
          About Us
        </p>
        <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
          We help badminton communities run better events and coaching sessions.
        </h1>
        <p className="mt-6 max-w-2xl text-muted-foreground">
          RacketRulers brings tournament operations, live scoring, and coaching
          bookings into one platform so clubs and coaches can operate smoothly.
        </p>
      </section>

      <section className="mt-12 grid gap-5 md:grid-cols-3">
        {values.map((value) => (
          <Card
            key={value.title}
            className="bg-card/50"
          >
            <CardHeader className="gap-3">
              <div className="inline-flex rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
                {value.index}
              </div>
              <CardTitle className="text-lg">{value.title}</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <CardDescription className="text-sm leading-relaxed">
                {value.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="mt-14">
        <h2 className="text-2xl font-semibold tracking-tight">Our Locations</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Visit us at our badminton venues in Valenzuela and Quezon City.
        </p>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <Card className="gap-0 overflow-hidden bg-card/50 py-0">
            <CardHeader className="border-b border-border/60 py-4">
              <CardTitle className="text-base">Smash Plus</CardTitle>
              <CardDescription>Valenzuela</CardDescription>
              <div className="mt-3 space-y-1 text-sm text-muted-foreground">
                <p>7 doneza st.</p>
                <p>Thursday Saturday and Sunday</p>
                <p>5:00 pm - 12:00 Midnight</p>
              </div>
            </CardHeader>
            <iframe
              title="Smash Plus Map"
              src="https://www.google.com/maps?q=14.6977741,120.9656663&z=17&output=embed"
              className="h-72 w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <CardContent className="py-4 text-sm">
              <a
                href="https://maps.app.goo.gl/NnMPMCHLGNDL6dF1A"
                target="_blank"
                rel="noreferrer"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                Open in Google Maps
              </a>
            </CardContent>
          </Card>

          <Card className="gap-0 overflow-hidden bg-card/50 py-0">
            <CardHeader className="border-b border-border/60 py-4">
              <CardTitle className="text-base">Victoria Sports Tower</CardTitle>
              <CardDescription>Quezon City</CardDescription>
              <div className="mt-3 space-y-1 text-sm text-muted-foreground">
                <p>Along Edsa (Carousel and MRT GMA Kamuning station)</p>
                <p>Monday Wednesday and Friday</p>
                <p>5:00 pm - 12:00 Midnight</p>
              </div>
            </CardHeader>
            <iframe
              title="Victoria Sports Tower Map"
              src="https://www.google.com/maps?q=14.636086,121.04254&z=17&output=embed"
              className="h-72 w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <CardContent className="py-4 text-sm">
              <a
                href="https://maps.app.goo.gl/ieAQ1ymuqT1w7w1s7"
                target="_blank"
                rel="noreferrer"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                Open in Google Maps
              </a>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
