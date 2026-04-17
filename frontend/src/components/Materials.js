// src/components/Materials.js
import React, { useEffect, useState } from "react";
import axios from "axios";

function Materials() {
  const [materials, setMaterials] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("/api/materials", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setMaterials(res.data))
      .catch((err) => console.error("Failed to fetch materials:", err));
  }, [token]);

  // ✅ Group materials by subject
  const grouped = materials.reduce((acc, m) => {
    const subject = m.subject || "General";
    if (!acc[subject]) acc[subject] = [];
    acc[subject].push(m);
    return acc;
  }, {});

  return (
    <div className="container mt-4">
      <h2>Study Materials</h2>

      {Object.keys(grouped).map((subject) => (
        <div key={subject} className="mb-5">
          <h3 className="text-primary">{subject}</h3>
          <div className="row">
            {grouped[subject].map((m) => (
              <div key={m._id} className="col-md-4 mb-4">
                <div className="card shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">{m.title}</h5>
                    <p className="card-text">{m.description}</p>
                    <a
                      href={m.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                    >
                      Download
                    </a>
                    <button
                      className="btn btn-secondary ms-2"
                      onClick={() => window.open(m.fileUrl, "_blank")}
                    >
                      Preview
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* ✅ Footer */}
      <footer className="mt-5 text-center text-muted">
        <hr />
        <p><strong>FOR SPONSORSHIP</strong></p>
        <p>
          <strong>About Us:</strong> We provide study materials for all subjects.
          Students can access notes, guides, and exams online.
        </p>
        <p>© {new Date().getFullYear()} The Department Course Management Portal</p>
      </footer>
    </div>
  );
}

export default Materials;