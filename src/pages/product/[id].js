import PriceChart from "components/PriceChart/PriceChart";
import ProductVendorLinksList from "components/Product/ProductVendorLinksList";
import { getProductById } from "utils/firebase/firebase"
import AddProductForm from "../../components/AddProduct/AddProductForm";


const ProductPage = ({ product, id }) => {


  return (
    <>
      <ProductVendorLinksList product={product} />
      <p>Product {product.id}</p>
      <h3>draw price movement</h3>
      <PriceChart />
      <AddProductForm />
    </>
  )
}

export const getServerSideProps = async ({ query }) => {
  const product = await getProductById(query.id)
  return {
    props: {
      product: product,
      id: query.id
    }
  }
}

export default ProductPage
