"use server";

import { redirect } from "next/navigation";
import { isStageSlug } from "@/data/stages-public";
import {
  BUDGETS,
  BUILD_TYPES,
  FLOORS,
  INDIAN_STATES,
} from "@/lib/project-options";
import { safeNext } from "@/lib/safe-next";
import { getViewer } from "@/lib/session";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

function text(formData, key, max) {
  return String(formData.get(key) || "")
    .trim()
    .slice(0, max);
}

function optionalInt(raw, min, max) {
  const value = String(raw || "").trim().replace(/,/g, "");
  if (!value) return { value: null };
  if (!/^\d+$/.test(value)) return { error: "Use a whole number, or leave it blank." };
  const amount = Number(value);
  if (amount < min || amount > max) return { error: "That number is outside the range we can save." };
  return { value: amount };
}

function readProject(formData) {
  const name = text(formData, "name", 80);
  const city = text(formData, "city", 60);
  const state = text(formData, "state", 40);
  const floors = text(formData, "floors", 8);
  const constructionType = text(formData, "construction_type", 20);
  const budgetPreference = text(formData, "budget_preference", 20);
  const stage = text(formData, "current_stage_slug", 80);

  if (name.length < 2) return { error: "Give the house a short name." };
  if (city.length < 2) return { error: "Add the city or town." };
  if (!INDIAN_STATES.includes(state)) return { error: "Choose the state." };
  if (!FLOORS.includes(floors)) return { error: "Choose how many floors." };
  if (!BUILD_TYPES.some((item) => item.id === constructionType)) {
    return { error: "Choose a new house or a renovation." };
  }
  if (!BUDGETS.some((item) => item.id === budgetPreference)) {
    return { error: "Choose Economy, Standard, or Premium." };
  }
  if (stage && !isStageSlug(stage)) return { error: "Choose a stage from the list." };

  const plot = optionalInt(formData.get("plot_size_sqft"), 100, 100000);
  if (plot.error) return { error: "Plot size should be between 100 and 100,000 sq ft, or blank." };
  const budget = optionalInt(formData.get("budget_inr"), 100000, 1000000000);
  if (budget.error) return { error: "Budget should be between ₹1 lakh and ₹100 crore, or blank." };

  return {
    value: {
      name,
      city,
      state,
      plot_size_sqft: plot.value,
      floors,
      construction_type: constructionType,
      current_stage_slug: stage || null,
      budget_preference: budgetPreference,
      budget_inr: budget.value,
    },
  };
}

export async function saveProject(_prev, formData) {
  if (!isSupabaseConfigured()) {
    return { error: "Accounts are not connected yet, so the house cannot be saved." };
  }

  const viewer = await getViewer();
  if (!viewer.user) return { error: "Log in to save the house." };

  const parsed = readProject(formData);
  if (parsed.error) return { error: parsed.error };

  const supabase = await createClient();
  const { error } = await supabase.from("projects").upsert(
    {
      ...parsed.value,
      user_id: viewer.user.id,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id" },
  );

  if (error) {
    if (/relation|schema cache|does not exist|42P01|PGRST205/i.test(error.message || error.code || "")) {
      return { error: "Saving a house is not ready yet. The projects table still needs to be migrated." };
    }
    return { error: "Could not save the house. Check the details and try again." };
  }

  redirect(safeNext(formData.get("next")));
}
