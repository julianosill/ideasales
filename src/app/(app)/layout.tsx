import type { ReactNode } from 'react'

import { Footer } from '@/components/footer'
import { Header } from '@/components/header/header'

export default async function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="container">
      <Header />
      <div className="py-8">{children}</div>
      <Footer />
    </div>
  )
}
