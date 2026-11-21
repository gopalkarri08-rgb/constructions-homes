"use client";

import Link from "next/link";
import { useActionState } from "react";
import { saveProject } from "@/lib/project-actions";

const fieldClass =
  "mt-2 h-12 w-full rounded-lg border border-line bg-ink px-3.5 text-base text-cream outline-none placeholder:text-[#9c9284] focus:border-gold/70";

function Field({ label, children, hint }) {
  return (
    <label className="block">
      <span className="text-sm text-cream">{label}</span>
      {children}
      {hint ? <span className="mt-1.5 block text-sm leading-6 text-cream-dim">{hint}</span> : null}
    </label>
  );
}

export default function ProjectForm({
  initial,
  states,
  floors,
  buildTypes,
  budgets,
  stages,
  nextPath,
}) {
  const [state, action, pending] = useActionState(saveProject, null);
  const house = initial || {};

  return (
    <form action={action} className="space-y-5">
      <input type="hidden" name="next" value={nextPath || "/dashboard"} />
      <Field label="House name" hint="A name you will recognise. The plot address is fine.">
        <input
          className={fieldClass}
          name="name"
          required
          minLength={2}
          maxLength={80}
          defaultValue={house.name || ""}
          autoComplete="off"
        />
      </Field>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="City or town">
          <input
            className={fieldClass}
            name="city"
            required
            minLength={2}
            maxLength={60}
            defaultValue={house.city || ""}
            autoComplete="address-level2"
          />
        </Field>
        <Field label="State">
          <select className={fieldClass} name="state" required defaultValue={house.state || ""}>
            <option value="">Choose</option>
            {states.map((stateName) => (
              <option key={stateName} value={stateName}>
                {stateName}
              </option>
            ))}
          </select>
        </Field>
      </div>
      <Field label="Plot size" hint="Square feet. Leave blank if you do not know it yet.">
        <input
          className={fieldClass}
          name="plot_size_sqft"
          inputMode="numeric"
          min={100}
          max={100000}
          defaultValue={house.plot_size_sqft ?? ""}
          placeholder="1200"
        />
      </Field>
      <fieldset>
        <legend className="text-sm text-cream">Floors</legend>
        <div className="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-5">
          {floors.map((floor) => (
            <label
              key={floor}
              className="flex h-12 cursor-pointer items-center justify-center rounded-lg border border-line bg-ink text-sm text-cream has-[:checked]:border-gold has-[:checked]:text-gold"
            >
              <input
                className="sr-only"
                type="radio"
                name="floors"
                value={floor}
                defaultChecked={house.floors === floor}
                required
              />
              {floor}
            </label>
          ))}
        </div>
      </fieldset>
      <fieldset>
        <legend className="text-sm text-cream">What are you building?</legend>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          {buildTypes.map((type) => (
            <label
              key={type.id}
              className="flex h-12 cursor-pointer items-center justify-center rounded-lg border border-line bg-ink text-sm text-cream has-[:checked]:border-gold has-[:checked]:text-gold"
            >
              <input
                className="sr-only"
                type="radio"
                name="construction_type"
                value={type.id}
                defaultChecked={house.construction_type === type.id}
                required
              />
              {type.label}
            </label>
          ))}
        </div>
      </fieldset>
      <Field label="Where the work is now" hint="Optional. We use this only as a reminder.">
        <select
          className={fieldClass}
          name="current_stage_slug"
          defaultValue={house.current_stage_slug || ""}
        >
          <option value="">Not started</option>
          {stages.map((stage) => (
            <option key={stage.slug} value={stage.slug}>
              {stage.title}
            </option>
          ))}
        </select>
      </Field>
      <fieldset>
        <legend className="text-sm text-cream">Budget preference</legend>
        <div className="mt-2 space-y-2">
          {budgets.map((budget) => (
            <label
              key={budget.id}
              className="flex cursor-pointer gap-3 rounded-lg border border-line bg-ink px-4 py-3 has-[:checked]:border-gold"
            >
              <input
                className="mt-1"
                type="radio"
                name="budget_preference"
                value={budget.id}
                defaultChecked={house.budget_preference === budget.id}
                required
              />
              <span>
                <span className="block text-sm text-cream">{budget.label}</span>
                <span className="mt-0.5 block text-sm leading-6 text-cream-dim">{budget.hint}</span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>
      <Field label="Rough budget" hint="Rupees for the whole house. Leave blank if you are not sure.">
        <input
          className={fieldClass}
          name="budget_inr"
          inputMode="numeric"
          min={100000}
          defaultValue={house.budget_inr ?? ""}
          placeholder="4500000"
        />
      </Field>
      {state?.error ? (
        <p role="alert" className="text-sm leading-relaxed text-[#f0cfc4]">
          {state.error}
        </p>
      ) : null}
      <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex h-12 items-center justify-center rounded-full bg-cream px-6 text-sm font-medium text-ink hover:bg-gold-bright disabled:opacity-60"
        >
          {pending ? "Saving…" : "Save the house"}
        </button>
        <Link href="/dashboard?later=1" className="text-sm text-cream-dim hover:text-cream">
          I will add this later
        </Link>
      </div>
    </form>
  );
}
