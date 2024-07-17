import { useMutation, useQueryClient } from '@tanstack/react-query'

import { QUERY_KEYS } from '@/@types/react-query'
import { deleteProduct } from '@/api/products/delete-product'
import { DeleteIconButton } from '@/components/icon-buttons/delete-icon-button'
import { AlertDialog } from '@/components/ui/alert-dialog'
import { useToast } from '@/components/ui/use-toast'
import { formatProductName } from '@/utils/format-product-name'

import { useProductsTable } from './products-table-context'

export function ProductsTableDelete() {
  const { product } = useProductsTable()
  const queryClient = useQueryClient()
  const { toast } = useToast()

  const { mutateAsync: deleteProductFn, isPending: isDeletingProduct } =
    useMutation({
      mutationFn: deleteProduct,
      async onSuccess() {
        queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PRODUCTS] })
        toast({
          description: (
            <p>
              <span className="font-medium">
                {formatProductName(product.name, 55)}
              </span>{' '}
              excluído com sucesso.
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
        <DeleteIconButton disabled={isDeletingProduct} />
      </AlertDialog.Trigger>

      <AlertDialog.Content>
        <AlertDialog.Header>
          <AlertDialog.Title className="xs:w-10/12">
            Deseja excluir{' '}
            <span className="font-semibold text-accent-foreground">
              {product.name}
            </span>
            ?
          </AlertDialog.Title>
          <AlertDialog.Description className="flex flex-col gap-0.5">
            <span>Ao confirmar, este produto será excluído.</span>
            <span>Atenção: esta operação não poderá ser revertida.</span>
          </AlertDialog.Description>
        </AlertDialog.Header>
        <AlertDialog.Footer>
          <AlertDialog.Cancel>Cancelar</AlertDialog.Cancel>
          <AlertDialog.Action onClick={() => deleteProductFn(product.id)}>
            Excluir
          </AlertDialog.Action>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog.Root>
  )
}
