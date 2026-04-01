import Summary from "./Summary";
import Practice from "./Practice";
import MCQQuiz from "./Mcqquiz";

interface QuizItem {
  question: string;
  options: string[];
  answer: string;
}

interface LearningData {
  summary?: string;
  practiceQuestions?: string[];
  quiz?: QuizItem[];
  notes?: Array<{ time: string; text: string }>;
}

interface AINotesProps {
  activeTab: string;
  learningData?: LearningData;
  isGenerating: boolean;
}

const Skeleton = () => (
  <div className="animate-pulse space-y-4">
    <div className="h-6 w-1/3 bg-muted rounded-full mb-4" />
    <div className="space-y-2">
      <div className="h-4 w-full bg-muted rounded-full" />
      <div className="h-4 w-5/6 bg-muted rounded-full" />
      <div className="h-4 w-4/6 bg-muted rounded-full" />
    </div>
    <div className="pt-6 space-y-4">
      <div className="h-20 w-full bg-muted rounded-2xl" />
      <div className="h-20 w-full bg-muted rounded-2xl" />
    </div>
  </div>
);

const AINotes = ({ activeTab, learningData, isGenerating }: AINotesProps) => {
  if (isGenerating) {
    return (
      <div className="bg-card rounded-2xl shadow-card p-6 mt-6 border border-border/50">
        <Skeleton />
      </div>
    );
  }

  if (!learningData) {
    return (
      <div className="bg-card rounded-2xl shadow-card p-8 mt-6 border border-border/50 text-center text-muted-foreground">
        <p className="text-sm">Enter a video URL above and click Load to generate AI insights!</p>
      </div>
    );
  }

  // Map practiceQuestions (strings) to the format Practice expects
  const practiceData = learningData?.practiceQuestions?.map((q) => ({ q, a: "" }));

  return (
    <div className="bg-card rounded-2xl shadow-card p-6 mt-6 border border-border/50">
      {activeTab === "summary" && <Summary data={learningData?.summary} />}
      {activeTab === "practice" && <Practice data={practiceData} />}
      {activeTab === "mcq" && <MCQQuiz data={learningData?.quiz} />}
    </div>
  );
};

export default AINotes;
