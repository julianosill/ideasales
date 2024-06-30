import '@testing-library/jest-dom'

import { fireEvent, render } from '@testing-library/react'

import { Pagination } from '@/components/pagination'

jest.mock('next/navigation', () => ({
  usePathname: () => '',
  useSearchParams: () => '',
  useRouter: () => {
    return { push: routerPush }
  },
}))

const routerPush = jest.fn()

describe('Pagination component', () => {
  it('should show 5 of 5 items on first page', () => {
    const wrapper = render(<Pagination currentPage={1} totalItems={5} />)
    const listItems = wrapper.getByText('Exibindo 5 de 5 itens')
    expect(listItems).toBeInTheDocument()
  })

  it('should show last items on last page', () => {
    const wrapper = render(
      <Pagination currentPage={3} totalItems={28} perPage={10} />,
    )

    const listItems = wrapper.getByText('Exibindo 8 de 28 itens')
    const pageSelector = wrapper.getByRole('combobox')

    expect(listItems).toBeInTheDocument()
    expect(pageSelector).toHaveTextContent('3')
  })

  it('should go to last page if render with current page higher than total pages', () => {
    const wrapper = render(
      <Pagination currentPage={5} totalItems={25} perPage={10} />,
    )
    const pagination = wrapper.getByRole('pagination')

    expect(pagination).toBeInTheDocument()
    expect(routerPush).toHaveBeenCalledWith('?page=3')
  })

  it('should navigation buttons be enabled', () => {
    const wrapper = render(
      <Pagination currentPage={2} totalItems={28} perPage={10} />,
    )

    const firstButton = wrapper.getByRole('button', {
      name: /primeira página/i,
    })
    const previousButton = wrapper.getByRole('button', {
      name: /página anterior/i,
    })
    const nextButton = wrapper.getByRole('button', { name: /próxima página/i })
    const lastButton = wrapper.getByRole('button', { name: /última página/i })

    expect(firstButton).toBeEnabled()
    expect(previousButton).toBeEnabled()
    expect(nextButton).toBeEnabled()
    expect(lastButton).toBeEnabled()
  })

  it('should be able to navigate to the next page', () => {
    const wrapper = render(<Pagination currentPage={2} totalItems={28} />)

    const nextButton = wrapper.getByRole('button', { name: /próxima página/i })
    fireEvent.click(nextButton)
    expect(routerPush).toHaveBeenCalledWith('?page=3')
  })

  it('should be able to navigate to the previous page', () => {
    const wrapper = render(<Pagination currentPage={3} totalItems={32} />)
    const previoustButton = wrapper.getByRole('button', {
      name: /página anterior/i,
    })
    fireEvent.click(previoustButton)
    expect(routerPush).toHaveBeenCalledWith('?page=2')
  })

  it('should be able to navigate to the last page', () => {
    const wrapper = render(
      <Pagination currentPage={1} totalItems={52} perPage={10} />,
    )

    const lastButton = wrapper.getByRole('button', { name: /última página/i })
    fireEvent.click(lastButton)
    expect(routerPush).toHaveBeenCalledWith('?page=6')
  })

  it('should be able to navigate to the first page', () => {
    const wrapper = render(<Pagination currentPage={4} totalItems={58} />)

    const firstButton = wrapper.getByRole('button', {
      name: /primeira página/i,
    })
    fireEvent.click(firstButton)
    expect(routerPush).toHaveBeenCalledWith('?page=1')
  })

  it('should first and previous buttons be disabled on first page', () => {
    const wrapper = render(<Pagination currentPage={1} totalItems={28} />)

    const firstButton = wrapper.getByRole('button', {
      name: /primeira página/i,
    })
    const previousButton = wrapper.getByRole('button', {
      name: /página anterior/i,
    })
    expect(firstButton).toBeDisabled()
    expect(previousButton).toBeDisabled()
  })

  it('should next and last buttons be disabled on last page', () => {
    const wrapper = render(
      <Pagination currentPage={3} totalItems={28} perPage={10} />,
    )

    const nextButton = wrapper.getByRole('button', { name: /próxima página/i })
    const lastButton = wrapper.getByRole('button', { name: /última página/i })
    expect(nextButton).toBeDisabled()
    expect(lastButton).toBeDisabled()
  })
})
