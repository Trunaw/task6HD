import React from 'react'
import { Link } from 'react-router-dom'

// For starter, using dummy data
const DUMMY_PROJECTS = [
  { id: 'p1', title: 'Website Landing Page', budget: '$400', tags: ['React', 'Design'], description: 'Build a responsive landing page.' },
  { id: 'p2', title: 'API Integration', budget: '$800', tags: ['Node', 'API'], description: 'Integrate third-party APIs.' },
  { id: 'p3', title: 'Portfolio Website', budget: '$600', tags: ['React', 'Tailwind'], description: 'Create a personal portfolio website.' },
]

export default function Projects() {
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {DUMMY_PROJECTS.map((project) => (
          <Link
            to={`/projects/${project.id}`}
            key={project.id}
            className="bg-white p-4 rounded shadow block hover:shadow-md transition"
          >
            <h3 className="font-semibold">{project.title}</h3>
            <div className="text-sm text-gray-600">
              {project.budget} • {project.tags.join(', ')}
            </div>
            <p className="mt-2 text-sm">{project.description}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
