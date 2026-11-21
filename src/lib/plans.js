export const PLANS = {
  full_pass: {
    id: "full_pass",
    name: "Full Project Pass",
    priceInr: 6999,
    amountPaise: 699900,
    cadence: "12 months",
    summary: "All 8 stages, for a year.",
    recommended: true,
  },
  monthly: {
    id: "monthly",
    name: "Monthly",
    priceInr: 999,
    amountPaise: 99900,
    cadence: "per month",
    summary: "All stages. Cancel anytime.",
    recommended: false,
  },
  stage: {
    id: "stage",
    name: "Stage-wise",
    priceInr: 899,
    amountPaise: 89900,
    cadence: "per stage",
    summary: "4 months of access to the stage you choose.",
    recommended: false,
  },
};

export function isPlanId(value) {
  return value === "full_pass" || value === "monthly" || value === "stage";
}

export function formatInr(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatWhen(iso) {
  if (!iso) return null;
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return null;
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

export function addMonths(date, months) {
  const next = new Date(date.getTime());
  next.setMonth(next.getMonth() + months);
  return next;
}
