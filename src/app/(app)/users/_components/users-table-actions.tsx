import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Loader2, Trash2 } from 'lucide-react'

import type { UserType } from '@/@types/users'
import { deleteUser } from '@/api/users/delete-user'
import type { FetchUsersResponse } from '@/api/users/fetch-users'
import { AlertDialog } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'

export function UsersTableActions({ user }: { user: UserType }) {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  function deleteUserOnCache(userId: string) {
    const usersListCache = queryClient.getQueriesData<FetchUsersResponse>({
      queryKey: ['users'],
    })

    usersListCache.forEach(([cacheKey, cacheData]) => {
      if (!cacheData) return

      queryClient.setQueryData<FetchUsersResponse>(cacheKey, {
        ...cacheData,
        users: cacheData.users.filter((user) => user.id !== userId),
      })
    })
  }

  const { mutateAsync: deleteUserFn, isPending: isDeletingUser } = useMutation({
    mutationFn: deleteUser,
    async onSuccess(_, id) {
      deleteUserOnCache(id)
      toast({
        description: (
          <p>
            Exclusão de <span className="font-medium">{user.name}</span>{' '}
            realizada com sucesso.
          </p>
        ),
        variant: 'success',
      })
    },
    async onError() {
      toast({
        title: 'Exclusão falhou!',
        description:
          'Por favor, tente novamente. Se o problema persistir, entre em contato com o suporte.',
        variant: 'error',
      })
    },
  })

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <Button
          variant="outline"
          size="icon-xs"
          className="group"
          disabled={isDeletingUser}
        >
          <Loader2 className="absolute size-4 animate-spin opacity-0 group-disabled:opacity-100" />
          <Trash2 className="size-4 group-disabled:opacity-0" />
          <span className="sr-only">Excluir</span>
        </Button>
      </AlertDialog.Trigger>

      <AlertDialog.Content>
        <AlertDialog.Header>
          <AlertDialog.Title>
            Deseja excluir{' '}
            <span className="font-semibold text-accent-foreground">
              {user.name}
            </span>
            ?
          </AlertDialog.Title>
          <AlertDialog.Description>
            Ao confirmar, esta conta será excluída. Lembre-se, esta operação não
            poderá ser revertida.
          </AlertDialog.Description>
        </AlertDialog.Header>
        <AlertDialog.Footer>
          <AlertDialog.Cancel>Cancelar</AlertDialog.Cancel>
          <AlertDialog.Action
            onClick={() => deleteUserFn(user.id)}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Excluir
          </AlertDialog.Action>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog.Root>
  )
}
