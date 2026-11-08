import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";

export async function GET() {
  try {
    const conn = await connectDB();
    return NextResponse.json({
      status: "ok",
      database: conn.connection.readyState === 1 ? "connected" : "not-connected",
    });
  } catch (err) {
    return NextResponse.json({ status: "error", message: String(err) }, { status: 500 });
  }
}