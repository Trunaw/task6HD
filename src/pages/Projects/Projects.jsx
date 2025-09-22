import React from "react"
import { Link } from "react-router-dom"

// For starter, using dummy data
const DUMMY_PROJECTS = [
  { id: "p1", title: "Website Landing Page", budget: "$400", tags: ["React", "Design"], description: "Build a responsive landing page." },
  { id: "p2", title: "API Integration", budget: "$800", tags: ["Node", "API"], description: "Integrate third-party APIs." },
  { id: "p3", title: "Portfolio Website", budget: "$600", tags: ["React", "CSS"], description: "Create a personal portfolio website." },
]

export default function Projects() {
  return (
    <>
      <style>{`
        .page-container {
          padding: 2rem;
          background: #f3f4f6;
          min-height: 100vh;
        }
        .page-title {
          font-size: 1.8rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          color: #1f2937;
          text-align: left;
        }
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.5rem;
        }
        .project-card {
          background: #fff;
          border-radius: 10px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          padding: 1.2rem;
          text-decoration: none;
          color: inherit;
          transition: transform 0.2s, box-shadow 0.2s;
          display: flex;
          flex-direction: column;
        }
        .project-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 6px 16px rgba(0,0,0,0.15);
        }
        .project-title {
          font-size: 1.2rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: #111827;
        }
        .project-meta {
          font-size: 0.9rem;
          color: #4b5563;
          margin-bottom: 0.8rem;
        }
        .project-description {
          font-size: 0.95rem;
          color: #374151;
          line-height: 1.4;
        }
      `}</style>

      <div className="page-container">
        <h1 className="page-title">Projects</h1>
        <div className="projects-grid">
          {DUMMY_PROJECTS.map((project) => (
            <Link to={`/projects/${project.id}`} key={project.id} className="project-card">
              <h3 className="project-title">{project.title}</h3>
              <div className="project-meta">
                {project.budget} • {project.tags.join(", ")}
              </div>
              <p className="project-description">{project.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
