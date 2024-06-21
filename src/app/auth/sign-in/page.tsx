import type { Metadata } from 'next'
import Image from 'next/image'

import loginImage from '@/assets/login.jpg'
import { Logo } from '@/components/logo'
import { InternalLink } from '@/components/ui/internal-link'
import { Separator } from '@/components/ui/separator'

import { SignInForm } from './sign-in-form'

export const metadata: Metadata = { title: 'Acessar conta' }

export default function SignInPage() {
  return (
    <>
      <div className="flex-1 max-sm:hidden">
        <Image
          src={loginImage}
          alt="Mesa de madeira montada com talheres e pratos vazios e uma cadeira de madeira com uma almofada florida sobre o assento."
          className="size-full object-cover"
          priority
        />
      </div>

      <main className="flex w-full flex-col items-center justify-center gap-6 px-8 py-12 sm:w-[24rem] sm:p-16 lg:w-[26rem]">
        <Logo className="mb-6 h-5 w-auto fill-primary sm:h-6" />

        <h1 className="text-center text-xl font-semibold text-accent-foreground">
          Acesse sua conta
        </h1>

        <SignInForm />

        <InternalLink
          href="/auth/recover-password"
          className="text-center text-sm"
        >
          Esqueci minha senha
        </InternalLink>

        <Separator />

        <p className="text-center text-sm text-muted-foreground">
          Não possui conta?{' '}
          <InternalLink href="/auth/sign-up" className="whitespace-nowrap">
            Cadastre-se aqui
          </InternalLink>
        </p>
      </main>
    </>
  )
}
