import type { Metadata } from 'next'
import Image from 'next/image'

import signUpImage from '@/assets/sign-up.jpg'
import { Logo } from '@/components/logo'
import { InternalLink } from '@/components/ui/internal-link'
import { Separator } from '@/components/ui/separator'

import { SignUpForm } from './sign-up-form'

export const metadata: Metadata = { title: 'Cadastrar conta' }

export default function SignUpPage() {
  return (
    <>
      <main className="flex w-full flex-col items-center justify-center gap-6 px-8 py-12 sm:w-[24rem] sm:p-16 lg:w-[26rem]">
        <Logo className="mb-6 h-5 w-auto fill-primary sm:h-6" />

        <h1 className="text-center text-xl font-semibold text-accent-foreground">
          Cadastre sua conta
        </h1>

        <SignUpForm />

        <Separator />

        <p className="text-center text-sm text-muted-foreground">
          Já possui conta?{' '}
          <InternalLink href="/auth/sign-in" className="whitespace-nowrap">
            Acessar conta
          </InternalLink>
        </p>
      </main>

      <div className="flex-1 max-sm:hidden">
        <Image
          src={signUpImage}
          alt="Mesa de madeira com decorações sobre ela e cadeiras brancas ao redor."
          className="size-full object-cover"
          priority
        />
      </div>
    </>
  )
}
