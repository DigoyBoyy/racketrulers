import fs from "fs";
import path from "path";
import { BookingPage } from "@/components/coach/booking-page";

function getSlider2Images() {
  const dir = path.join(process.cwd(), "public", "Gallery", "Slider2_Pictures");
  const exts = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif"]);

  try {
    return fs
      .readdirSync(dir)
      .filter((f) => exts.has(path.extname(f).toLowerCase()))
      .sort()
      .map((f) => ({
        src: `/Gallery/Slider2_Pictures/${f}`,
        alt: f.replace(/\.[^.]+$/, "").replace(/[-_]/g, " "),
      }));
  } catch {
    return [];
  }
}

export default async function PublicBookingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const slider2Images = getSlider2Images();

  return (
    <div className="mx-auto max-w-5xl py-8">
      <BookingPage slug={slug} galleryImages={slider2Images} />
    </div>
  );
}
