export const PRODUCTS_API_ERRORS = {
  NOT_FOUND: 'product/product-not-found',
} as const

export type ProductType = {
  id: string
  model: string
  name: string
  color: string
  sales: number
  createdAt: Date
}
