import { motion } from "framer-motion";
import ChangePassword from "../components/ChangePassword";
import { useNavigate } from "react-router-dom";

const Settings = () => {

  const navigate = useNavigate();

  

  return (
    <div className="max-w-md mx-auto mt-8 space-y-6">
      <h1 className="text-3xl font-bold mb-2">Settings</h1>
  <p className="text-muted-foreground mb-6">
    Manage your account settings and security.
  </p>
  <ChangePassword />

  
</div>
  );
};

export default Settings;