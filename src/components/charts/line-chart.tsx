'use client'

import type {
  ChartData,
  ChartOptions,
  TooltipCallbacks,
  TooltipOptions,
} from 'chart.js'
import { useTheme } from 'next-themes'
import { Line } from 'react-chartjs-2'

import type { AxisOptions } from '@/@types/chartjs'
import { mergeObjects } from '@/utils/merge-objects'

import {
  defaultTooltipCallbacks,
  getChartOptions,
  getTooltipOptions,
} from './base'

interface LineChartProps {
  data: ChartData<'line'>
  xAxis?: Partial<AxisOptions>
  yAxis?: Partial<AxisOptions>
  options?: ChartOptions<'line'>
  tooltipCallbacks?: Partial<TooltipCallbacks<'line'>>
}

export function LineChart({
  data,
  options,
  xAxis,
  yAxis,
  tooltipCallbacks,
}: LineChartProps) {
  const { theme } = useTheme()
  const defaultYAxis: Partial<AxisOptions> = {
    border: { display: false },
    grid: { display: false },
    ticks: {
      callback: (value: number | string) => `${value} `,
    },
  }
  const defaultTooltip = getTooltipOptions(theme)

  const tooltip: Partial<TooltipOptions<'line'>> = {
    ...defaultTooltip,
    callbacks: {
      ...defaultTooltipCallbacks,
      ...tooltipCallbacks,
    },
  }

  const lineChartOptions: ChartOptions<'line'> = {
    interaction: {
      intersect: false,
      mode: 'index',
    },
  }

  const chartOptions = getChartOptions({
    theme,
    chartOptions: { plugins: { tooltip }, ...lineChartOptions, ...options },
    xAxis,
    yAxis: yAxis ? mergeObjects(defaultYAxis, yAxis) : defaultYAxis,
  }) as ChartOptions<'line'>

  return <Line options={chartOptions} data={data} />
}
