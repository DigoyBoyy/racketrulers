"use client";

import { useState, useEffect, useMemo } from "react";
import { useTRPC } from "@/lib/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { AvailabilityCalendar } from "./availability-calendar";
import { getMonday } from "@/lib/utils";
import { toast } from "sonner";

interface Slot {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
}

interface AvailabilityEditorProps {
  initialSlots: Slot[];
}

export function AvailabilityEditor({ initialSlots }: AvailabilityEditorProps) {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const now = new Date();
  const [selectedYear, setSelectedYear] = useState(now.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(now.getMonth());
  const initialWeekKey = useMemo(() => getMonday(new Date()).toISOString(), []);
  const [weekStart, setWeekStart] = useState(() => getMonday(new Date()));

  // Tracks availability per week so the calendar content changes when the week changes.
  const [availabilityByWeek, setAvailabilityByWeek] = useState<Record<string, Slot[]>>(() => {
    return { [initialWeekKey]: initialSlots };
  });

  const slots = availabilityByWeek[weekStart.toISOString()] ?? [];

  const setSlots = (newSlots: Slot[]) => {
    const key = weekStart.toISOString();
    setAvailabilityByWeek((prev) => ({
      ...prev,
      [key]: newSlots,
    }));
  };

  useEffect(() => {
    const key = weekStart.toISOString();
    setAvailabilityByWeek((prev) => {
      if (prev[key]) return prev;
      return {
        ...prev,
        [key]: key === initialWeekKey ? initialSlots : [],
      };
    });
  }, [weekStart, initialWeekKey, initialSlots]);

  const weeksInMonth = useMemo(() => {
    const weeks: Date[] = [];
    const firstDay = new Date(selectedYear, selectedMonth, 1);
    const lastDay = new Date(selectedYear, selectedMonth + 1, 0);
    let current = getMonday(firstDay);
    while (current <= lastDay) {
      weeks.push(new Date(current));
      current.setDate(current.getDate() + 7);
    }
    return weeks;
  }, [selectedYear, selectedMonth]);

  const changeYear = (direction: -1 | 1) => {
    setSelectedYear(prev => prev + direction);
  };

  const changeMonth = (direction: -1 | 1) => {
    setSelectedMonth(prev => {
      const newMonth = prev + direction;
      if (newMonth < 0) {
        setSelectedYear(y => y - 1);
        return 11;
      }
      if (newMonth > 11) {
        setSelectedYear(y => y + 1);
        return 0;
      }
      return newMonth;
    });
  };

  const selectWeek = (monday: Date) => {
    setWeekStart(monday);
  };

  const setAvailability = useMutation(
    trpc.coach.setAvailability.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.coach.getProfile.queryFilter());
        toast.success("Availability saved");
      },
      onError: (err) => toast.error(err.message),
    })
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Click to add a time block. Click a block to select it, then delete. Drag to move.
        </p>
        <Button
          onClick={() => setAvailability.mutate({ slots })}
          disabled={setAvailability.isPending}
        >
          {setAvailability.isPending ? "Saving..." : "Save Availability"}
        </Button>
      </div>

      {/* Year and Month Navigation */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={() => changeYear(-1)}>
          ◀
        </Button>
        <span className="text-sm font-medium w-[4ch] text-center">{selectedYear}</span>
        <Button variant="ghost" size="sm" onClick={() => changeYear(1)}>
          ▶
        </Button>

        <div className="mx-4 h-6 border-l" />

        <Button variant="ghost" size="sm" onClick={() => changeMonth(-1)}>
          ◀
        </Button>
        <span className="text-sm font-medium w-[9ch] text-center">
          {new Date(selectedYear, selectedMonth).toLocaleString(undefined, { month: "long" })}
        </span>
        <Button variant="ghost" size="sm" onClick={() => changeMonth(1)}>
          ▶
        </Button>
      </div>

      {/* Week Selection */}
      <div className="space-y-2">
        <p className="text-sm font-medium">Select Week:</p>
        <div className="flex flex-wrap gap-2">
          {weeksInMonth.map((monday, idx) => {
            const end = new Date(monday);
            end.setDate(end.getDate() + 6);
            const isSelected = weekStart.toISOString() === monday.toISOString();
            const startStr = monday.toLocaleDateString(undefined, { month: "short", day: "numeric" });
            const endStr = end.toLocaleDateString(undefined, { month: "short", day: "numeric" });
            return (
              <Button
                key={idx}
                variant={isSelected ? "default" : "outline"}
                size="sm"
                onClick={() => selectWeek(monday)}
              >
                Week {idx + 1}: {startStr} - {endStr}
              </Button>
            );
          })}
        </div>
      </div>

      <AvailabilityCalendar
        slots={slots}
        onChange={setSlots}
        weekStart={weekStart}
        onWeekChange={setWeekStart}
      />
    </div>
  );
}
