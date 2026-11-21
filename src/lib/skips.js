import "server-only";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

export async function getStepSkips(userId, stageSlug) {
  if (!userId || !isSupabaseConfigured()) {
    return { ready: false, slugs: new Set() };
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("user_step_skips")
    .select("sub_stage_slug, skipped")
    .eq("user_id", userId)
    .eq("stage_slug", stageSlug);

  if (error) return { ready: false, slugs: new Set() };

  return {
    ready: true,
    slugs: new Set((data ?? []).filter((row) => row.skipped).map((row) => row.sub_stage_slug)),
  };
}
