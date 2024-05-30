import type { ComponentProps } from 'react'

import { ResumeCard } from '@/components/cards/resume'

export function MonthCard(props: ComponentProps<'div'>) {
  return (
    <ResumeCard.Root {...props}>
      <ResumeCard.Header className="flex-row flex-wrap items-baseline justify-between gap-x-6">
        <ResumeCard.Title>Saldo do mês</ResumeCard.Title>
        <ResumeCard.Description>Maio de 2024</ResumeCard.Description>
      </ResumeCard.Header>
      <ResumeCard.Content>
        <div className="flex flex-wrap gap-x-12 gap-y-4">
          <ResumeCard.Number
            title="Faturamento"
            valueInCents={24620432}
            percentage={8}
          />
          <ResumeCard.Number title="Vendas" number={237} percentage={2} />
        </div>
        <ResumeCard.Relation>Em relação ao mês anterior</ResumeCard.Relation>
      </ResumeCard.Content>
    </ResumeCard.Root>
  )
}
