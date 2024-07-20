import { type UserType } from '@/@types/users'
import { Table } from '@/components/ui/table'
import { formatDate } from '@/utils/format-date'

import { UserRoleSelect } from './user-role-select'
import { UserStatusBage } from './user-status-badge'
import { UsersTableContext } from './users-table-context'
import { UsersTableDelete } from './users-table-delete'

interface UsersTableRowProps {
  users?: UserType[]
}

export function UsersTableBody({ users }: UsersTableRowProps) {
  return (
    <Table.Body>
      {users && users.length >= 1 ? (
        users.map((user) => (
          <UsersTableContext.Provider key={user.id} value={user}>
            <Table.Row>
              <Table.Cell>{user.name}</Table.Cell>
              <Table.Cell>{user.email}</Table.Cell>
              <Table.Cell>
                <UserRoleSelect />
              </Table.Cell>
              <Table.Cell>{formatDate(user.createdAt)}</Table.Cell>
              <Table.Cell>
                <UserStatusBage />
              </Table.Cell>
              <Table.Cell>
                <UsersTableDelete />
              </Table.Cell>
            </Table.Row>
          </UsersTableContext.Provider>
        ))
      ) : (
        <Table.Row>
          <Table.Cell colSpan={6} className="py-6 text-center">
            Nenhum conta cadastrada.
          </Table.Cell>
        </Table.Row>
      )}
    </Table.Body>
  )
}
