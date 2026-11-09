import { NextRequest, NextResponse } from "next/server";
import { loginSchema } from "@/validators/auth";
import { loginUser, AuthError } from "@/services/auth.service";
import { setAuthCookies } from "@/lib/cookies";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = loginSchema.safeParse(body);
    
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input" }, { status: 422 });
    }

    // Map the form's 'email' field to the service's 'identifier' field
    const result = await loginUser({
      identifier: parsed.data.email, 
      password: parsed.data.password,
      userAgent: req.headers.get("user-agent") || undefined,
      ip: req.headers.get("x-forwarded-for") || undefined,
    });

    await setAuthCookies(result.accessToken, result.refreshToken);
    return NextResponse.json({ user: result.user });
  } catch (err) {
    if (err instanceof AuthError) {
      return NextResponse.json({ error: err.message, code: err.code }, { status: err.status });
    }
    console.error("[login]", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}