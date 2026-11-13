import { NextRequest, NextResponse } from "next/server";
import {
  createSessionToken,
  getServerAdminSession,
  SESSION_COOKIE_NAME,
  verifyAdminCredentials,
} from "@/lib/auth";

export async function GET() {
  const session = getServerAdminSession();
  if (!session) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
  return NextResponse.json({
    authenticated: true,
    user: { email: session.email, role: session.role },
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = (body.email || "").trim();
    const password = body.password || "";

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    const result = await verifyAdminCredentials(email, password);
    if (!result.valid || !result.email) {
      return NextResponse.json(
        { error: "Invalid studio administrator credentials." },
        { status: 401 }
      );
    }

    const token = createSessionToken(result.email);
    const response = NextResponse.json({
      success: true,
      user: { email: result.email, role: "admin" },
    });

    response.cookies.set(SESSION_COOKIE_NAME, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch {
    return NextResponse.json(
      { error: "Authentication error occurred." },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.set(SESSION_COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return response;
}
