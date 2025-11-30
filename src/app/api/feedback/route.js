import { NextResponse } from "next/server";
import { sendFeedbackEmail } from "@/lib/mailer";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(req) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await sendFeedbackEmail({ name, email, subject, message });
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (e) {
    console.error("Feedback error:", e);
    return NextResponse.json({ error: "Failed to send feedback" }, { status: 500 });
  }
}