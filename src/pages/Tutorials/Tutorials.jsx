import React, { useEffect, useState } from 'react'
import { collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { db, storage } from '../../firebase'
import { v4 as uuidv4 } from 'uuid'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { increment } from 'firebase/firestore'
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
    console.log("👉 Upload button clicked")

    if (loading) {
      console.warn("⚠️ Still checking login state")
      return alert('Please wait, checking login...')
    }
    if (!user) {
      console.warn("⚠️ No user logged in")
      return alert('Login to upload')
    }
    if (!file) {
      console.warn("⚠️ No file selected")
      return alert('Select a video file')
    }

    // File validation
    const maxSize = 100 * 1024 * 1024 // 100MB
    if (file.size > maxSize) {
      console.warn("⚠️ File too large:", file.size)
      return alert('File is too large. Maximum size is 100MB.')
    }

    if (!file.type.startsWith('video/')) {
      console.warn("⚠️ Invalid file type:", file.type)
      return alert('Please select a video file.')
    }

    console.log("✅ User:", user.email)
    console.log("✅ File selected:", file.name, file.type, `${(file.size / 1024 / 1024).toFixed(2)}MB`)

    const id = uuidv4()
    const fileName = `${id}-${file.name}`.replace(/[^a-zA-Z0-9.-]/g, '_') // Sanitize filename
    const storageRef = ref(storage, `tutorials/${fileName}`)
    console.log("✅ Storage path:", `tutorials/${fileName}`)
    
    const uploadTask = uploadBytesResumable(storageRef, file)

    setUploadSuccess(false) // reset before new upload

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const pct = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
        console.log(`📤 Upload progress: ${pct}% (${snapshot.bytesTransferred}/${snapshot.totalBytes} bytes)`)
        setUploadProgress(pct)
      },
      (err) => {
        console.error("❌ Upload error:", err)
        console.error("❌ Error code:", err.code)
        console.error("❌ Error message:", err.message)
        console.error("❌ Error details:", err)
        
        let errorMessage = "Upload failed: "
        if (err.code === 'storage/unauthorized') {
          errorMessage += "Permission denied. Check Firebase Storage rules."
        } else if (err.code === 'storage/canceled') {
          errorMessage += "Upload was canceled."
        } else if (err.code === 'storage/unknown') {
          errorMessage += "Unknown error occurred. This might be a CORS issue."
        } else {
          errorMessage += err.message
        }
        alert(errorMessage)
      },
      async () => {
        try {
          const url = await getDownloadURL(uploadTask.snapshot.ref)
          console.log("✅ File uploaded, URL:", url)

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

          console.log("✅ Firestore record created")

          setFile(null)
          setUploadProgress(0)
          setUploadSuccess(true)
        } catch (e) {
          console.error("❌ Firestore write error:", e)
          alert("Error saving video info: " + e.message)
        }
      }
    )
  }

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Tutorials</h1>

      {/* Show logged in user */}
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

        {/* Show selected file name */}
        {file && (
          <div className="mt-2 text-sm text-gray-600">
            Selected: {file.name}
          </div>
        )}

        <div className="mt-2 flex gap-2 items-center">
          <button className="btn" onClick={handleUpload}>
            Upload
          </button>
          {uploadProgress > 0 && uploadProgress < 100 && (
            <div>{uploadProgress}%</div>
          )}
        </div>

        {/* Show success message */}
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tutorials.map((t) => (
          <Link
            key={t.id}
            to={`/tutorials/${t.id}`}
            className="block bg-white p-3 rounded shadow"
          >
            <div className="h-40 bg-gray-200 flex items-center justify-center">
              Video thumbnail
            </div>
            <h4 className="mt-2 font-semibold truncate">{t.title}</h4>
            <div className="text-sm text-gray-600">{t.uploaderEmail}</div>
            <div className="text-sm mt-1">
              Views: {t.views || 0} • Rating: {t.ratingAvg || 0}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
