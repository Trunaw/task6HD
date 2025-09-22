import { db, storage } from '../firebase'
import { collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { v4 as uuidv4 } from 'uuid'

export const uploadVideo = (file, user, onProgress) => {
  return new Promise((resolve, reject) => {
    if (!file) return reject('No file selected')
    if (!user) return reject('User must be logged in')

    const id = uuidv4()
    const storageRef = ref(storage, `tutorials/${id}-${file.name}`)
    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on('state_changed', (snapshot) => {
      const pct = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
      onProgress(pct)
    }, reject, async () => {
      const url = await getDownloadURL(uploadTask.snapshot.ref)
      const docRef = await addDoc(collection(db, 'tutorials'), {
        title: file.name,
        videoUrl: url,
        uploader: user.uid,
        uploaderEmail: user.email,
        views: 0,
        ratingAvg: 0,
        ratingsCount: 0,
        createdAt: new Date(),
      })
      resolve(docRef)
    })
  })
}

export const listenTutorials = (callback) => {
  const q = query(collection(db, 'tutorials'), orderBy('createdAt', 'desc'))
  return onSnapshot(q, (snap) => callback(snap.docs.map(d => ({ id: d.id, ...d.data() }))))
}
