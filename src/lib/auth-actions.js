"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { safeNext } from "@/lib/safe-next";

async function origin() {
  const headerStore = await headers();
  return headerStore.get("origin") || "http://localhost:3000";
}

function authError(error) {
  const message = error?.message || "";
  if (/already registered|already exists/i.test(message)) {
    return "An account with this email already exists. Log in instead.";
  }
  if (/invalid login|invalid credentials/i.test(message)) {
    return "Those details did not match. Check the email and password, or reset it.";
  }
  if (/password/i.test(message) && /weak|short|least/i.test(message)) {
    return "Use a password of at least 8 characters.";
  }
  return "That did not work. Try again in a moment.";
}

export async function signUp(_prev, formData) {
  if (!isSupabaseConfigured()) {
    return { error: "Accounts are not configured yet." };
  }

  const name = String(formData.get("name") || "").trim();
  const location = String(formData.get("location") || "").trim();
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");
  const next = safeNext(formData.get("next"));

  if (!name || !location) {
    return { error: "Add your name and the place where the house will stand." };
  }
  if (!email.includes("@")) {
    return { error: "Enter the email you want on this account." };
  }
  if (password.length < 8) {
    return { error: "Use a password of at least 8 characters." };
  }

  const supabase = await createClient();
  const site = await origin();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${site}/auth/callback?next=${encodeURIComponent(next)}`,
      data: { name, location },
    },
  });

  if (error) return { error: authError(error) };
  if (data.session) redirect(next);
  return {
    message:
      "Check your email to confirm the account. The link brings you back to the guide.",
  };
}

export async function signIn(_prev, formData) {
  if (!isSupabaseConfigured()) {
    return { error: "Accounts are not configured yet." };
  }

  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");
  const next = safeNext(formData.get("next"));

  if (!email || !password) {
    return { error: "Enter your email and password." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { error: authError(error) };
  redirect(next);
}

export async function requestPasswordReset(_prev, formData) {
  if (!isSupabaseConfigured()) {
    return { error: "Accounts are not configured yet." };
  }

  const email = String(formData.get("email") || "").trim().toLowerCase();
  if (!email.includes("@")) {
    return { error: "Enter the email on the account." };
  }

  const supabase = await createClient();
  const site = await origin();
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${site}/auth/callback?next=/reset-password`,
  });

  if (error) return { error: "The reset email could not be sent. Try again in a moment." };
  return {
    message: "If an account exists for that email, a reset link is on its way.",
  };
}

export async function updatePassword(_prev, formData) {
  if (!isSupabaseConfigured()) {
    return { error: "Accounts are not configured yet." };
  }

  const password = String(formData.get("password") || "");
  const confirm = String(formData.get("confirm") || "");
  if (password.length < 8) return { error: "Use a password of at least 8 characters." };
  if (password !== confirm) return { error: "The two passwords do not match." };

  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({ password });
  if (error) return { error: "The password could not be changed. Request a new reset link." };
  redirect("/account");
}

export async function signOut() {
  const supabase = await createClient();
  if (supabase) await supabase.auth.signOut();
  redirect("/");
}
