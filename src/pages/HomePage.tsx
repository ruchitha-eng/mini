import { useState } from "react";
import VideoPlayer from "@/components/VideoPlayer";
import NotesPanel from "@/components/NotesPanel";
import AINotes from "@/components/AINotes";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button";
import { FileText, HelpCircle } from "lucide-react";

const HomePage = () => {

  const [videoId, setVideoId] = useState<string | null>(null);
  
  const [activeTab, setActiveTab] = useState("");

  const handleGenerateNotes = () => {
  setActiveTab("notes");
};

const handleGenerateQuiz = () => {
  setActiveTab("practice");   // your existing quiz
};

const handleGenerateMCQ = () => {
  setActiveTab("mcq");        // new MCQ quiz
};

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 pb-24 md:pb-8">

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">

        {/* LEFT SIDE */}
        <div>

          {/* Video Section */}
          <AnimatePresence>
            {videoId && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-6"
              >
                <div className="aspect-video rounded-xl overflow-hidden shadow-card bg-card">
                  <iframe
                    src={`https://www.youtube.com/embed/${videoId}`}
                    className="w-full h-full"
                    allowFullScreen
                    title="YouTube Video"
                  />
                </div>

                <div className="flex gap-3 mt-4">

                  <Button
                    onClick={handleGenerateNotes}
                    variant={activeTab === "notes" ? "default" : "outline"}
                  >
                    <FileText className="w-4 h-4 mr-1" />
                    Generate Notes
                  </Button>

                  
                  <Button
                    onClick={handleGenerateQuiz}
                    variant={activeTab === "quiz" ? "default" : "outline"}
                  >
                    <HelpCircle className="w-4 h-4 mr-1" />
                    Generate Practice Questions
                  </Button>

                </div>
              </motion.div>
            )}
          </AnimatePresence>
            <VideoPlayer
      onGenerateSummary={() => setActiveTab("summary")}
       onGenerateQuiz={() => setActiveTab("practice")}
        onGenerateMCQ={() => setActiveTab("mcq")}   // ✅ ADD THIS
        />
          <AINotes activeTab={activeTab} />

        </div>

        {/* RIGHT SIDE */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <NotesPanel />
        </div>

      </div>
    </div>
  );
};

export default HomePage;
