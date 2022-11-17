import { app, db } from '/firebaseConfig'
import { collection, addDoc, getDocs, getDoc, doc, updateDoc } from 'firebase/firestore'
const dbInstance = collection(db, 'products')

export const getProducts = async () => {
  const docs = await getDocs(dbInstance).then(data => (data.docs))
  const products = docs.map((item) => (
    {
      ...item.data(),
      id: item.id,
    }
  ))

  return products
}

export const getProductById = async (id) => {
  const docRef = doc(dbInstance, id)
  const docSnapshot = await getDoc(docRef)
  return docSnapshot.exists() && docSnapshot.data()
}

export const updateProduct = async (id, values) => {
  try {
    const docRef = doc(dbInstance, id)
    updateDoc(docRef, { ...values })
  } catch (e) { console.log('Update failed with error -> ', e) }
}

export const saveProduct = (product) => {
  try {
    addDoc(dbInstance, {
      ...product
    })
  } catch (e) { console.log('Add product failed with error -> ', e) }
}

export const editProduct = () => { }
export const removeProduct = () => { }