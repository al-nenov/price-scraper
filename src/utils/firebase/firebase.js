import { app, db } from '/firebaseConfig'
import { collection, addDoc, getDocs, getDoc, doc, updateDoc, setDoc } from 'firebase/firestore'
const dbInstance = (colection) => collection(db, colection)

export const getProducts = async () => {
  const docs = await getDocs(dbInstance('products')).then(data => (data.docs))
  const products = docs.map((item) => (
    {
      ...item.data(),
      id: item.id,
    }
  ))

  return products
}

export const getProductById = async (id) => {
  const docRef = doc(dbInstance('products'), id)
  const docSnapshot = await getDoc(docRef)
  return docSnapshot.exists() && docSnapshot.data()
}

export const updateProduct = async (id, values) => {
  try {
    const docRef = doc(dbInstance('products'), id)
    updateDoc(docRef, { ...values })
  } catch (e) { throw('Update failed with error -> ', e) }
}

export const saveProduct = (product) => {
  try {
    addDoc(dbInstance('products'), {
      ...product
    })
  } catch (e) { throw('Add product failed with error -> ', e) }
}

export const editProduct = () => { }
export const removeProduct = () => { }


// Vendors
export const getVendorByName = async (name) => {
  const docRef = doc(collection(db, 'vendors'), name)
  const docSnapshot = await getDoc(docRef)
  return docSnapshot.exists() && docSnapshot.data()
}

export const getVendors = async () => {
  const docs = await getDocs(dbInstance('vendors')).then(data => (data.docs))
  const vendors = docs.map((item) => (
    {
      ...item.data(),
      id: item.id,
    }
  ))
  return vendors
}


export const addVendor = async (data) => {
  try {
    setDoc(doc(db, 'vendors', data.vendorUrl), {
      ...data,
    })
  } catch (e) { throw('Add vendor failed with error -> ', e) }
}