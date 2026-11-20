import Link from "next/link";

export default function Home() {
  const stages = [
    { id: 1, name: "Stage 1: Structural Construction" },
    { id: 2, name: "Stage 2: Masonry + Concealed Services" },
    { id: 3, name: "Stage 3: Plastering" },
    { id: 4, name: "Stage 4: Flooring / Tiles" },
    { id: 5, name: "Stage 5: Doors & Windows" },
    { id: 6, name: "Stage 6: Interior Woodwork" },
    { id: 7, name: "Stage 7: Painting" },
    { id: 8, name: "Stage 8: Final Fittings & Handover" },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-bold mb-2">Constructions.homes</h1>
      <p className="text-gray-400 mb-8">Your home construction guidance platform</p>

      <div className="grid gap-4 max-w-2xl">
        {stages.map((stage) => (
          <Link key={stage.id} href={`/stage/${stage.id}`}>
            <div className="border border-gray-700 rounded-lg p-4 hover:bg-gray-900 cursor-pointer">
              {stage.name}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}