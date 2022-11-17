import { VENDORS_XPATHS } from "constants/vendors"

export const getXpath = (domain) => {
  if (!domain || typeof domain !== 'string') {
    return
  }

  return  VENDORS_XPATHS[domain]
}