"use client";

import { useState } from "react";

export default function CancelMembership() {
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function onClick() {
    setPending(true);
    setError("");
    const response = await fetch("/api/razorpay/cancel", { method: "POST" });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      setError(data.error || "The plan could not be cancelled.");
      setPending(false);
      return;
    }
    window.location.reload();
  }

  return (
    <div>
      <button
        type="button"
        onClick={onClick}
        disabled={pending}
        className="inline-flex h-11 items-center justify-center rounded-full border border-line px-4 text-sm text-cream hover:border-gold/40 disabled:opacity-60"
      >
        {pending ? "Cancelling…" : "Cancel monthly plan"}
      </button>
      <p className="mt-2 text-sm leading-relaxed text-cream-dim">
        Access stays until the end of the period already paid.
      </p>
      {error ? (
        <p role="alert" className="mt-2 text-sm text-[#f0cfc4]">
          {error}
        </p>
      ) : null}
    </div>
  );
}
