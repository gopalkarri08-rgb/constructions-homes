"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/**
 * PLACEHOLDER: Create Project has no backend.
 * This form does not call an API, create an account, or save a project.
 * Submitting only keeps the name and location in component state and shows
 * a confirmation. Replace this when accounts and persistence are added.
 */
export default function CreateProjectForm() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");
  const [project, setProject] = useState(null);
  const confirmRef = useRef(null);

  useEffect(() => {
    if (project) confirmRef.current?.focus();
  }, [project]);

  function onSubmit(event) {
    event.preventDefault();
    const nextName = name.trim();
    const nextLocation = location.trim();

    if (!nextName || !nextLocation) {
      setError("Add a project name and a location to continue.");
      return;
    }

    setError("");
    setProject({ name: nextName, location: nextLocation });
  }

  if (project) {
    return (
      <div className="rounded-lg border border-line bg-ink-soft p-6 sm:p-8">
        <p className="text-[0.68rem] uppercase tracking-[0.18em] text-gold">
          Project noted
        </p>
        <h2
          ref={confirmRef}
          tabIndex={-1}
          className="mt-3 font-display text-4xl font-semibold tracking-[-0.02em] text-cream outline-none"
        >
          {project.name}
        </h2>
        <p className="mt-2 text-cream-dim">{project.location}</p>
        <p className="mt-5 text-base leading-relaxed text-cream-dim">
          Nothing has been saved to an account. This form is a placeholder
          until projects can be stored. The guidance is ready to use now.
        </p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/stage/1"
            className="inline-flex h-12 items-center justify-center rounded-full bg-cream px-5 text-sm font-medium text-ink hover:bg-gold-bright"
          >
            Start with structural construction
          </Link>
          <Link
            href="/#journey"
            className="inline-flex h-12 items-center justify-center rounded-full border border-line px-5 text-sm text-cream hover:border-gold/40"
          >
            All stages
          </Link>
        </div>
        <button
          type="button"
          onClick={() => setProject(null)}
          className="mt-5 text-sm text-cream-dim underline decoration-line underline-offset-4 hover:text-cream"
        >
          Use a different name
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-lg border border-line bg-ink-soft p-6 sm:p-8"
    >
      <h2 className="font-display text-3xl font-semibold tracking-[-0.02em] text-cream">
        Create Project
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-cream-dim">
        A name and a place, so this guidance has a house attached to it.
        Nothing is sent to a server. Saving comes in a later release.
      </p>
      <div className="mt-6 space-y-5">
        <div>
          <label htmlFor="project-name" className="text-sm text-cream">
            Project name
          </label>
          <input
            id="project-name"
            name="projectName"
            value={name}
            onChange={(event) => setName(event.target.value)}
            autoComplete="off"
            placeholder="e.g. Whitefield house"
            aria-invalid={error ? true : undefined}
            className="mt-2 h-12 w-full rounded-lg border border-line bg-ink px-3.5 text-base text-cream outline-none placeholder:text-[#9c9284] focus:border-gold/70"
          />
        </div>
        <div>
          <label htmlFor="project-location" className="text-sm text-cream">
            Location
          </label>
          <input
            id="project-location"
            name="location"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            autoComplete="address-level2"
            placeholder="e.g. Whitefield, Bengaluru"
            aria-invalid={error ? true : undefined}
            className="mt-2 h-12 w-full rounded-lg border border-line bg-ink px-3.5 text-base text-cream outline-none placeholder:text-[#9c9284] focus:border-gold/70"
          />
          <p className="mt-2 text-sm text-cream-dim">
            City, or the area where the house will stand.
          </p>
        </div>
      </div>
      {error ? (
        <p role="alert" className="mt-4 text-sm text-[#f0cfc4]">
          {error}
        </p>
      ) : null}
      <button
        type="submit"
        className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-full bg-cream text-sm font-medium text-ink transition hover:bg-gold-bright sm:w-auto sm:px-6"
      >
        Create Project
      </button>
    </form>
  );
}
