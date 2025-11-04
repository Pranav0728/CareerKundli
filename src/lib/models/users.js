import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true, required: true },
    image: String,
    emailVerified: Date,

    // ✅ Subscription details
    subscription: {
      isActive: { type: Boolean, default: false },
      plan: { type: String, enum: ["free", "pro", "enterprise"], default: "free" },
      razorpayCustomerId: { type: String },
      subscriptionId: { type: String }, // payment or order ref
      startDate: { type: Date },
      renewDate: { type: Date },
      currency: { type: String, enum: ["INR", "USD"], default: "INR" },
      amount: { type: Number, default: 0 }, // ₹99 or $2
    },

    // ✅ Connect to Results
    results: [{ type: mongoose.Schema.Types.ObjectId, ref: "Report" }],
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
