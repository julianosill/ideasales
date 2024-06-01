'use client'

import { ArrowDown, ArrowUp, Minus } from 'lucide-react'
import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'
import { formatCurrency } from '@/utils/format-currency'
import { formatNumber } from '@/utils/format-number'

interface BaseProps extends ComponentProps<'div'> {
  title: string
  percentage: number
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
  className,
  ...props
}: ResumeCardNumberProps) {
  const growth = percentage > 0
  const stable = percentage === 0
  const decline = percentage < 0

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

        <span
          className={cn(
            'flex items-center gap-1 rounded bg-border px-1.5 py-0.5 text-sm',
            growth && 'bg-success/75 text-success-foreground',
            stable && 'bg-muted text-muted-foreground',
            decline && 'bg-error/75 text-error-foreground',
          )}
        >
          {growth && (
            <>
              +{percentage}% <ArrowUp className="size-3" />
            </>
          )}
          {stable && (
            <>
              {percentage}% <Minus className="size-3" />
            </>
          )}
          {decline && (
            <>
              {percentage}% <ArrowDown className="size-3" />
            </>
          )}
        </span>
      </div>
    </div>
  )
}
