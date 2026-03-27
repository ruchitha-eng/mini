import { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: form.email,
        password: form.password,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      toast.error(data.message || "Login failed");
      return;
    }

    // ✅ Store token
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    toast.success("Logged in successfully!");

    navigate("/dashboard");
  } catch (error) {
    toast.error("Something went wrong");
  }
};
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/dashboard"); // or "/home"
    }
  }, []);
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", duration: 0.5, bounce: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-6 h-6 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold">Welcome back</h1>
          <p className="text-muted-foreground mt-1">Sign in to continue learning</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-card rounded-2xl p-8 shadow-card space-y-4">
          <div>
            <label className="text-sm font-medium mb-1.5 block">Email</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full h-12 px-4 rounded-lg bg-muted border border-transparent focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:bg-background focus:border-primary outline-none transition-colors text-sm"
              placeholder="you@example.com"
            />
          </div>
          <div className="relative">
            <label className="text-sm font-medium mb-1.5 block">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full h-12 px-4 pr-12 rounded-lg bg-muted border border-transparent focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:bg-background focus:border-primary outline-none transition-colors text-sm"
              placeholder="Your password"
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-[38px] text-muted-foreground hover:text-foreground transition-colors">
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          <button
            type="submit"
            className="w-full h-12 rounded-lg gradient-primary text-primary-foreground font-medium transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Login
          </button>
          <p className="text-sm text-center text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary font-medium hover:underline">
              Create new account
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
