import { cn } from "@/lib/utils";
import { RacketRulersLogo } from "@/components/racketrulers-logo";
import { Mail, MapPin, Phone } from "lucide-react";

const companyDetails = {
  phone: "09155349949",
  email: "mjapuli10@gmail.com",
  courts: ["Smashplus, Valenzuela", "Victoria Sports Tower, Quezon City"],
};

interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  return (
    <footer className={cn("border-t border-border/40 py-10", className)}>
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-8 md:flex-row md:justify-between">
          <div>
            <RacketRulersLogo size={28} />
            <p className="mt-2 max-w-sm text-sm text-muted-foreground">
              Badminton tournament management and coaching platform.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            <div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  Phone
                </p>
              </div>
              <p className="mt-2 text-sm font-medium">{companyDetails.phone}</p>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  Email
                </p>
              </div>
              <a
                href={`mailto:${companyDetails.email}`}
                className="mt-2 block text-sm font-medium hover:text-primary"
              >
                {companyDetails.email}
              </a>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  Home Court
                </p>
              </div>
              <ul className="mt-2 space-y-1 text-sm font-medium">
                {companyDetails.courts.map((court) => (
                  <li key={court}>{court}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}