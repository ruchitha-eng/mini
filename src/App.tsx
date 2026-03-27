import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation,Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import Notes from "./pages/Notes";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";
import Landing from "./pages/Landing";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Summaryhome from "./pages/Summaryhome";

const queryClient = new QueryClient();
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
};
const AppLayout = () => {
  const location = useLocation();
  const showBottomNav = ["/home", "/dashboard", "/profile", "/settings"].includes(location.pathname);
  
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={localStorage.getItem("token") ? (<Navigate to="/dashboard" />) : (<Landing />)}/>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        <Route path="/notes/:id" element={<ProtectedRoute><Notes /></ProtectedRoute>} />
        <Route path="/summary/:id" element={<ProtectedRoute><Summaryhome /></ProtectedRoute>} />
      </Routes>
      {showBottomNav && <BottomNav />}
    </>
  );
};
const isLoggedIn = localStorage.getItem("token");
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
