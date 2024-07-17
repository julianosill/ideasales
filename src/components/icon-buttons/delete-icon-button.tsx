import { Loader2, Trash2 } from 'lucide-react'
import React from 'react'

import { cn } from '@/lib/utils'

import { Button, type ButtonProps } from '../ui/button'

export const DeleteIconButton = React.forwardRef<
  HTMLButtonElement,
  ButtonProps
>(({ variant, size, className, ...props }, ref) => {
  return (
    <Button
      ref={ref}
      variant={variant ?? 'outline'}
      size={size ?? 'icon'}
      className={cn('group size-8', className)}
      {...props}
    >
      <Loader2 className="absolute size-4 animate-spin opacity-0 group-disabled:opacity-100" />
      <Trash2 className="size-4 group-disabled:opacity-0" />
      <span className="sr-only">Excluir</span>
    </Button>
  )
})
DeleteIconButton.displayName = 'DeleteIconButton'
