export const runtime = "edge";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const since = searchParams.get("since"); // optional YYYY-MM-DD

  const sources = [
    { name: "ChatGPT Release Notes", url: "https://help.openai.com/en/articles/6825453-chatgpt-release-notes", category: "Platform" },
    { name: "OpenAI API Changelog", url: "https://platform.openai.com/docs/changelog", category: "API" },
    { name: "GPT Actions (Getting Started)", url: "https://platform.openai.com/docs/actions/getting-started", category: "Platform" },
    { name: "GPT Action Authentication", url: "https://platform.openai.com/docs/actions/authentication", category: "Platform" },
    { name: "GPT Release Notes", url: "https://platform.openai.com/docs/gpts/release-notes/release-notes", category: "Platform" }
  ];

  const items = await Promise.all(
    sources.map(async (s) => {
      try {
        const r = await fetch(s.url, { headers: { "user-agent": "Brains-Platform-Intelligence/1.0" } });
        const text = await r.text();
        const excerpt = text.replace(/\s+/g, " ").slice(0, 700);

        return {
          category: s.category,
          description: `Snapshot from ${s.name}. Use the source link for authoritative details.`,
          effective_date: null,
          scope_of_impact: "Current published reference for governance verification.",
          source: s.url,
          confidence: "Verified",
          excerpt
        };
      } catch (e) {
        return {
          category: s.category,
          description: `Failed to fetch ${s.name}.`,
          effective_date: null,
          scope_of_impact: "Treat platform facts as Assumed for this source.",
          source: s.url,
          confidence: "Unclear",
          excerpt: null
        };
      }
    })
  );

  return new Response(
    JSON.stringify({
      generated_at: new Date().toISOString(),
      since,
      items
    }),
    { headers: { "content-type": "application/json" } }
  );
}
