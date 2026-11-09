import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const SessionSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    refreshTokenHash: { type: String, required: true },
    userAgent: { type: String },
    ip: { type: String },
    revokedAt: { type: Date, default: null },
    expiresAt: { type: Date, required: true, index: { expires: 0 } }, // TTL auto-cleanup
  },
  { timestamps: true }
);

export type SessionDoc = InferSchemaType<typeof SessionSchema> & { _id: mongoose.Types.ObjectId };

export const Session: Model<SessionDoc> =
  mongoose.models.Session || mongoose.model<SessionDoc>("Session", SessionSchema);