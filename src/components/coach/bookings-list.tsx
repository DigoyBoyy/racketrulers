"use client";

import { useState } from "react";
import { useTRPC } from "@/lib/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoadingState } from "@/components/ui/loading-state";
import { CancelBookingDialog } from "./cancel-booking-dialog";
import { ChevronLeft, ChevronRight } from "lucide-react";

type FilterValue = "all" | "CONFIRMED" | "CANCELLED" | "past";

interface CancelTarget {
  id: string;
  name: string;
  date: string;
  time: string;
}

export function BookingsList() {
  const trpc = useTRPC();
  const [filter, setFilter] = useState<FilterValue>("all");
  const [page, setPage] = useState(1);
  const [cancelTarget, setCancelTarget] = useState<CancelTarget | null>(null);

  const queryInput = {
    page,
    pageSize: 10,
    ...(filter === "CONFIRMED" || filter === "CANCELLED"
      ? { status: filter as "CONFIRMED" | "CANCELLED" }
      : {}),
    ...(filter === "past"
      ? { to: new Date().toISOString().split("T")[0] }
      : {}),
  };

  const { data, isLoading } = useQuery(
    trpc.coach.listBookings.queryOptions(queryInput)
  );

  const bookings = data?.bookings ?? [];
  const totalPages = data?.totalPages ?? 0;
  const currentPage = data?.currentPage ?? 1;

  function handleFilterChange(value: string) {
    setFilter(value as FilterValue);
    setPage(1);
  }

  const emptyMessages: Record<FilterValue, string> = {
    all: "No bookings yet.",
    CONFIRMED: "No confirmed bookings.",
    CANCELLED: "No cancelled bookings.",
    past: "No past bookings.",
  };

  return (
    <div className="space-y-4">
      <Tabs value={filter} onValueChange={handleFilterChange}>
        <div className="overflow-x-auto">
          <TabsList className="whitespace-nowrap">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="CONFIRMED">Confirmed</TabsTrigger>
            <TabsTrigger value="CANCELLED">Cancelled</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
          </TabsList>
        </div>
      </Tabs>

      {isLoading ? (
        <LoadingState text="Loading bookings..." />
      ) : bookings.length > 0 ? (
        <>
          <div className="space-y-3 md:hidden">
            {bookings.map((booking) => (
              <div key={booking.id} className="rounded-lg border bg-card p-4 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium">{booking.bookerName}</p>
                    <p className="text-xs text-muted-foreground break-all">
                      {booking.bookerEmail}
                    </p>
                  </div>
                  <Badge
                    variant={
                      booking.status === "CONFIRMED" ? "default" : "secondary"
                    }
                  >
                    {booking.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-xs text-muted-foreground">Date</p>
                    <p>{new Date(booking.date).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Time</p>
                    <p>
                      {booking.startTime} - {booking.endTime}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">Message</p>
                  <p className="text-sm break-words">{booking.message || "-"}</p>
                </div>

                {booking.status === "CONFIRMED" && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-destructive h-8 px-0 text-xs"
                    onClick={() =>
                      setCancelTarget({
                        id: booking.id,
                        name: booking.bookerName,
                        date: new Date(booking.date).toISOString().split("T")[0],
                        time: booking.startTime,
                      })
                    }
                  >
                    Cancel
                  </Button>
                )}
              </div>
            ))}
          </div>

          <div className="hidden md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Message</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell>
                      {new Date(booking.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {booking.startTime} - {booking.endTime}
                    </TableCell>
                    <TableCell>{booking.bookerName}</TableCell>
                    <TableCell className="text-xs">
                      {booking.bookerEmail}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          booking.status === "CONFIRMED" ? "default" : "secondary"
                        }
                      >
                        {booking.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs truncate">
                      {booking.message || "-"}
                    </TableCell>
                    <TableCell>
                      {booking.status === "CONFIRMED" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive h-7 text-xs"
                          onClick={() =>
                            setCancelTarget({
                              id: booking.id,
                              name: booking.bookerName,
                              date: new Date(booking.date).toISOString().split("T")[0],
                              time: booking.startTime,
                            })
                          }
                        >
                          Cancel
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {totalPages > 1 && (
            <div className="flex flex-col items-center justify-center gap-3 pt-2 sm:flex-row sm:gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={currentPage <= 1}
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              <span className="text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => p + 1)}
                disabled={currentPage >= totalPages}
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </>
      ) : (
        <p className="text-sm text-muted-foreground py-4">
          {emptyMessages[filter]}
        </p>
      )}

      {cancelTarget && (
        <CancelBookingDialog
          bookingId={cancelTarget.id}
          bookerName={cancelTarget.name}
          date={cancelTarget.date}
          startTime={cancelTarget.time}
          open={!!cancelTarget}
          onOpenChange={(open) => {
            if (!open) setCancelTarget(null);
          }}
        />
      )}
    </div>
  );
}
