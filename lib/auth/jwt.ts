
import { SignJWT, jwtVerify } from "jose";

export interface JWTPayload {
  sub: string;
  email: string;
  role: string;
}

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function signToken(payload: JWTPayload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(process.env.JWT_EXPIRES_IN || "7d")
    .sign(secret);
}

export async function verifyToken(token: string): Promise<JWTPayload> {
  const { payload } = await jwtVerify(token, secret);

  return payload as unknown as JWTPayload;
}

export function decodeToken() {
  return null;
}