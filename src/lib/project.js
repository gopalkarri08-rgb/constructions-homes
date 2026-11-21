import "server-only";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

export {
  BUDGETS,
  BUILD_TYPES,
  FLOORS,
  INDIAN_STATES,
  budgetLabel,
  buildTypeLabel,
  formatInr,
  projectLine,
} from "@/lib/project-options";

export async function getProject(userId) {
  if (!userId || !isSupabaseConfigured()) return { ready: false, project: null };
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .select(
      "id, name, city, state, plot_size_sqft, floors, construction_type, current_stage_slug, budget_preference, budget_inr",
    )
    .eq("user_id", userId)
    .maybeSingle();
  if (error) return { ready: false, project: null };
  return { ready: true, project: data };
}
