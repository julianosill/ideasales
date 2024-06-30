import { useMutation, useQueryClient } from '@tanstack/react-query'

import type { UserType } from '@/@types/users'
import { approveUser } from '@/api/users/approve-user'
import type { FetchUsersResponse } from '@/api/users/fetch-users'
import { AlertDialog } from '@/components/ui/alert-dialog'
import { Badge } from '@/components/ui/badge'
import { Tooltip } from '@/components/ui/tooltip'
import { toast } from '@/components/ui/use-toast'

export function UserStatusBage({ user }: { user: UserType }) {
  const queryClient = useQueryClient()
  const isVerified = user.verified

  function updateUserStatusOnCache(userId: string, verified: boolean) {
    const usersListCache = queryClient.getQueriesData<FetchUsersResponse>({
      queryKey: ['users'],
    })

    usersListCache.forEach(([cacheKey, cacheData]) => {
      if (!cacheData) return

      queryClient.setQueryData<FetchUsersResponse>(cacheKey, {
        ...cacheData,
        users: cacheData.users.map((user) =>
          user.id === userId ? { ...user, verified } : user,
        ),
      })
    })
  }

  const { mutateAsync: approveUserFn, isPending: isApproving } = useMutation({
    mutationFn: approveUser,
    async onSuccess(_, userId) {
      updateUserStatusOnCache(userId, true)
      toast({
        description: (
          <p>
            Aprovação de <span className="font-medium">{user.name}</span>{' '}
            realizada com sucesso.
          </p>
        ),
        variant: 'success',
      })
    },
    async onError() {
      toast({
        title: 'Aprovação falhou!',
        description:
          'Por favor, tente novamente. Se o problema persistir, entre em contato com o suporte.',
        variant: 'error',
      })
    },
  })

  if (isVerified) {
    return (
      <Badge variant="success" className="pointer-events-none">
        Aprovado
      </Badge>
    )
  }

  return (
    <AlertDialog.Root>
      <Tooltip.Provider>
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <AlertDialog.Trigger
              disabled={isApproving}
              className="rounded-full ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            >
              <Badge variant="pending">Pendente</Badge>
            </AlertDialog.Trigger>
          </Tooltip.Trigger>
          <Tooltip.Content>Aprovar cadastro</Tooltip.Content>
        </Tooltip.Root>
      </Tooltip.Provider>

      <AlertDialog.Content>
        <AlertDialog.Header>
          <AlertDialog.Title>
            Deseja aprovar{' '}
            <span className="font-semibold text-accent-foreground">
              {user.name}
            </span>
            ?
          </AlertDialog.Title>
          <AlertDialog.Description>
            Ao confirmar, esta conta poderá acessar os dados desta aplicação.
          </AlertDialog.Description>
        </AlertDialog.Header>
        <AlertDialog.Footer>
          <AlertDialog.Cancel>Cancelar</AlertDialog.Cancel>
          <AlertDialog.Action onClick={() => approveUserFn(user.id)}>
            Aprovar
          </AlertDialog.Action>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog.Root>
  )
}
