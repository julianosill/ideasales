'use client'

import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'

import type {
  OrderByType,
  ProductsOrderByType,
  SearchFormType,
} from '@/@types/filter-params'
import { QUERY_KEYS } from '@/@types/react-query'
import { fetchProducts } from '@/api/products/fetch-products'
import { Pagination } from '@/components/pagination'
import { TableFilters } from '@/components/table-filters'
import { Table } from '@/components/ui/table'
import {
  getOrderParam,
  getPageIndexParam,
  getPerPageParam,
  getProductsOrderByParam,
  getSearchParam,
} from '@/utils/get-params'

import { ProductsTableBody } from './products-table-body'
import { ProductsTableBodySkeleton } from './products-table-body-skeleton'

export function ProductsTable() {
  const searchParams = useSearchParams()
  const pageIndex = getPageIndexParam(searchParams)
  const perPage = getPerPageParam(searchParams)
  const orderBy = getProductsOrderByParam(searchParams)
  const order = getOrderParam(searchParams)
  const search = getSearchParam(searchParams)

  const formOptions: SearchFormType = {
    searchInput: {
      value: search,
      placeholder: 'Digite o nome ou modelo do produto',
    },
  }

  const orderByOptions: OrderByType<ProductsOrderByType> = {
    value: orderBy,
    options: [
      { value: 'sales', name: 'Vendas' },
      { value: 'date', name: 'Data' },
    ],
  }

  const { data: result, isPending } = useQuery({
    queryKey: [QUERY_KEYS.PRODUCTS, pageIndex, perPage, orderBy, order, search],
    queryFn: () =>
      fetchProducts({ pageIndex, perPage, orderBy, order, search }),
  })

  const products = result?.products
  const totalProducts = result?.metadata.totalProducts ?? 0

  return (
    <div className="space-y-4">
      <TableFilters form={formOptions} orderBy={orderByOptions} order={order} />

      <div className="rounded-md border">
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.Head className="w-28">Modelo</Table.Head>
              <Table.Head>Produto</Table.Head>
              <Table.Head className="w-16">Cor</Table.Head>
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
