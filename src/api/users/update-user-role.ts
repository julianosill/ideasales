'use server'

import { type UserRole, usersApiErrors } from '@/@types/users'
import { getSession } from '@/auth/auth'
import { prisma } from '@/lib/prisma'

import { verifyAdmin } from '../auth/verify-admin'

interface UpdateUserRoleProps {
  userId: string
  role: UserRole
}

export async function updateUserRole({
  userId: id,
  role,
}: UpdateUserRoleProps) {
  await verifyAdmin()
  const session = await getSession()
  const user = await prisma.user.findUnique({ where: { id } })

  if (!user) {
    throw new Error(usersApiErrors.NOT_FOUND)
  }

  if (user.id === session?.user.id) {
    throw new Error(usersApiErrors.SAME_USER)
  }

  await prisma.user.update({ where: { id }, data: { role } })
}
