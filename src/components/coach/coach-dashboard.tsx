"use client";

import { useState } from "react";
import { useTRPC } from "@/lib/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { LoadingState } from "@/components/ui/loading-state";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronRight, User, Calendar, CalendarDays, BookOpen } from "lucide-react";
import { ProfileSettings } from "./profile-settings";
import { AvailabilityEditor } from "./availability-editor";
import { BookingsCalendar } from "./bookings-calendar";
import { BookingsList } from "./bookings-list";

const SECTIONS = [
  { id: "profile", label: "Profile Settings", icon: User },
  { id: "availability", label: "Weekly Availability", icon: Calendar },
  { id: "calendar", label: "Booking Overview", icon: CalendarDays },
  { id: "bookings", label: "Bookings", icon: BookOpen },
] as const;

type SectionId = (typeof SECTIONS)[number]["id"];

export function CoachDashboard() {
  const trpc = useTRPC();
  const [openSections, setOpenSections] = useState<Set<SectionId>>(
    () => new Set(SECTIONS.map((s) => s.id))
  );

  const { data: profile, isLoading } = useQuery(
    trpc.coach.getProfile.queryOptions()
  );

  if (isLoading) {
    return <LoadingState />;
  }

  function toggleSection(id: SectionId) {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  return (
    <div className="space-y-4">
      {SECTIONS.map(({ id, label, icon: Icon }) => (
        <Collapsible
          key={id}
          open={openSections.has(id)}
          onOpenChange={() => toggleSection(id)}
        >
          <Card className="gap-0 py-0">
            <CardHeader className="p-0">
              <CollapsibleTrigger asChild>
                <button
                  type="button"
                  className="flex w-full cursor-pointer select-none items-center justify-between rounded-t-xl border-b border-border/70 bg-card-header px-6 py-4 text-left text-card-header-foreground transition-colors hover:bg-muted/50"
                >
                  <div className="flex items-center gap-2">
                    <Icon className="h-5 w-5 text-card-header-foreground/80" />
                    <span className="text-lg font-semibold">{label}</span>
                  </div>
                  {openSections.has(id) ? (
                    <ChevronDown className="h-5 w-5 text-card-header-foreground/80" />
                  ) : (
                    <ChevronRight className="h-5 w-5 text-card-header-foreground/80" />
                  )}
                </button>
              </CollapsibleTrigger>
            </CardHeader>
            <CollapsibleContent>
              <CardContent className="px-6 py-6">
                {id === "profile" && profile && <ProfileSettings key={profile.slug} profile={profile} />}
                {id === "availability" && profile && (
                  <AvailabilityEditor
                    initialSlots={profile.availability.map((a) => ({
                      dayOfWeek: a.dayOfWeek,
                      startTime: a.startTime,
                      endTime: a.endTime,
                    }))}
                  />
                )}
                {id === "calendar" && <BookingsCalendar />}
                {id === "bookings" && <BookingsList />}
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>
      ))}
    </div>
  );
}
