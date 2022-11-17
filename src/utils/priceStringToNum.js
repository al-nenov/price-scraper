export const stripFromText = (str) => {
  if (typeof str !== 'string') {
    throw('Incorect format, Please provide string')
  }
  const striped = str.replace(/([^\d.,]+)|(\D+$)/g, '')
  const stotinkiRaw = striped.match(/[,.]\d{2}$/g)
  const levaRaw = stotinkiRaw ? striped.replace(stotinkiRaw[0], '') : striped
  const leva = levaRaw.replace(/[,.]/, '')
  const stotinki = stotinkiRaw ? stotinkiRaw[0].replace(/[,.]/, '.') : '.00'

  const finalPrice = `${leva}${stotinki}`
  
  const priceAsNumber = Number(finalPrice)

  if (isNaN(priceAsNumber)) {
    throw('Price is not available or in wrong format')
  }

  return priceAsNumber
}