'use client'

import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

export function BackButton({ className, ...props }: ComponentProps<'button'>) {
  const router = useRouter()

  return (
    <button
      className={cn(
        'text flex items-center gap-1.5 border-b text-sm font-medium text-muted-foreground duration-200',
        'hover:border-foreground hover:text-foreground',
        className,
      )}
      onClick={router.back}
      {...props}
    >
      <ArrowLeft className="size-4" />
      <span className="pb-0.5">voltar</span>
    </button>
  )
}
