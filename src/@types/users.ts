export const usersApiErrors = {
  NOT_FOUND: 'user/user-not-found',
  SAME_USER: 'user/same-user-restriction',
} as const

export const userRoles = {
  ADMIN: 'Administração',
  SALES: 'Vendas',
} as const

export type UserRole = keyof typeof userRoles

export type UserType = {
  id: string
  name: string
  email: string
  role: UserRole
  verified: boolean
  createdAt: Date
}
