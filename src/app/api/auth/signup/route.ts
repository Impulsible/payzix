import { NextRequest, NextResponse } from "next/server";
import { signupSchema } from "@/validators/auth";
import { registerUser, AuthError } from "@/services/auth.service";
import { setAuthCookies } from "@/lib/cookies";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = signupSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", issues: parsed.error.flatten().fieldErrors },
        { status: 422 }
      );
    }

    const result = await registerUser({
      ...parsed.data,
      userAgent: req.headers.get("user-agent") || undefined,
      ip: req.headers.get("x-forwarded-for") || undefined,
    });

    await setAuthCookies(result.accessToken, result.refreshToken);
    return NextResponse.json({ user: result.user }, { status: 201 });
  } catch (err) {
    if (err instanceof AuthError) {
      return NextResponse.json({ error: err.message, code: err.code }, { status: err.status });
    }
    console.error("[signup]", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}