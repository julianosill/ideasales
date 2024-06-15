'use client'

import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

export function BackButton({ className, ...props }: ComponentProps<'button'>) {
  const router = useRouter()

  return (
    <button
      className={cn(
        'mb-6 flex items-center gap-1 self-start text-sm font-medium text-muted-foreground',
        'hover:border-foreground hover:text-foreground',
        'ring-offset-background transition-colors focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        className,
      )}
      onClick={router.back}
      {...props}
    >
      <ChevronLeft className="size-4" />
      <span className="pb-0.5">voltar</span>
    </button>
  )
}
