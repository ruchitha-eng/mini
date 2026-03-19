import { useState } from "react";

const quizData = [
  {
    question: "What is quantum mechanics?",
    options: [
      "Study of large objects",
      "Study of small particles",
      "Study of plants"
    ],
    answer: 1
  },
  {
    question: "Which experiment shows duality?",
    options: [
      "Gravity experiment",
      "Double slit experiment",
      "DNA test"
    ],
    answer: 1
  }
];

const MCQQuiz = () => {
  const [selected, setSelected] = useState<number[]>([]);
  const [score, setScore] = useState<number | null>(null);
const [isSubmitted, setIsSubmitted] = useState(false);
  const handleSubmit = () => {
    let s = 0;
    quizData.forEach((q, i) => {
      if (selected[i] === q.answer) s++;
    });
    setScore(s);
    setIsSubmitted(true);
  };

  return (
    <div className="space-y-5">

      <h2 className="text-xl font-semibold">🧠 MCQ Quiz</h2>

      {quizData.map((q, i) => (
        <div
          key={i}
          className="bg-muted/50 rounded-2xl p-4 shadow-sm"
        >
          <p className="font-medium text-sm mb-3">
            {i + 1}. {q.question}
          </p>

          <div className="space-y-2">
            {q.options.map((opt, idx) => (
              <label
                key={idx}
                className="flex items-center gap-2 text-sm cursor-pointer"
              >
                <input
                  type="radio"
                  name={`q-${i}`}
                  onChange={() => {
                    if (isSubmitted) return;
                    const arr = [...selected];
                    arr[i] = idx;
                    setSelected(arr);
                  }}
                  disabled={isSubmitted}
                />
                {opt}
              </label>
            ))}
          </div>
        </div>
      ))}

      <button
        onClick={handleSubmit}
        className="bg-primary text-white px-5 py-2 rounded-xl" disabled={isSubmitted}
      >
        Submit Quiz
      </button>

      {score !== null && (
        <div className="bg-green-100 text-green-700 p-3 rounded-xl text-sm font-medium">
          Your Score: {score}/{quizData.length}
        </div>
      )}
    </div>
  );
};

export default MCQQuiz;