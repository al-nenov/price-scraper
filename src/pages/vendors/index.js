import { useRouter } from "next/router";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { getVendors } from "../../utils/firebase/firebase";



const VendorsListPage = ({ vendors }) => {
  const router = useRouter()

  return (
    <>
      <Button onClick={() => { router.push('/addvendor') }}>Add vendor</Button>
      <div className="flex">
        {vendors.map((vendor) => <Card key={vendor.id}><h4 >{vendor.id}</h4></Card>)}

      </div>
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
