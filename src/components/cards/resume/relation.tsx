import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

export function ResumeCardRelation({
  className,
  ...props
}: ComponentProps<'p'>) {
  return (
    <p
      className={cn('pt-6 text-sm text-muted-foreground', className)}
      {...props}
    />
  )
}
