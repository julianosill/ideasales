'use client'

import { useQuery } from '@tanstack/react-query'
import { AlertCircle } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

import type {
  OrderByType,
  SearchFormType,
  UsersOrderByType,
} from '@/@types/filter-params'
import { QUERY_KEYS } from '@/@types/react-query'
import { fetchUsers } from '@/api/users/fetch-users'
import { Pagination } from '@/components/pagination'
import { TableFilters } from '@/components/table-filters'
import { Alert } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Table } from '@/components/ui/table'
import {
  getOrderParam,
  getPageIndexParam,
  getPerPageParam,
  getSearchParam,
  getStatusParam,
  getUsersOrderByParam,
} from '@/utils/get-params'

import { UsersTableBody } from './users-table-body'
import { UsersTableBodySkeleton } from './users-table-body-skeleton'

export function UsersTable() {
  const searchParams = useSearchParams()
  const pageIndex = getPageIndexParam(searchParams)
  const perPage = getPerPageParam(searchParams)
  const orderBy = getUsersOrderByParam(searchParams)
  const order = getOrderParam(searchParams, 'asc')
  const status = getStatusParam(searchParams)
  const search = getSearchParam(searchParams)

  const formOptions: SearchFormType = {
    searchInput: { value: search, placeholder: 'Digite o nome ou e-mail' },
  }

  const orderByOptions: OrderByType<UsersOrderByType> = {
    value: orderBy,
    options: [
      { value: 'name', name: 'Nome' },
      { value: 'date', name: 'Data' },
      { value: 'role', name: 'Nível de acesso' },
      { value: 'status', name: 'Status' },
    ],
  }

  const { data: result, isPending } = useQuery({
    queryKey: [
      QUERY_KEYS.USERS,
      pageIndex,
      perPage,
      orderBy,
      order,
      status,
      search,
    ],
    queryFn: () =>
      fetchUsers({ pageIndex, perPage, orderBy, order, status, search }),
  })

  const users = result?.users
  const totalUsers = result?.metadata.totalUsers ?? 0
  const pendingUsers = result?.metadata.pendingUsers ?? 0
  const showPendingUsersWarning = pendingUsers >= 1 && status !== 'pending'

  return (
    <div className="space-y-4">
      <TableFilters form={formOptions} orderBy={orderByOptions} order={order} />

      {showPendingUsersWarning && (
        <Alert.Root
          variant="secondary"
          className="flex flex-wrap items-center justify-between gap-4"
        >
          <div className="flex items-center gap-4">
            <AlertCircle className="size-5 min-w-5 text-muted-foreground" />
            <Alert.Description>
              Há {pendingUsers} cadastro(s) aguardando aprovação, clique na tag{' '}
              <span className="font-medium">Pendente</span> para aprová-lo(s).
            </Alert.Description>
          </div>

          <Button variant="secondary" size="sm" asChild>
            <Link href="/users?status=pending">Listar contas pendentes</Link>
          </Button>
        </Alert.Root>
      )}

      <div className="rounded-md border">
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.Head className="w-64">Nome</Table.Head>
              <Table.Head>E-mail</Table.Head>
              <Table.Head className="w-44">Nível de acesso</Table.Head>
              <Table.Head className="w-36 whitespace-nowrap">
                Cadastrado em
              </Table.Head>
              <Table.Head className="w-28">Status</Table.Head>
              <Table.Head className="w-16"></Table.Head>
            </Table.Row>
          </Table.Header>
          {isPending ? (
            <UsersTableBodySkeleton />
          ) : (
            <UsersTableBody users={users} />
          )}
        </Table.Root>
      </div>

      <Pagination
        currentPage={pageIndex + 1}
        perPage={perPage}
        totalItems={totalUsers}
      />
    </div>
  )
}
