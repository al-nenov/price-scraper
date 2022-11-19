export const registerPriceMovement = (log, oldPrice, price) => {
  const priceLog = log ? [...log] : []

  if (oldPrice !== price) {
    priceLog.push({
      price,
      date: new Date().getTime()
    })
  }
  return priceLog
}
