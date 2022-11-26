import PriceChart from "components/PriceChart/PriceChart";
import ProductVendorLinksList from "components/Product/ProductVendorLinksList";
import Head from "next/head";
import { getProductById } from "utils/firebase/firebase"
import AddProductForm from "../../components/AddProduct/AddProductForm";


const ProductPage = ({ product, id }) => {


  return (
    <>
      <Head>
        <title>{product.name}</title>
      </Head>
      <picture>
        <img src={product.image} alt={product.name} width={'auto'} height={250} />
      </picture>
      <ProductVendorLinksList product={product} />
      <p>Product {product.id}</p>
      <PriceChart priceLog={product.priceLog} />
      <AddProductForm />
    </>
  )
}

export const getServerSideProps = async ({ query }) => {
  const product = await getProductById(query.id)
  return {
    props: {
      product: product,
      id: query.id,
    }
  }
}

export default ProductPage
