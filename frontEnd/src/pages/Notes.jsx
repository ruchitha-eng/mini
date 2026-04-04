import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft, StickyNote, Loader2, Clock } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import "./Notes.css";

function Notes() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/learning/item/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) {
          setNotes(data.data.notes || []);
        } else {
          toast.error(data.message || "Failed to load notes");
        }
      } catch (err) {
        toast.error("Could not connect to server");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchNotes();
  }, [id]);

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </button>

      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
          <StickyNote className="w-5 h-5 text-primary-foreground" />
        </div>
        <h2 className="text-2xl font-bold">Saved Notes</h2>
      </div>

      {loading ? (
        <div className="bg-card rounded-2xl p-12 flex flex-col items-center justify-center gap-4 shadow-card">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-muted-foreground animate-pulse">Loading notes...</p>
        </div>
      ) : notes.length === 0 ? (
        <div className="bg-card rounded-2xl p-16 text-center shadow-card border border-border/50">
          <p className="text-muted-foreground">No notes saved for this video.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {notes.map((note, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-card rounded-2xl p-5 shadow-card border border-border/50 flex gap-4 items-start"
            >
              <div className="flex items-center gap-1.5 bg-primary/10 text-primary px-2 py-0.5 rounded-lg text-xs font-bold font-mono-timestamp shrink-0 mt-0.5">
                <Clock className="w-3.5 h-3.5" />
                {note.time}
              </div>
              <p className="text-foreground/90 leading-relaxed text-sm">{note.text}</p>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Notes;