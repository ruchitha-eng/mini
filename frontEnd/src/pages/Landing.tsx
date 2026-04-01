import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Play,
  Sparkles,
  FileText,
  HelpCircle,
  Clock,
  LayoutDashboard,
  Bookmark,
  Zap,
  FolderOpen,
  TrendingUp,
  ArrowRight,
  Github,
} from "lucide-react";

const ease = [0.33, 1, 0.68, 1] as const;
const fadeUp = {
  initial: { opacity: 0, y: 15 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease },
};

const stagger = {
  whileInView: { transition: { staggerChildren: 0.08 } },
  viewport: { once: true },
};

const steps = [
  { icon: Play, title: "Paste a YouTube link", desc: "Drop any educational YouTube video URL to get started." },
  { icon: Sparkles, title: "Generate AI insights", desc: "Get summaries, key points, and practice questions instantly." },
  { icon: Clock, title: "Take timestamped notes", desc: "Capture notes synced to the exact moment in the video." },
];

const features = [
  { icon: FileText, title: "AI Video Summaries", desc: "Get concise breakdowns of any educational video." },
  { icon: HelpCircle, title: "Practice Questions", desc: "Auto-generated quizzes to test your understanding." },
  { icon: Clock, title: "Timestamp Notes", desc: "Notes linked to the exact video moment." },
  { icon: LayoutDashboard, title: "Learning Dashboard", desc: "Track your progress across all study sessions." },
  { icon: Bookmark, title: "Save & Review", desc: "Bookmark sessions and review them anytime." },
];

const benefits = [
  { icon: Zap, text: "Learn faster from educational videos" },
  { icon: FolderOpen, text: "Organize knowledge in one place" },
  { icon: TrendingUp, text: "Track learning progress over time" },
];

const Landing = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden py-24 lg:py-32">
        <div className="absolute inset-0 gradient-primary opacity-[0.03]" />
        <div className="max-w-6xl mx-auto px-6 text-center relative">
          <motion.div {...fadeUp}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 text-primary text-sm font-medium mb-8">
              <Sparkles className="w-4 h-4" />
              AI-Powered Study Assistant
            </div>
          </motion.div>
          <motion.h1
            {...fadeUp}
            transition={{ duration: 0.5, ease, delay: 0.05 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
            style={{ fontSize: "clamp(2.5rem, 5vw + 1rem, 4.5rem)" }}
          >
            Learn smarter,{" "}
            <span className="text-gradient">not harder.</span>
          </motion.h1>
          <motion.p
            transition={{ duration: 0.5, ease, delay: 0.1 }}
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
            style={{ textWrap: "pretty" as any }}
          >
            Turn any YouTube video into your personal study guide. Generate summaries, create quizzes, and capture insights with timestamped notes.
          </motion.p>
          <motion.div {...fadeUp} transition={{ duration: 0.5, ease, delay: 0.15 }}>
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 h-12 px-8 rounded-xl gradient-primary text-primary-foreground font-medium text-base transition-transform hover:scale-[1.03] active:scale-[0.97] shadow-lg shadow-primary/20"
            >
              Start Learning for Free
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-secondary/30">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div {...fadeUp} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ fontSize: "clamp(2rem, 4vw + 0.5rem, 3rem)" }}>
              How it works
            </h2>
            <p className="text-muted-foreground text-lg">Three simple steps to supercharge your learning.</p>
          </motion.div>
          <motion.div {...stagger} className="grid md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <motion.div key={i} {...fadeUp} className="text-center">
                <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-5 shadow-lg shadow-primary/15">
                  <step.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <div className="text-sm font-medium text-primary mb-2">Step {i + 1}</div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div {...fadeUp} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ fontSize: "clamp(2rem, 4vw + 0.5rem, 3rem)" }}>
              Everything you need to study smarter
            </h2>
            <p className="text-muted-foreground text-lg">Powerful tools designed for focused learning.</p>
          </motion.div>
          <motion.div {...stagger} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                className="bg-card rounded-2xl p-6 shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <f.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-1.5">{f.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 bg-secondary/30">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div {...fadeUp} className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ fontSize: "clamp(2rem, 4vw + 0.5rem, 3rem)" }}>
              Why StudyBud?
            </h2>
          </motion.div>
          <motion.div {...stagger} className="max-w-xl mx-auto space-y-5">
            {benefits.map((b, i) => (
              <motion.div key={i} {...fadeUp} className="flex items-center gap-4 bg-card rounded-2xl p-5 shadow-card">
                <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0">
                  <b.icon className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="font-medium">{b.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to learn smarter?</h2>
            <p className="text-muted-foreground text-lg mb-8">Join students who are already studying more efficiently with StudyBud.</p>
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 h-12 px-8 rounded-xl gradient-primary text-primary-foreground font-medium transition-transform hover:scale-[1.03] active:scale-[0.97] shadow-lg shadow-primary/20"
            >
              Try Now
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border/50">
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-sm text-muted-foreground">© 2026 StudyBud. All rights reserved.</p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">About</a>
            <a href="#" className="hover:text-foreground transition-colors">Contact</a>
            <a href="#" className="hover:text-foreground transition-colors flex items-center gap-1.5">
              <Github className="w-4 h-4" /> GitHub
            </a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
