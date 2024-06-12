import { DeleteIconButton } from '@/components/icon-buttons/delete-icon-button'
import { EditIconButton } from '@/components/icon-buttons/edit-icon-button'
import { Table } from '@/components/ui/table'
import { formatDate } from '@/utils/format-date'

type ProductsType = {
  id: string
  name: string
  sales: number
  createdAt: Date
}

interface ProductsTableRowProps {
  products?: ProductsType[]
}

export function ProductsTableBody({ products }: ProductsTableRowProps) {
  return (
    <Table.Body>
      {products && products.length > 1 ? (
        products.map((product) => (
          <Table.Row key={product.id}>
            <Table.Cell className="max-md:align-top">{product.id}</Table.Cell>
            <Table.Cell className="min-w-72">{product.name}</Table.Cell>
            <Table.Cell className="max-md:align-top">
              {product.sales}
            </Table.Cell>
            <Table.Cell className="max-md:align-top">
              {formatDate(product.createdAt)}
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap max-md:align-top">
              <EditIconButton className="mr-4" onClick={() => {}} />
              <DeleteIconButton onClick={() => {}} />
            </Table.Cell>
          </Table.Row>
        ))
      ) : (
        <Table.Row>
          <Table.Cell colSpan={5} className="py-6 text-center">
            Nenhum produto encontrado ou cadastrado.
          </Table.Cell>
        </Table.Row>
      )}
    </Table.Body>
  )
}
