import { NextResponse } from "next/server";
import { getStageContent, getSubStage, getItem } from "@/content";
import { isStageSlug } from "@/data/stages-public";
import { membershipCoversStage } from "@/lib/access";
import { assist } from "@/lib/assist/provider";
import { getViewer } from "@/lib/session";

export async function POST(request) {
  const viewer = await getViewer();
  if (!viewer.configured) {
    return NextResponse.json({ reply: "AI assistant coming soon" });
  }
  if (!viewer.user) {
    return NextResponse.json({ error: "Log in to use the assistant." }, { status: 401 });
  }

  const form = await request.formData();
  const stageSlug = String(form.get("stageSlug") || "");
  const subStageSlug = String(form.get("subStageSlug") || "");
  const itemSlug = String(form.get("itemSlug") || "");
  const message = String(form.get("message") || "").trim();
  const image = form.get("image");
  const audio = form.get("audio");

  if (!isStageSlug(stageSlug) || !membershipCoversStage(viewer.memberships, stageSlug)) {
    return NextResponse.json({ error: "This stage is not open on your plan." }, { status: 403 });
  }
  if (!message && !image && !audio) {
    return NextResponse.json({ error: "Add a note, a photo, or a voice clip." }, { status: 400 });
  }

  const stage = getStageContent(stageSlug);
  if (!stage) {
    return NextResponse.json({ error: "Unknown stage." }, { status: 400 });
  }
  if (subStageSlug && !getSubStage(stageSlug, subStageSlug)) {
    return NextResponse.json({ error: "Unknown sub-stage." }, { status: 400 });
  }
  if (itemSlug && !getItem(stageSlug, subStageSlug, itemSlug)) {
    return NextResponse.json({ error: "Unknown item." }, { status: 400 });
  }

  const result = await assist({
    stageSlug,
    subStageSlug: subStageSlug || null,
    itemSlug: itemSlug || null,
    message,
    hasImage: Boolean(image && typeof image === "object" && image.size),
    hasAudio: Boolean(audio && typeof audio === "object" && audio.size),
  });

  return NextResponse.json(result);
}
