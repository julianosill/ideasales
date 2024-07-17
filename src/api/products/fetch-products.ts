'use server'

import type { Prisma } from '@prisma/client'

import type { OrderType, ProductsOrderByType } from '@/@types/filter-params'
import type { ProductType } from '@/@types/products'
import { prisma } from '@/lib/prisma'

interface FetchProductsParams {
  pageIndex?: number
  perPage?: number
  orderBy?: ProductsOrderByType
  order?: OrderType
  search?: string
}

type Metadata = {
  page: number
  totalProducts: number
}

export interface FetchProductsResponse {
  products: ProductType[]
  metadata: Metadata
}

export async function fetchProducts({
  pageIndex = 0,
  perPage = 10,
  orderBy = 'date',
  order = 'desc',
  search,
}: FetchProductsParams): Promise<FetchProductsResponse> {
  const prismaQuery: Prisma.ProductFindManyArgs = {
    where: {
      OR: [
        { model: { contains: search, mode: 'insensitive' } },
        { name: { contains: search, mode: 'insensitive' } },
      ],
    },
    orderBy: {
      sales: orderBy === 'sales' ? order : undefined,
      createdAt: orderBy === 'date' ? order : undefined,
    },
    take: perPage,
    skip: pageIndex * perPage,
  }

  const [products, totalProducts] = await prisma.$transaction([
    prisma.product.findMany(prismaQuery),
    prisma.product.count({ where: prismaQuery.where }),
  ])

  const metadata = { page: pageIndex + 1, totalProducts }

  return { products, metadata }
}
