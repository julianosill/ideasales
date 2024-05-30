import type { ComponentProps } from 'react'

import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

export function ResumeCardTitle({ className, ...props }: ComponentProps<'h3'>) {
  return (
    <Card.Title className={cn('text-lg leading-tight', className)} {...props} />
  )
}
