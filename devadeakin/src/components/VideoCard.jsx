import React from 'react'
import { Link } from 'react-router-dom'

export default function VideoCard({ tutorial }) {
  return (
    <Link to={`/tutorials/${tutorial.id}`} className="block bg-white p-3 rounded shadow">
      <div className="h-40 bg-gray-200 flex items-center justify-center">Video thumbnail</div>
      <h4 className="mt-2 font-semibold truncate">{tutorial.title}</h4>
      <div className="text-sm text-gray-600">{tutorial.uploaderEmail}</div>
      <div className="text-sm mt-1">Views: {tutorial.views || 0} • Rating: {tutorial.ratingAvg || 0}</div>
    </Link>
  )
}
