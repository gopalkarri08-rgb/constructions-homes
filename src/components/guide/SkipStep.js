"use client";

import { useState } from "react";

export default function SkipStep({ stageSlug, subStageSlug, initial = false }) {
  const [skipped, setSkipped] = useState(initial);
  const [note, setNote] = useState("");
  const [pending, setPending] = useState(false);

  async function toggle() {
    const next = !skipped;
    setSkipped(next);
    setNote("");
    setPending(true);
    const response = await fetch("/api/skips", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stageSlug, subStageSlug, skipped: next }),
    });
    setPending(false);
    if (!response.ok) {
      setSkipped(!next);
      const data = await response.json().catch(() => ({}));
      setNote(data.error || "Could not save skip.");
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={toggle}
        disabled={pending}
        className="inline-flex h-10 items-center rounded-full border border-line px-4 text-sm text-cream hover:border-gold/40 disabled:opacity-60"
      >
        {skipped ? "Undo skip" : "Skip this step"}
      </button>
      {note ? <p className="mt-2 text-xs text-[#f0cfc4]">{note}</p> : null}
    </div>
  );
}
