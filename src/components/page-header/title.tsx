import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

export function Title({ className, ...props }: ComponentProps<'h2'>) {
  return (
    <h2
      className={cn('text-3xl font-medium text-accent-foreground', className)}
      {...props}
    />
  )
}
