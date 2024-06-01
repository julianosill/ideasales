import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

export function Link({ className, ...props }: ComponentProps<'a'>) {
  return (
    <a
      className={cn(
        'font-medium text-foreground underline underline-offset-2 duration-200 hover:text-accent-foreground',
        className,
      )}
      {...props}
    ></a>
  )
}
