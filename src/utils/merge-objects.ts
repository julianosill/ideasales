// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyObject = { [key: string]: any }

export function mergeObjects(target: AnyObject, source: AnyObject): AnyObject {
  const output = { ...target }

  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (
        typeof source[key] === 'object' &&
        source[key] !== null &&
        !Array.isArray(source[key])
      ) {
        output[key] = mergeObjects(target[key] || {}, source[key])
      } else {
        output[key] = source[key]
      }
    }
  }

  return output
}
