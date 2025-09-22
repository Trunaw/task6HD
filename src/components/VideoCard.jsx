import React from "react"
import { Link } from "react-router-dom"

export default function VideoCard({ tutorial }) {
  return (
    <>
      <style>{`
        .video-card {
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          gap: 12px;
          background: #fff;
          border: 1px solid #ccc;
          border-radius: 8px;
          overflow: hidden;
          text-decoration: none;
          color: inherit;
          transition: box-shadow 0.3s ease, transform 0.2s ease;
          padding: 10px;
        }

        .video-card:hover {
          border-color: #777;
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
          transform: translateY(-3px);
        }

        .video-thumb {
          flex: 0 0 180px;
          height: 120px;
          background: #e5e5e5;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          border-radius: 6px;
        }

        .video-thumb video {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .video-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .video-title {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 6px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .video-uploader {
          font-size: 13px;
          color: #666;
          margin-bottom: 4px;
        }

        .video-stats {
          font-size: 12px;
          color: #444;
        }
      `}</style>

      <Link to={`/tutorials/${tutorial.id}`} className="video-card">
        <div className="video-thumb">
          {tutorial.videoUrl ? (
            <video
              src={tutorial.videoUrl}
              muted
              playsInline
              preload="metadata"
              poster="https://via.placeholder.com/300x200?text=Loading..."
            />
          ) : (
            <div>Video thumbnail</div>
          )}
        </div>
        <div className="video-content">
          <h4 className="video-title">{tutorial.title}</h4>
          <div className="video-uploader">{tutorial.uploaderEmail}</div>
          <div className="video-stats">
            Views: {tutorial.views || 0} • Rating: {tutorial.ratingAvg || 0}
          </div>
        </div>
      </Link>
    </>
  )
}
