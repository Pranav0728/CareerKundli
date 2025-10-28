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
      razorpayCustomerId: { type: String }, // or Razorpay/PayPal ID
      subscriptionId: { type: String },   // external subscription ref
      renewDate: { type: Date },
    },

    // ✅ Connect to Results
    results: [{ type: mongoose.Schema.Types.ObjectId, ref: "Report" }],
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
