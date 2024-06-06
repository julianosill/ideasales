import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

export function Link({ className, ...props }: ComponentProps<'a'>) {
  return (
    <a
      className={cn(
        'font-medium text-foreground underline underline-offset-2 duration-200 hover:text-accent-foreground',
        'ring-offset-background transition-colors focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4',
        className,
      )}
      {...props}
    ></a>
  )
}
