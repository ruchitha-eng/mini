import { useState } from "react";
import { Play, Sparkles, HelpCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface VideoPlayerProps {
  onGenerateSummary: () => void;
  onGenerateQuiz: () => void;
}

const VideoPlayer = ({ onGenerateSummary, onGenerateQuiz }: VideoPlayerProps) => {
  const [url, setUrl] = useState("");
  const [videoId, setVideoId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const extractVideoId = (url: string) => {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : null;
  };

  const handleLoadVideo = () => {
    const id = extractVideoId(url);
    if (id) {
      setVideoId(id);
      toast.success("Video loaded successfully!");
    } else {
      toast.error("Please enter a valid YouTube URL");
    }
  };

  const handleGenerate = (action: () => void, label: string) => {
    setLoading(true);
    setTimeout(() => {
      action();
      setLoading(false);
      toast.success(`${label} generated!`);
    }, 1500);
  };

  return (
    <div className="space-y-5">
      {/* URL Input */}
      <div className="flex gap-3">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste YouTube URL"
          className="flex-1 h-12 px-4 rounded-lg bg-muted border border-transparent focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:bg-background focus:border-primary outline-none transition-colors text-sm"
        />
        <button
          onClick={handleLoadVideo}
          className="h-12 px-5 rounded-lg gradient-primary text-primary-foreground font-medium text-sm flex items-center gap-2 transition-transform hover:scale-[1.03] active:scale-[0.97]"
        >
          <Play className="w-4 h-4" /> Load
        </button>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 flex-wrap">
        <button
          onClick={() => handleGenerate(onGenerateSummary, "Summary")}
          disabled={loading}
          className="h-10 px-4 rounded-lg bg-primary/10 text-primary text-sm font-medium flex items-center gap-2 hover:bg-primary/15 transition-colors disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
          Generate Summary
        </button>
        <button
          onClick={() => handleGenerate(onGenerateQuiz, "Quiz")}
          disabled={loading}
          className="h-10 px-4 rounded-lg bg-primary/10 text-primary text-sm font-medium flex items-center gap-2 hover:bg-primary/15 transition-colors disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <HelpCircle className="w-4 h-4" />}
          Generate Quiz
        </button>
      </div>

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

      {/* Video Info */}
      {videoId && (
        <div>
          <h3 className="font-bold text-lg">Introduction to Quantum Mechanics</h3>
          <p className="text-sm text-muted-foreground">Physics Academy • Educational</p>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
