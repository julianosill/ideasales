import { useMutation, useQueryClient } from '@tanstack/react-query'

import { type UserRole, userRoles, type UserType } from '@/@types/users'
import type { FetchUsersResponse } from '@/api/users/fetch-users'
import { updateUserRole } from '@/api/users/update-user-role'
import { Select } from '@/components/ui/select'
import { toast } from '@/components/ui/use-toast'

export function UserRoleSelect({ user }: { user: UserType }) {
  const queryClient = useQueryClient()

  const roles = Object.entries(userRoles).map(([role, name]) => {
    return { name, role }
  })

  function updateUserRoleOnCache(userId: string, role: UserRole) {
    const usersListCache = queryClient.getQueriesData<FetchUsersResponse>({
      queryKey: ['users'],
    })

    usersListCache.forEach(([cacheKey, cacheData]) => {
      if (!cacheData) return

      queryClient.setQueryData<FetchUsersResponse>(cacheKey, {
        ...cacheData,
        users: cacheData.users.map((user) =>
          user.id === userId ? { ...user, role } : user,
        ),
      })
    })
  }

  const { mutateAsync: updateUserRoleFn, isPending: isUpdatingRole } =
    useMutation({
      mutationFn: updateUserRole,
      async onSuccess(_, { userId, role }) {
        updateUserRoleOnCache(userId, role)
        toast({
          description: (
            <p>
              Nível de acesso de{' '}
              <span className="font-medium">{user.name}</span> atualizado para{' '}
              <span className="font-medium">{userRoles[role]}</span>.
            </p>
          ),
          variant: 'success',
        })
      },
      async onError() {
        toast({
          title: 'Atualização falhou!',
          description:
            'Por favor, tente novamente. Se o problema persistir, entre em contato com o suporte.',
          variant: 'error',
        })
      },
    })

  return (
    <Select.Root
      disabled={!user.verified || isUpdatingRole}
      value={user.role}
      onValueChange={(value: UserRole) => {
        updateUserRoleFn({ userId: user.id, role: value })
      }}
    >
      <Select.Trigger
        data-role={user.role}
        className="h-8 data-[role=ADMIN]:border-primary/25 data-[role=ADMIN]:text-primary"
      >
        <Select.Value />
      </Select.Trigger>
      <Select.Content>
        {roles.map((role) => (
          <Select.Item key={role.role} value={role.role}>
            {role.name}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  )
}
