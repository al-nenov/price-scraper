export const getVendor = (url) => {
  if (typeof url !== 'string') {
    return
  }

  const regex = /^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/?\n]+)/
  const [withProtocol, domain] = url.match(regex)

  return {
    full: withProtocol,
    domain: domain
  }
}