'use client'

import type {
  ChartData,
  ChartOptions,
  TooltipCallbacks,
  TooltipOptions,
} from 'chart.js'
import { useTheme } from 'next-themes'
import { Bar } from 'react-chartjs-2'

import type { AxisOptions } from '@/@types/chartjs'
import { mergeObjects } from '@/utils/merge-objects'

import {
  defaultTooltipCallbacks,
  getChartOptions,
  getTooltipOptions,
} from './base'

interface BarChartProps {
  data: ChartData<'bar'>
  yAxis?: Partial<AxisOptions>
  xAxis?: Partial<AxisOptions>
  options?: ChartOptions<'bar'>
  tooltipCallbacks?: Partial<TooltipCallbacks<'bar'>>
}

export function BarChart({
  data,
  options,
  yAxis,
  xAxis,
  tooltipCallbacks,
}: BarChartProps) {
  const { theme } = useTheme()
  const defaultXAxis: Partial<AxisOptions> = { grid: { display: false } }
  const defaultYAxis: Partial<AxisOptions> = { border: { display: false } }
  const defaultTooltip = getTooltipOptions(theme)

  const tooltip: Partial<TooltipOptions<'bar'>> = {
    ...defaultTooltip,
    callbacks: {
      ...defaultTooltipCallbacks,
      ...tooltipCallbacks,
    },
  }

  const chartOptions = getChartOptions({
    theme,
    chartOptions: { plugins: { tooltip }, ...options },
    xAxis: xAxis ? mergeObjects(defaultXAxis, xAxis) : defaultXAxis,
    yAxis: yAxis ? mergeObjects(defaultYAxis, yAxis) : defaultYAxis,
  }) as ChartOptions<'bar'>

  return <Bar options={chartOptions} data={data} />
}
