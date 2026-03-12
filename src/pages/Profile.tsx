import { motion } from "framer-motion";
import { User, Mail, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
const Profile = () => {
  const navigate = useNavigate();

const handleLogout = () => {
  localStorage.removeItem("user");
  navigate("/login");
};
return (
  <div className="max-w-3xl mx-auto px-6 py-12 pb-24 md:pb-12">
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
      <h1 className="text-3xl font-bold mb-8">Profile</h1>
      <div className="bg-card rounded-2xl shadow-card p-8">
        <div className="flex items-center gap-5 mb-8">
          <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center">
            <User className="w-8 h-8 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Ruchi Sharma</h2>
            <p className="text-sm text-muted-foreground flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5" /> ruchi@example.com
            </p>
          </div>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="bg-muted/50 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-primary">12</p>
            <p className="text-sm text-muted-foreground">Videos Studied</p>
          </div>
          <div className="bg-muted/50 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-primary">47</p>
            <p className="text-sm text-muted-foreground">Notes Taken</p>
          </div>
          <div className="bg-muted/50 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-primary">8</p>
            <p className="text-sm text-muted-foreground">Quizzes Completed</p>
          </div>
        </div>
      </div>
      <button onClick={handleLogout} className="mt-6 flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg">
        Sign Out
      </button>
    </motion.div>
  </div>
);
};
export default Profile;
