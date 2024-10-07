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

export const createNewBrand = async ({ data, image }) => {
  if (!image) {
    throw new Error('Image is Required')
  }
  if (!data?.name) {
    throw new Error('Name is Required')
  }

  const newId = doc(collection(db, `ids`)).id
  const imageRef = ref(storage, `brands/${newId}`)
  await uploadBytes(imageRef, image)
  const imageUrl = await getDownloadURL(imageRef)

  await setDoc(doc(db, `brands/${newId}`), {
    ...data,
    id: newId,
    imageUrl: imageUrl,
    timestampCreate: Timestamp.now(),
  })
}

export const updateBrand = async ({ data, image }) => {
  if (!data?.name) {
    throw new Error('Name is Required')
  }

  if (!data?.id) {
    throw new Error('Id is Required')
  }
  const id = data?.id

  let imageUrl = data?.imageUrl

  if (image) {
    const imageRef = ref(storage, `brands/${id}`)
    await uploadBytes(imageRef, image)
    imageUrl = await getDownloadURL(imageRef)
  }

  await updateDoc(doc(db, `brands/${id}`), {
    ...data,
    imageUrl: imageUrl,
    timestampUpdate: Timestamp.now(),
  })
}

export const deleteBrand = async ({ id }) => {
  if (!id) {
    throw new Error('Id is required')
  }

  try {
    const categoryDocRef = doc(db, `brands/${id}`)
    await deleteDoc(categoryDocRef)
    console.log(`Brand with id ${id} deleted successfully.`)
  } catch (error) {
    console.error('Error deleting brand:', error)
    throw new Error(error.message)
  }
}
