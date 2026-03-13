import { motion } from "framer-motion";
import { User, Mail, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
   const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
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
            <h2 className="text-xl font-bold">Ruchitha Bhima</h2>
            <p className="text-sm text-muted-foreground flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5" /> ruchi@example.com
            </p>
          </div>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="bg-blue-50 rounded-2xl shadow-lg p-8 text-center">
            <p className="text-2xl font-bold text-primary">12</p>
            <p className="text-sm text-muted-foreground">Videos Studied</p>
          </div>
          <div className="bg-blue-50 rounded-2xl shadow-lg p-8 text-center">
            <p className="text-2xl font-bold text-primary">47</p>
            <p className="text-sm text-muted-foreground">Notes Taken</p>
          </div>
          <div className="bg-blue-50 rounded-2xl shadow-lg p-8 text-center">
            <p className="text-2xl font-bold text-primary">8</p>
            <p className="text-sm text-muted-foreground">Quizzes Completed</p>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
      <button
    onClick={handleLogout}
    className=" bg-red-500 hover:bg-red-600 text-white py-2 rounded-md mt-8 max-w-3xl p-4"
  >
    Sign Out
  </button>
</div>
  
    </motion.div> 
  </div>
);
};
export default Profile;
