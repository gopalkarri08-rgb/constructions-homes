"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import {
  requestPasswordReset,
  signIn,
  signUp,
  updatePassword,
} from "@/lib/auth-actions";
import { createBrowserSupabase } from "@/lib/supabase/browser";

const fieldClass =
  "mt-2 h-12 w-full rounded-lg border border-line bg-ink px-3.5 text-base text-cream outline-none placeholder:text-[#9c9284] focus:border-gold/70";

function Notice({ state }) {
  if (!state?.error && !state?.message) return null;
  return (
    <p
      role={state.error ? "alert" : "status"}
      className={`text-sm leading-relaxed ${state.error ? "text-[#f0cfc4]" : "text-cream-dim"}`}
    >
      {state.error || state.message}
    </p>
  );
}

function GoogleButton({ nextPath }) {
  const [message, setMessage] = useState("");

  async function onClick() {
    setMessage("");
    const supabase = createBrowserSupabase();
    if (!supabase) {
      setMessage("Accounts are not configured yet.");
      return;
    }

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(nextPath || "/dashboard")}`,
      },
    });

    if (!error) return;
    if (/provider|not enabled|unsupported/i.test(error.message || "")) {
      setMessage("Google sign-in is not turned on yet. Use email and password for now.");
      return;
    }
    setMessage("Google sign-in could not start. Use email and password.");
  }

  return (
    <div>
      <button
        type="button"
        onClick={onClick}
        className="inline-flex h-12 w-full items-center justify-center rounded-full border border-line text-sm text-cream hover:border-gold/40"
      >
        Continue with Google
      </button>
      {message ? (
        <p role="alert" className="mt-3 text-sm leading-relaxed text-[#f0cfc4]">
          {message}
        </p>
      ) : null}
    </div>
  );
}

export function LoginForm({ nextPath }) {
  const [state, action, pending] = useActionState(signIn, null);

  return (
    <div className="space-y-5">
      <GoogleButton nextPath={nextPath} />
      <p className="text-center text-xs uppercase tracking-[0.16em] text-cream-dim">or email</p>
      <form action={action} className="space-y-4">
        <input type="hidden" name="next" value={nextPath} />
        <div>
          <label htmlFor="email" className="text-sm text-cream">
            Email
          </label>
          <input id="email" name="email" type="email" autoComplete="email" required className={fieldClass} />
        </div>
        <div>
          <label htmlFor="password" className="text-sm text-cream">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className={fieldClass}
          />
        </div>
        <Notice state={state} />
        <button
          type="submit"
          disabled={pending}
          className="inline-flex h-12 w-full items-center justify-center rounded-full bg-cream text-sm font-medium text-ink hover:bg-gold-bright disabled:opacity-60"
        >
          {pending ? "Logging in…" : "Log in"}
        </button>
      </form>
      <p className="text-sm text-cream-dim">
        <Link href="/forgot-password" className="text-gold underline decoration-gold/40 underline-offset-4">
          Forgot password
        </Link>
        <span className="mx-2">·</span>
        <Link href={`/signup?next=${encodeURIComponent(nextPath)}`} className="hover:text-cream">
          Create an account
        </Link>
      </p>
    </div>
  );
}

export function SignupForm({ nextPath }) {
  const [state, action, pending] = useActionState(signUp, null);

  return (
    <div className="space-y-5">
      <GoogleButton nextPath={nextPath} />
      <p className="text-center text-xs uppercase tracking-[0.16em] text-cream-dim">or email</p>
      <form action={action} className="space-y-4">
        <input type="hidden" name="next" value={nextPath} />
        <div>
          <label htmlFor="name" className="text-sm text-cream">
            Name
          </label>
          <input id="name" name="name" autoComplete="name" required className={fieldClass} />
        </div>
        <div>
          <label htmlFor="location" className="text-sm text-cream">
            Location
          </label>
          <input
            id="location"
            name="location"
            autoComplete="address-level2"
            placeholder="e.g. Whitefield, Bengaluru"
            required
            className={fieldClass}
          />
          <p className="mt-2 text-sm text-cream-dim">City, or the area where the house will stand.</p>
        </div>
        <div>
          <label htmlFor="email" className="text-sm text-cream">
            Email
          </label>
          <input id="email" name="email" type="email" autoComplete="email" required className={fieldClass} />
        </div>
        <div>
          <label htmlFor="password" className="text-sm text-cream">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            minLength={8}
            required
            className={fieldClass}
          />
        </div>
        <Notice state={state} />
        <button
          type="submit"
          disabled={pending}
          className="inline-flex h-12 w-full items-center justify-center rounded-full bg-cream text-sm font-medium text-ink hover:bg-gold-bright disabled:opacity-60"
        >
          {pending ? "Creating account…" : "Sign up"}
        </button>
      </form>
      <p className="text-sm text-cream-dim">
        Already have an account?{" "}
        <Link href={`/login?next=${encodeURIComponent(nextPath)}`} className="text-cream hover:text-gold">
          Log in
        </Link>
      </p>
    </div>
  );
}

export function ForgotForm() {
  const [state, action, pending] = useActionState(requestPasswordReset, null);

  return (
    <form action={action} className="space-y-4">
      <div>
        <label htmlFor="email" className="text-sm text-cream">
          Email
        </label>
        <input id="email" name="email" type="email" autoComplete="email" required className={fieldClass} />
      </div>
      <Notice state={state} />
      <button
        type="submit"
        disabled={pending}
        className="inline-flex h-12 w-full items-center justify-center rounded-full bg-cream text-sm font-medium text-ink hover:bg-gold-bright disabled:opacity-60"
      >
        {pending ? "Sending…" : "Send reset link"}
      </button>
    </form>
  );
}

export function ResetForm() {
  const [state, action, pending] = useActionState(updatePassword, null);

  return (
    <form action={action} className="space-y-4">
      <div>
        <label htmlFor="password" className="text-sm text-cream">
          New password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          minLength={8}
          required
          className={fieldClass}
        />
      </div>
      <div>
        <label htmlFor="confirm" className="text-sm text-cream">
          Confirm password
        </label>
        <input
          id="confirm"
          name="confirm"
          type="password"
          autoComplete="new-password"
          minLength={8}
          required
          className={fieldClass}
        />
      </div>
      <Notice state={state} />
      <button
        type="submit"
        disabled={pending}
        className="inline-flex h-12 w-full items-center justify-center rounded-full bg-cream text-sm font-medium text-ink hover:bg-gold-bright disabled:opacity-60"
      >
        {pending ? "Saving…" : "Save password"}
      </button>
    </form>
  );
}
