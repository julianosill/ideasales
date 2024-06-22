'use server'

import { createUser } from '@/api/users/create-user'

interface SignUpActionProps {
  name: string
  email: string
  password: string
}

const errorMessages = {
  'auth/email-already-registered':
    'E-mail já cadastrado. Por favor, cadastre sua conta com outro e-mail.',
  default:
    'Um erro inesperado ocorreu. Por favor, tente novamente em alguns minutos.',
}

export async function signUpAction({
  name,
  email,
  password,
}: SignUpActionProps) {
  try {
    const result = await createUser({ name, email, password })

    if (result.success === false) {
      return {
        success: false,
        message: errorMessages[result.message ?? 'default'],
      }
    }
  } catch (error) {
    console.error(error)
    return { success: false, message: errorMessages.default }
  }
}
