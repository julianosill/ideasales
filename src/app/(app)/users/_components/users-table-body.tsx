import { type UserType } from '@/@types/users'
import { Table } from '@/components/ui/table'
import { formatDate } from '@/utils/format-date'

import { UserRoleSelect } from './user-role-select'
import { UserStatusBage } from './user-status-badge'
import { UsersTableActions } from './users-table-actions'

interface UsersTableRowProps {
  users?: UserType[]
}

export function UsersTableBody({ users }: UsersTableRowProps) {
  return (
    <Table.Body>
      {users && users.length >= 1 ? (
        users.map((user) => (
          <Table.Row key={user.id}>
            <Table.Cell>{user.name}</Table.Cell>
            <Table.Cell>{user.email}</Table.Cell>
            <Table.Cell>
              <UserRoleSelect user={user} />
            </Table.Cell>
            <Table.Cell>{formatDate(user.createdAt)}</Table.Cell>
            <Table.Cell>
              <UserStatusBage user={user} />
            </Table.Cell>
            <Table.Cell>
              <UsersTableActions user={user} />
            </Table.Cell>
          </Table.Row>
        ))
      ) : (
        <Table.Row>
          <Table.Cell colSpan={5} className="py-6 text-center">
            Nenhum usuário encontrado ou cadastrado.
          </Table.Cell>
        </Table.Row>
      )}
    </Table.Body>
  )
}
