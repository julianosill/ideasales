import type { ComponentProps } from 'react'

import { ResumeCard } from '@/components/cards/resume'

export function WeekCard(props: ComponentProps<'div'>) {
  return (
    <ResumeCard.Root {...props}>
      <ResumeCard.Header className="flex-row flex-wrap items-baseline justify-between gap-x-6">
        <ResumeCard.Title>Saldo da semana</ResumeCard.Title>
        <ResumeCard.Description>20/05 a 26/05</ResumeCard.Description>
      </ResumeCard.Header>
      <ResumeCard.Content>
        <div className="flex flex-wrap gap-x-12 gap-y-4">
          <ResumeCard.Number
            title="Faturamento"
            valueInCents={7264038}
            percentage={-2}
            comparedTo="em relação à semana anterior"
          />
          <ResumeCard.Number
            title="Vendas"
            number={61}
            percentage={0}
            comparedTo="em relação à semana anterior"
          />
        </div>
      </ResumeCard.Content>
    </ResumeCard.Root>
  )
}
