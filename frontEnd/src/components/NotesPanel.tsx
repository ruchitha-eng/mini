import { useState } from "react";
import { Clock, Pause, Save, Plus } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

interface Note {
  id: number;
  timestamp: string;
  text: string;
}

interface NotesPanelProps {
  notes?: Array<{ time: string; text: string }>;
}

const NotesPanel = ({ notes: aiNotes }: NotesPanelProps) => {
  const initialNotes: Note[] = aiNotes
    ? aiNotes.map((n, i) => ({ id: i + 1, timestamp: n.time, text: n.text }))
    : [
        { id: 1, timestamp: "0:45", text: "What is quantum mechanics?" },
        { id: 2, timestamp: "2:10", text: "Wave particle duality explained" },
        { id: 3, timestamp: "5:30", text: "Uncertainty principle" },
      ];

  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [newNote, setNewNote] = useState("");

  const addNote = () => {
    if (!newNote.trim()) return;
    const minutes = Math.floor(Math.random() * 10);
    const seconds = Math.floor(Math.random() * 60);
    const timestamp = `${minutes}:${seconds.toString().padStart(2, "0")}`;
    setNotes([...notes, { id: Date.now(), timestamp, text: newNote }]);
    setNewNote("");
    toast.success("Note added!");
  };

  const saveNotes = () => {
    toast.success("Notes saved successfully!");
  };

  return (
    <div className="bg-card rounded-2xl shadow-card p-6 h-fit">
      <h2 className="font-bold text-lg mb-4">Your Notes</h2>

      {/* Note input */}
      <div className="space-y-3 mb-5">
        <textarea
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Add a note..."
          rows={3}
          className="w-full px-4 py-3 rounded-lg bg-muted border border-transparent focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:bg-background focus:border-primary outline-none transition-colors text-sm resize-none"
        />
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={addNote}
            className="h-9 px-3.5 rounded-lg bg-primary/10 text-primary text-xs font-medium flex items-center gap-1.5 hover:bg-primary/15 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" /> Add Note
          </button>
          <button className="h-9 px-3.5 rounded-lg bg-muted text-muted-foreground text-xs font-medium flex items-center gap-1.5 hover:bg-muted/80 transition-colors">
            <Clock className="w-3.5 h-3.5" /> Add Timestamp
          </button>
         
          
        </div>
      </div>

      {/* Notes list */}
      <div className="space-y-2">
        <AnimatePresence>
          {notes.map((note) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ type: "spring", duration: 0.3, bounce: 0 }}
              className="flex gap-3 items-start p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
            >
              <span className="font-mono-timestamp text-xs text-primary font-medium bg-primary/10 px-2 py-0.5 rounded-md mt-0.5 whitespace-nowrap">
                {note.timestamp}
              </span>
              <span className="text-sm">{note.text}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <button
            onClick={saveNotes}
            className="h-9 px-3.5 rounded-lg gradient-primary text-primary-foreground text-xs font-medium flex items-center gap-1.5 transition-transform hover:scale-[1.03] active:scale-[0.97]"
          >
            <Save className="w-3.5 h-3.5" /> Save Notes
          </button>
    </div>
  );
};

export default NotesPanel;
