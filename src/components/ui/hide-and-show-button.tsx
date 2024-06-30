import { Eye, EyeOff } from 'lucide-react'
import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

interface HideAndShowButtonProps extends ComponentProps<'button'> {
  visible: boolean
}

export function HideAndShowButton({
  visible,
  className,
  ...props
}: HideAndShowButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        'group flex size-8 items-center justify-center rounded-md text-muted-foreground hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        className,
      )}
      data-visible={visible}
      {...props}
    >
      <Eye className="size-4 duration-200 group-data-[visible=true]:scale-0 group-data-[visible=true]:opacity-0" />
      <EyeOff className="absolute size-4 scale-0 opacity-0 duration-200 group-data-[visible=true]:scale-100 group-data-[visible=true]:opacity-100" />
      <span className="sr-only">Exibir senha</span>
    </button>
  )
}
