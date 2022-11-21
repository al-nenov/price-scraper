import axios from "axios"
import { Button } from "primereact/button"

const request = {
  url: 'https://techmart.bg/%D0%9C%D1%83%D0%BB%D1%82%D0%B8%D0%B3%D1%80%D0%B8%D0%BB%20Tefal%20GC712834%20Optigrill'
}


const Test = () => {
  const handleClick = async () => {
    const { data } = await axios.get('api/getProductInfo', {params: request})
    console.log(data)

  }

  return (
    <>
      <Button label="Submit"  onClick={handleClick} />
    </>
  )
}

export default Test