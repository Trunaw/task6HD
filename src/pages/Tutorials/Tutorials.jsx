import React, { useEffect, useState } from 'react'
import { collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { db, storage } from '../../firebase'
import { v4 as uuidv4 } from 'uuid'
import { useAuth } from '../../contexts/AuthContext'
import VideoCard from '../../components/VideoCard'

export default function Tutorials() {
  const [tutorials, setTutorials] = useState([])
  const [file, setFile] = useState(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const { user, loading } = useAuth()

  // Load tutorials list
  useEffect(() => {
    const q = query(collection(db, 'tutorials'), orderBy('createdAt', 'desc'))
    const unsub = onSnapshot(q, (snap) => {
      setTutorials(snap.docs.map(d => ({ id: d.id, ...d.data() })))
    })
    return unsub
  }, [])

  // Handle upload
  const handleUpload = async () => {
    if (loading) return alert('Please wait, checking login...')
    if (!user) return alert('Login to upload')
    if (!file) return alert('Select a video file')

    // File validation
    const maxSize = 100 * 1024 * 1024 // 100MB
    if (file.size > maxSize) return alert('File too large. Max size 100MB.')
    if (!file.type.startsWith('video/')) return alert('Please select a video file.')

    const id = uuidv4()
    const fileName = `${id}-${file.name}`.replace(/[^a-zA-Z0-9.-]/g, '_')
    const storageRef = ref(storage, `tutorials/${fileName}`)
    
    const uploadTask = uploadBytesResumable(storageRef, file)
    setUploadSuccess(false)

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const pct = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
        setUploadProgress(pct)
      },
      (err) => {
        alert("Upload failed: " + err.message)
      },
      async () => {
        try {
          const url = await getDownloadURL(uploadTask.snapshot.ref)
          await addDoc(collection(db, 'tutorials'), {
            title: file.name,
            videoUrl: url,
            uploader: user.uid,
            uploaderEmail: user.email,
            views: 0,
            ratingAvg: 0,
            ratingsCount: 0,
            createdAt: new Date(),
          })

          setFile(null)
          setUploadProgress(0)
          setUploadSuccess(true)
        } catch (e) {
          alert("Error saving video info: " + e.message)
        }
      }
    )
  }

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Tutorials</h1>

      <div className="mb-4 text-sm text-gray-600">
        {loading
          ? 'Checking login...'
          : user
          ? `Logged in as ${user.email}`
          : 'Not logged in'}
      </div>

      {/* Upload Section */}
      <div className="mb-6 p-4 bg-white rounded shadow">
        <h3 className="font-semibold">Upload a demo video</h3>
        <input
          type="file"
          accept="video/*"
          onChange={(e) => setFile(e.target.files[0])}
          className="mt-2"
        />
        {file && <div className="mt-2 text-sm text-gray-600">Selected: {file.name}</div>}

        <div className="mt-2 flex gap-2 items-center">
          <button className="btn" onClick={handleUpload}>
            Upload
          </button>
          {uploadProgress > 0 && uploadProgress < 100 && (
            <div>{uploadProgress}%</div>
          )}
        </div>

        {uploadSuccess && (
          <div className="mt-2 text-green-600 font-medium">
            ✅ Upload complete! Your video is now live.
          </div>
        )}
      </div>

      {/* Tutorials List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tutorials.map((t) => (
          <VideoCard key={t.id} tutorial={t} />
        ))}
      </div>
    </div>
  )
}
