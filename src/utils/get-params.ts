import type { ReadonlyURLSearchParams } from 'next/navigation'
import { z } from 'zod'

import type { OrderType, ProductsOrderByType } from '@/@types/filter-params'

export function getParams(params: ReadonlyURLSearchParams) {
  const pageIndex = z.coerce
    .number()
    .min(1)
    .transform((page) => page - 1)
    .parse(params.get('page') ?? '1')

  const perPage = z.coerce
    .number()
    .min(1)
    .parse(params.get('perPage') ?? '10')

  const productsOrderBy: ProductsOrderByType = z
    .enum(['date', 'sales'])
    .parse(params.get('orderBy') ?? 'date')

  const order: OrderType = z
    .enum(['desc', 'asc'])
    .parse(params.get('order') ?? 'desc')

  const search = z.string().parse(params.get('search') ?? '')

  return { pageIndex, perPage, productsOrderBy, order, search }
}
