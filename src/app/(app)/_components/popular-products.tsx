'use client'

import type { ChartData, TooltipCallbacks } from 'chart.js'
import type { ComponentProps } from 'react'
import colors from 'tailwindcss/colors'

import { ResumeCard } from '@/components/cards/resume'
import { getDoughnutDataOptions } from '@/components/charts/base'
import { DoughnutChart } from '@/components/charts/doughnut-chart'
import { Table } from '@/components/ui/table'
import { formatNumber } from '@/utils/format-number'
import { popularProducts } from '@/utils/sample-data'

export function PopularProducts(props: ComponentProps<'div'>) {
  const productNames: string[] = []
  const productQuantities: number[] = []
  const doughnutDataOptions = getDoughnutDataOptions()

  popularProducts.forEach((product) => {
    productNames.push(product.name)
    productQuantities.push(product.quantity)
  })

  const backgroundColor = [
    colors.cyan[600],
    colors.cyan[300],
    colors.amber[600],
    colors.amber[300],
    colors.emerald[600],
    colors.emerald[300],
    colors.purple[600],
    colors.purple[300],
    colors.red[600],
    colors.red[300],
  ]

  const data: ChartData<'doughnut'> = {
    labels: productNames,
    datasets: [
      {
        label: 'Produtos',
        data: productQuantities,
        backgroundColor,
        ...doughnutDataOptions,
      },
    ],
  }

  const tooltipCallbacks: Partial<TooltipCallbacks<'doughnut'>> = {
    title: (item) => item[0].label.substring(0, 20) + '...',
    label: (item) => formatNumber(item.formattedValue),
  }

  return (
    <ResumeCard.Root {...props}>
      <ResumeCard.Header>
        <ResumeCard.Title>Produtos mais vendidos</ResumeCard.Title>
        <ResumeCard.Description>
          Dados dos últimos 6 meses
        </ResumeCard.Description>
      </ResumeCard.Header>
      <ResumeCard.Content className="flex items-center justify-center gap-x-4 gap-y-8 max-lg:flex-col">
        <div className="w-full max-w-80">
          <DoughnutChart data={data} tooltipCallbacks={tooltipCallbacks} />
        </div>
        <div className="flex-1">
          <Table.Root>
            <Table.Body>
              {popularProducts.map((product, index) => (
                <Table.Row key={product.name}>
                  <Table.Cell className="py-2">
                    <div
                      className="size-4 rounded"
                      style={{ backgroundColor: backgroundColor[index] }}
                    ></div>
                  </Table.Cell>
                  <Table.Cell className="px-0 py-2 text-sm">
                    {product.name}
                  </Table.Cell>
                  <Table.Cell className="py-2 text-right">
                    {product.quantity}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </div>
      </ResumeCard.Content>
    </ResumeCard.Root>
  )
}
