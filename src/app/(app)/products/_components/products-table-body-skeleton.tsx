import { Skeleton } from '@/components/ui/skeleton'
import { Table } from '@/components/ui/table'

export function ProductsTableBodySkeleton() {
  return (
    <Table.Body>
      {Array.from({ length: 10 }).map((_, i) => (
        <Table.Row key={i}>
          <Table.Cell>
            <Skeleton className="h-4 w-20" />
          </Table.Cell>
          <Table.Cell>
            <Skeleton className="h-4 w-full max-w-[32rem]" />
          </Table.Cell>
          <Table.Cell>
            <Skeleton className="h-4 w-8" />
          </Table.Cell>
          <Table.Cell>
            <Skeleton className="h-4 w-20" />
          </Table.Cell>
          <Table.Cell className="flex whitespace-nowrap">
            <Skeleton className="mr-4 size-8" />
            <Skeleton className="size-8" />
          </Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  )
}
