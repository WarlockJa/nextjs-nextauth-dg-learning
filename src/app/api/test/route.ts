import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";
import { NextResponse } from "next/server";

// test auth route
// if authenticated returns session data
// if not authenticated returns 401
export async function GET() {
  const session = await getServerSession(options);

  if (!session)
    return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });

  console.log("GET API", session);
  return NextResponse.json({ authenticated: !!session });
}
