'use client'

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'
import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

import { Button } from './ui/button'
import { Select } from './ui/select'
import { Tooltip } from './ui/tooltip'

export interface PaginationProps extends ComponentProps<'div'> {
  currentPage: number
  totalItems: number
  perPage?: number
  onPageChange: (pageIndex: number) => Promise<void> | void
}

export function Pagination({
  currentPage,
  totalItems,
  perPage = 10,
  onPageChange,
  className,
  ...props
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / perPage)
  const lastPageItems = totalItems - (totalPages - 1) * perPage

  if (currentPage > totalPages) {
    return <p>Erro na renderização do componente.</p>
  }

  const isFirstPage = currentPage === 1
  const isLastPage = currentPage === totalPages

  const numberOfItems = () => {
    if (totalItems <= perPage) {
      return totalItems
    }
    if (isLastPage) {
      return lastPageItems
    }
    return perPage
  }

  return (
    <div
      className={cn(
        'flex flex-wrap items-center justify-between gap-6 pt-6 text-sm',
        className,
      )}
      {...props}
    >
      <div>
        Exibindo {numberOfItems()} de {totalItems}{' '}
        {totalItems === 1 ? 'item' : 'itens'}
      </div>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
        <div className="flex items-center gap-2">
          <span>Página</span>
          <Select.Root
            value={String(currentPage)}
            onValueChange={(value: string) => onPageChange(Number(value))}
          >
            <Select.Trigger className="h-9 min-w-16 gap-1.5">
              <Select.Value placeholder="1" />
            </Select.Trigger>
            <Select.Content>
              {Array.from({ length: totalPages }).map((_, i) => {
                const pageNumber = String(i + 1)
                return (
                  <Select.Item key={pageNumber} value={pageNumber}>
                    {pageNumber}
                  </Select.Item>
                )
              })}
            </Select.Content>
          </Select.Root>
        </div>

        <div className="flex gap-2">
          <Tooltip.Provider>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <Button
                  variant="outline"
                  className="size-9 p-0"
                  disabled={isFirstPage}
                  onClick={() => onPageChange(1)}
                >
                  <ChevronsLeft className="size-4" />
                  <span className="sr-only">Primeira página</span>
                </Button>
              </Tooltip.Trigger>
              <Tooltip.Content>Primeira página</Tooltip.Content>
            </Tooltip.Root>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <Button
                  variant="outline"
                  className="size-9 p-0"
                  disabled={isFirstPage}
                  onClick={() => onPageChange(currentPage - 1)}
                >
                  <ChevronLeft className="size-4" />
                  <span className="sr-only">Página anterior</span>
                </Button>
              </Tooltip.Trigger>
              <Tooltip.Content>Página anterior</Tooltip.Content>
            </Tooltip.Root>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <Button
                  variant="outline"
                  className="size-9 p-0"
                  disabled={isLastPage}
                  onClick={() => onPageChange(currentPage + 1)}
                >
                  <ChevronRight className="size-4" />
                  <span className="sr-only">Próxima página</span>
                </Button>
              </Tooltip.Trigger>
              <Tooltip.Content>Próxima página</Tooltip.Content>
            </Tooltip.Root>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <Button
                  variant="outline"
                  className="size-9 p-0"
                  disabled={isLastPage}
                  onClick={() => onPageChange(totalPages)}
                >
                  <ChevronsRight className="size-4" />
                  <span className="sr-only">Última página</span>
                </Button>
              </Tooltip.Trigger>
              <Tooltip.Content>Última página</Tooltip.Content>
            </Tooltip.Root>
          </Tooltip.Provider>
        </div>
      </div>
    </div>
  )
}
