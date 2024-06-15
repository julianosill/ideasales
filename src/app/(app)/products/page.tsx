import { PackagePlus } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'

import { PageHeader } from '@/components/page-header'
import { Button } from '@/components/ui/button'

import { ProductsTable } from './_components/products-table'

export const metadata: Metadata = {
  title: 'Produtos',
  description: 'Liste e gerencie os produtos cadastrados.',
}

export default function ProductsPage() {
  return (
    <main>
      <PageHeader.Root className="flex-row flex-wrap items-end justify-between gap-x-8 gap-y-6">
        <div>
          <PageHeader.BackButton />
          <PageHeader.Title>Produtos</PageHeader.Title>
        </div>

        <Button asChild>
          <Link href="/products/add">
            <PackagePlus className="size-5" />
            Cadastrar produto
          </Link>
        </Button>
      </PageHeader.Root>

      <ProductsTable />
    </main>
  )
}
