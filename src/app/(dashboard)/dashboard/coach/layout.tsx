import { redirect } from "next/navigation";
import { getRequiredSession } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";

export default async function CoachLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getRequiredSession();

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { role: true },
  });

  if (!user || user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  return <>{children}</>;
}
