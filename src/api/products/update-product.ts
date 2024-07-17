'use server'

import { PRODUCTS_API_ERRORS } from '@/@types/products'
import { prisma } from '@/lib/prisma'

import { verifyAdmin } from '../auth/verify-admin'

interface UpdateProductProps {
  id: string
  model: string
  name: string
  color: string
}

export async function updateProduct({
  id,
  model,
  name,
  color,
}: UpdateProductProps) {
  await verifyAdmin()
  const product = await prisma.product.findUnique({ where: { id } })

  if (!product) {
    throw new Error(PRODUCTS_API_ERRORS.NOT_FOUND)
  }

  await prisma.product.update({
    where: { id },
    data: { model, name, color },
  })
}
