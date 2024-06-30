import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import type { ComponentProps } from 'react'

import type {
  OrderByType,
  OrderType,
  ProductsOrderByType,
  SearchFormType,
  UsersOrderByType,
} from '@/@types/filter-params'
import { cn } from '@/lib/utils'
import { updateParams } from '@/utils/update-params'

import { SearchForm } from './search-form'
import { SelectOrderBy } from './select-order-by'
import { ToggleOrder } from './toogle-order'

interface TableFiltersProps extends ComponentProps<'div'> {
  form?: SearchFormType
  orderBy: OrderByType<UsersOrderByType | ProductsOrderByType>
  order: OrderType
}

export function TableFilters({
  form,
  orderBy,
  order = 'desc',
  className,
  ...props
}: TableFiltersProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  function handleOrderBy(value: typeof orderBy.value) {
    const params = updateParams({
      searchParams,
      params: [{ key: 'orderBy', value }],
    })
    router.replace(`${pathname}?${params}`)
  }

  function handleOrder() {
    const value = order === 'desc' ? 'asc' : 'desc'
    const params = updateParams({
      searchParams,
      params: [{ key: 'order', value }],
    })
    router.replace(`${pathname}?${params}`)
  }

  return (
    <div
      className={cn('flex gap-x-8 gap-y-4 max-sm:flex-col', className)}
      {...props}
    >
      {form && <SearchForm data={form} />}

      <div className="ml-auto flex flex-wrap items-center gap-2">
        <span className="text-sm text-muted-foreground">Ordenar por</span>
        <SelectOrderBy
          value={orderBy.value}
          onValueChange={handleOrderBy}
          options={orderBy.options}
        />
        <ToggleOrder order={order} onClick={handleOrder} />
      </div>
    </div>
  )
}
