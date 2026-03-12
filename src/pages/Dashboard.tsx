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
      {/* Header */}
      <motion.div {...fadeUp}>
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground mb-8">Your learning history, stats, and saved notes.</p>
      </motion.div>

      {/* ── Motivational Widget ── */}
      <motion.div
        {...fadeUp}
        className="mb-8 gradient-primary rounded-2xl p-5 flex items-center gap-4 text-primary-foreground"
      >
        <Sparkles className="w-8 h-8 shrink-0 opacity-90" />
        <div>
          <p className="font-bold text-lg leading-tight">
            You are on a {streakDays} day learning streak. Keep going! 🔥
          </p>
          <p className="text-sm opacity-80 mt-0.5">
            Consistency is the key to mastery. Watch a video today to extend your streak.
          </p>
        </div>
      </motion.div>

      {/* ── Stats Row ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Study Streak", value: `${streakDays} days`, icon: Flame, accent: "text-orange-500 bg-orange-500/10" },
          { label: "Videos Watched", value: "24", icon: Video, accent: "text-primary bg-primary/10" },
          { label: "Notes Created", value: "87", icon: StickyNote, accent: "text-accent bg-accent/10" },
          { label: "Study Hours", value: "18.5 h", icon: Timer, accent: "text-emerald-500 bg-emerald-500/10" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.5, ease }}
            className="bg-card rounded-2xl shadow-card p-5 flex items-center gap-4"
          >
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${stat.accent}`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-2xl font-bold leading-none">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── Quick Actions ── */}
      <motion.div {...fadeUp} className="mb-8">
        <h2 className="font-bold text-lg mb-3">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          {[
            { label: "Add YouTube Video", icon: Plus, action: () => navigate("/home") },
            { label: "Create Manual Notes", icon: NotebookPen, action: () => navigate("/home") },
            { label: "View All Notes", icon: Eye, action: () => setTab("notes") },
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

      {/* ── Two-column: Weekly Chart + Recent Activity ── */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {/* Weekly Study Progress */}
        <motion.div {...fadeUp} className="bg-card rounded-2xl shadow-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h2 className="font-bold text-lg">Weekly Study Progress</h2>
          </div>
          <ChartContainer config={chartConfig} className="h-[220px] w-full">
            <BarChart data={weeklyData} barGap={4}>
              <XAxis dataKey="day" tickLine={false} axisLine={false} fontSize={12} />
              <YAxis tickLine={false} axisLine={false} fontSize={12} width={28} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="videos" fill="var(--color-videos)" radius={[6, 6, 0, 0]} barSize={16} />
              <Bar dataKey="notes" fill="var(--color-notes)" radius={[6, 6, 0, 0]} barSize={16} />
            </BarChart>
          </ChartContainer>
        </motion.div>

        {/* Recent Activity */}
        <motion.div {...fadeUp} className="bg-card rounded-2xl shadow-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-primary" />
            <h2 className="font-bold text-lg">Recent Activity</h2>
          </div>
          <div className="space-y-3">
            {recentActivity.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                  <item.icon className="w-4 h-4 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm leading-snug">{item.text}</p>
                  <p className="text-xs text-muted-foreground">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Saved Videos ── */}
      {bookmarks.length > 0 && (
        <motion.div {...fadeUp} className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <BookmarkCheck className="w-5 h-5 text-primary" />
            <h2 className="font-bold text-lg">Saved Videos</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {bookmarks.map((video) => (
              <div key={video.id} className="bg-card rounded-2xl shadow-card overflow-hidden hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200">
                <div className="aspect-video bg-muted">
                  <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-sm mb-0.5 truncate">{video.title}</h3>
                  <p className="text-xs text-muted-foreground mb-3">{video.channel}</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate("/home")}
                      className="flex-1 h-8 rounded-lg bg-primary/10 text-primary text-xs font-medium flex items-center justify-center gap-1.5 hover:bg-primary/15 transition-colors"
                    >
                      <Play className="w-3.5 h-3.5" /> Open
                    </button>
                    <button
                      onClick={() => removeBookmark(video.id)}
                      className="h-8 w-8 rounded-lg bg-destructive/10 text-destructive flex items-center justify-center hover:bg-destructive/15 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* ── Tabs: Videos / Notes ── */}
      <div className="flex items-center gap-2 mb-4">
        <FileText className="w-5 h-5 text-primary" />
        <h2 className="font-bold text-lg">Study History</h2>
      </div>
      <div className="flex gap-1 bg-muted rounded-xl p-1 w-fit mb-6">
        <button
          onClick={() => setTab("videos")}
          className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors ${
            tab === "videos" ? "bg-card text-foreground shadow-card" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Play className="w-4 h-4 inline mr-1.5 -mt-0.5" />
          Videos Watched
        </button>
        <button
          onClick={() => setTab("notes")}
          className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors ${
            tab === "notes" ? "bg-card text-foreground shadow-card" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <FileText className="w-4 h-4 inline mr-1.5 -mt-0.5" />
          Notes List
        </button>
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
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {tab === "notes" && (
        <div className="space-y-3 max-w-2xl">
          {allNotes.map((note, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="bg-card rounded-xl shadow-card p-4 flex gap-4 items-start"
            >
              <span className="font-mono-timestamp text-xs text-primary bg-primary/10 px-2 py-0.5 rounded-md whitespace-nowrap mt-0.5">
                {note.time}
              </span>
              <div>
                <p className="text-sm">{note.text}</p>
                <p className="text-xs text-muted-foreground mt-1">{note.videoTitle} • {note.date}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
