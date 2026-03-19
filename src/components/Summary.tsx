import { useState } from "react";

const sections = [
  {
    title: "Core Concepts",
    points: [
      "Quantum mechanics studies matter at small scales",
      "Wave-particle duality",
      "Observer effect"
    ]
  },
  {
    title: "Applications",
    points: [
      "Quantum computing",
      "Cryptography",
      "Semiconductors"
    ]
  }
];

const Summary = () => {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="space-y-4">
      
      <h2 className="text-xl font-semibold">📘 Summary</h2>

      {sections.map((sec, i) => (
        <div
          key={i}
          className="bg-muted/50 rounded-2xl p-4 shadow-sm"
        >
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full text-left font-medium"
          >
            {sec.title}
          </button>

          {open === i && (
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {sec.points.map((p, idx) => (
                <li key={idx}>• {p}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default Summary;