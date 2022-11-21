export const getDateFromTimestamp = (timestamp) => {
  const date = new Date(timestamp)
  return `${date.getUTCDate()}/${date.getUTCMonth()}/${date.getUTCFullYear()}`
}