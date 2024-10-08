import { db, storage } from '@/lib/firebase'
import {
  collection,
  deleteDoc,
  doc,
  setDoc,
  Timestamp,
} from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

export const createNewProduct = async ({ data, featureImage, imageList }) => {
  if (!data?.title) {
    throw new Error('Title is required')
  }
  if (!featureImage) {
    throw new Error('Feature Image is required')
  }

  // Upload the feature image
  const featureImageRef = ref(storage, `products/${featureImage?.name}`)
  await uploadBytes(featureImageRef, featureImage)

  // Get the download URL for the feature image
  const featureImageUrl = await getDownloadURL(featureImageRef)

  let imageUrlList = []

  // Loop through the imageList to upload each image and get its URL
  for (let i = 0; i < imageList?.length; i++) {
    const image = imageList[i]
    const imageRef = ref(storage, `products/${image?.name}`)

    // Upload the image
    await uploadBytes(imageRef, image)

    // Get the download URL for the uploaded image
    const imageUrl = await getDownloadURL(imageRef)
    imageUrlList.push(imageUrl)
  }

  // Generate a new document ID
  const newId = doc(collection(db, `ids`)).id

  // Save the product to the Firestore database
  await setDoc(doc(db, `products/${newId}`), {
    ...data,
    id: newId,
    featureImageUrl: featureImageUrl,
    imageList: imageUrlList,
    timestampCreate: Timestamp.now(),
  })
}

export const updateProduct = async ({ data, featureImage, imageList }) => {
  if (!data?.title) {
    throw new Error('Title is required')
  }

  if (!data?.id) {
    throw new Error('Id is required')
  }

  let featureImageUrl = data?.featureImageUrl ?? ''

  if (featureImage) {
    // Upload the feature image
    const featureImageRef = ref(storage, `products/${featureImage?.name}`)
    await uploadBytes(featureImageRef, featureImage)
    // Get the download URL for the feature image
    featureImageUrl = await getDownloadURL(featureImageRef)
  }

  let imageUrlList = imageList?.length === 0 ? data?.imageList : []

  // Loop through the imageList to upload each image and get its URL
  for (let i = 0; i < imageList?.length; i++) {
    const image = imageList[i]
    const imageRef = ref(storage, `products/${image?.name}`)

    // Upload the image
    await uploadBytes(imageRef, image)

    // Get the download URL for the uploaded image
    const imageUrl = await getDownloadURL(imageRef)
    imageUrlList.push(imageUrl)
  }

  // Save the product to the Firestore database
  await setDoc(doc(db, `products/${data?.id}`), {
    ...data,
    featureImageUrl: featureImageUrl,
    imageList: imageUrlList,
    timestampUpdate: Timestamp.now(),
  })
}

export const deleteProductItem = async ({ id }) => {
  if (!id) {
    throw new Error('Id is required')
  }

  try {
    const productDocRef = doc(db, `products/${id}`)
    await deleteDoc(productDocRef)
    console.log(`Products with id ${id} deleted successfully.`)
  } catch (error) {
    console.error('Error deleting product:', error)
    throw new Error(error.message)
  }
}
