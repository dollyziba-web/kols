import crypto from "crypto";
import { cookies } from "next/headers";
import { getSupabasePublicClient, isSupabaseConfigured } from "@/lib/supabase";

export const SESSION_COOKIE_NAME = "kols_admin_session";

function getSecret(): string {
  return process.env.AUTH_SECRET || "kols-architects-fallback-hmac-secret-2026";
}

export interface AdminSessionPayload {
  email: string;
  role: "admin";
  exp: number;
}

export function createSessionToken(email: string): string {
  const payload: AdminSessionPayload = {
    email,
    role: "admin",
    exp: Date.now() + 1000 * 60 * 60 * 24 * 7, // 7 days
  };
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = crypto
    .createHmac("sha256", getSecret())
    .update(encodedPayload)
    .digest("base64url");
  return `${encodedPayload}.${signature}`;
}

export function verifySessionToken(token: string): AdminSessionPayload | null {
  try {
    const [encodedPayload, signature] = token.split(".");
    if (!encodedPayload || !signature) return null;
    const expectedSig = crypto
      .createHmac("sha256", getSecret())
      .update(encodedPayload)
      .digest("base64url");
    if (signature !== expectedSig) return null;

    const payload = JSON.parse(
      Buffer.from(encodedPayload, "base64url").toString("utf-8")
    ) as AdminSessionPayload;

    if (Date.now() > payload.exp) return null;
    return payload;
  } catch {
    return null;
  }
}

export async function verifyAdminCredentials(
  email: string,
  password: string
): Promise<{ valid: boolean; email?: string }> {
  // 1. Check Supabase Auth if configured
  if (isSupabaseConfigured) {
    try {
      const supabase = getSupabasePublicClient();
      if (supabase) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (!error && data.user?.email) {
          return { valid: true, email: data.user.email };
        }
      }
    } catch {
      // Fallback to environment variable studio admin credentials
    }
  }

  // 2. Verify against server-side environment credentials
  const configuredEmail = process.env.ADMIN_EMAIL || "admin@kolsarchitects.com";
  const configuredPassword = process.env.ADMIN_PASSWORD || "KolsStudioAdmin!2026";

  const emailMatch = email.trim().toLowerCase() === configuredEmail.trim().toLowerCase();
  const passwordMatch = password === configuredPassword;

  if (emailMatch && passwordMatch) {
    return { valid: true, email: configuredEmail };
  }
  return { valid: false };
}

export function getServerAdminSession(): AdminSessionPayload | null {
  const cookieStore = cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}
