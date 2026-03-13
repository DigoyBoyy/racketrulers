import { cn } from "@/lib/utils";

interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  return (
    <footer className={cn("border-t border-border bg-card py-8", className)}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div>
            <h3 className="mb-2 font-semibold">RacketRulers</h3>
            <p className="text-sm text-muted-foreground">
              Tournament management platform for racket sports
            </p>
          </div>
          <div>
            <h4 className="mb-2 font-medium">Contact</h4>
            <p className="text-sm text-muted-foreground">
              Phone: +1 (555) 123-4567
            </p>
            <p className="text-sm text-muted-foreground">
              Email: info@racketdb.com
            </p>
          </div>
          <div>
            <h4 className="mb-2 font-medium">Address</h4>
            <p className="text-sm text-muted-foreground">
              123 Sports Avenue<br />
              MANDALUYONG REPRESENT City<br />
              PELEPENS
            </p>
          </div>
        </div>
        <div className="mt-6 border-t border-border pt-4 text-center">
          <p className="text-xs text-muted-foreground">
            © 2026 RacketRulers. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}