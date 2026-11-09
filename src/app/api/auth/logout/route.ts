import { NextResponse } from "next/server";
import { clearAuthCookies, getRefreshToken } from "@/lib/cookies";
import { logoutUser } from "@/services/auth.service";

export async function POST() {
  const rt = await getRefreshToken();
  await logoutUser(rt);
  await clearAuthCookies();
  return NextResponse.json({ ok: true });
}