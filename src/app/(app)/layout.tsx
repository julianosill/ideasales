import type { ReactNode } from 'react'

import { Footer } from '@/components/footer'
import { Header } from '@/components/header/header'

export default async function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="container flex min-h-svh flex-col gap-6">
      <Header />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  )
}
