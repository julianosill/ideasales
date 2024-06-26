'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Alert } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { HideAndShowButton } from '@/components/ui/hide-and-show-button'
import { Input } from '@/components/ui/input'
import { InputError } from '@/components/ui/input-error'
import { Label } from '@/components/ui/label'

import { signInAction } from './actions'

const formSchema = z.object({
  email: z.string().email({ message: 'Insira um e-mail válido' }),
  password: z.string().min(1, { message: 'Insira sua senha' }),
})

type FormSchema = z.infer<typeof formSchema>

export function SignInForm() {
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  })

  async function handleSignIn({ email, password }: FormSchema) {
    const result = await signInAction({ email, password })
    if (result?.success === false && result.message) {
      return setError('root.auth', { message: result.message })
    }
  }

  return (
    <form
      onSubmit={handleSubmit(handleSignIn)}
      className="flex w-full flex-col gap-3"
    >
      <div className="relative space-y-1">
        <Label htmlFor="email">E-mail</Label>
        <Input
          type="email"
          id="email"
          placeholder="email@ideasales.com.br"
          autoComplete="email"
          {...register('email')}
        />
        {errors?.email?.message && <InputError text={errors.email.message} />}
      </div>

      <div className="relative space-y-1">
        <Label htmlFor="password">Senha</Label>
        <Input
          type={showPassword ? 'text' : 'password'}
          id="password"
          placeholder="****"
          {...register('password')}
        />
        <HideAndShowButton
          className="absolute bottom-1 right-1 "
          visible={showPassword}
          onClick={() => setShowPassword(!showPassword)}
        />
        {errors?.password?.message && (
          <InputError text={errors.password.message} />
        )}
      </div>

      <Button type="submit" className="mt-3" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            Autenticando
            <Loader2 className="size-4 animate-spin" />
          </>
        ) : (
          <>
            Acessar
            <ArrowRight className="size-4" />
          </>
        )}
      </Button>

      {errors?.root?.auth && (
        <Alert.Root variant="error">
          <Alert.Title>Autenticação falhou!</Alert.Title>
          <Alert.Description>{errors.root.auth.message}</Alert.Description>
        </Alert.Root>
      )}
    </form>
  )
}
