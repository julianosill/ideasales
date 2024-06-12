export type FormType = {
  search?: {
    value: string
    placeholder: string
  }
}

export type ProductsOrderByType = 'date' | 'sales'

export type OrderByOptions = {
  value: string
  name: string
}

export type OrderByType<T> = {
  value: T
  options: OrderByOptions[]
}

export type OrderType = 'asc' | 'desc'
