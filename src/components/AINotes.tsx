import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Sparkles, HelpCircle, Lightbulb, BookOpen, AlertTriangle, Rocket } from "lucide-react";

interface AINotesProps {
  showSummary: boolean;
  showQuiz: boolean;
}

const sections = [
  { icon: Lightbulb, title: "Core Concepts Introduced", items: ["Quantum mechanics is the study of matter and energy at the smallest scales", "Particles can behave as both waves and particles simultaneously", "The observer effect influences measurement outcomes"] },
  { icon: BookOpen, title: "Step-by-Step Explanation", items: ["Classical physics fails at atomic scales → quantum mechanics fills the gap", "Wave-particle duality demonstrated through the double-slit experiment", "Heisenberg's uncertainty principle limits precision of measurements"] },
  { icon: Rocket, title: "Real World Applications", items: ["Quantum computing and cryptography", "MRI machines and medical imaging", "Semiconductor design and electronics"] },
  { icon: AlertTriangle, title: "Clarification of Misconceptions", items: ["Quantum effects don't apply to everyday objects", "Schrödinger's cat is a thought experiment, not literal", "Observation doesn't require consciousness"] },
];

const quizQuestions = [
  { q: "What is the principle that states you cannot simultaneously know a particle's exact position and momentum?", a: "Heisenberg's Uncertainty Principle" },
  { q: "What experiment demonstrates wave-particle duality?", a: "The Double-Slit Experiment" },
  { q: "What branch of physics deals with the behavior of matter at atomic scales?", a: "Quantum Mechanics" },
];

const AINotes = ({ showSummary, showQuiz }: AINotesProps) => {
  const [expandedSection, setExpandedSection] = useState<number | null>(0);
  const [showAnswers, setShowAnswers] = useState<Record<number, boolean>>({});

  if (!showSummary && !showQuiz) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", duration: 0.5, bounce: 0 }}
      className="bg-card rounded-2xl shadow-card p-6 mt-6"
    >
      <div className="flex items-center gap-2 mb-5">
        <Sparkles className="w-5 h-5 text-primary" />
        <h2 className="font-bold text-lg">AI Study Notes</h2>
      </div>

      {showSummary && (
        <div className="space-y-3">
          {sections.map((section, i) => (
            <div key={i} className="rounded-xl bg-muted/50 overflow-hidden">
              <button
                onClick={() => setExpandedSection(expandedSection === i ? null : i)}
                className="w-full flex items-center justify-between p-4 hover:bg-muted transition-colors"
              >
                <div className="flex items-center gap-3">
                  <section.icon className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">{section.title}</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-muted-foreground transition-transform ${expandedSection === i ? "rotate-180" : ""}`}
                />
              </button>
              <AnimatePresence>
                {expandedSection === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <ul className="px-4 pb-4 space-y-2">
                      {section.items.map((item, j) => (
                        <li key={j} className="text-sm text-muted-foreground flex gap-2">
                          <span className="text-primary mt-1">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      )}

      {showQuiz && (
        <div className="space-y-4 mt-4">
          <div className="flex items-center gap-2 mb-2">
            <HelpCircle className="w-4 h-4 text-primary" />
            <h3 className="font-bold text-sm">Practice Questions</h3>
          </div>
          {quizQuestions.map((q, i) => (
            <div key={i} className="rounded-xl bg-muted/50 p-4">
              <p className="text-sm font-medium mb-2">
                {i + 1}. {q.q}
              </p>
              <button
                onClick={() => setShowAnswers({ ...showAnswers, [i]: !showAnswers[i] })}
                className="text-xs text-primary font-medium hover:underline"
              >
                {showAnswers[i] ? "Hide Answer" : "Show Answer"}
              </button>
              <AnimatePresence>
                {showAnswers[i] && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-sm text-primary mt-2 font-medium"
                  >
                    {q.a}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default AINotes;
