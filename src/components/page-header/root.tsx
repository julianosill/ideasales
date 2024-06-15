import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

export function Root({ className, ...props }: ComponentProps<'header'>) {
  return <header className={cn('flex flex-col pb-8', className)} {...props} />
}
