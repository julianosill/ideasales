import { Plus } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'

import { MonthCard } from './_components/month-card'
import { PopularProducts } from './_components/popular-products'
import { RevenueChart } from './_components/revenue-chart'
import { SalesChart } from './_components/sales-chart'
import { WeekCard } from './_components/week-card'

export default function Home() {
  return (
    <main className="grid grid-cols-2 gap-8">
      <header className="col-span-2 flex flex-wrap items-end justify-between gap-4 pt-2">
        <h2 className="text-3xl font-medium text-accent-foreground">
          Painel inicial
        </h2>
        <Button
          variant="outline"
          className="gap-1.5 border-primary/25 pr-3 text-primary hover:border-accent-foreground/25"
          asChild
        >
          <Link href="/sales/add">
            <Plus className="size-3.5" />
            Adicionar venda
          </Link>
        </Button>
      </header>

      <WeekCard className="col-span-2 sm:col-span-1" />
      <MonthCard className="col-span-2 sm:col-span-1" />

      <RevenueChart className="col-span-2 md:col-span-1" />
      <SalesChart className="col-span-2 md:col-span-1" />

      <PopularProducts className="col-span-2" />
    </main>
  )
}
