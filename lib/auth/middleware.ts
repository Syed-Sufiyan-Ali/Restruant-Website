// lib/auth/middleware.ts
import { NextRequest } from "next/server";
import { verifyToken, JWTPayload } from "./jwt";
import { unauthorized, forbidden } from "@/lib/api/response";


export type AuthedRequest = NextRequest & { user: JWTPayload };

/**
 * Extracts and verifies JWT from Authorization header.
 * Returns the payload or a NextResponse error.
 */
export function getAuthUser(req: NextRequest): JWTPayload | null {
  const header = req.headers.get("authorization") ?? "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return null;
  try {
    return verifyToken(token);
  } catch {
    return null;
  }
}

/**
 * Use inside route handlers:
 *   const { user, error } = requireAuth(req);
 *   if (error) return error;
 */
export function requireAuth(req: NextRequest): { user: JWTPayload; error: null } | { user: null; error: ReturnType<typeof unauthorized> } {
  const user = getAuthUser(req);
  if (!user) return { user: null, error: unauthorized() };
  return { user, error: null };
}

/**
 * Require specific roles:
 *   const { user, error } = requireRole(req, ["ADMIN", "MANAGER"]);
 */
export function requireRole(
  req: NextRequest,
  roles: string[]
): { user: JWTPayload; error: null } | { user: null; error: ReturnType<typeof unauthorized | typeof forbidden> } {
  const { user, error } = requireAuth(req);
  if (error) return { user: null, error };
  if (!roles.includes(user!.role)) {
    return { user: null, error: forbidden("You do not have permission to access this resource") };
  }
  return { user: user!, error: null };
}
