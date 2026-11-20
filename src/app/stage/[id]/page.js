const stageData = {
  "1": {
    title: "Stage 1: Structural Construction",
    description: "Foundation → Columns → Beams → Slabs",
    bestPractice: [
      "Follow soil test report and structural drawings strictly",
      "Use M25 grade concrete (or as specified by the structural engineer)",
      "Maintain proper cover to steel using cover blocks (40–50 mm in foundation)",
      "Structural engineer must inspect reinforcement before every major casting",
      "Use proper vibration during concreting to avoid honeycombing",
      "Minimum 14 days continuous curing for slabs",
      "Use reputed brand cement and Fe 550D / Fe 500D steel with test certificates",
      "Do proper anti-termite treatment at foundation level",
      "Provide proper DPC at plinth level",
    ],
    minimum: [
      "Use at least M20 concrete if allowed in the structural drawing",
      "Minimum 7–10 days curing",
      "At least one engineer visit before slab casting",
      "ISI marked cement and steel from known brands",
      "Basic cover blocks and compaction",
    ],
    checklist: [
      "Soil test report available and shared with structural engineer",
      "Excavation depth and size match the approved drawing",
      "PCC completed and levelled",
      "Reinforcement placement and spacing checked against drawing",
      "Cover blocks properly placed",
      "Shuttering is strong, aligned, and leak-proof",
      "Electrical and plumbing sleeves placed (if required)",
      "Concrete grade confirmed",
      "Curing arrangement (water, gunny bags, etc.) ready before casting",
      "Structural engineer inspection done before casting",
    ],
    redFlags: [
      "Contractor wants to reduce foundation depth",
      "No soil test or structural engineer involvement",
      "Using rusted steel",
      "Casting without proper cover blocks",
      "No proper curing plan",
      "Rushing to cast slab without inspection",
    ],
  },
};

export default async function StagePage({ params }) {
  const { id } = await params;
  const stage = stageData[id];

  if (!stage) {
    return (
      <div className="min-h-screen bg-black text-white p-8">
        <a href="/" className="text-blue-400 mb-6 inline-block">← Back to Home</a>
        <h1 className="text-3xl font-bold mb-4">Stage {id}</h1>
        <p className="text-gray-400">Detailed content for this stage is coming soon.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <a href="/" className="text-blue-400 mb-6 inline-block">← Back to Home</a>
      
      <h1 className="text-3xl font-bold mb-2">{stage.title}</h1>
      <p className="text-gray-400 mb-8">{stage.description}</p>

      <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
        <div className="border border-green-800 rounded-lg p-5">
          <h2 className="text-xl font-semibold text-green-400 mb-3">Best Practice</h2>
          <ul className="space-y-2">
            {stage.bestPractice.map((item, i) => (
              <li key={i}>• {item}</li>
            ))}
          </ul>
        </div>

        <div className="border border-yellow-800 rounded-lg p-5">
          <h2 className="text-xl font-semibold text-yellow-400 mb-3">Minimum Acceptable</h2>
          <ul className="space-y-2">
            {stage.minimum.map((item, i) => (
              <li key={i}>• {item}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 border border-gray-700 rounded-lg p-5 max-w-4xl">
        <h2 className="text-xl font-semibold mb-3">Checklist</h2>
        <ul className="space-y-2">
          {stage.checklist.map((item, i) => (
            <li key={i}>☐ {item}</li>
          ))}
        </ul>
      </div>

      <div className="mt-6 border border-red-800 rounded-lg p-5 max-w-4xl">
        <h2 className="text-xl font-semibold text-red-400 mb-3">Red Flags</h2>
        <ul className="space-y-2">
          {stage.redFlags.map((item, i) => (
            <li key={i}>⚠️ {item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}