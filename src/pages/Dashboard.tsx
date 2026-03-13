import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Play, Clock, FileText, Flame, Video, StickyNote, Timer,
  BookmarkCheck, Plus, NotebookPen, Eye, Trash2, TrendingUp,
  Sparkles, ChevronRight,
} from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Bar, BarChart, XAxis, YAxis } from "recharts";
import { toast } from "sonner";

/* ─── mock data ─── */
const videoHistory = [
  {
    id: 1,
    title: "The Basics of Quantum Physics",
    channel: "Physics Academy",
    date: "April 12, 2026",
    thumbnail: "https://img.youtube.com/vi/7u_UQG1La1o/mqdefault.jpg",
    notes: [
      { time: "0:45", text: "What is quantum mechanics" },
      { time: "2:10", text: "Wave particle duality" },
      { time: "5:30", text: "Uncertainty principle" },
    ],
  },
  {
    id: 2,
    title: "Introduction to Machine Learning",
    channel: "AI Simplified",
    date: "April 10, 2026",
    thumbnail: "https://img.youtube.com/vi/ukzFI9rgwfU/mqdefault.jpg",
    notes: [
      { time: "1:20", text: "Types of machine learning" },
      { time: "4:15", text: "Supervised vs unsupervised" },
    ],
  },
  {
    id: 3,
    title: "Organic Chemistry Fundamentals",
    channel: "Chem Central",
    date: "April 8, 2026",
    thumbnail: "https://img.youtube.com/vi/bka20Q9TN6M/mqdefault.jpg",
    notes: [
      { time: "0:30", text: "Carbon bonding basics" },
      { time: "3:00", text: "Functional groups overview" },
      { time: "6:45", text: "Naming conventions" },
    ],
  },
];

const allNotes = videoHistory.flatMap((v) =>
  v.notes.map((n) => ({ ...n, videoTitle: v.title, date: v.date }))
);

const savedVideos = [
  { id: 1, title: "Linear Algebra Full Course", channel: "3Blue1Brown", thumbnail: "https://img.youtube.com/vi/fNk_zzaMoSs/mqdefault.jpg" },
  { id: 2, title: "How Computers Work", channel: "Crash Course", thumbnail: "https://img.youtube.com/vi/AkFi90lZmXA/mqdefault.jpg" },
];

const recentActivity = [
  { icon: Play, text: "Watched The Basics of Quantum Physics", time: "2 hours ago" },
  { icon: StickyNote, text: "Created 3 notes on Quantum Physics", time: "2 hours ago" },
  { icon: NotebookPen, text: "Edited notes on Machine Learning", time: "1 day ago" },
  { icon: Play, text: "Watched Introduction to Machine Learning", time: "2 days ago" },
  { icon: StickyNote, text: "Created 2 notes on Machine Learning", time: "2 days ago" },
];

const weeklyData = [
  { day: "Mon", videos: 2, notes: 5 },
  { day: "Tue", videos: 1, notes: 3 },
  { day: "Wed", videos: 3, notes: 7 },
  { day: "Thu", videos: 0, notes: 1 },
  { day: "Fri", videos: 2, notes: 4 },
  { day: "Sat", videos: 4, notes: 9 },
  { day: "Sun", videos: 1, notes: 2 },
];

const chartConfig: ChartConfig = {
  videos: { label: "Videos", color: "hsl(217 91% 60%)" },
  notes: { label: "Notes", color: "hsl(200 98% 48%)" },
};

const streakDays = 5;

const ease = [0.33, 1, 0.68, 1] as const;
const fadeUp = {
  initial: { opacity: 0, y: 15 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease },
};

/* ─── component ─── */
const Dashboard = () => {
  const [tab, setTab] = useState<"videos" | "notes">("videos");
  const [bookmarks, setBookmarks] = useState(savedVideos);
  
  const navigate = useNavigate();

  const removeBookmark = (id: number) => {
    setBookmarks((prev) => prev.filter((v) => v.id !== id));
    toast.success("Video removed from bookmarks");
  };

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

     

      {/* ── Tabs: Videos / Notes ── */}
      <div className="flex items-center gap-2 mb-4">
        <FileText className="w-5 h-5 text-primary" />
        <h2 className="font-bold text-lg">Your Learning  History</h2>
      </div>
     

      {tab === "videos" && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videoHistory.map((video, i) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.5, ease }}
              className="bg-card rounded-2xl shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 overflow-hidden"
            >
              <div className="aspect-video bg-muted relative">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover"
                  style={{ outline: "1px solid rgba(0,0,0,0.08)", outlineOffset: "-1px" }}
                />
              </div>
              <div className="p-5">
                <h3 className="font-bold mb-1">{video.title}</h3>
                <p className="text-xs text-muted-foreground mb-3 flex items-center gap-1.5">
                  <Clock className="w-3 h-3" />
                  Notes taken on {video.date}
                </p>
                <div className="space-y-1.5 mb-4">
                  {video.notes.map((note, j) => (
                    <div key={j} className="flex gap-2 items-start text-sm">
                      <span className="font-mono-timestamp text-xs text-primary bg-primary/10 px-1.5 py-0.5 rounded">
                        {note.time}
                      </span>
                      <span className="text-muted-foreground">{note.text}</span>
                    </div>
                  ))}
                </div>
                <button className="h-9 px-4 rounded-lg bg-primary/10 text-primary text-sm font-medium hover:bg-primary/15 transition-colors w-full flex items-center justify-center gap-1.5">
                  View Notes <ChevronRight className="w-4 h-4" />
                </button>
                <button className="h-9 px-4 rounded-lg bg-primary/10 text-primary text-sm font-medium hover:bg-primary/15 transition-colors w-full flex items-center justify-center gap-1.5 mt-4">
                  View Summary <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      
    </div>
  );
};

export default Dashboard;
