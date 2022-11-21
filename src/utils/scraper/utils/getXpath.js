import { getVendorByName } from "utils/firebase/firebase"

export const getXpath = async (domain) => {
  if (!domain || typeof domain !== 'string') {
    return
  }
  const vendor = await getVendorByName(domain)
  return  vendor
}