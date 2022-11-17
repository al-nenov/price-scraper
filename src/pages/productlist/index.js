import ProductList from "../../components/ProductList/ProductList"
import { getProducts } from "../../utils/firebase/firebase";



const ProductListPage = ({products}) => {
  
  return <ProductList products={products} />
}

export const getServerSideProps = async () => {
  const productsData = await getProducts()

  
  return {
    props: {
      products: productsData,
    }
  }
}

export default ProductListPage
