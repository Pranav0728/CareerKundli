import dbConnect from "@/lib/dbConnect";
import User from "@/lib/models/users";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/option";

export const dynamic = "force-dynamic";
export async function GET() {
  await dbConnect();
  const session = await getServerSession(authOptions);
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const user = await User.findOne({ email: session.user.email });
  return Response.json(user);
}