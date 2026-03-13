import { getRequiredSession } from "@/lib/auth-helpers";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { prisma } from "@/lib/prisma";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getRequiredSession();

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      role: true,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return (
    <DashboardShell user={user}>{children}</DashboardShell>
  );
}
