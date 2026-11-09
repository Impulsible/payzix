import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const UserSchema = new Schema(
  {
    // EMAIL: Optional now (required: false)
    // sparse: true allows multiple documents to have an undefined email without throwing a unique index error
    email: { 
      type: String, 
      required: false, 
      unique: true, 
      sparse: true, 
      lowercase: true, 
      trim: true, 
      index: true 
    },
    
    // PHONE: Optional now (required: false)
    // sparse: true allows multiple documents to have an undefined phone
    phone: { 
      type: String, 
      required: false, 
      unique: true, 
      sparse: true, 
      trim: true,
      index: true
    },

    passwordHash: { type: String, required: true, select: false },
    fullName: { type: String, required: true, trim: true },
    
    role: {
      type: String,
      enum: ["customer", "support", "finance_operator", "admin"],
      default: "customer",
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "suspended", "deleted"],
      default: "active",
      required: true,
    },
    
    // Email Verification
    emailVerified: { type: Boolean, default: false },
    emailVerificationToken: { type: String, select: false },
    emailVerificationExpires: { type: Date, select: false },

    // Phone Verification (NEW: Added to support OTP login)
    phoneVerified: { type: Boolean, default: false },
    phoneOtpToken: { type: String, select: false },
    phoneOtpExpires: { type: Date, select: false },

    // Password Reset
    passwordResetToken: { type: String, select: false },
    passwordResetExpires: { type: Date, select: false },
    
    // MFA
    mfaEnabled: { type: Boolean, default: false },
    mfaSecret: { type: String, select: false },
    
    lastLoginAt: { type: Date },
  },
  { timestamps: true }
);

export type UserDoc = InferSchemaType<typeof UserSchema> & { _id: mongoose.Types.ObjectId };

export const User: Model<UserDoc> =
  mongoose.models.User || mongoose.model<UserDoc>("User", UserSchema);