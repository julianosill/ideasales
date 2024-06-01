import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

export function Header({ className, ...props }: ComponentProps<'header'>) {
  return <header className={cn('space-y-4', className)} {...props} />
}
