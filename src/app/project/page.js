import { redirect } from "next/navigation";
import Container from "@/components/Container";
import ProjectForm from "@/components/ProjectForm";
import { publicStages } from "@/data/stages-public";
import { pageMeta } from "@/lib/meta";
import {
  BUDGETS,
  BUILD_TYPES,
  FLOORS,
  INDIAN_STATES,
  getProject,
} from "@/lib/project";
import { safeNext } from "@/lib/safe-next";
import { getViewer } from "@/lib/session";

export const metadata = pageMeta({
  title: "Your house",
  description: "Save the city, floors, and budget so product options match this house.",
  path: "/project",
});

export default async function ProjectPage({ searchParams }) {
  const viewer = await getViewer();
  if (!viewer.configured) {
    return (
      <Container className="py-16">
        <h1 className="font-display text-4xl font-semibold text-cream">Your house</h1>
        <p className="mt-4 max-w-lg text-cream-dim">
          Accounts are not connected yet. Add the Supabase keys before saving a house.
        </p>
      </Container>
    );
  }
  if (!viewer.user) redirect("/login?next=/project");

  const params = await searchParams;
  const nextPath = safeNext(params.next);
  const { project } = await getProject(viewer.user.id);
  const editing = Boolean(project);

  return (
    <Container className="py-12 sm:py-16">
      <div className="mx-auto max-w-xl">
        <p className="text-[0.72rem] uppercase tracking-[0.2em] text-gold">Your house</p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-[-0.03em] text-cream sm:text-5xl">
          {editing ? "Edit the house" : "Tell us about the house"}
        </h1>
        <p className="mt-4 text-base leading-7 text-cream-dim">
          {editing
            ? "Change any of this. Product options on material steps follow the city and the budget preference."
            : "A short picture of the house. We use the city and budget preference to mark product options. You can change this later."}
        </p>
        <div className="mt-8">
          <ProjectForm
            initial={project}
            states={INDIAN_STATES}
            floors={FLOORS}
            buildTypes={BUILD_TYPES}
            budgets={BUDGETS}
            stages={publicStages.map((stage) => ({ slug: stage.slug, title: stage.title }))}
            nextPath={nextPath}
          />
        </div>
      </div>
    </Container>
  );
}
