import { NextResponse } from "next/server";
import crypto from "crypto";
import dbConnect from "@/lib/dbConnect";
import User from "@/lib/models/users";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/option";
import { sendSubscriptionEmail } from "@/lib/mailer";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();

    const body = await req.json();
    const { order_id, payment_id, signature, amount, currency } = body || {};
    if (!order_id || !payment_id || !signature || !amount || !currency) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
    hmac.update(`${order_id}|${payment_id}`);
    const digest = hmac.digest("hex");
    if (digest !== signature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const now = new Date();
    const renewDate = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

    const user = await User.findOneAndUpdate(
      { email: session.user.email },
      {
        $set: {
          "subscription.isActive": true,
          "subscription.plan": "pro",
          "subscription.subscriptionId": payment_id,
          "subscription.startDate": now,
          "subscription.renewDate": renewDate,
          "subscription.currency": currency,
          "subscription.amount": amount,
        },
      },
      { new: true }
    ).lean();

    await sendSubscriptionEmail({
      to: session.user.email,
      plan: "Pro",
      amount,
      currency,
      renewDate,
    });

    return NextResponse.json({ ok: true, user }, { status: 200 });
  } catch (e) {
    console.error("Subscription capture error:", e);
    return NextResponse.json({ error: "Subscription activation failed" }, { status: 500 });
  }
}