import axios from 'axios'
import { getProducts, updateProduct } from '../firebase/firebase'

export const scrapeProductPrices = async () => {

  const products = await getProducts()
  products.map(async (product) => {
    if (!product.links) return product

    let updatedProduct = {
      ...product
    }

    const updatedLinks = await Promise.all(product?.links?.map(async (link) => {
      try {
        const { data } = await axios.get('api/getProductInfo', {
          params: link
        })
        if (!updatedProduct.lowestPrice || data.price < updatedProduct.lowestPrice) {
          updatedProduct.lowestPrice = data.price
        }
        updatedProduct.name = updatedProduct.name || data.name || ''
        updatedProduct.image = updatedProduct.image || data.image || ''
        return {
          ...link,
          price: data.price
        }
      } catch (error) {
        console.log(error)
      }
    }))

    const lowestPriceEver = (!product.lowestPriceEver || updatedProduct.lowestPrice < product.lowestPriceEver) ? updatedProduct.lowestPrice : product.lowestPriceEver
    updatedProduct.lowestPriceEver = lowestPriceEver


    updateProduct(product.id, {
      ...product,
      ...updatedProduct,
      links: updatedLinks,
      lowestPriceEver
    })
  })
}
