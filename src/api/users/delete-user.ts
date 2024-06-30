'use server'

import { usersApiErrors } from '@/@types/users'
import { getSession } from '@/auth/auth'
import { prisma } from '@/lib/prisma'

import { verifyAdmin } from '../auth/verify-admin'

export async function deleteUser(id: string) {
  await verifyAdmin()
  const session = await getSession()
  const user = await prisma.user.findUnique({ where: { id } })

  if (!user) {
    throw new Error(usersApiErrors.NOT_FOUND)
  }

  if (user.id === session?.user.id) {
    throw new Error(usersApiErrors.SAME_USER)
  }

  await prisma.user.delete({ where: { id } })
}
