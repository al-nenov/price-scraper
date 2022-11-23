import { vendorExistsInDb } from "utils/firebase/firebase"
import { getVendor } from "./getVendor"

export const vendorExist = (url) => {
  const { domain } = getVendor(url)
  return vendorExistsInDb(domain)
}