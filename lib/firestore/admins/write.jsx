import { db, storage } from '@/lib/firebase'
import {
  collection,
  doc,
  setDoc,
  Timestamp,
  deleteDoc,
  updateDoc,
} from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

export const createNewAdmin = async ({ data, image }) => {
  if (!image) {
    throw new Error('Image is Required')
  }
  if (!data?.name) {
    throw new Error('Name is Required')
  }

  if (!data?.email) {
    throw new Error('Email is Required')
  }

  const newId = data?.email
  const imageRef = ref(storage, `admins/${newId}`)
  await uploadBytes(imageRef, image)
  const imageUrl = await getDownloadURL(imageRef)

  await setDoc(doc(db, `admins/${newId}`), {
    ...data,
    id: newId,
    imageUrl: imageUrl,
    timestampCreate: Timestamp.now(),
  })
}

export const updateAdmin = async ({ data, image }) => {
  if (!data?.name) {
    throw new Error('Name is Required')
  }

  if (!data?.email) {
    throw new Error('Email is Required')
  }

  if (!data?.id) {
    throw new Error('Id is Required')
  }
  const id = data?.id

  let imageUrl = data?.imageUrl

  if (image) {
    const imageRef = ref(storage, `admins/${id}`)
    await uploadBytes(imageRef, image)
    imageUrl = await getDownloadURL(imageRef)
  }

  if (id === data?.email) {
    await updateDoc(doc(db, `admins/${id}`), {
      ...data,
      imageUrl: imageUrl,
      timestampUpdate: Timestamp.now(),
    })
  } else {
    const newId = data?.email
    {
      /** Delete old id */
    }
    await deleteDoc(doc(db, `admins/${id}`))
    await setDoc(doc(db, `admins/${newId}`), {
      ...data,
      id: newId,
      imageUrl: imageUrl,
      timestampUpdate: Timestamp.now(),
    })
  }
}

export const deleteAdmin = async ({ id }) => {
  if (!id) {
    throw new Error('Id is required')
  }

  try {
    const adminDocRef = doc(db, `admins/${id}`)
    await deleteDoc(adminDocRef)
    console.log(`Admin with id ${id} deleted successfully.`)
  } catch (error) {
    console.error('Error deleting brand:', error)
    throw new Error(error.message)
  }
}
