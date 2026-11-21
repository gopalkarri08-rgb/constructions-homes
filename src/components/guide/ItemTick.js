"use client";

import { useState } from "react";

export default function ItemTick({ stageSlug, subStageSlug, itemSlug, initial = false, label }) {
  const [on, setOn] = useState(initial);
  const [note, setNote] = useState("");
  const [pending, setPending] = useState(false);

  async function toggle() {
    const next = !on;
    setOn(next);
    setNote("");
    setPending(true);
    const response = await fetch("/api/checks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        stageSlug,
        subStageSlug,
        itemSlug,
        checked: next,
      }),
    });
    setPending(false);
    if (!response.ok) {
      setOn(!next);
      const data = await response.json().catch(() => ({}));
      setNote(data.error || "Could not save this tick.");
    }
  }

  return (
    <div className="shrink-0">
      <label className="inline-flex items-center gap-2">
        <input
          type="checkbox"
          checked={on}
          disabled={pending}
          onChange={toggle}
          aria-label={label}
          className="h-5 w-5 accent-[#c6a36a]"
        />
      </label>
      {note ? <p className="mt-1 max-w-xs text-xs text-[#f0cfc4]">{note}</p> : null}
    </div>
  );
}
