import { useState, useEffect } from "react";
import { Clock, Pause, Save, Plus, X } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

interface Note {
  id: number;
  timestamp?: string;
  text: string;
}

interface NotesPanelProps {
  notes?: Array<{ time: string; text: string }>;
}

const NotesPanel = ({ notes: aiNotes }: NotesPanelProps) => {
  const [notes, setNotes] = useState<Note[]>(() => 
    aiNotes ? aiNotes.map((n, i) => ({ id: i + 1, timestamp: n.time, text: n.text })) : []
  );
  const [newNote, setNewNote] = useState("");
  const [pendingTimestamp, setPendingTimestamp] = useState<string | null>(null);
  const [timer, setTimer] = useState(0);

  // Simple timer to simulate video progress
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const addNote = () => {
    if (!newNote.trim()) return;
    
    setNotes([...notes, { 
      id: Date.now(), 
      timestamp: pendingTimestamp || undefined, 
      text: newNote 
    }]);
    setNewNote("");
    setPendingTimestamp(null);
    toast.success("Note added!");
  };

  const handleAddTimestamp = () => {
    setPendingTimestamp(formatTime(timer));
    toast.info(`Timestamp ${formatTime(timer)} captured!`);
  };

  const saveNotes = () => {
    toast.success("Notes saved successfully!");
  };

  return (
    <div className="bg-card rounded-2xl shadow-card p-6 h-fit min-h-[400px] flex flex-col">
      <h2 className="font-bold text-lg mb-4">Your Notes</h2>

      {/* Note input */}
      <div className="space-y-3 mb-5">
        <div className="relative">
          <textarea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Add a note..."
            rows={3}
            className="w-full px-4 py-3 rounded-lg bg-muted border border-transparent focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:bg-background focus:border-primary outline-none transition-colors text-sm resize-none"
          />
          {pendingTimestamp && (
            <div className="absolute top-2 right-2 flex items-center gap-1 bg-primary/20 text-primary px-2 py-0.5 rounded-md text-[10px] font-bold">
              <Clock className="w-3 h-3" /> {pendingTimestamp}
              <button onClick={() => setPendingTimestamp(null)} className="hover:text-destructive">
                <X className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={addNote}
            className="h-9 px-3.5 rounded-lg bg-primary/10 text-primary text-xs font-medium flex items-center gap-1.5 hover:bg-primary/15 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" /> Add Note
          </button>
          <button 
            onClick={handleAddTimestamp}
            className={`h-9 px-3.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors ${
              pendingTimestamp ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            <Clock className="w-3.5 h-3.5" /> {pendingTimestamp ? "Update Timestamp" : "Add Timestamp"}
          </button>
        </div>
      </div>

      {/* Notes list */}
      <div className="space-y-2 flex-1 overflow-y-auto max-h-[300px] pr-2 custom-scrollbar">
        <AnimatePresence>
          {notes.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground italic text-sm">
              No notes yet. Click 'Add Timestamp' to sync your note with the video!
            </div>
          ) : (
            notes.map((note) => (
              <motion.div
                key={note.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ type: "spring", duration: 0.3, bounce: 0 }}
                className="flex gap-3 items-start p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
              >
                {note.timestamp && (
                  <span className="font-mono-timestamp text-xs text-primary font-bold bg-primary/10 px-2 py-0.5 rounded-md mt-0.5 whitespace-nowrap">
                    {note.timestamp}
                  </span>
                )}
                <span className="text-sm">{note.text}</span>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      <div className="mt-6 pt-4 border-t border-border/50">
        <button
          onClick={saveNotes}
          className="h-10 px-5 rounded-xl gradient-primary text-primary-foreground text-sm font-medium flex items-center gap-2 transition-transform hover:scale-[1.03] active:scale-[0.97] w-full justify-center"
        >
          <Save className="w-4 h-4" /> Save All Notes
        </button>
      </div>
    </div>
  );
};

export default NotesPanel;
