export type SearchFormType = {
  searchInput?: { value: string; placeholder: string }
}

export const usersStatusOptions = ['pending'] as const
export type UsersStatusType = (typeof usersStatusOptions)[number]

export const usersOrderByOptions = ['name', 'date', 'role', 'status'] as const
export type UsersOrderByType = (typeof usersOrderByOptions)[number]

export const productsOrderByOptions = ['date', 'sales'] as const
export type ProductsOrderByType = (typeof productsOrderByOptions)[number]

export type OrderByOptions<T> = {
  value: T
  name: string
}

export type OrderByType<T> = {
  value: T
  options: OrderByOptions<T>[]
}

export type OrderType = 'asc' | 'desc'
