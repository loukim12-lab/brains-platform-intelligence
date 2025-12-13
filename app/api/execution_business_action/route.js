import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query") || "test";

  return NextResponse.json({
    system: "Execution GPT - Business",
    query,
    message: `Delivering verified, strategic business intelligence for "${query}".`,
    sources: [
      "https://news.google.com/search?q=" + encodeURIComponent(query),
      "https://www.google.com/search?q=" + encodeURIComponent(query)
    ],
    timestamp: new Date().toISOString()
  });
}
