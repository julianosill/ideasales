'use server'

import { usersApiErrors } from '@/@types/users'
import { prisma } from '@/lib/prisma'

import { verifyAdmin } from '../auth/verify-admin'

export async function approveUser(id: string) {
  await verifyAdmin()
  const user = await prisma.user.findUnique({ where: { id } })

  if (!user) {
    throw new Error(usersApiErrors.NOT_FOUND)
  }

  await prisma.user.update({ where: { id }, data: { verified: true } })
}
