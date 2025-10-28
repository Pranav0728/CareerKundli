// Module imports and GET handler
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Report from "@/lib/models/Report";
import User from "@/lib/models/users";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/option";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();

    const user = await User.findOne({ email: session.user.email })
      .select("results")
      .lean();

    const reports = await Report.find({ _id: { $in: user?.results || [] } })
      .sort({ createdAt: -1 })
      .limit(20)
      .lean();

    return NextResponse.json({ reports }, { status: 200 });
  } catch (error) {
    console.error("Error fetching reports:", error);
    return NextResponse.json({ error: "Failed to fetch reports" }, { status: 500 });
  }
}