import { Skeleton } from '@/components/ui/skeleton'
import { Table } from '@/components/ui/table'

export function ProductsTableBodySkeleton() {
  return (
    <Table.Body>
      {Array.from({ length: 10 }).map((_, i) => (
        <Table.Row key={i}>
          <Table.Cell>
            <Skeleton className="h-4" />
          </Table.Cell>
          <Table.Cell>
            <Skeleton className="h-4 min-w-72 max-w-[40rem]" />
          </Table.Cell>
          <Table.Cell>
            <Skeleton className="h-4" />
          </Table.Cell>
          <Table.Cell>
            <Skeleton className="h-4" />
          </Table.Cell>
          <Table.Cell>
            <Skeleton className="h-4" />
          </Table.Cell>
          <Table.Cell className="flex space-y-4 whitespace-nowrap">
            <Skeleton className="size-8" />
            <Skeleton className="size-8" />
          </Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  )
}
