import { NextResponse } from "next/server";
import { getAccessToken } from "@/lib/cookies";
import { verifyAccessToken } from "@/lib/tokens";
import { getUserById } from "@/services/auth.service";

export async function GET() {
  const token = await getAccessToken();
  if (!token) return NextResponse.json({ user: null }, { status: 401 });

  const payload = await verifyAccessToken(token);
  if (!payload) return NextResponse.json({ user: null }, { status: 401 });

  const user = await getUserById(payload.sub);
  if (!user) return NextResponse.json({ user: null }, { status: 401 });

  return NextResponse.json({ user });
}