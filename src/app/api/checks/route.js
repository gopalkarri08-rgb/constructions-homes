import { NextResponse } from "next/server";
import { getItem } from "@/content";
import { isStageSlug } from "@/data/stages-public";
import { membershipCoversStage } from "@/lib/access";
import { getViewer } from "@/lib/session";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

export async function POST(request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "Tick marks will save once accounts are connected." },
      { status: 503 },
    );
  }

  const viewer = await getViewer();
  if (!viewer.user) {
    return NextResponse.json({ error: "Log in to save a tick." }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const { stageSlug, subStageSlug, itemSlug } = body;
  const checked = Boolean(body.checked);

  if (!isStageSlug(stageSlug) || !membershipCoversStage(viewer.memberships, stageSlug)) {
    return NextResponse.json({ error: "This stage is not open on your plan." }, { status: 403 });
  }
  if (!getItem(stageSlug, subStageSlug, itemSlug)) {
    return NextResponse.json({ error: "That item is not in the guide." }, { status: 400 });
  }

  const supabase = await createClient();
  const row = {
    user_id: viewer.user.id,
    stage_slug: stageSlug,
    sub_stage_slug: subStageSlug,
    item_slug: itemSlug,
    checked,
    updated_at: new Date().toISOString(),
  };
  const { error } = await supabase.from("user_item_checks").upsert(row, {
    onConflict: "user_id,stage_slug,sub_stage_slug,item_slug",
  });

  if (error) {
    return NextResponse.json(
      { error: "The tick could not be saved. The checks table may not be migrated yet." },
      { status: 503 },
    );
  }

  return NextResponse.json({ ok: true, checked });
}
