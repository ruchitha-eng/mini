import { useState } from "react";
import VideoPlayer from "@/components/VideoPlayer";
import NotesPanel from "@/components/NotesPanel";
import AINotes from "@/components/AINotes";

const HomePage = () => {
  const [showSummary, setShowSummary] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 pb-24 md:pb-8">
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
        {/* Left: Video + AI Notes */}
        <div>
          <VideoPlayer
            onGenerateSummary={() => setShowSummary(true)}
            onGenerateQuiz={() => setShowQuiz(true)}
          />
          <AINotes showSummary={showSummary} showQuiz={showQuiz} />
        </div>

        {/* Right: Notes Panel */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <NotesPanel />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
