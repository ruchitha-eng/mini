import { useState, useEffect } from "react";
import VideoPlayer from "@/components/VideoPlayer";
import NotesPanel from "@/components/NotesPanel";
import AINotes from "@/components/AINotes";
import { motion, AnimatePresence } from "framer-motion";

interface LearningData {
  summary?: string;
  practiceQuestions?: string[];
  quiz?: Array<{ question: string; options: string[]; answer: string }>;
  notes?: Array<{ time: string; text: string }>;
}

const HomePage = () => {
  const [activeTab, setActiveTab] = useState(() => localStorage.getItem("activeTab") || "");
  const [learningData, setLearningData] = useState<LearningData | undefined>(() => {
    const saved = localStorage.getItem("learningData");
    return saved ? JSON.parse(saved) : undefined;
  });
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (learningData) {
      localStorage.setItem("learningData", JSON.stringify(learningData));
    }
    localStorage.setItem("activeTab", activeTab);
  }, [learningData, activeTab]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 pb-24 md:pb-8">
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">

        {/* LEFT SIDE */}
        <div>
          <VideoPlayer
            onGenerateSummary={() => setActiveTab("summary")}
            onGenerateQuiz={() => setActiveTab("practice")}
            onGenerateMCQ={() => setActiveTab("mcq")}
            setActiveTab={setActiveTab}
            onDataGenerated={(data) => setLearningData(data)}
            setIsGenerating={setIsGenerating}
          />

          <AnimatePresence>
            {activeTab && (
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
              >
                <AINotes 
                  activeTab={activeTab} 
                  learningData={learningData} 
                  isGenerating={isGenerating}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* RIGHT SIDE */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <NotesPanel notes={learningData?.notes} />
        </div>

      </div>
    </div>
  );
};

export default HomePage;
