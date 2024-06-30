import { zodResolver } from '@hookform/resolvers/zod'
import { Eraser, Search } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import type { SearchFormType } from '@/@types/filter-params'
import { updateParams } from '@/utils/update-params'

import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { InputError } from '../ui/input-error'

const formSchema = z.object({
  search: z
    .string()
    .min(2, { message: 'A busca deve conter 2 ou mais letras' }),
})

type FormSchema = z.infer<typeof formSchema>

interface SearchFormProps {
  data: SearchFormType
}

export function SearchForm({ data }: SearchFormProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { searchInput } = data

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors: formErrors },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: { search: searchInput?.value },
  })
  const textInput = watch('search')
  const isSubmitDisabled = !textInput || textInput.length < 2
  const showClearFilter = textInput || searchParams.get('search')

  function handleSearch({ search }: FormSchema) {
    if (!search) return null

    const params = updateParams({
      searchParams,
      params: [{ key: 'search', value: search }],
      deleteParams: ['page'],
    })
    router.replace(`${pathname}?${params}`)
  }

  function handleClearForm() {
    const params = updateParams({ searchParams, deleteParams: ['search'] })
    reset({ search: '' })
    router.replace(`${pathname}?${params}`)
  }

  return (
    <form onSubmit={handleSubmit(handleSearch)} className="flex flex-1 gap-2">
      {searchInput && (
        <div className="relative flex-1 sm:max-w-72">
          <Input
            placeholder={searchInput.placeholder}
            {...register('search')}
          />
          {formErrors.search?.message && (
            <InputError
              text={formErrors.search.message}
              className="-top-6 left-0"
            />
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

      {showClearFilter && (
        <Button type="button" variant="ghost" onClick={handleClearForm}>
          <Eraser className="size-4" />
          <span className="text-sm font-medium">Limpar filtros</span>
        </Button>
      )}
    </form>
  )
}
