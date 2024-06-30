import type { SelectProps } from '@radix-ui/react-select'

import type {
  OrderByOptions,
  ProductsOrderByType,
  UsersOrderByType,
} from '@/@types/filter-params'

import { Select } from '../ui/select'

interface SelectOrderByProps extends SelectProps {
  options: OrderByOptions<UsersOrderByType | ProductsOrderByType>[]
}

export function SelectOrderBy({ options, ...props }: SelectOrderByProps) {
  return (
    <Select.Root {...props}>
      <Select.Trigger className="min-w-24 max-w-fit">
        <Select.Value placeholder="Selecione uma opção" />
      </Select.Trigger>
      <Select.Content align="end">
        {options.map((option) => (
          <Select.Item key={option.value} value={option.value}>
            {option.name}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  )
}
