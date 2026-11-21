export const FLOORS = ["G", "G+1", "G+2", "G+3", "G+4"];

export const BUILD_TYPES = [
  { id: "new_house", label: "New house" },
  { id: "renovation", label: "Renovation" },
];

export const BUDGETS = [
  { id: "economy", label: "Economy", hint: "Sensible known brands. Fewer finishes." },
  { id: "standard", label: "Standard", hint: "National brands most houses use." },
  { id: "premium", label: "Premium", hint: "Higher published grades, where the maker offers them." },
];

export const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

export function budgetLabel(id) {
  return BUDGETS.find((item) => item.id === id)?.label || "";
}

export function buildTypeLabel(id) {
  return BUILD_TYPES.find((item) => item.id === id)?.label || "";
}

export function projectLine(project) {
  if (!project?.city || !project?.floors || !project?.budget_preference) return "";
  const tier = budgetLabel(project.budget_preference);
  const kind = project.construction_type === "renovation" ? " renovation" : "";
  return `For your ${project.floors}${kind} in ${project.city}, ${tier} budget.`;
}

export function formatInr(value) {
  const amount = Number(value);
  if (!Number.isFinite(amount)) return "";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}
