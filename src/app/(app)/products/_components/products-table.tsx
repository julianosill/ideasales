'use client'

import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'

import type {
  FormType,
  OrderByType,
  ProductsOrderByType,
} from '@/@types/filter-params'
import { fetchProducts } from '@/api/fetch-products'
import { Pagination } from '@/components/pagination'
import { TableFilters } from '@/components/table-filters'
import { Table } from '@/components/ui/table'
import { getParams } from '@/utils/get-params'

import { ProductsTableBody } from './products-table-body'
import { ProductsTableBodySkeleton } from './products-table-body-skeleton'

export function ProductsTable() {
  const searchParams = useSearchParams()

  const {
    pageIndex,
    perPage,
    productsOrderBy: orderBy,
    order,
    search,
  } = getParams(searchParams)

  const formData: FormType = {
    search: {
      value: search,
      placeholder: 'Digite o nome ou modelo do produto',
    },
  }

  const orderByData: OrderByType<ProductsOrderByType> = {
    value: orderBy,
    options: [
      { value: 'sales', name: 'Vendas' },
      { value: 'date', name: 'Data' },
    ],
  }

  const { data: result, isPending } = useQuery({
    queryKey: ['products', pageIndex, perPage, orderBy, order, search],
    queryFn: () =>
      fetchProducts({
        pageIndex,
        perPage,
        orderBy,
        order,
        query: search,
      }),
  })

  const products = result?.products
  const totalProducts = result?.metadata.totalProducts ?? 0

  return (
    <div className="space-y-4">
      <TableFilters form={formData} orderBy={orderByData} order={order} />

      <div className="rounded-md border">
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.Head className="w-28">Modelo</Table.Head>
              <Table.Head>Produto</Table.Head>
              <Table.Head className="w-20">Vendas</Table.Head>
              <Table.Head className="w-32 whitespace-nowrap">
                Cadastrado em
              </Table.Head>
              <Table.Head className="w-28">Ações</Table.Head>
            </Table.Row>
          </Table.Header>
          {isPending ? (
            <ProductsTableBodySkeleton />
          ) : (
            <ProductsTableBody products={products} />
          )}
        </Table.Root>
      </div>

      <Pagination
        currentPage={pageIndex + 1}
        perPage={perPage}
        totalItems={totalProducts}
      />
    </div>
  )
}
