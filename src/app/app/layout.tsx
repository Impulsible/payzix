import { redirect } from "next/navigation";
import { connection } from "next/server";
import { getAccessToken } from "@/lib/cookies";
import { verifyAccessToken } from "@/lib/tokens";
import { DashboardShell } from "@/components/layout/DashboardShell";

// Mark as a dynamic route segment to handle auth checks at request time
export const instant = false;

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await connection();

  const token = await getAccessToken();
  const payload = token ? await verifyAccessToken(token) : null;

  if (!payload) {
    redirect("/login");
  }

  return <DashboardShell>{children}</DashboardShell>;
}