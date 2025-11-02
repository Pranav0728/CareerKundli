// Top-level imports and POST handler
import { NextResponse } from "next/server";
export const runtime = "nodejs";

import { analyzeResumeText } from "@/lib/chains";
import dbConnect from "@/lib/dbConnect";
import Report from "@/lib/models/Report";
import User from "@/lib/models/users";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/option";

// Normalize roadmap structure to ensure arrays and string fields
function normalizeRoadmap(raw) {
  const toArray = (arr) => (Array.isArray(arr) ? arr : []);
  const normalizeStep = (s) => ({
    title: typeof s?.title === "string" ? s.title : "",
    description: typeof s?.description === "string" ? s.description : "",
    duration: typeof s?.duration === "string" ? s.duration : "",
    outcome: typeof s?.outcome === "string" ? s.outcome : "",
  });
  return {
    short_term: toArray(raw?.short_term).map(normalizeStep),
    mid_term: toArray(raw?.mid_term).map(normalizeStep),
    long_term: toArray(raw?.long_term).map(normalizeStep),
  };
}

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
    const pdfParse = (await import("pdf-parse-fixed")).default;
    const parsed = await pdfParse(buffer);
    const resumeText = parsed.text;
    if (!resumeText || resumeText.length < 100) {
      return NextResponse.json(
      { 
        error: "Couldn't extract readable text from the PDF. Please upload a text-based resume (not an image or scanned document)." 
      },
      { status: 400 }
    );
  }

    const result = await analyzeResumeText(resumeText);
    const normalizedRoadmap = normalizeRoadmap(result?.roadmap);
    console.log(normalizeRoadmap)
    const doc = await Report.create({
      resumeText,
      analysis: result?.analysis || { skills: [], roles: [], education: [], achievements: [] },
      prediction: {
        next_roles: result?.prediction?.next_roles || [],
        growth_score: typeof result?.prediction?.growth_score === "number" ? result.prediction.growth_score : 0,
        skill_gaps: result?.prediction?.skill_gaps || [],
      },
      horoscope: typeof result?.horoscope === "string" ? result.horoscope : "",
      roadmap: normalizedRoadmap,
    });

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
