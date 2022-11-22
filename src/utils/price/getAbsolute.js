export const getMaxPrice = (log = []) => log.reduce((a, b) => a.price > b.price ? a : b, false)
export const getMinPrice = (log = []) => log.reduce((a, b) => a.price < b.price ? a : b, false)