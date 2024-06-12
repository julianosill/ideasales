import { zodResolver } from '@hookform/resolvers/zod'
import { Eraser, Search } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import type { FormType } from '@/@types/filter-params'
import { updateParams } from '@/utils/update-params'

import { Button } from '../ui/button'
import { Input } from '../ui/input'

const formSchema = z.object({
  query: z
    .string()
    .min(2, { message: 'A busca deve conter 2 ou mais letras.' })
    .optional(),
})

type FormSchema = z.infer<typeof formSchema>

interface SearchFormProps {
  data: FormType
}

export function SearchForm({ data }: SearchFormProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const { search } = data

  const { register, handleSubmit, reset, watch, formState } =
    useForm<FormSchema>({
      resolver: zodResolver(formSchema),
      defaultValues: { query: search?.value },
    })
  const queryInput = watch('query')
  const isFormEmpty = !queryInput
  const isSubmitDisabled = !queryInput || queryInput.length < 2
  const formErrors = formState.errors

  function handleSearch({ query }: FormSchema) {
    if (!query) return null

    const params = updateParams({
      searchParams,
      params: [{ key: 'search', value: query }],
      deleteParams: ['page'],
    })
    router.replace(`${pathname}?${params}`)
  }

  function handleClearForm() {
    const params = updateParams({
      searchParams,
      deleteParams: ['search'],
    })
    reset({ query: '' })
    router.replace(`${pathname}?${params}`)
  }

  return (
    <form onSubmit={handleSubmit(handleSearch)} className="flex flex-1 gap-2">
      {search && (
        <div className="relative flex-1 sm:max-w-72">
          <Input placeholder={search.placeholder} {...register('query')} />
          {formErrors.query && (
            <p className="absolute -top-5 text-xs text-error-foreground">
              {formErrors.query.message}
            </p>
          )}
        </div>
      )}

      <Button
        type="submit"
        variant="secondary"
        size="icon"
        disabled={isSubmitDisabled}
      >
        <Search className="size-5" />
        <span className="sr-only">Pesquisar</span>
      </Button>

      {!isFormEmpty && (
        <Button type="button" variant="ghost" onClick={handleClearForm}>
          <Eraser className="size-4" />
          <span className="text-sm font-medium">Limpar filtros</span>
        </Button>
      )}
    </form>
  )
}
