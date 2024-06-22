'use server'

import { compare } from 'bcryptjs'

import { prisma } from '@/lib/prisma'

interface AuthenticateProps {
  email: string
  password: string
}

type ErrorMessages =
  | 'auth/user-not-found'
  | 'auth/incorrect-password'
  | 'auth/user-not-verified'

interface AuthenticateResponse {
  message?: ErrorMessages
  user?: { id: string; role: 'ADMIN' | 'SALES' }
}

export async function authenticate({
  email,
  password,
}: AuthenticateProps): Promise<AuthenticateResponse> {
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) {
    return { message: 'auth/user-not-found' }
  }

  const doesPasswordMatch = await compare(password, user.password)
  if (!doesPasswordMatch) {
    return { message: 'auth/incorrect-password' }
  }

  if (user.verified === false) {
    return { message: 'auth/user-not-verified' }
  }

  const userData = { id: user.id, role: user.role }

  return { user: userData }
}
