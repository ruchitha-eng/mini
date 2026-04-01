import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Notes.css";
function Notes() {
  const { id } = useParams();   // gets video id
  const [notes, setNotes] = useState([]);
  useEffect(() => {
  const allNotes = {
    1: [
      { time: "0:45", text: "What is quantum mechanics" },
      { time: "2:10", text: "Wave particle duality" }
    ],
    2: [
      { time: "1:20", text: "Types of ML" },
      { time: "4:15", text: "Supervised vs Unsupervised" }
    ],
    3: [
      { time: "1:20", text: "Organic chemistry fundamentals" },
      { time: "4:15", text: "what is organic chemistry" }
    ]
  };

  setNotes(allNotes[id] || []);
}, [id]);
return (
  <div className="container">
    <h2 className="heading">📘 Notes for Video {id}</h2>

    <div className="notes-list">
      {notes.map((note, index) => (
        <div key={index} className="note-card">
          <span className="timestamp">{note.time}</span>
          <p className="note-text">{note.text}</p>
        </div>
      ))}
    </div>
  </div>
);
}

export default Notes;