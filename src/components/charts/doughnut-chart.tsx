'use client'

import type {
  ChartData,
  ChartOptions,
  TooltipCallbacks,
  TooltipOptions,
} from 'chart.js'
import { useTheme } from 'next-themes'
import { Doughnut } from 'react-chartjs-2'

import { defaultTooltipCallbacks, getTooltipOptions } from './base'

interface LineChartProps {
  data: ChartData<'doughnut'>
  options?: ChartOptions<'doughnut'>
  tooltipCallbacks?: Partial<TooltipCallbacks<'doughnut'>>
}

export function DoughnutChart({
  data,
  options,
  tooltipCallbacks,
}: LineChartProps) {
  const { theme } = useTheme()

  const defaultTooltip = getTooltipOptions(theme)

  const tooltip: Partial<TooltipOptions<'doughnut'>> = {
    ...defaultTooltip,
    callbacks: {
      ...defaultTooltipCallbacks,
      ...tooltipCallbacks,
    },
  }

  const chartOptions: ChartOptions<'doughnut'> = {
    plugins: { tooltip },
    ...options,
  }

  return <Doughnut options={chartOptions} data={data} />
}
