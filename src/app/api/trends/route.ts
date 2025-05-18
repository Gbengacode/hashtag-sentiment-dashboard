import { NextResponse } from "next/server";
import { trendData } from "../mocks/trendData";
export async function GET () {
  return NextResponse.json({ trendData });
}
