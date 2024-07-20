import React from 'react'

import type { UserType } from '@/@types/users'

export const UsersTableContext = React.createContext({} as UserType)

export const useUsersTable = () => {
  const userFromContext = React.useContext(UsersTableContext)

  if (!userFromContext) {
    throw new Error('useUsersTable should be used within <UsersTableContext>')
  }

  return { user: userFromContext }
}
