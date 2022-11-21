import axios from 'axios'
import { getProducts, updateProduct } from '../firebase/firebase'
import { registerPriceMovement } from './utils/registerPriceMovement'

export const scrapeProductPrices = async () => {

  const products = await getProducts()
  products.map(async (product) => {
    if (!product.links) return product

    let updatedProduct = {
      ...product,
    }

    const updatedLinks = await Promise.all(product?.links?.map(async (link, i) => {
      try {
        const { data } = await axios.get('api/getProductInfo', {
          params: link
        })

        if (i === 0) {
          // Reset lowest price on updating links
          updatedProduct.lowestPrice = data.price
        }

        const priceLog = registerPriceMovement(link.priceLog, link.price, data.price)
        updatedProduct.lowestPrice = Math.min(updatedProduct.lowestPrice, data.price)
        updatedProduct.name = product.name || data.name || ''
        updatedProduct.image = product.image || data.image || ''
        return {
          ...link,
          price: data.price,
          priceLog,
        }
      } catch (error) {
        console.log(error)
      }
    }))
    // update lowest and lowest ever for product
    const productPriceLog = registerPriceMovement(product.priceLog, product.lowestPrice, updatedProduct.lowestPrice)
    const lowestPriceEver = (!product.lowestPriceEver || updatedProduct.lowestPrice < product.lowestPriceEver) ? updatedProduct.lowestPrice : product.lowestPriceEver

    updateProduct(product.id, {
      ...product,
      ...updatedProduct,
      links: updatedLinks,
      priceLog: productPriceLog,
      lowestPriceEver
    })
  })
}
