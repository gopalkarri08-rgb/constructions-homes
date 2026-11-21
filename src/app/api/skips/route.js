import { NextResponse } from "next/server";
import { getSubStage } from "@/content";
import { isStageSlug } from "@/data/stages-public";
import { membershipCoversStage } from "@/lib/access";
import { getViewer } from "@/lib/session";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

export async function POST(request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "Skip will save once accounts are connected." },
      { status: 503 },
    );
  }

  const viewer = await getViewer();
  if (!viewer.user) {
    return NextResponse.json({ error: "Log in to skip a step." }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const stageSlug = body.stageSlug;
  const subStageSlug = body.subStageSlug;
  const skipped = Boolean(body.skipped);

  if (!isStageSlug(stageSlug) || !membershipCoversStage(viewer.memberships, stageSlug)) {
    return NextResponse.json({ error: "This stage is not open on your plan." }, { status: 403 });
  }

  const found = getSubStage(stageSlug, subStageSlug);
  if (!found?.subStage?.optional) {
    return NextResponse.json({ error: "This step cannot be skipped." }, { status: 400 });
  }

  const supabase = await createClient();
  const { error } = await supabase.from("user_step_skips").upsert(
    {
      user_id: viewer.user.id,
      stage_slug: stageSlug,
      sub_stage_slug: subStageSlug,
      skipped,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id,stage_slug,sub_stage_slug" },
  );

  if (error) {
    return NextResponse.json(
      { error: "Skip could not be saved. The skips table may not be migrated yet." },
      { status: 503 },
    );
  }

  return NextResponse.json({ ok: true, skipped });
}
