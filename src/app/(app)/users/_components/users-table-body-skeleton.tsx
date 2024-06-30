import { Skeleton } from '@/components/ui/skeleton'
import { Table } from '@/components/ui/table'

export function UsersTableBodySkeleton() {
  return (
    <Table.Body>
      {Array.from({ length: 6 }).map((_, i) => (
        <Table.Row key={i}>
          <Table.Cell>
            <Skeleton className="h-4 max-w-48" />
          </Table.Cell>
          <Table.Cell>
            <Skeleton className="h-4 max-w-52" />
          </Table.Cell>
          <Table.Cell>
            <Skeleton className="h-4" />
          </Table.Cell>
          <Table.Cell>
            <Skeleton className="h-4" />
          </Table.Cell>
          <Table.Cell>
            <Skeleton className="h-4 rounded-full" />
          </Table.Cell>
          <Table.Cell className="flex whitespace-nowrap">
            <Skeleton className="size-8" />
          </Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  )
}
