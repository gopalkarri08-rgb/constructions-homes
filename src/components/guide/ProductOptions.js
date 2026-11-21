import Link from "next/link";
import { PRODUCT_DISCLAIMER, categoriesForItem } from "@/content/products";
import { sampleLocalPrice } from "@/lib/prices/indiamart";
import { budgetLabel, formatInr } from "@/lib/project-options";

const TIER_LABEL = {
  economy: "Economy",
  standard: "Standard",
  premium: "Premium",
};

export default function ProductOptions({ itemSlug, project }) {
  const categories = categoriesForItem(itemSlug);
  if (categories.length === 0) return null;

  const tier = project?.budget_preference || "";
  const tierName = budgetLabel(tier);

  return (
    <section className="rounded-lg border border-line bg-ink-soft px-5 py-5" aria-labelledby="product-options">
      <h2 id="product-options" className="font-display text-2xl font-semibold text-cream">
        Product options
      </h2>
      <p className="mt-3 text-base leading-7 text-cream-dim">
        {tierName
          ? `Widely sold options for this purchase. Your budget preference is ${tierName}, so those are marked.`
          : "Widely sold options for this purchase, grouped by budget."}{" "}
        {!project ? (
          <Link href="/project" className="text-gold">
            Add your house
          </Link>
        ) : null}
        {!project ? " to mark a tier and see a sample price for your city." : null}
      </p>
      <div className="mt-6 space-y-8">
        {categories.map((category) => {
          const price = sampleLocalPrice({ categoryId: category.id, city: project?.city });
          return (
            <div key={category.id}>
              <h3 className="font-display text-xl font-semibold text-cream">{category.title}</h3>
              <p className="mt-2 text-sm leading-6 text-cream">{category.buy}</p>
              <p className="mt-1 text-sm leading-6 text-cream-dim">{category.standard}</p>
              <ul className="mt-4 space-y-3">
                {category.brands.map((entry) => {
                  const fits = Boolean(tier) && entry.tier === tier;
                  return (
                    <li
                      key={entry.name}
                      className={`rounded-lg border px-4 py-4 ${
                        fits ? "border-gold bg-ink" : "border-line bg-ink"
                      }`}
                    >
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full border border-line px-2 py-0.5 text-[0.65rem] uppercase tracking-[0.14em] text-cream-dim">
                          {TIER_LABEL[entry.tier]}
                        </span>
                        {fits ? (
                          <span className="text-[0.65rem] uppercase tracking-[0.14em] text-gold">
                            Fits your {tierName} budget
                          </span>
                        ) : null}
                      </div>
                      <p className="mt-2 font-display text-xl text-cream">{entry.name}</p>
                      <p className="mt-1 text-sm leading-6 text-cream">{entry.grade}</p>
                      <p className="text-sm leading-6 text-cream-dim">{entry.standard}</p>
                      <p className="mt-2 text-sm leading-6 text-cream-dim">{entry.warranty}</p>
                      <ul className="mt-2 space-y-1">
                        {entry.features.map((feature) => (
                          <li key={feature} className="text-sm leading-6 text-cream">
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </li>
                  );
                })}
              </ul>
              {price ? (
                <div className="mt-4 rounded-lg border border-gold/40 px-4 py-4">
                  <p className="text-[0.72rem] uppercase tracking-[0.16em] text-gold">Sample local prices</p>
                  <p className="mt-2 text-base text-cream">
                    About {formatInr(price.low)}–{formatInr(price.high)} per {price.unit}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-cream-dim">
                    {price.knownCity
                      ? `Sample range adjusted for ${price.city}.`
                      : `Sample range for a typical Indian city. We do not have a local adjustment for ${price.city} yet.`}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-cream">{price.disclaimer}</p>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
      <p className="mt-6 border-t border-line pt-4 text-sm leading-6 text-cream-dim">{PRODUCT_DISCLAIMER}</p>
    </section>
  );
}
