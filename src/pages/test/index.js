import axios from "axios"
import { Button } from "primereact/button"
import { Card } from 'primereact/card';
import { InputText } from "primereact/inputtext";
import { useState } from "react";


const Test = () => {
  const [url, setUrl] = useState('')
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState('')
  const [stock, setStock] = useState('')

  const [response, setResponse] = useState()
  const [loading, setLoading] = useState(false)


  const handleSubmit = async (e) => {
    setLoading(true)
    setResponse({})
    e.preventDefault()
    try {
      const { data } = await axios.get('api/getProductInfo', {
        params:
        {
          url,
          xpath: price,
          name,
          image,
          stock,
        }
      })
      setResponse(data)
    } catch (e) {
      setResponse({ 'Error': e.message })
    }
    setLoading(false)
    // console.log(data)
  }

  return (
    <>
      <Card className="col-6">
        <form onSubmit={handleSubmit}>
          <InputText className="col-12 mb-3" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Url" />
          <InputText className="col-12 mb-3" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
          <InputText className="col-12 mb-3" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" />
          <InputText className="col-12 mb-3" value={image} onChange={(e) => setImage(e.target.value)} placeholder="Image" />
          <InputText className="col-12 mb-3" value={stock} onChange={(e) => setStock(e.target.value)} placeholder="Stock" />
          <Button label="Submit" type="submit" loading={loading} />
        </form>
        {response && Object.entries(response).map(([key, value]) => <p key={key}>{key}: {value}</p>)}
      </Card>
    </>
  )
}

export default Test