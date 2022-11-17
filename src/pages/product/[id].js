import { getProductById } from "utils/firebase/firebase"
import AddProductForm from "../../components/AddProduct/AddProductForm";

const ProductPage = ({ product, id }) => {

  return (
    <>
      <p>Product {product.id}</p>
      {product.name}
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
