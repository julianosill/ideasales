'use server'

import { PRODUCTS_API_ERRORS, type ProductType } from '@/@types/products'
import { prisma } from '@/lib/prisma'

export async function getProduct(id: string): Promise<ProductType> {
  const product = await prisma.product.findUnique({ where: { id } })

  if (!product) {
    throw new Error(PRODUCTS_API_ERRORS.NOT_FOUND)
  }

  return product
}
