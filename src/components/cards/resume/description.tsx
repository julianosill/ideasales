import type { ComponentProps } from 'react'

import { Card } from '@/components/ui/card'

export function ResumeCardDescription(props: ComponentProps<'p'>) {
  return <Card.Description {...props} />
}
