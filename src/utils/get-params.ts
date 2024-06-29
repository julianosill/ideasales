import { type ReadonlyURLSearchParams } from 'next/navigation'
import { z } from 'zod'

import {
  productsOrderByOptions,
  usersOrderByOptions,
  usersStatusOptions,
} from '@/@types/filter-params'

export function getPageIndexParam(params: ReadonlyURLSearchParams) {
  const result = z.coerce
    .number()
    .min(1)
    .transform((page) => page - 1)
    .safeParse(params.get('page'))
  return result.data ?? 0
}

export function getPerPageParam(params: ReadonlyURLSearchParams) {
  const result = z.coerce.number().min(1).safeParse(params.get('perPage'))
  return result.data ?? undefined
}

export function getUsersOrderByParam(params: ReadonlyURLSearchParams) {
  const result = z.enum(usersOrderByOptions).safeParse(params.get('orderBy'))
  return result.data ?? 'name'
}

export function getProductsOrderByParam(params: ReadonlyURLSearchParams) {
  const result = z.enum(productsOrderByOptions).safeParse(params.get('orderBy'))
  return result.data ?? undefined
}

export function getOrderParam(params: ReadonlyURLSearchParams) {
  const result = z.enum(['desc', 'asc']).safeParse(params.get('order'))
  return result.data ?? 'desc'
}

export function getStatusParam(params: ReadonlyURLSearchParams) {
  const result = z.enum(usersStatusOptions).safeParse(params.get('status'))
  return result.data ?? undefined
}

export function getSearchParam(params: ReadonlyURLSearchParams) {
  const result = z.string().safeParse(params.get('search'))
  return result.data ?? ''
}
