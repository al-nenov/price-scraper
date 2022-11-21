import { useRouter } from "next/router";
import { Button } from "primereact/button";
import { getVendors } from "../../utils/firebase/firebase";



const VendorsListPage = ({ vendors }) => {
  const router = useRouter()

  return (
    <>
      <Button onClick={() => {router.push('/addvendor')}}>Add vendor</Button>
      {vendors.map((vendor) => <h4 key={vendor.id}>{vendor.id}</h4>)}
    </>
  )
}

export const getServerSideProps = async () => {
  const productsData = await getVendors()


  return {
    props: {
      vendors: productsData,
    }
  }
}

export default VendorsListPage
