import type { ReactNode } from 'react'

import { Header } from '@/components/header/header'

export default async function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="container">
      <Header />
      <div className="pb-8 pt-12">{children}</div>
    </div>
  )
}
