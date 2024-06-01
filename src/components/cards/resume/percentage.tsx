'use client'

import { ArrowDown, ArrowUp, Minus } from 'lucide-react'

import { Tooltip } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

interface PercentageProps {
  value: number
  tooltipText: string
}

export function Percentage({ value, tooltipText }: PercentageProps) {
  const growth = value > 0
  const stable = value === 0
  const decline = value < 0

  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger
          className={cn(
            'flex items-center gap-1 rounded bg-border px-1.5 py-0.5 text-sm',
            growth && 'bg-success/75 text-success-foreground',
            stable && 'bg-muted text-muted-foreground',
            decline && 'bg-error/75 text-error-foreground',
          )}
        >
          {growth && (
            <>
              +{value}% <ArrowUp className="size-3" />
            </>
          )}
          {stable && (
            <>
              {value}% <Minus className="size-3" />
            </>
          )}
          {decline && (
            <>
              {value}% <ArrowDown className="size-3" />
            </>
          )}
        </Tooltip.Trigger>
        <Tooltip.Content>{tooltipText}</Tooltip.Content>
      </Tooltip.Root>
    </Tooltip.Provider>
  )
}
