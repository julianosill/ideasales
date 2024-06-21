import { redirect } from 'next/navigation'
import type { ReactNode } from 'react'

import { isAuthenticated } from '@/auth/auth'

export default async function AuthLayout({
  children,
}: {
  children: ReactNode
}) {
  if (await isAuthenticated()) {
    redirect('/')
  }

  return (
    <div className="container">
      <div className="flex min-h-svh items-center justify-center py-8">
        <div className="flex w-full max-w-4xl overflow-hidden rounded-3xl border border-border bg-card shadow-md">
          {children}
        </div>
      </div>
    </div>
  )
}
