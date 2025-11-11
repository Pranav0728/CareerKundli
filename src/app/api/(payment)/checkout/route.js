import { NextResponse } from "next/server";
import Razorpay from "razorpay";

export const dynamic = "force-dynamic";
export const runtime = "nodejs"; // ensure Node runtime (Razorpay SDK needs Node)

export async function POST(req) {
  try {
    // Validate env vars first
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      return NextResponse.json(
        { error: "Missing Razorpay credentials on server" },
        { status: 500 }
      );
    }

    const { amount, currency } = await req.json();

    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    const options = {
      amount: Math.round(amount * 100), // amount in paise
      currency,
      receipt: `rcpt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    return NextResponse.json({ orderId: order.id });
  } catch (err) {
    // Razorpay responds with detailed errors; surface some context
    console.error("Razorpay order creation failed:", err);
    return NextResponse.json(
      { error: err?.error?.description || "Unable to create order" },
      { status: err?.statusCode || 500 }
    );
  }
}
