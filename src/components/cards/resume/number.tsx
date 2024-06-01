import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'
import { formatCurrency } from '@/utils/format-currency'
import { formatNumber } from '@/utils/format-number'

import { Percentage } from './percentage'

interface BaseProps extends ComponentProps<'div'> {
  title: string
  percentage: number
  comparedTo: string
}

interface NumberProps extends BaseProps {
  number: number
  valueInCents?: never
}

interface ValueInCentsProps extends BaseProps {
  number?: never
  valueInCents: number
}

type ResumeCardNumberProps = NumberProps | ValueInCentsProps

export function ResumeCardNumber({
  title,
  number,
  valueInCents,
  percentage,
  comparedTo,
  className,
  ...props
}: ResumeCardNumberProps) {
  return (
    <div>
      <h4 className="pb-1.5 text-foreground">{title}</h4>
      <div
        className={cn(
          'flex min-w-28 flex-wrap items-center gap-x-3 gap-y-1.5',
          className,
        )}
        {...props}
      >
        <span className="text-2xl font-semibold leading-none">
          {number && formatNumber(number)}
          {valueInCents && formatCurrency(valueInCents)}
        </span>

        <Percentage value={percentage} tooltipText={comparedTo} />
      </div>
    </div>
  )
}
