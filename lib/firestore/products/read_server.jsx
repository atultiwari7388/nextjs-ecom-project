import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export const getProduct = async ({ id }) => {
  const data = await getDoc(doc(db, `products/${id}`))

  if (data.exists()) {
    return data.data()
  } else {
    return null
  }
}
