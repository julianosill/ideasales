import type { Metadata } from 'next'
import { Suspense } from 'react'

import { PageHeader } from '@/components/page-header'

import { UsersTable } from './_components/users-table'

export const metadata: Metadata = {
  title: 'Usuários',
  description: 'Liste e gerencie os usuários cadastrados.',
}

export default async function UsersPage() {
  return (
    <main>
      <PageHeader.Root>
        <PageHeader.BackButton />
        <PageHeader.Title>Usuários</PageHeader.Title>
      </PageHeader.Root>

      <Suspense>
        <UsersTable />
      </Suspense>
    </main>
  )
}
