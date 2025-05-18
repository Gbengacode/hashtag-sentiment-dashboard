import { trendData } from "@/app/api/mocks/trendData";
import { NextRequest, NextResponse } from "next/server";

export async function GET (
  req: NextRequest,
  context: { params: Promise<{ hashtag: string }> }
) {
  const { hashtag } = await context.params;

  if (!hashtag || typeof hashtag !== "string") {
    return NextResponse.json(
      { error: "Invalid or missing hashtag" },
      { status: 400 }
    );
  }

  const data = trendData[hashtag.toLowerCase()];

  if (!data) {
    return NextResponse.json({ error: "Hashtag not found" }, { status: 404 });
  }

  return NextResponse.json(data);
}
