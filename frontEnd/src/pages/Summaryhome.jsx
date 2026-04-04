import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft, FileText, Loader2 } from "lucide-react";
import { toast } from "sonner";
import "./Summary.css";

function Summaryhome() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/learning/item/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) {
          setSummary(data.data.summary);
        } else {
          toast.error(data.message || "Failed to load summary");
        }
      } catch (err) {
        toast.error("Could not connect to server");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchSummary();
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
          <FileText className="w-5 h-5 text-primary-foreground" />
        </div>
        <h2 className="text-2xl font-bold">Video Summary</h2>
      </div>

      {loading ? (
        <div className="bg-card rounded-2xl p-12 flex flex-col items-center justify-center gap-4 shadow-card">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-muted-foreground animate-pulse">Loading summary...</p>
        </div>
      ) : (
        <div className="bg-card rounded-2xl p-8 shadow-card border border-border/50">
          <div className="prose prose-sm max-w-none text-foreground/90 leading-relaxed whitespace-pre-wrap">
            {summary || "No summary available for this video."}
          </div>
        </div>
      )}
    </div>
  );
}

export default Summaryhome;