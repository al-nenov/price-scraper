import { saveProduct } from 'utils/firebase/firebase'

export default function addProduct(req, res) {
  const { name, linksArray } = req.body
  try {
    saveProduct({
      name: name,
      links: [...linksArray]
    })
    res.status(200).json({response: 'success'})
  } catch (e) {
    console.log(e)
    res.status(400).json({response: e})
  }
}