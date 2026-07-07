const mongoose = require("mongoose");

const pendingRegistrationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role: {
      type: String,
      required: true,
      enum: ["Tourist", "Tour Guide"],
    },
    otp: { type: String, required: true },
    expiresAt: {
      type: Date,
      required: true,
      default: () => new Date(Date.now() + 5 * 60 * 1000),
      expires: 0,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model(
  "PendingRegistration",
  pendingRegistrationSchema,
);
