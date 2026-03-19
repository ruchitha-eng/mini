import Summary from "./Summary";
import Practice from "./Practice";
import MCQQuiz from "./Mcqquiz";

interface AINotesProps {
  activeTab: string;
}

const AINotes = ({ activeTab }: AINotesProps) => {
  return (
    <div className="bg-card rounded-2xl shadow-card p-6 mt-6">
      
      {activeTab === "summary" && <Summary />}
      
      {activeTab === "practice" && <Practice />}
      
      {activeTab === "mcq" && <MCQQuiz />}
    
    </div>
  );
};

export default AINotes;
