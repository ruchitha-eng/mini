import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Play, Clock, FileText, Video, StickyNote,
  NotebookPen, Plus, Trash2, ChevronRight, Loader2,
} from "lucide-react";
import { toast } from "sonner";

interface HistoryNote {
  time: string;
  text: string;
}

interface HistoryEntry {
  _id: string;
  videoId: string;
  youtubeUrl: string;
  title: string;
  summary: string;
  practiceQuestions: string[];
  quiz: Array<{ question: string; options: string[]; answer: string }>;
  notes: HistoryNote[];
  createdAt: string;
}

const ease = [0.33, 1, 0.68, 1] as const;
const fadeUp = {
  initial: { opacity: 0, y: 15 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease },
};

const Dashboard = () => {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [clearing, setClearing] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const fetchHistory = async () => {
    if (!token) return;
    setLoadingHistory(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/learning/history`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) setHistory(data.data || []);
      else toast.error(data.message || "Failed to load history");
    } catch {
      toast.error("Could not connect to server");
    } finally {
      setLoadingHistory(false);
    }
  };

  const clearHistory = async () => {
    if (!token) return;
    setClearing(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/learning/clear`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setHistory([]);
        toast.success("Learning history cleared!");
      } else {
        toast.error(data.message || "Failed to clear history");
      }
    } catch {
      toast.error("Could not connect to server");
    } finally {
      setClearing(false);
    }
  };

  useEffect(() => { fetchHistory(); }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 pb-24 md:pb-12">

      {/* ── Quick Actions ── */}
      <motion.div {...fadeUp} className="mb-8">
        <h2 className="font-bold text-lg mb-3">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          {[
            { label: "Add YouTube Video", icon: Plus, action: () => navigate("/home") },
            { label: "Create Manual Notes", icon: NotebookPen, action: () => navigate("/home") },
          ].map((btn) => (
            <button
              key={btn.label}
              onClick={btn.action}
              className="h-10 px-5 rounded-xl bg-primary/10 text-primary text-sm font-medium flex items-center gap-2 hover:bg-primary/15 transition-colors"
            >
              <btn.icon className="w-4 h-4" />
              {btn.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* ── Learning History ── */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-primary" />
          <h2 className="font-bold text-lg">Your Learning History</h2>
          {!loadingHistory && (
            <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
              {history.length} videos
            </span>
          )}
        </div>
        {history.length > 0 && (
          <button
            onClick={clearHistory}
            disabled={clearing}
            className="h-9 px-4 rounded-xl bg-destructive/10 text-destructive text-sm font-medium flex items-center gap-2 hover:bg-destructive/20 transition-colors"
          >
            {clearing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
            Clear History
          </button>
        )}
      </div>

      {loadingHistory ? (
        <div className="flex items-center justify-center py-20 text-muted-foreground gap-3">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>Loading your history…</span>
        </div>
      ) : history.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          <Video className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p className="text-sm">No learning history yet. Go to <strong>Home</strong> and analyse a YouTube video!</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {history.map((entry, i) => (
            <motion.div
              key={entry._id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.5, ease }}
              className="bg-card rounded-2xl shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 overflow-hidden"
            >
              {/* Thumbnail */}
              <div className="aspect-video bg-muted relative">
                <img
                  src={`https://img.youtube.com/vi/${entry.videoId}/mqdefault.jpg`}
                  alt={entry.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-5">
                <h3 className="font-bold mb-1 line-clamp-2">{entry.title}</h3>
                <p className="text-xs text-muted-foreground mb-3 flex items-center gap-1.5">
                  <Clock className="w-3 h-3" />
                  {new Date(entry.createdAt).toLocaleDateString("en-IN", {
                    month: "long", day: "numeric", year: "numeric",
                  })}
                </p>

                {/* Timestamped Notes Preview */}
                {entry.notes?.length > 0 && (
                  <div className="space-y-1.5 mb-4">
                    {entry.notes.slice(0, 3).map((note, j) => (
                      <div key={j} className="flex gap-2 items-start text-sm">
                        <span className="font-mono text-xs text-primary bg-primary/10 px-1.5 py-0.5 rounded">
                          {note.time}
                        </span>
                        <span className="text-muted-foreground line-clamp-1">{note.text}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => navigate("/home")}
                    className="h-9 px-4 rounded-lg bg-primary/10 text-primary text-sm font-medium hover:bg-primary/15 transition-colors w-full flex items-center justify-center gap-1.5"
                  >
                    <Play className="w-4 h-4" /> Rewatch & Generate
                  </button>
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`/summary/${entry._id}`)}
                      className="h-9 px-4 rounded-lg bg-muted text-muted-foreground text-xs font-medium hover:bg-muted/80 transition-colors flex-1 flex items-center justify-center gap-1.5"
                    >
                      <FileText className="w-3.5 h-3.5" /> View Summary
                    </button>
                    <button
                      onClick={() => navigate(`/notes/${entry._id}`)}
                      className="h-9 px-4 rounded-lg bg-muted text-muted-foreground text-xs font-medium hover:bg-muted/80 transition-colors flex-1 flex items-center justify-center gap-1.5"
                    >
                      <StickyNote className="w-3.5 h-3.5" /> View Notes
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
