import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Summary.css";

function Summaryhome() {
  const { id } = useParams();
  const [summary, setSummary] = useState("");

  useEffect(() => {
    const allSummaries = {
      1: "Quantum mechanics explains the behavior of particles at atomic level. It includes concepts like wave-particle duality and uncertainty principle.",
      2: "Machine learning is a field of AI where systems learn from data. It includes supervised and unsupervised learning techniques.",
      3: "Organic chemistry is the study of carbon compounds \n structure+Functional group +Reaction"
    };

    setSummary(allSummaries[id] || "No summary available");
  }, [id]);

  return (
    <div className="container">
      <h2 className="heading">📝 Summary for Video {id}</h2>

      <div className="summary-card">
        <p>{summary}</p>
      </div>
    </div>
  );
}

export default Summaryhome;