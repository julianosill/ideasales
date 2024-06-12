import { type ReadonlyURLSearchParams } from 'next/navigation'

type Param = {
  key: string
  value: string
}

interface UpdateParamsProps {
  searchParams: ReadonlyURLSearchParams
  params?: Param[]
  deleteParams?: string[]
}

export function updateParams({
  searchParams,
  params,
  deleteParams,
}: UpdateParamsProps) {
  const currentParams = new URLSearchParams(searchParams)

  if (params) {
    params.forEach((param: Param) => {
      currentParams.set(param.key, param.value)
    })
  }

  if (deleteParams) {
    deleteParams.forEach((deleteParam) => {
      currentParams.delete(deleteParam)
    })
  }

  return currentParams.toString()
}
