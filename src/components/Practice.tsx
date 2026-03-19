import { useState } from "react";

const questions = [
  {
    q: "What is uncertainty principle?",
    a: "You cannot measure position and momentum together."
  },
  {
    q: "What experiment shows wave duality?",
    a: "Double slit experiment"
  }
];

const Practice = () => {
  const [show, setShow] = useState<{ [key: number]: boolean }>({});

  return (
    <div className="space-y-4">
      
      <h2 className="text-xl font-semibold">📝 Practice Questions</h2>

      {questions.map((q, i) => (
        <div
          key={i}
          className="bg-muted/50 rounded-2xl p-4 shadow-sm"
        >
          <p className="font-medium text-sm">
            {i + 1}. {q.q}
          </p>

          <button
            onClick={() => setShow({ ...show, [i]: !show[i] })}
            className="text-primary text-xs mt-2"
          >
            {show[i] ? "Hide Answer" : "Show Answer"}
          </button>

          {show[i] && (
            <p className="mt-2 text-sm text-green-600">
              {q.a}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default Practice;