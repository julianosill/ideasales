import { ArrowDownUp, ArrowUpDown } from 'lucide-react'
import type { ComponentProps } from 'react'

import type { OrderType } from '@/@types/filter-params'
import { cn } from '@/lib/utils'

import { Button } from '../ui/button'
import { Tooltip } from '../ui/tooltip'

interface ToggleOrderProps extends ComponentProps<'button'> {
  order: OrderType
}

export function ToggleOrder({ order, className, ...props }: ToggleOrderProps) {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <Button
            variant="ghost"
            size="icon"
            data-order={order}
            className={cn('group', className)}
            {...props}
          >
            <ArrowDownUp className="size-4 text-muted-foreground transition-all duration-300 group-hover:text-accent-foreground group-data-[order=asc]:-rotate-90 group-data-[order=asc]:opacity-0" />
            <ArrowUpDown className="absolute size-4 text-muted-foreground transition-all duration-300 group-hover:text-accent-foreground group-data-[order=desc]:rotate-90 group-data-[order=desc]:opacity-0" />
            <span className="sr-only">Inverter ordem</span>
          </Button>
        </Tooltip.Trigger>
        <Tooltip.Content>Inverter ordem</Tooltip.Content>
      </Tooltip.Root>
    </Tooltip.Provider>
  )
}
