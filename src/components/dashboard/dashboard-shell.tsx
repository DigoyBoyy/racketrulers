"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  BookOpen,
  Calendar,
  Info,
  LogOut,
  Menu,
  Trophy,
  UserPlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { RacketRulersLogo } from "@/components/racketrulers-logo";
import { cn } from "@/lib/utils";

interface DashboardShellProps {
  children: React.ReactNode;
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string;
  };
}

const navItems = [
  {
    title: "About Us",
    href: "/about",
    icon: Info,
  },
  {
    title: "Book Coach",
    href: "/book/coach-john",
    icon: BookOpen,
  },
  {
    title: "My Tournaments",
    href: "/dashboard/tournaments",
    icon: Trophy,
  },
  {
    title: "Coach Scheduler",
    href: "/dashboard/coach",
    icon: Calendar,
  },
];

const adminNavItems = [
  {
    title: "Create Admin User",
    href: "/dashboard/admin/create-user",
    icon: UserPlus,
  },
];

function NavContent({ pathname, user }: { pathname: string; user: DashboardShellProps['user'] }) {
  const allNavItems = [
    ...navItems,
    ...(user.role === 'ADMIN' ? adminNavItems : []),
  ];

  return (
    <nav className="flex flex-col gap-1">
      {allNavItems.map((item) => {
        const isActive =
          pathname === item.href || pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              isActive
                ? "bg-sidebar-accent text-sidebar-primary"
                : "text-sidebar-foreground/75 hover:bg-sidebar-accent hover:text-sidebar-foreground"
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.title}
          </Link>
        );
      })}
    </nav>
  );
}

export function DashboardShell({ children, user }: DashboardShellProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const initials = user.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";

  return (
    <div className="flex min-h-screen">
      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-screen w-64 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground md:flex">
        <div className="flex h-16 items-center border-b border-sidebar-border px-5">
          <Link href="/dashboard">
            <RacketRulersLogo size={36} />
          </Link>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <NavContent pathname={pathname} user={user} />
        </div>
        <Separator />
        <div className="p-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-sidebar-accent">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary/10 text-xs text-primary">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start text-left">
                  <span className="font-medium">{user.name}</span>
                  <span className="text-xs text-sidebar-foreground/70">
                    {user.email}
                  </span>
                </div>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuItem
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="flex items-center gap-2 text-destructive"
              >
                <LogOut className="h-4 w-4" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>

      {/* Mobile header + content */}
      <div className="flex flex-1 flex-col">
        <header className="flex h-16 items-center gap-4 border-b border-sidebar-border bg-sidebar px-4 text-sidebar-foreground md:hidden">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 border-sidebar-border bg-sidebar p-0 text-sidebar-foreground">
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <div className="flex h-16 items-center border-b border-sidebar-border px-5">
                <Link href="/dashboard">
                  <RacketRulersLogo size={36} />
                </Link>
              </div>
              <div className="p-4" onClick={() => setMobileOpen(false)}>
                <NavContent pathname={pathname} user={user} />
              </div>
              <Separator />
              <div className="p-4">
                <button
                  onClick={() => signOut({ callbackUrl: "/login" })}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-destructive transition-colors hover:bg-destructive/10"
                >
                  <LogOut className="h-4 w-4" />
                  Sign out
                </button>
              </div>
            </SheetContent>
          </Sheet>
          <Link href="/dashboard">
            <RacketRulersLogo size={28} />
          </Link>
        </header>

        <main className="flex-1 bg-background p-6">{children}</main>
      </div>
    </div>
  );
}
