import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User, Mail, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Profile = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ videos: 0, notes: 0, quizzes: 0 });
  const [loading, setLoading] = useState(true);
  
  const userStr = localStorage.getItem("user");
  const user = userStr ? JSON.parse(userStr) : { name: "Learner", email: "learner@example.com" };

  useEffect(() => {
    const fetchStats = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/learning/history`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
                if (res.ok) {
          const history = data.data || [];
          const totalNotes = history.reduce((acc: number, item: any) => acc + (item.notes?.length || 0), 0);
          const submittedQuizzes = history.filter((item: any) => item.quiz?.length > 0).length;
          
          setStats({
            videos: history.length,
            notes: totalNotes,
            quizzes: submittedQuizzes
          });
        }
      } catch (err) {
        console.error("Failed to fetch stats", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/", { replace: true });
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 pb-24 md:pb-12 ">
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold mb-8">Profile</h1>
        <div className="bg-card rounded-2xl shadow-card p-8">
          <div className="flex items-center gap-5 mb-8">
            <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center">
              <User className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-xl font-bold">{user.name}</h2>
              <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5" /> {user.email}
              </p>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-10">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            </div>
          ) : (
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6 text-center">
                <p className="text-3xl font-bold text-primary">{stats.videos}</p>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mt-1">Videos Studied</p>
              </div>
              <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6 text-center">
                <p className="text-3xl font-bold text-primary">{stats.notes}</p>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mt-1">Notes Taken</p>
              </div>
              <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6 text-center">
                <p className="text-3xl font-bold text-primary">{stats.quizzes}</p>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mt-1">Quizzes Submitted</p>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-center mt-10">
          <button
            onClick={handleLogout}
            className="bg-destructive/10 text-destructive border border-destructive/20 hover:bg-destructive hover:text-white transition-all px-8 py-3 rounded-xl font-medium text-sm"
          >
            Sign Out
          </button>
        </div>
      </motion.div> 
    </div>
  );
};

export default Profile;
