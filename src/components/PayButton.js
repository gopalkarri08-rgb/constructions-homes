"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

function loadRazorpay() {
  return new Promise((resolve) => {
    if (typeof window !== "undefined" && window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function PayButton({ plan, stageSlug, label }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function onClick() {
    setPending(true);
    setError("");

    try {
      const response = await fetch("/api/razorpay/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan, stageSlug }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error || "Payment could not start.");
        setPending(false);
        return;
      }

      const loaded = await loadRazorpay();
      if (!loaded || !window.Razorpay) {
        setError("The payment window could not be loaded.");
        setPending(false);
        return;
      }

      const checkout = new window.Razorpay({
        key: data.keyId,
        name: "Constructions.homes",
        description: data.description,
        order_id: data.orderId,
        subscription_id: data.subscriptionId,
        amount: data.amount,
        currency: data.currency,
        theme: { color: "#c6a36a" },
        modal: {
          ondismiss() {
            setPending(false);
          },
        },
        handler: async (payment) => {
          const verified = await fetch("/api/razorpay/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              mode: data.mode,
              ...payment,
            }),
          });
          if (verified.ok) {
            router.push("/dashboard?paid=1");
            router.refresh();
            return;
          }
          setError(
            "The payment reached Razorpay, but the membership is not on the account yet. If the money was taken, it will appear after the webhook confirms it.",
          );
          setPending(false);
        },
      });

      checkout.on("payment.failed", () => {
        setError("The payment did not go through. Nothing was opened on your account.");
        setPending(false);
      });
      checkout.open();
    } catch {
      setError("Payment could not start.");
      setPending(false);
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={onClick}
        disabled={pending}
        className="inline-flex h-12 w-full items-center justify-center rounded-full bg-cream px-6 text-sm font-medium text-ink hover:bg-gold-bright disabled:opacity-60"
      >
        {pending ? "Opening payment…" : label}
      </button>
      {error ? (
        <p role="alert" className="mt-4 text-sm leading-relaxed text-[#f0cfc4]">
          {error}
        </p>
      ) : null}
    </div>
  );
}
