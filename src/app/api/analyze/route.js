// Top-level imports and POST handler
import { NextResponse } from "next/server";
export const runtime = "nodejs";

import { analyzeResumeText } from "@/lib/chains";
import dbConnect from "@/lib/dbConnect";
import Report from "@/lib/models/Report";
import User from "@/lib/models/users";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/option";

export async function POST(req) {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);

    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // ✅ Use dynamic import to handle CommonJS in ESM
    const pdfParse = (await import("pdf-parse-fixed")).default;
    const parsed = await pdfParse(buffer);
    const resumeText = parsed.text;

    if (!resumeText || !resumeText.trim()) {
      return NextResponse.json(
        { error: "No text extracted from PDF" },
        { status: 400 }
      );
    }

    const result = await analyzeResumeText(resumeText);
    const doc = await Report.create({ resumeText, ...result });

    // Link report to the authenticated user (if any)
    if (session?.user?.email) {
      await User.updateOne(
        { email: session.user.email },
        { $addToSet: { results: doc._id } }
      );
    }

    return NextResponse.json(
      { id: doc._id.toString(), result },
      { status: 200 }
    );
  } catch (e) {
    console.error("Analyze error:", e);
    return NextResponse.json({ error: "Analysis failed", details: e.message }, { status: 500 });
  }
}
