"use client";

import { useState, useMemo } from "react";
import { useTRPC } from "@/lib/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LoadingState } from "@/components/ui/loading-state";
import { MonthCalendar } from "@/components/ui/month-calendar";
import { toLocalDateStr, getMonday } from "@/lib/utils";

type ViewMode = "year" | "month" | "week" | "day";

export function BookingsCalendar() {
  const trpc = useTRPC();
  const now = useMemo(() => new Date(), []);
  const [viewMode, setViewMode] = useState<ViewMode>("month");
  const [currentDate, setCurrentDate] = useState(() => getMonday(now));

  const { from, to } = useMemo(() => {
    const date = new Date(currentDate);
    let start: Date;
    let end: Date;

    if (viewMode === "year") {
      start = new Date(date.getFullYear(), 0, 1);
      end = new Date(date.getFullYear(), 11, 31);
    } else if (viewMode === "month") {
      start = new Date(date.getFullYear(), date.getMonth(), 1);
      end = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    } else if (viewMode === "week") {
      start = getMonday(date);
      end = new Date(start);
      end.setDate(end.getDate() + 6);
    } else {
      start = new Date(date);
      end = new Date(date);
    }

    return {
      from: toLocalDateStr(start),
      to: toLocalDateStr(end),
    };
  }, [currentDate, viewMode]);

  const { data, isLoading } = useQuery(
    trpc.coach.listBookings.queryOptions({
      from,
      to,
      pageSize: 50,
    })
  );

  const bookingsByDate = useMemo(() => {
    const map: Record<string, typeof bookings> = {};
    const bookings = data?.bookings ?? [];
    for (const b of bookings) {
      const dateStr = new Date(b.date).toISOString().split("T")[0];
      (map[dateStr] ??= []).push(b);
    }
    return map;
  }, [data]);

  const bookingsByMonth = useMemo(() => {
    const year = currentDate.getFullYear();
    const counts: number[] = Array(12).fill(0);

    for (const dateStr of Object.keys(bookingsByDate)) {
      const d = new Date(dateStr);
      if (d.getFullYear() !== year) continue;
      counts[d.getMonth()] += (bookingsByDate[dateStr]?.length ?? 0);
    }

    return counts;
  }, [bookingsByDate, currentDate]);

  const changePeriod = (direction: -1 | 1) => {
    const d = new Date(currentDate);

    if (viewMode === "year") {
      d.setFullYear(d.getFullYear() + direction);
    } else if (viewMode === "month") {
      d.setMonth(d.getMonth() + direction);
    } else if (viewMode === "week") {
      d.setDate(d.getDate() + direction * 7);
    } else {
      d.setDate(d.getDate() + direction);
    }

    setCurrentDate(d);
  };

  if (isLoading) {
    return <LoadingState text="Loading calendar..." />;
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-semibold">View:</span>
        {(["year", "month", "week", "day"] as ViewMode[]).map((mode) => (
          <Button
            key={mode}
            variant={viewMode === mode ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode(mode)}
          >
            {mode.charAt(0).toUpperCase() + mode.slice(1)}
          </Button>
        ))}

        <div className="ml-auto flex items-center gap-2">
          <Button size="sm" onClick={() => changePeriod(-1)}>
            ◀
          </Button>
          <span className="text-sm font-medium">
            {viewMode === "year" && currentDate.getFullYear()}
            {viewMode === "month" &&
              currentDate.toLocaleString(undefined, {
                month: "long",
                year: "numeric",
              })}
            {viewMode === "week" &&
              (() => {
                const start = getMonday(currentDate);
                const end = new Date(start);
                end.setDate(end.getDate() + 6);
                return `${toLocalDateStr(start)} - ${toLocalDateStr(end)}`;
              })()}
            {viewMode === "day" && toLocalDateStr(currentDate)}
          </span>
          <Button size="sm" onClick={() => changePeriod(1)}>
            ▶
          </Button>
        </div>
      </div>

      {viewMode === "year" ? (
        <div className="rounded-lg border p-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold">Year view</div>
              <div className="text-xs text-muted-foreground">
                Select a month to see bookings.
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {Array.from({ length: 12 }).map((_, idx) => {
              const d = new Date(currentDate);
              d.setMonth(idx);
              const monthName = d.toLocaleString(undefined, { month: "short" });
              const count = bookingsByMonth[idx] ?? 0;
              return (
                <Button
                  key={idx}
                  variant={currentDate.getMonth() === idx ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    const next = new Date(currentDate);
                    next.setMonth(idx);
                    setCurrentDate(next);
                    setViewMode("month");
                  }}
                >
                  {monthName}
                  {count > 0 ? ` (${count})` : ""}
                </Button>
              );
            })}
          </div>
        </div>
      ) : viewMode === "month" ? (
        <MonthCalendar
          month={currentDate.getMonth()}
          year={currentDate.getFullYear()}
          onSelect={(dateStr) => {
            setCurrentDate(new Date(dateStr));
            setViewMode("day");
          }}
          onMonthChange={(m, y) => {
            const d = new Date(currentDate);
            d.setFullYear(y);
            d.setMonth(m);
            setCurrentDate(d);
          }}
          renderDay={(dateStr, day) => {
            const dayBookings = bookingsByDate[dateStr] ?? [];
            return (
              <>
                <span className="text-xs font-medium text-muted-foreground">
                  {day}
                </span>
                {dayBookings.map((b) => (
                  <Badge
                    key={b.id}
                    variant={
                      b.status === "CONFIRMED" ? "default" : "secondary"
                    }
                    className="text-[10px] truncate justify-start font-normal px-1 py-0"
                  >
                    {b.startTime} {b.bookerName}
                  </Badge>
                ))}
              </>
            );
          }}
        />
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {Array.from({ length: viewMode === "week" ? 7 : 1 }).map((_, idx) => {
            const d = new Date(currentDate);
            if (viewMode === "week") d.setDate(d.getDate() + idx);
            const dateStr = toLocalDateStr(d);
            const dayBookings = bookingsByDate[dateStr] ?? [];

            return (
              <div key={dateStr} className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold">
                      {d.toLocaleDateString(undefined, {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {dayBookings.length} booking(s)
                    </div>
                  </div>
                </div>

                {dayBookings.length === 0 ? (
                  <div className="mt-4 text-sm text-muted-foreground">
                    No bookings for this {viewMode}.
                  </div>
                ) : (
                  <div className="mt-4 space-y-2">
                    {dayBookings.map((b) => (
                      <div
                        key={b.id}
                        className="rounded-md border p-3"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium">
                            {b.startTime} - {b.endTime}
                          </span>
                          <Badge
                            variant={
                              b.status === "CONFIRMED" ? "default" : "secondary"
                            }
                          >
                            {b.status}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {b.bookerName} ({b.bookerEmail})
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
