import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'
import { updateParams } from '@/utils/update-params'

import { Button } from './ui/button'
import { Select } from './ui/select'
import { Tooltip } from './ui/tooltip'

export interface PaginationProps extends ComponentProps<'div'> {
  currentPage: number
  totalItems: number
  perPage?: number
}

export function Pagination({
  currentPage,
  totalItems,
  perPage = 10,
  className,
  ...props
}: PaginationProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  if (totalItems <= 0) {
    return null
  }

  const lastPage = Math.ceil(totalItems / perPage)
  const lastPageItems = totalItems - (lastPage - 1) * perPage

  if (currentPage > lastPage) {
    handlePaginate(lastPage)
  }

  const isFirstPage = currentPage === 1
  const isLastPage = currentPage === lastPage

  const numberOfItems = () => {
    if (totalItems <= perPage) {
      return totalItems
    }
    if (isLastPage) {
      return lastPageItems
    }
    return perPage
  }

  function handlePaginate(page: number) {
    const params = updateParams({
      searchParams,
      deleteParams: page === 1 ? ['page'] : undefined,
      params: page > 1 ? [{ key: 'page', value: page.toString() }] : undefined,
    })
    router.push(`${pathname}?${params}`)
  }

  return (
    <div
      role="pagination"
      className={cn(
        'flex flex-wrap items-center justify-between gap-6 text-sm',
        className,
      )}
      {...props}
    >
      <div>
        Exibindo {numberOfItems()} de {totalItems}{' '}
        {totalItems === 1 ? 'item' : 'itens'}
      </div>

      {lastPage > 1 && (
        <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
          <div className="flex items-center gap-2">
            <span>Página</span>
            <Select.Root
              value={String(currentPage)}
              onValueChange={(value: string) => handlePaginate(Number(value))}
            >
              <Select.Trigger className="h-9 min-w-16 gap-1.5">
                <Select.Value placeholder="1" />
              </Select.Trigger>
              <Select.Content>
                {Array.from({ length: lastPage }).map((_, i) => {
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
                    onClick={() => handlePaginate(1)}
                  >
                    <ChevronFirst className="size-4" />
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
                    onClick={() => handlePaginate(currentPage - 1)}
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
                    onClick={() => handlePaginate(currentPage + 1)}
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
                    onClick={() => handlePaginate(lastPage)}
                  >
                    <ChevronLast className="size-4" />
                    <span className="sr-only">Última página</span>
                  </Button>
                </Tooltip.Trigger>
                <Tooltip.Content>Última página</Tooltip.Content>
              </Tooltip.Root>
            </Tooltip.Provider>
          </div>
        </div>
      )}
    </div>
  )
}
