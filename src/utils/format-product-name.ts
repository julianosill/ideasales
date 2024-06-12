export function formatProductName(name: string, maxLength: number = 80) {
  if (name.length <= maxLength + 3) return name

  return name.substring(0, maxLength) + '...'
}
