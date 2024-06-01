import type {
  BorderOptions,
  CartesianScaleOptions,
  ChartOptions,
  ScaleOptionsByType,
  TickOptions,
} from 'chart.js'
import type { DefaultColors } from 'tailwindcss/types/generated/colors'

export interface DataOptionsProps {
  theme?: string
  twColor?: keyof DefaultColors
}

export interface AxisOptions
  extends CartesianScaleOptions,
    ScaleOptionsByType<'linear'> {
  border?: Partial<BorderOptions>
  ticks?: Partial<TickOptions>
}

export interface ChartOptionsProps {
  theme?: string
  chartOptions?: ChartOptions<'bar' | 'line'>
  xAxis?: Partial<AxisOptions>
  yAxis?: Partial<AxisOptions>
}

export interface IChartContext {
  chart: {
    ctx: CanvasRenderingContext2D
    chartArea: {
      left: number
      top: number
      right: number
      bottom: number
    }
  }
}

export interface IChartBackgroundGradient {
  context: IChartContext
  from: string
  to: string
}
