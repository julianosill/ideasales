'use server'

import { redirect } from 'next/navigation'

import { getSession } from '@/auth/auth'
import { prisma } from '@/lib/prisma'

export async function verifyAdmin() {
  const session = await getSession()

  const user = await prisma.user.findUnique({ where: { id: session?.user.id } })

  if (!user || user.role !== 'ADMIN') {
    return redirect('/api/auth/sign-out')
  }

  return true
}
