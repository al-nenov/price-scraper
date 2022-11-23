export const registerPriceMovement = (log, oldPrice, price) => {
  const priceLog = log ? [...log] : [{
    price,
    date: new Date().getTime()
  }]

  if (oldPrice > 0 && oldPrice !== price) {
    priceLog.push({
      price,
      date: new Date().getTime()
    })
  }
  return priceLog
}
