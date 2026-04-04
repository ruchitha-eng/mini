import { useState } from "react";
import { Play, Sparkles, HelpCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface LearningData {
  summary?: string;
  practiceQuestions?: string[];
  quiz?: Array<{ question: string; options: string[]; answer: string }>;
  notes?: Array<{ time: string; text: string }>;
}

interface VideoPlayerProps {
  onGenerateSummary: () => void;
  onGenerateQuiz: () => void;
  onGenerateMCQ: () => void;
  setActiveTab: (tab: string) => void;
  onDataGenerated: (data: LearningData) => void;
  setIsGenerating: (generating: boolean) => void;
}

const extractVideoId = (url: string) => {
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([a-zA-Z0-9_-]{11})/
  );
  return match ? match[1] : null;
};

const VideoPlayer = ({
  onGenerateSummary,
  onGenerateQuiz,
  onGenerateMCQ,
  setActiveTab,
  onDataGenerated,
  setIsGenerating,
}: VideoPlayerProps) => {
  const [url, setUrl] = useState("");
  const [videoId, setVideoId] = useState<string | null>(null);
  const [loading, setLoading] = useState<string | null>(null); // which button is loading

  const handleLoadVideo = async () => {
    const id = extractVideoId(url);
    if (id) {
      setVideoId(id);
      setIsGenerating(true);
      toast.info("Connecting to AI services...");
      // Auto-trigger full generation!
      await callGenerate("summary", "Complete Content", onGenerateSummary);
    } else {
      toast.error("Please enter a valid YouTube URL");
    }
  };

  const callGenerate = async (tab: string, label: string, action: () => void) => {
    const id = extractVideoId(url);
    if (!id) {
      toast.error("Invalid video URL");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in first");
      return;
    }

    setLoading(label);
    setIsGenerating(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/learning/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          youtubeUrl: url,
          videoId: id,
          title: `YouTube Video – ${id}`,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Generation failed");
        setIsGenerating(false);
        return;
      }

      if (data.message === "Loaded from cache.") {
        toast.success("Loaded from history!");
      } else {
        toast.success("Content generated successfully!");
      }

      onDataGenerated(data.data);
      action(); // Call the specific tab action
      setActiveTab(tab);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Try again.");
    } finally {
      setLoading(null);
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-5">
      {/* URL Input */}
      <div className="flex gap-3">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleLoadVideo()}
          placeholder="Paste YouTube URL"
          className="flex-1 h-12 px-4 rounded-lg bg-muted border border-transparent focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:bg-background focus:border-primary outline-none transition-colors text-sm"
        />
        <button
          onClick={handleLoadVideo}
          disabled={!!loading}
          className="h-12 px-5 rounded-lg gradient-primary text-primary-foreground font-medium text-sm flex items-center gap-2 transition-transform hover:scale-[1.03] active:scale-[0.97] disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
          {loading ? "Generating..." : "Load & Generate"}
        </button>
      </div>

      {/* Switch Tab Buttons (No longer trigger API alone if video is loaded) */}
      {videoId && (
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={() => setActiveTab("summary")}
            className="bg-muted text-foreground px-5 py-2 rounded-xl flex items-center gap-2 border border-border hover:bg-background transition-colors"
          >
            <Sparkles className="w-4 h-4 text-primary" /> View Summary
          </button>

          <button
            onClick={() => setActiveTab("practice")}
            className="bg-muted text-foreground px-5 py-2 rounded-xl flex items-center gap-2 border border-border hover:bg-background transition-colors"
          >
            <HelpCircle className="w-4 h-4 text-primary" /> Practice Questions
          </button>

          <button
            onClick={() => setActiveTab("mcq")}
            className="bg-muted text-foreground px-5 py-2 rounded-xl flex items-center gap-2 border border-border hover:bg-background transition-colors"
          >
            <Sparkles className="w-4 h-4 text-primary" /> Take Quiz
          </button>
        </div>
      )}

      {/* Video Embed */}
      {videoId ? (
        <div className="rounded-2xl overflow-hidden shadow-card aspect-video bg-foreground/5">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      ) : (
        <div className="rounded-2xl bg-muted/50 aspect-video flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <Play className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm">Paste a YouTube URL above to get started</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
