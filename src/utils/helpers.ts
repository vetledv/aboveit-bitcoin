/**
 * @param object any object
 * @returns array of all keys in the object
 */
export const objectKeysToArray = <T extends object>(object: T) => {
  const keys = Object.keys(object)
  return keys.map((key) => key as keyof T)
}

/**
 * @param unix unix timestamp
 * @returns Date object
 */
export const unixToDate = (unix: number) => {
  return new Date(unix * 1000)
}
