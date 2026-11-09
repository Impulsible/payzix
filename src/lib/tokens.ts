import jwt, { type SignOptions } from "jsonwebtoken";

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET!;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;

// TypeScript strictly expects these to be specific string formats (e.g., "15m")
// We cast them to SignOptions["expiresIn"] to safely bypass the strict type check
const ACCESS_TTL = (process.env.JWT_ACCESS_TTL || "15m") as SignOptions["expiresIn"];
const REFRESH_TTL = (process.env.JWT_REFRESH_TTL || "7d") as SignOptions["expiresIn"];

export type AccessPayload = {
  sub: string;
  role: string;
  email: string;
  phone?: string;
};

export type RefreshPayload = {
  sub: string;
};

export async function signAccessToken(payload: AccessPayload): Promise<string> {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, ACCESS_SECRET, { expiresIn: ACCESS_TTL }, (err, token) => {
      if (err || !token) return reject(err);
      resolve(token);
    });
  });
}

export async function signRefreshToken(userId: string): Promise<string> {
  return new Promise((resolve, reject) => {
    jwt.sign({ sub: userId }, REFRESH_SECRET, { expiresIn: REFRESH_TTL }, (err, token) => {
      if (err || !token) return reject(err);
      resolve(token);
    });
  });
}

export async function verifyAccessToken(token: string): Promise<AccessPayload | null> {
  return new Promise((resolve) => {
    jwt.verify(token, ACCESS_SECRET, (err, decoded) => {
      if (err) return resolve(null);
      resolve(decoded as AccessPayload);
    });
  });
}

export async function verifyRefreshToken(token: string): Promise<RefreshPayload | null> {
  return new Promise((resolve) => {
    jwt.verify(token, REFRESH_SECRET, (err, decoded) => {
      if (err) return resolve(null);
      resolve(decoded as RefreshPayload);
    });
  });
}