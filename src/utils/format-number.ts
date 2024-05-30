export function formatNumber(value: number | string) {
  const filteredNumbers = String(value).replace(/\D/g, '')

  return Number(filteredNumbers).toLocaleString('pt-BR')
}
