import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

interface InputErrorProps extends ComponentProps<'p'> {
  text: string
}

export function InputError({ text, className, ...props }: InputErrorProps) {
  return (
    <p
      className={cn(
        'absolute right-0 top-0 w-fit rounded-md bg-error/40 px-1.5 py-0.5 text-xs text-error-foreground',
        className,
      )}
      {...props}
    >
      {text}
    </p>
  )
}
