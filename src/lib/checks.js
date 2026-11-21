import "server-only";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { checkKey } from "@/lib/check-key";

export async function getStageChecks(userId, stageSlug) {
  if (!userId || !isSupabaseConfigured()) {
    return { ready: false, keys: new Set() };
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("user_item_checks")
    .select("sub_stage_slug, item_slug, checked")
    .eq("user_id", userId)
    .eq("stage_slug", stageSlug);

  if (error) return { ready: false, keys: new Set() };

  const keys = new Set(
    (data ?? [])
      .filter((row) => row.checked)
      .map((row) => checkKey(row.sub_stage_slug, row.item_slug)),
  );
  return { ready: true, keys };
}

export function progressFor(subStages, keys) {
  let total = 0;
  let done = 0;
  const bySub = {};
  for (const subStage of subStages) {
    let subDone = 0;
    for (const entry of subStage.items) {
      total += 1;
      if (keys.has(checkKey(subStage.slug, entry.slug))) {
        done += 1;
        subDone += 1;
      }
    }
    bySub[subStage.slug] = { done: subDone, total: subStage.items.length };
  }
  return { done, total, bySub };
}
