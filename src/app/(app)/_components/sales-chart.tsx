'use client'

import type { ChartData, TooltipCallbacks, TooltipItem } from 'chart.js'
import { useTheme } from 'next-themes'
import type { ComponentProps } from 'react'

import { ResumeCard } from '@/components/cards/resume'
import { getLineDataOptions } from '@/components/charts/base'
import { LineChart } from '@/components/charts/line-chart'
import { formatNumber } from '@/utils/format-number'

export function SalesChart(props: ComponentProps<'div'>) {
  const { theme } = useTheme()

  const lineOptions = getLineDataOptions({ theme, twColor: 'cyan' })

  const data: ChartData<'line'> = {
    labels: ['jan', 'fev', 'mar', 'abr', 'mai', 'jun'],
    datasets: [
      {
        label: 'Vendas',
        data: [193, 139, 214, 217, 250, 280],
        ...lineOptions,
      },
    ],
  }

  const tooltipCallbacks: Partial<TooltipCallbacks<'line'>> = {
    label: (item: TooltipItem<'line'>) => formatNumber(item.formattedValue),
  }

  return (
    <ResumeCard.Root {...props}>
      <ResumeCard.Header>
        <ResumeCard.Title>Histórico de vendas</ResumeCard.Title>
        <ResumeCard.Description>
          Dados dos últimos 6 meses
        </ResumeCard.Description>
      </ResumeCard.Header>
      <ResumeCard.Content>
        <LineChart data={data} tooltipCallbacks={tooltipCallbacks} />
      </ResumeCard.Content>
    </ResumeCard.Root>
  )
}
