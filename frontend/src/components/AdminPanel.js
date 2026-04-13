// src/components/AdminPanel.js
import React, { useState, useEffect } from "react";
import axios from "axios";

function AdminPanel() {
  const [materials, setMaterials] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subject, setSubject] = useState("General");
  const [fileUrl, setFileUrl] = useState("");
  const [convertedUrl, setConvertedUrl] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/materials", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setMaterials(res.data))
      .catch((err) => console.error("Failed to fetch materials:", err));
  }, [token]);

  // Convert Google Drive share link to direct download
  const convertDriveLink = (url) => {
    const match = url.match(/\/d\/(.*?)\//);
    if (match && match[1]) {
      return `https://drive.google.com/uc?export=download&id=${match[1]}`;
    }
    return url;
  };

  const handleFileUrlChange = (e) => {
    const inputUrl = e.target.value;
    setFileUrl(inputUrl);
    setConvertedUrl(convertDriveLink(inputUrl));
  };

  const handleAddMaterial = async (e) => {
    e.preventDefault();
    try {
      const directLink = convertDriveLink(fileUrl);

      const res = await axios.post(
        "http://localhost:5000/api/materials",
        { title, description, subject, fileUrl: directLink },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMaterials([...materials, res.data]);

      // Reset form
      setTitle("");
      setDescription("");
      setSubject("General");
      setFileUrl("");
      setConvertedUrl("");
    } catch (err) {
      console.error("Failed to add material:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/materials/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMaterials(materials.filter((m) => m._id !== id));
    } catch (err) {
      console.error("Failed to delete material:", err);
    }
  };

  return (
    <div className="container mt-4">
      {/* ✅ Styled Welcome Message */}
      <div className="alert alert-success text-center" role="alert">
        <h2 className="mb-0">Welcome to Course Management Admin Panel</h2>
        <p className="mb-0">Manage uploaded study materials with full control from here.</p>
      </div>

      <form onSubmit={handleAddMaterial} className="mb-4">
        <div className="mb-3">
          <label>Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Description</label>
          <input
            type="text"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Subject</label>
          <select
            className="form-select"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          >
            <option value="Math">Math</option>
            <option value="Science">Science</option>
            <option value="English">English</option>
            <option value="General">General</option>
          </select>
        </div>
        <div className="mb-3">
          <label>File URL</label>
          <input
            type="text"
            className="form-control"
            value={fileUrl}
            onChange={handleFileUrlChange}
            required
          />
          <small className="text-muted">
            Paste a Google Drive share link — it will auto-convert.
          </small>
          {convertedUrl && (
            <div className="mt-2">
              <strong>Converted Link:</strong>{" "}
              <a href={convertedUrl} target="_blank" rel="noopener noreferrer">
                {convertedUrl}
              </a>
            </div>
          )}
        </div>
        <button type="submit" className="btn btn-success">
          Add Material
        </button>
      </form>

      <h3>Uploaded Materials</h3>
      <ul className="list-group">
        {materials.map((m) => (
          <li
            key={m._id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <span>
              <strong>{m.title}</strong> - {m.description} ({m.subject})
            </span>
            <div>
              <a
                href={m.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-sm me-2"
              >
                Download
              </a>
              <button
                onClick={() => handleDelete(m._id)}
                className="btn btn-danger btn-sm"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* ✅ Footer */}
      <footer className="mt-5 text-center text-secondary">
        <hr />
        <p>© {new Date().getFullYear()} The Department Management Control. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default AdminPanel;
