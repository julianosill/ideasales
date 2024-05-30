'use client'

import type { ChartData, TooltipCallbacks, TooltipItem } from 'chart.js'
import type { ComponentProps } from 'react'

import type { AxisOptions } from '@/@types/chartjs'
import { ResumeCard } from '@/components/cards/resume'
import { BarChart } from '@/components/charts/bar-chart'
import { getBarDataOptions } from '@/components/charts/base'
import { formatCurrency } from '@/utils/format-currency'

export function RevenueChart(props: ComponentProps<'div'>) {
  const barOptions = getBarDataOptions({ twColor: 'cyan' })

  const data: ChartData<'bar'> = {
    labels: ['jan', 'fev', 'mar', 'abr', 'mai', 'jun'],
    datasets: [
      {
        label: 'Produtos',
        data: [19323534, 13954263, 11457744, 21756074, 25020184, 28052932],
        ...barOptions,
      },
    ],
  }

  const yAxis: Partial<AxisOptions> = {
    ticks: {
      callback: (value: number | string) =>
        `${(Number(value) / 100000).toFixed()}`,
    },
  }

  const tooltipCallbacks: Partial<TooltipCallbacks<'bar'>> = {
    title: (item: TooltipItem<'bar'>[]) => item[0].label,
    label: (item: TooltipItem<'bar'>) =>
      formatCurrency(item.formattedValue, { toDecimals: true }),
  }

  return (
    <ResumeCard.Root {...props}>
      <ResumeCard.Header>
        <ResumeCard.Title>Histórico de faturamento</ResumeCard.Title>
        <ResumeCard.Description className="flex flex-wrap items-baseline justify-between gap-1">
          Dados dos últimos 6 meses
          <span className="text-xs">x R$ 1 mil</span>
        </ResumeCard.Description>
      </ResumeCard.Header>
      <ResumeCard.Content>
        <BarChart
          data={data}
          yAxis={yAxis}
          tooltipCallbacks={tooltipCallbacks}
        />
      </ResumeCard.Content>
    </ResumeCard.Root>
  )
}
