import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import type { ProductType } from '@/@types/products'
import { QUERY_KEYS } from '@/@types/react-query'
import type { FetchProductsResponse } from '@/api/products/fetch-products'
import { getProduct } from '@/api/products/get-product'
import { updateProduct } from '@/api/products/update-product'
import { EditIconButton } from '@/components/icon-buttons/edit-icon-button'
import { Button } from '@/components/ui/button'
import { Dialog } from '@/components/ui/dialog'
import { Form } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Tooltip } from '@/components/ui/tooltip'
import { useToast } from '@/components/ui/use-toast'
import { formatProductName } from '@/utils/format-product-name'

import { useProductsTable } from './products-table-context'

interface UpdateProductOnCacheProps {
  id: string
  model: string
  name: string
  color: string
}

const formSchema = z.object({
  model: z.string().min(1, { message: 'Insira o modelo' }),
  name: z.string().min(1, { message: 'Insira o nome do produto' }),
  color: z.string().min(1, { message: 'Insira o código de cor' }),
})

type FormSchema = z.infer<typeof formSchema>

export function ProductsTableUpdate() {
  const [openDialog, setOpenDialog] = useState(false)
  const { product: productFromContext } = useProductsTable()
  const queryClient = useQueryClient()
  const { toast } = useToast()

  const { data: product } = useQuery({
    queryKey: [QUERY_KEYS.PRODUCT, productFromContext.id],
    queryFn: () => getProduct(productFromContext.id),
    enabled: openDialog,
  })

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      model: product?.model,
      name: product?.name,
      color: product?.color,
    },
  })

  function updateProductOnCache({
    id,
    model,
    name,
    color,
  }: UpdateProductOnCacheProps) {
    const productQueryKeys = [QUERY_KEYS.PRODUCT, productFromContext.id]
    const productOnCache =
      queryClient.getQueryData<ProductType>(productQueryKeys)
    const productsListOnCache =
      queryClient.getQueriesData<FetchProductsResponse>({
        queryKey: [QUERY_KEYS.PRODUCTS],
      })

    // update standalone cached product
    const updatedProduct = { ...productOnCache, model, name, color }
    queryClient.setQueryData(productQueryKeys, updatedProduct)

    // update product details in cached list
    productsListOnCache.forEach(([cacheKey, cacheData]) => {
      if (!cacheData) return
      queryClient.setQueryData<FetchProductsResponse>(cacheKey, {
        ...cacheData,
        products: cacheData.products.map((product) =>
          product.id === id ? { ...product, model, name, color } : product,
        ),
      })
    })
  }

  const { mutateAsync: updateProductFn, isPending: isUpdatingProduct } =
    useMutation({
      mutationFn: updateProduct,
      async onSuccess(_, { id, model, name, color }) {
        updateProductOnCache({ id, model, name, color })
        setOpenDialog(false)
        toast({
          description: (
            <p>
              <span className="font-medium">{formatProductName(name, 50)}</span>{' '}
              atualizado com sucesso.
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

  function handleUpdateProduct(data: FormSchema) {
    if (!product || !data) return

    if (
      data.model === product.model &&
      data.name === product.name &&
      data.color === product.color
    ) {
      toast({
        title: 'Atualização não realizada!',
        description:
          'Por favor, insira dados diferentes aos atuais para atualizar o produto.',
      })
      return
    }

    updateProductFn({ ...data, id: product.id })
  }

  return (
    <Dialog.Root open={openDialog} onOpenChange={setOpenDialog}>
      <Tooltip.Provider>
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <Dialog.Trigger asChild>
              <EditIconButton disabled={isUpdatingProduct} />
            </Dialog.Trigger>
          </Tooltip.Trigger>
          <Tooltip.Content>Editar produto</Tooltip.Content>
        </Tooltip.Root>
      </Tooltip.Provider>

      {product && (
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Editar produto</Dialog.Title>
            <Dialog.Description>
              Altere os dados abaixo e clique em Salvar para atualizar o
              produto.
            </Dialog.Description>
          </Dialog.Header>

          <Form.Root {...form}>
            <Form.Form onSubmit={form.handleSubmit(handleUpdateProduct)}>
              <Form.Field
                name="model"
                control={form.control}
                defaultValue={product.model}
                render={({ field }) => (
                  <Form.Item>
                    <Form.Label>Modelo</Form.Label>
                    <Form.Control>
                      <Input {...field} />
                    </Form.Control>
                    <Form.Message />
                  </Form.Item>
                )}
              />
              <Form.Field
                name="name"
                control={form.control}
                defaultValue={product.name}
                render={({ field }) => (
                  <Form.Item>
                    <Form.Label>Produto</Form.Label>
                    <Form.Control>
                      <Input {...field} />
                    </Form.Control>
                    <Form.Message />
                  </Form.Item>
                )}
              />
              <Form.Field
                name="color"
                control={form.control}
                defaultValue={product.color}
                render={({ field }) => (
                  <Form.Item>
                    <Form.Label>Cor</Form.Label>
                    <Form.Control>
                      <Input {...field} />
                    </Form.Control>
                    <Form.Message />
                  </Form.Item>
                )}
              />
              <Form.Footer>
                <Dialog.Cancel onClick={() => form.reset()}>
                  Cancelar
                </Dialog.Cancel>
                <Button type="submit" disabled={isUpdatingProduct}>
                  {isUpdatingProduct ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      Salvando
                    </>
                  ) : (
                    <>Salvar</>
                  )}
                </Button>
              </Form.Footer>
            </Form.Form>
          </Form.Root>
        </Dialog.Content>
      )}
    </Dialog.Root>
  )
}
