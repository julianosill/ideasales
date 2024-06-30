'use server'

import type { Prisma } from '@prisma/client'

import type {
  OrderType,
  UsersOrderByType,
  UsersStatusType,
} from '@/@types/filter-params'
import type { UserType } from '@/@types/users'
import { prisma } from '@/lib/prisma'

import { verifyAdmin } from '../auth/verify-admin'

interface FetchUsersParams {
  pageIndex?: number
  perPage?: number
  orderBy?: UsersOrderByType
  order?: OrderType
  status?: UsersStatusType
  search?: string
}

type Metadata = {
  page: number
  totalUsers: number
  pendingUsers: number
}

export interface FetchUsersResponse {
  users: UserType[]
  metadata: Metadata
}

export async function fetchUsers({
  pageIndex = 0,
  perPage = 10,
  orderBy = 'name',
  order = 'desc',
  status,
  search,
}: FetchUsersParams): Promise<FetchUsersResponse> {
  await verifyAdmin()

  const shouldFilterPendingUsers = status === 'pending'
  const pendingUsersQuery = shouldFilterPendingUsers
    ? [{ verified: { equals: false } }]
    : undefined

  const prismaQuery: Prisma.UserFindManyArgs = {
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      verified: true,
      createdAt: true,
    },
    where: {
      OR: [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
      ],
      AND: pendingUsersQuery,
    },
    orderBy: {
      name: orderBy === 'name' ? order : undefined,
      role: orderBy === 'role' ? order : undefined,
      verified: orderBy === 'status' ? order : undefined,
      createdAt: orderBy === 'date' ? order : undefined,
    },
    take: perPage,
    skip: pageIndex * perPage,
  }

  const [users, totalUsers, pendingUsers] = await prisma.$transaction([
    prisma.user.findMany(prismaQuery),
    prisma.user.count({ where: prismaQuery.where }),
    prisma.user.count({ where: { verified: false } }),
  ])

  const metadata = { page: pageIndex + 1, totalUsers, pendingUsers }

  return { users, metadata }
}
