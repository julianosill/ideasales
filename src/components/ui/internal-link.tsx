import type { LinkProps } from 'next/link'
import Link from 'next/link'
import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

type InternalLinkProps = LinkProps & ComponentProps<'a'>

export function InternalLink({ className, ...props }: InternalLinkProps) {
  return (
    <Link
      className={cn(
        'font-medium text-foreground underline underline-offset-2 hover:text-accent-foreground',
        'ring-offset-background transition-colors focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4',
        className,
      )}
      {...props}
    />
  )
}
