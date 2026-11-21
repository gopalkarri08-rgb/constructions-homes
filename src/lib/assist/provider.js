import "server-only";

/**
 * Single adapter for the stage assistant.
 * ASSIST_PROVIDER may later be "openai" or "gemini".
 * Until a provider is implemented, every path returns the same placeholder.
 * This module must not call an external model yet.
 */
export async function assist(_input) {
  const provider = (process.env.ASSIST_PROVIDER || "").toLowerCase();

  if (provider === "openai") return placeholder();
  if (provider === "gemini") return placeholder();
  return placeholder();
}

function placeholder() {
  return { reply: "AI assistant coming soon" };
}
