import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  type ChartDataset,
  type ChartOptions,
  Filler,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  type TooltipCallbacks,
  type TooltipOptions,
} from 'chart.js'
import colors from 'tailwindcss/colors'

import type {
  AxisOptions,
  ChartOptionsProps,
  DataOptionsProps,
  IChartBackgroundGradient,
  IChartContext,
} from '@/@types/chartjs'
import { hexToRGBA } from '@/utils/hex-to-rgba'
import { mergeObjects } from '@/utils/merge-objects'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Filler,
)

ChartJS.defaults.font.family = "'Inter', ui-sans-serif, system-ui, sans-serif"
ChartJS.defaults.color = hexToRGBA(colors.zinc[400], 1)

export function getBarDataOptions({ twColor }: DataOptionsProps) {
  const color = twColor ? colors[twColor] : colors.cyan

  const options: Partial<ChartDataset<'bar'>> = {
    borderRadius: 6,
    backgroundColor: (context: IChartContext) =>
      getChartBackgroundGradient({
        context,
        from: hexToRGBA(color[500], 1),
        to: hexToRGBA(color[500], 0.3),
      }),
  }

  return options
}

export function getLineDataOptions({ theme, twColor }: DataOptionsProps) {
  const color = twColor ? colors[twColor] : colors.cyan

  const options: Partial<ChartDataset<'line'>> = {
    borderColor: color[500],
    borderWidth: 4,
    pointBackgroundColor: color[500],
    pointHoverBackgroundColor: theme === 'light' ? color[400] : color[200],
    pointBorderColor: theme === 'light' ? color[50] : color[300],
    pointBorderWidth: 2,
    pointHoverBorderWidth: 2,
    pointRadius: 4,
    tension: 0.4,
    fill: true,
    backgroundColor: (context: IChartContext) =>
      getChartBackgroundGradient({
        context,
        from: hexToRGBA(color[500], 0.75),
        to: hexToRGBA(color[500], 0),
      }),
  }

  return options
}

export function getChartOptions({
  theme,
  chartOptions,
  xAxis,
  yAxis,
}: ChartOptionsProps) {
  const defaultAxis = getDefaultAxis(theme)
  const xAxisOptions: Partial<AxisOptions> = xAxis
    ? mergeObjects(defaultAxis, xAxis)
    : defaultAxis
  const yAxisOptions: Partial<AxisOptions> = yAxis
    ? mergeObjects(defaultAxis, yAxis)
    : defaultAxis

  const baseOptions: ChartOptions<'bar' | 'line' | 'doughnut'> = {
    responsive: true,
    aspectRatio: 3,
    ...chartOptions,
  }

  return {
    ...baseOptions,
    scales: {
      x: xAxisOptions,
      y: yAxisOptions,
    },
  }
}

export function getDefaultAxis(theme?: string) {
  const defaultAxis: Partial<AxisOptions> = {
    border: {
      color: theme === 'light' ? colors.zinc[300] : colors.zinc[600],
      dash: [4, 4],
    },
    grid: {
      color: theme === 'light' ? colors.zinc[200] : colors.zinc[700],
      tickColor: 'transparent',
      tickLength: 4,
    },
    ticks: {
      color: colors.zinc[400],
    },
  }

  return defaultAxis
}

export function getTooltipOptions(theme?: string) {
  const isLight = theme === 'light'

  const options: Partial<TooltipOptions<'bar' | 'line' | 'doughnut'>> = {
    enabled: true,
    displayColors: false,
    borderWidth: 1,
    titleFont: { size: 14, weight: 500 },
    bodyFont: { size: 14 },
    padding: 10,
    caretSize: 6,

    // colors
    backgroundColor: isLight ? colors.zinc[50] : colors.zinc[900],
    borderColor: isLight
      ? hexToRGBA(colors.zinc[200], 0.5)
      : hexToRGBA(colors.zinc[700], 0.5),
    titleColor: isLight ? colors.zinc[600] : colors.zinc[200],
    bodyColor: isLight ? colors.zinc[500] : colors.zinc[400],
  }

  return options
}

export function getChartBackgroundGradient({
  context,
  from,
  to,
}: IChartBackgroundGradient) {
  const chart = context.chart
  const { ctx, chartArea } = chart
  const gradient = ctx.createLinearGradient(
    chartArea.left,
    chartArea.top,
    chartArea.left,
    chartArea.bottom,
  )
  gradient.addColorStop(0, from)
  gradient.addColorStop(1, to)

  return gradient
}
export const defaultTooltipCallbacks: TooltipCallbacks<
  'bar' | 'line' | 'doughnut'
> = {
  beforeTitle: () => [],
  afterTitle: () => [],
  beforeBody: () => [],
  beforeLabel: () => '',
  label: (item) => `${item.dataset.label || ''}: ${item.formattedValue}`,
  labelColor: () => ({
    borderColor: 'transparent',
    backgroundColor: 'transparent',
  }),
  labelTextColor: () => '',
  labelPointStyle: () => ({ pointStyle: 'circle', rotation: 0 }),
  afterLabel: () => '',
  afterBody: () => [],
  beforeFooter: () => [],
  footer: () => [],
  afterFooter: () => [],
  title: (items) => {
    const item = items[0]
    return item.label ? [item.label] : []
  },
}
