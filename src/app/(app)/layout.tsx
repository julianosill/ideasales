import type { ReactNode } from 'react'

import { Header } from '@/components/header/header'

export default async function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="container flex flex-col gap-12">
      <Header />
      {children}
    </div>
  )
}
