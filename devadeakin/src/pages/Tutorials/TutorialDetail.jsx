import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { doc, getDoc, updateDoc, increment } from 'firebase/firestore'
import { db } from '../../firebase'

export default function TutorialDetail() {
  const { id } = useParams()
  const [tutorial, setTutorial] = useState(null)

  useEffect(() => {
    async function fetchTutorial() {
      try {
        const docRef = doc(db, 'tutorials', id)
        const snap = await getDoc(docRef)

        if (snap.exists()) {
          setTutorial({ id: snap.id, ...snap.data() })

          // ✅ Use atomic increment instead of manual +1
          await updateDoc(docRef, {
            views: increment(1)
          })
        } else {
          console.warn("⚠️ No tutorial found with id:", id)
        }
      } catch (e) {
        console.error('❌ Error fetching/updating tutorial:', e)
      }
    }
    fetchTutorial()
  }, [id])

  if (!tutorial) return <div>Loading...</div>

  return (
    <div className="max-w-3xl mx-auto bg-white p-4 rounded shadow">
      <h1 className="text-xl font-bold">{tutorial.title}</h1>
      <p className="text-sm text-gray-600">Uploaded by {tutorial.uploaderEmail}</p>

      <div className="mt-4">
        {tutorial.videoUrl ? (
          <video controls src={tutorial.videoUrl} className="w-full max-h-[480px]" />
        ) : (
          <div className="p-4 bg-gray-100 text-red-600">Video unavailable</div>
        )}
      </div>

      <div className="mt-4">Views: {tutorial.views ?? 0}</div>
    </div>
  )
}
