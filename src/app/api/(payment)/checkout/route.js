import { NextResponse } from "next/server";
import Razorpay from "razorpay";

export const dynamic = "force-dynamic";
export async function POST(req) {
  try {
    const { amount, currency } = await req.json();
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
    console.log("Razorpay instance:", razorpay);
    const options = {
      amount: Math.round(amount * 100), // amount in paise
      currency,
      receipt: `rcpt_${Date.now()}`,
    };
    console.log("Razorpay order options:", options);

    const order = await razorpay.orders.create(options);
    console.log("Razorpay order created:", order);

    return NextResponse.json({ orderId: order.id });
  } catch (err) {
    console.error("Razorpay order creation failed:", err);
    return NextResponse.json(
      { error: "Unable to create order" },
      { status: 500 }
    );
  }
}
