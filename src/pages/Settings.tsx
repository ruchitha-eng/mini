import { motion } from "framer-motion";
import { Settings as SettingsIcon } from "lucide-react";

const Settings = () => (
  <div className="max-w-3xl mx-auto px-6 py-12">
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
      <div className="flex items-center gap-3 mb-8">
        <SettingsIcon className="w-6 h-6 text-muted-foreground" />
        <h1 className="text-3xl font-bold">Settings</h1>
      </div>
      <div className="bg-card rounded-2xl shadow-card p-6 space-y-6">
        <div>
          <h3 className="font-bold mb-1">Account</h3>
          <p className="text-sm text-muted-foreground">Manage your account settings and preferences.</p>
        </div>
        <div className="h-px bg-border" />
        <div>
          <h3 className="font-bold mb-1">Notifications</h3>
          <p className="text-sm text-muted-foreground">Configure how you receive notifications.</p>
        </div>
        <div className="h-px bg-border" />
        <div>
          <h3 className="font-bold mb-1">Privacy</h3>
          <p className="text-sm text-muted-foreground">Control your data and privacy settings.</p>
        </div>
      </div>
    </motion.div>
  </div>
);

export default Settings;
