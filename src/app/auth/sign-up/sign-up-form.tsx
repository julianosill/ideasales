'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, UserPlus } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Alert } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { HideAndShowButton } from '@/components/ui/hide-and-show-button'
import { Input } from '@/components/ui/input'
import { InputError } from '@/components/ui/input-error'
import { Label } from '@/components/ui/label'

import { signUpAction } from './actions'

const formSchema = z
  .object({
    name: z.string().min(2, { message: 'Insira seu nome' }),
    email: z.string().email({ message: 'Insira um e-mail válido' }),
    password: z.string().min(6, { message: 'Mínimo de 6 ou mais caracteres' }),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'As senhas devem ser iguais',
    path: ['password_confirmation'],
  })

type FormSchema = z.infer<typeof formSchema>

export function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    setError,
    reset,
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  })

  async function handleSignUp({ name, email, password }: FormSchema) {
    const result = await signUpAction({ name, email, password })
    if (result?.success === false && result.message) {
      return setError('root.auth', { message: result.message })
    }
    reset()
  }

  return (
    <form
      onSubmit={handleSubmit(handleSignUp)}
      className="flex w-full flex-col gap-3"
    >
      <div className="relative space-y-1">
        <Label htmlFor="name">Nome</Label>
        <Input
          id="name"
          placeholder="Nome Completo"
          autoComplete="name"
          {...register('name')}
        />
        {errors?.name?.message && <InputError text={errors.name.message} />}
      </div>

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

      <div className="relative space-y-1">
        <Label htmlFor="password_confirmation">Repita a senha</Label>
        <Input
          type={showPassword ? 'text' : 'password'}
          id="password_confirmation"
          placeholder="****"
          {...register('password_confirmation')}
        />

        {errors?.password_confirmation?.message && (
          <InputError text={errors.password_confirmation.message} />
        )}
      </div>

      <Button type="submit" className="mt-3" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            Cadastrando
            <Loader2 className="size-4 animate-spin" />
          </>
        ) : (
          <>
            Cadastrar
            <UserPlus className="size-4" />
          </>
        )}
      </Button>

      {errors?.root?.auth && (
        <Alert.Root variant="error">
          <Alert.Title>Cadastro falhou!</Alert.Title>
          <Alert.Description>{errors.root.auth.message}</Alert.Description>
        </Alert.Root>
      )}

      {isSubmitSuccessful && (
        <Alert.Root variant="success">
          <Alert.Title>Cadastro realizado com sucesso!</Alert.Title>
          <Alert.Description>
            Aguarde a aprovação da sua conta.
          </Alert.Description>
        </Alert.Root>
      )}
    </form>
  )
}
