'use server'

import { PRODUCTS_API_ERRORS } from '@/@types/products'
import { prisma } from '@/lib/prisma'

import { verifyAdmin } from '../auth/verify-admin'

export async function deleteProduct(id: string) {
  await verifyAdmin()
  const product = await prisma.product.findUnique({ where: { id } })

  if (!product) {
    throw new Error(PRODUCTS_API_ERRORS.NOT_FOUND)
  }

  await prisma.product.delete({ where: { id } })
}
