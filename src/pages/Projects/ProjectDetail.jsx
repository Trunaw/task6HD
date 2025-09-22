import React from 'react'
import { useParams, Link } from 'react-router-dom'

// Use same dummy data to simulate fetching
const DUMMY_PROJECTS = {
  p1: { title: 'Website Landing Page', budget: '$400', description: 'Build a responsive landing page.' },
  p2: { title: 'API Integration', budget: '$800', description: 'Integrate third-party APIs.' },
  p3: { title: 'Portfolio Website', budget: '$600', description: 'Create a personal portfolio website.' },
}

export default function ProjectDetail() {
  const { id } = useParams()
  const project = DUMMY_PROJECTS[id]

  if (!project) return <div className="p-4">Project not found</div>

  return (
    <div className="max-w-3xl mx-auto bg-white p-4 rounded shadow">
      <h1 className="text-xl font-bold">{project.title}</h1>
      <div className="text-sm text-gray-600">Budget: {project.budget}</div>
      <p className="mt-3">{project.description}</p>

      {/* Future: comments, proposals, or project interactions */}
      <div className="mt-4 text-gray-500 text-sm">
        Comments and proposals will appear here (future feature)
      </div>

      <div className="mt-4">
        <Link to="/projects" className="btn-outline">
          Back to Projects
        </Link>
      </div>
    </div>
  )
}
