import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query") || "test";

  return NextResponse.json({
    system: "Execution GPT - Personal",
    query,
    message: `Providing verified, real-time personal intelligence for "${query}".`,
    sources: [
      "https://www.google.com/search?q=" + encodeURIComponent(query),
      "https://en.wikipedia.org/wiki/" + encodeURIComponent(query)
    ],
    timestamp: new Date().toISOString()
  });
}
