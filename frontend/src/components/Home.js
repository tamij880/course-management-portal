// src/components/Home.js
import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="container mt-5">
      <header className="text-center mb-4">
        <h1>WELCOME TO THE DEPARTMENT COURSE MANAGEMENT PORTAL</h1>
        <p className="lead">"Empowering students with quality materials"</p>
      </header>

      <div className="text-center mb-4">
        <Link to="/login" className="btn btn-primary mx-2">Login Now</Link>
        <Link to="/register" className="btn btn-success mx-2">Register Now</Link>
      </div>

      <section className="card p-4">
        <h4>About Us:</h4>
        <p>We provide study materials for all subjects. Students can access notes, guides, and exams online.</p>
        <p className="text-muted">© {new Date().getFullYear()} The Department Course Management Portal</p>
      </section>
    </div>
  );
}

export default Home;
