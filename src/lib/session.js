import "server-only";
import { cache } from "react";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

export const getViewer = cache(async () => {
  if (!isSupabaseConfigured()) {
    return { configured: false, user: null, profile: null, memberships: [] };
  }

  const supabase = await createClient();
  if (!supabase) {
    return { configured: false, user: null, profile: null, memberships: [] };
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { configured: true, user: null, profile: null, memberships: [] };
  }

  const [profileResult, membershipResult] = await Promise.all([
    supabase.from("profiles").select("name, location").eq("id", user.id).maybeSingle(),
    supabase
      .from("memberships")
      .select(
        "id, plan, stage_slug, status, starts_at, expires_at, razorpay_subscription_id",
      )
      .eq("user_id", user.id),
  ]);

  return {
    configured: true,
    user: { id: user.id, email: user.email ?? "" },
    profile: profileResult.error ? null : profileResult.data,
    memberships: membershipResult.error ? [] : (membershipResult.data ?? []),
  };
});
