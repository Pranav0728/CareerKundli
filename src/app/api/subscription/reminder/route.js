import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/lib/models/users";
import { sendExpiryReminderEmail } from "@/lib/mailer";

export async function GET() {
  try {
    await dbConnect();
    const now = new Date();
    const soon = new Date(now.getTime() + 24 * 60 * 60 * 1000);

    const users = await User.find({
      "subscription.isActive": true,
      "subscription.renewDate": { $gte: now, $lte: soon },
    })
      .select("email subscription.renewDate")
      .lean();

    let sent = 0;
    for (const u of users) {
      await sendExpiryReminderEmail({
        to: u.email,
        renewDate: u.subscription.renewDate,
      });
      sent += 1;
    }

    return NextResponse.json({ sent }, { status: 200 });
  } catch (e) {
    console.error("Reminder error:", e);
    return NextResponse.json({ error: "Reminder failed" }, { status: 500 });
  }
}