import { Trash2 } from 'lucide-react'
import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

import { Button } from '../ui/button'
import { Tooltip } from '../ui/tooltip'

export function DeleteIconButton({
  className,
  ...props
}: ComponentProps<'button'>) {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <Button
            variant="outline"
            size="icon"
            className={cn('size-8', className)}
            {...props}
          >
            <Trash2 className="size-4" />
            <span className="sr-only">Excluir</span>
          </Button>
        </Tooltip.Trigger>
        <Tooltip.Content>Excluir</Tooltip.Content>
      </Tooltip.Root>
    </Tooltip.Provider>
  )
}
