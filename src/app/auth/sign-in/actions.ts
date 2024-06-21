'use server'

import { redirect } from 'next/navigation'

import { authenticate } from '@/api/auth/authenticate'
import { createSession } from '@/auth/auth'

interface SignInActionProps {
  email: string
  password: string
}

const errorMessages = {
  'auth/user-not-found': 'Credenciais inválidas. Por favor, tente novamente.',
  'auth/incorrect-password':
    'Credenciais inválidas. Por favor, tente novamente.',
  'auth/user-not-verified':
    'Conta ainda não verificada. Por favor, aguarde sua aprovação.',
  default:
    'Um erro inesperado ocorreu. Por favor, tente novamente em alguns minutos.',
}

export async function signInAction({ email, password }: SignInActionProps) {
  try {
    const result = await authenticate({ email, password })

    if (!result.user) {
      return {
        success: false,
        message: errorMessages[result.message ?? 'default'],
      }
    }

    await createSession(result.user)
  } catch (error) {
    console.error(error)
    return { success: false, message: errorMessages.default }
  }

  redirect('/')
}
