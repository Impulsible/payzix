import crypto from "crypto";
import { connectDB } from "@/lib/db";
import { User, type UserDoc } from "@/models/User";
import { Session } from "@/models/Session";
import { hashPassword, verifyPassword } from "@/lib/password";
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "@/lib/tokens";

function sha256(input: string): string {
  return crypto.createHash("sha256").update(input).digest("hex");
}

export type SafeUser = {
  id: string;
  email?: string;
  phone?: string;
  fullName: string;
  role: string;
  status: string;
  emailVerified: boolean;
  mfaEnabled: boolean;
  createdAt: string;
};

function toSafeUser(u: UserDoc): SafeUser {
  return {
    id: String(u._id),
    // Use ?? undefined to satisfy the strict TypeScript type
    email: u.email ?? undefined,
    phone: u.phone ?? undefined,
    fullName: u.fullName,
    role: u.role,
    status: u.status,
    emailVerified: u.emailVerified,
    mfaEnabled: u.mfaEnabled,
    createdAt: (u as unknown as { createdAt: Date }).createdAt.toISOString(),
  };
}

export class AuthError extends Error {
  constructor(message: string, public status = 400, public code = "auth_error") {
    super(message);
  }
}

export async function registerUser(input: {
  fullName: string;
  password: string;
  email?: string;
  phone?: string;
  userAgent?: string;
  ip?: string;
}): Promise<{ user: SafeUser; accessToken: string; refreshToken: string }> {
  await connectDB();

  if (!input.email && !input.phone) {
    throw new AuthError("You must provide either an email or phone number.", 400, "missing_identifier");
  }

  if (input.email) {
    const existingEmail = await User.findOne({ email: input.email });
    if (existingEmail) throw new AuthError("Email already in use.", 409, "email_taken");
  }
  if (input.phone) {
    const existingPhone = await User.findOne({ phone: input.phone });
    if (existingPhone) throw new AuthError("Phone number already in use.", 409, "phone_taken");
  }

  const passwordHash = await hashPassword(input.password);
  const verificationToken = crypto.randomBytes(32).toString("hex");

  const created = await User.create({
    email: input.email,
    phone: input.phone,
    passwordHash,
    fullName: input.fullName,
    role: "customer",
    status: "active",
    emailVerified: false,
    emailVerificationToken: input.email ? verificationToken : undefined,
    emailVerificationExpires: input.email ? new Date(Date.now() + 24 * 60 * 60 * 1000) : undefined,
  });

  if (input.email) {
    console.log(`[auth] verification link for ${input.email}: /verify-email?token=${verificationToken}`);
  } else if (input.phone) {
    console.log(`[auth] OTP sent to ${input.phone}`);
  }

  const tokens = await createSessionForUser(created, {
    userAgent: input.userAgent,
    ip: input.ip,
  });

  return { user: toSafeUser(created), ...tokens };
}

export async function loginUser(input: {
  identifier: string;
  password: string;
  userAgent?: string;
  ip?: string;
}): Promise<{ user: SafeUser; accessToken: string; refreshToken: string }> {
  await connectDB();

  const user = await User.findOne({
    $or: [
      { email: input.identifier.toLowerCase() },
      { phone: input.identifier }
    ]
  }).select("+passwordHash");

  if (!user) throw new AuthError("Invalid credentials.", 401, "invalid_credentials");

  if (user.status !== "active") {
    throw new AuthError("This account is not active.", 403, "account_inactive");
  }

  const ok = await verifyPassword(input.password, user.passwordHash);
  if (!ok) throw new AuthError("Invalid credentials.", 401, "invalid_credentials");

  user.lastLoginAt = new Date();
  await user.save();

  const tokens = await createSessionForUser(user, {
    userAgent: input.userAgent,
    ip: input.ip,
  });

  return { user: toSafeUser(user), ...tokens };
}

async function createSessionForUser(
  user: UserDoc,
  meta: { userAgent?: string; ip?: string }
): Promise<{ accessToken: string; refreshToken: string }> {
  const accessToken = await signAccessToken({
    sub: String(user._id),
    role: user.role,
    email: user.email ?? "", 
    phone: user.phone ?? "",  
  });
  
  const refreshToken = await signRefreshToken(String(user._id));

  await Session.create({
    userId: user._id,
    refreshTokenHash: sha256(refreshToken),
    userAgent: meta.userAgent,
    ip: meta.ip,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  return { accessToken, refreshToken };
}

export async function refreshSession(refreshToken: string) {
  const payload = await verifyRefreshToken(refreshToken);
  if (!payload) throw new AuthError("Invalid refresh token.", 401, "invalid_refresh");

  await connectDB();
  const session = await Session.findOne({
    userId: payload.sub,
    refreshTokenHash: sha256(refreshToken),
    revokedAt: null,
    expiresAt: { $gt: new Date() },
  });
  if (!session) throw new AuthError("Session not found or revoked.", 401, "session_revoked");

  const user = await User.findById(payload.sub);
  if (!user || user.status !== "active") {
    throw new AuthError("Account is not active.", 403, "account_inactive");
  }

  const accessToken = await signAccessToken({
    sub: String(user._id),
    role: user.role,
    email: user.email ?? "", 
    phone: user.phone ?? "",  
  });

  return {
    user: toSafeUser(user as unknown as UserDoc),
    accessToken,
    refreshToken,
  };
}

export async function logoutUser(refreshToken: string | null) {
  if (!refreshToken) return;
  await connectDB();
  await Session.updateOne(
    { refreshTokenHash: sha256(refreshToken), revokedAt: null },
    { $set: { revokedAt: new Date() } }
  );
}

export async function getUserById(id: string): Promise<SafeUser | null> {
  await connectDB();
  const user = await User.findById(id);
  return user ? toSafeUser(user as unknown as UserDoc) : null;
}

export async function requestPasswordReset(email: string) {
  await connectDB();
  const user = await User.findOne({ email });
  if (!user) return;

  const token = crypto.randomBytes(32).toString("hex");
  user.passwordResetToken = token;
  user.passwordResetExpires = new Date(Date.now() + 60 * 60 * 1000);
  await user.save();

  console.log(`[auth] reset link for ${email}: /reset-password?token=${token}`);
}

export async function resetPassword(token: string, newPassword: string) {
  await connectDB();
  const user = await User.findOne({
    passwordResetToken: token,
    passwordResetExpires: { $gt: new Date() },
  }).select("+passwordHash +passwordResetToken +passwordResetExpires");

  if (!user) throw new AuthError("Reset link is invalid or expired.", 400, "invalid_token");

  user.passwordHash = await hashPassword(newPassword);
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  await Session.updateMany(
    { userId: user._id, revokedAt: null },
    { $set: { revokedAt: new Date() } }
  );
}

export async function verifyEmail(token: string) {
  await connectDB();
  const user = await User.findOne({
    emailVerificationToken: token,
    emailVerificationExpires: { $gt: new Date() },
  }).select("+emailVerificationToken +emailVerificationExpires");

  if (!user) throw new AuthError("Verification link is invalid or expired.", 400, "invalid_token");

  user.emailVerified = true;
  user.emailVerificationToken = undefined;
  user.emailVerificationExpires = undefined;
  await user.save();

  return toSafeUser(user as unknown as UserDoc);
}