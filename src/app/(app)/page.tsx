import { MonthCard } from './_components/month-card'
import { RevenueChart } from './_components/revenue-chart'
import { SalesChart } from './_components/sales-chart'
import { WeekCard } from './_components/week-card'

export default function Home() {
  return (
    <main className="grid grid-cols-2 gap-4">
      <WeekCard className="col-span-2 sm:col-span-1" />
      <MonthCard className="col-span-2 sm:col-span-1" />

      <RevenueChart className="col-span-2 md:col-span-1" />
      <SalesChart className="col-span-2 md:col-span-1" />
    </main>
  )
}
