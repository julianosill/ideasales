'use server'

import { hash } from 'bcryptjs'

import { prisma } from '@/lib/prisma'

interface CreateUserProps {
  name: string
  email: string
  password: string
}

type ErrorMessages = 'auth/email-already-registered'

interface CreateUserResponse {
  success: boolean
  message?: ErrorMessages
}

export async function createUser({
  name,
  email,
  password,
}: CreateUserProps): Promise<CreateUserResponse> {
  const userWithSameEmail = await prisma.user.findUnique({ where: { email } })
  if (userWithSameEmail) {
    return { success: false, message: 'auth/email-already-registered' }
  }

  const hashedPassword = await hash(password, 6)

  const user = await prisma.user.create({
    data: { name, email, password: hashedPassword },
  })
  if (!user) {
    return { success: false }
  }

  return { success: true }
}
