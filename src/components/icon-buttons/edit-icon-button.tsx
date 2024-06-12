import { Pencil } from 'lucide-react'
import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

import { Button } from '../ui/button'
import { Tooltip } from '../ui/tooltip'

export function EditIconButton({
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
            <Pencil className="size-4" />
            <span className="sr-only">Editar</span>
          </Button>
        </Tooltip.Trigger>
        <Tooltip.Content>Editar</Tooltip.Content>
      </Tooltip.Root>
    </Tooltip.Provider>
  )
}
