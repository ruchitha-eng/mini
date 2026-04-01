import { Link, useLocation } from "react-router-dom";
import { BookOpen, Home, LayoutDashboard, Settings, User } from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
  { label: "", path: "/home", icon: Home },
  { label: "", path: "/dashboard", icon: LayoutDashboard },

  { label: "", path: "/profile", icon: User },
    { label: "", path: "/settings", icon: Settings },
];

const Navbar = () => {
  const location = useLocation();
  const isLanding = location.pathname === "/";
  const isAuth = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", duration: 0.4, bounce: 0 }}
      className="sticky top-0 z-50 bg-card/80 backdrop-blur-xl shadow-card"
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold tracking-tight">StudyBud</span>
        </Link>

        {!isAuth && (
          <div className="hidden md:flex items-center gap-1">
            {isLanding ? (
              <>
                <a href="#how-it-works" className="px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                  How It Works
                </a>
                <a href="#features" className="px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                  Features
                </a>
                <Link
                  to="/signup"
                  className="ml-3 h-10 px-5 rounded-lg gradient-primary text-primary-foreground text-sm font-medium flex items-center transition-transform hover:scale-[1.03] active:scale-[0.97]"
                >
                  Get Started
                </Link>
              </>
            ) : (
              navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex flex-col items-center justify-center px-4 py-2 rounded-lg text-sm font-medium ${
                    location.pathname === item.path
                      ? "text-primary bg-primary/5"
                      : "text-muted-foreground hover:text-foreground"
                  }`}>
                  <Icon size={23} />
                
                  {item.label}
                </Link>
              );
            })
            
            )}
          </div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
