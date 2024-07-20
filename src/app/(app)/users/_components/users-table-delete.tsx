import { useMutation, useQueryClient } from '@tanstack/react-query'

import { QUERY_KEYS } from '@/@types/react-query'
import { deleteUser } from '@/api/users/delete-user'
import { DeleteIconButton } from '@/components/icon-buttons/delete-icon-button'
import { AlertDialog } from '@/components/ui/alert-dialog'
import { useToast } from '@/components/ui/use-toast'

import { useUsersTable } from './users-table-context'

export function UsersTableDelete() {
  const { user } = useUsersTable()
  const queryClient = useQueryClient()
  const { toast } = useToast()

  const { mutateAsync: deleteUserFn, isPending: isDeletingUser } = useMutation({
    mutationFn: deleteUser,
    async onSuccess() {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USERS] })
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
        <DeleteIconButton disabled={isDeletingUser} />
      </AlertDialog.Trigger>

      <AlertDialog.Content>
        <AlertDialog.Header>
          <AlertDialog.Title className="xs:w-10/12">
            Deseja excluir{' '}
            <span className="font-semibold text-accent-foreground">
              {user.name}
            </span>
            ?
          </AlertDialog.Title>
          <AlertDialog.Description className="flex flex-col gap-0.5">
            <span>Ao confirmar, esta conta será excluída.</span>
            <span>Atenção: esta operação não poderá ser revertida.</span>
          </AlertDialog.Description>
        </AlertDialog.Header>
        <AlertDialog.Footer>
          <AlertDialog.Cancel>Cancelar</AlertDialog.Cancel>
          <AlertDialog.Action onClick={() => deleteUserFn(user.id)}>
            Excluir
          </AlertDialog.Action>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog.Root>
  )
}
