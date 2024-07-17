import React from 'react'

import type { ProductType } from '@/@types/products'
import { Table } from '@/components/ui/table'
import { formatDate } from '@/utils/format-date'

import { ProductsTableContext } from './products-table-context'
import { ProductsTableDelete } from './products-table-delete'
import { ProductsTableUpdate } from './products-table-update'

interface ProductsTableRowProps {
  products?: ProductType[]
}

export function ProductsTableBody({ products }: ProductsTableRowProps) {
  return (
    <Table.Body>
      {products && products.length >= 1 ? (
        products.map((product) => (
          <ProductsTableContext.Provider key={product.id} value={product}>
            <Table.Row>
              <Table.Cell className="whitespace-nowrap max-md:align-top">
                {product.model}
              </Table.Cell>
              <Table.Cell className="min-w-72">{product.name}</Table.Cell>
              <Table.Cell className="max-md:align-top">
                {product.color}
              </Table.Cell>
              <Table.Cell className="max-md:align-top">
                {product.sales}
              </Table.Cell>
              <Table.Cell className="max-md:align-top">
                {formatDate(product.createdAt)}
              </Table.Cell>
              <Table.Cell className="space-x-4 whitespace-nowrap max-md:align-top">
                <ProductsTableUpdate />
                <ProductsTableDelete />
              </Table.Cell>
            </Table.Row>
          </ProductsTableContext.Provider>
        ))
      ) : (
        <Table.Row>
          <Table.Cell colSpan={6} className="py-6 text-center">
            Nenhum produto encontrado ou cadastrado.
          </Table.Cell>
        </Table.Row>
      )}
    </Table.Body>
  )
}
