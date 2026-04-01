import { useState } from "react";

interface SummaryProps {
  data?: string;
}

const Summary = ({ data }: SummaryProps) => {
  const [open, setOpen] = useState<number | null>(0);

  // If data is just a string bullet points from Gemini, we can split it.
  const points = data ? data.split("\n").filter(p => p.trim()) : [];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">📘 Summary</h2>

      <div className="bg-muted/50 rounded-2xl p-4 shadow-sm">
        <ul className="space-y-2 text-sm text-muted-foreground">
          {points.map((p, idx) => (
            <li key={idx}>{p.startsWith("•") || p.startsWith("-") ? p : `• ${p}`}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Summary;