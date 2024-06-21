import 'server-only'

import { jwtVerify, SignJWT } from 'jose'
import { cookies } from 'next/headers'

import { env } from '@/env'

type SessionType = {
  user: { id: string; role: 'ADMIN' | 'SALES' }
  expires: Date
}

const key = new TextEncoder().encode(env.JWT_SECRET_KEY)

export async function encrypt(payload: SessionType) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7days')
    .sign(key)
}

async function decrypt(session: string) {
  try {
    const { payload } = await jwtVerify(session, key, {
      algorithms: ['HS256'],
    })
    return payload as SessionType
  } catch (error) {
    return null
  }
}

export async function isAuthenticated() {
  const cookie = cookies().get('session')?.value
  if (!cookie) return false

  const session = await decrypt(cookie)
  if (!session) return false

  return !!session
}

export async function createSession(user: SessionType['user']) {
  const expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7) // 7 days
  const session = await encrypt({ user, expires })

  cookies().set('session', session, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    expires,
  })
}

export async function getSession() {
  const cookie = cookies().get('session')?.value
  if (!cookie) return null

  const session = await decrypt(cookie)
  if (!session) return null

  return session
}
