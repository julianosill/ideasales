import '@testing-library/jest-dom'

import { fireEvent, render } from '@testing-library/react'

import { Pagination } from '@/components/pagination'

const onPageChangeCalback = jest.fn()

describe('Pagination component', () => {
  it('should not render with more pages than exist', () => {
    const wrapper = render(
      <Pagination
        currentPage={2}
        totalItems={5}
        perPage={10}
        onPageChange={() => {}}
      />,
    )

    const errorMessage = wrapper.getByText(
      'Erro na renderização do componente.',
    )
    expect(errorMessage).toBeInTheDocument()
  })

  it('should show 5 of 5 items on first page', () => {
    const wrapper = render(
      <Pagination currentPage={1} totalItems={5} onPageChange={() => {}} />,
    )

    const listItems = wrapper.getByText('Exibindo 5 de 5 itens')
    expect(listItems).toBeInTheDocument()
  })

  it('should show last items on last page', () => {
    const wrapper = render(
      <Pagination
        currentPage={3}
        totalItems={28}
        perPage={10}
        onPageChange={() => {}}
      />,
    )

    const listItems = wrapper.getByText('Exibindo 8 de 28 itens')
    const pageSelector = wrapper.getByRole('combobox')

    expect(listItems).toBeInTheDocument()
    expect(pageSelector).toHaveTextContent('3')
  })

  it('should navigation buttons be enabled', () => {
    const wrapper = render(
      <Pagination
        currentPage={2}
        totalItems={28}
        perPage={10}
        onPageChange={() => {}}
      />,
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

  it('should first and previous buttons be disabled on first page', () => {
    const wrapper = render(
      <Pagination currentPage={1} totalItems={28} onPageChange={() => {}} />,
    )

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
      <Pagination
        currentPage={3}
        totalItems={28}
        perPage={10}
        onPageChange={() => {}}
      />,
    )

    const nextButton = wrapper.getByRole('button', { name: /próxima página/i })
    const lastButton = wrapper.getByRole('button', { name: /última página/i })

    expect(nextButton).toBeDisabled()
    expect(lastButton).toBeDisabled()
  })

  it('should be able to navigate to the next page', () => {
    const wrapper = render(
      <Pagination
        currentPage={1}
        totalItems={28}
        onPageChange={onPageChangeCalback}
      />,
    )

    const nextButton = wrapper.getByRole('button', { name: /próxima página/i })
    fireEvent.click(nextButton)
    expect(onPageChangeCalback).toHaveBeenCalledWith(2)
  })

  it('should be able to navigate to the last page', () => {
    const wrapper = render(
      <Pagination
        currentPage={1}
        totalItems={52}
        perPage={10}
        onPageChange={onPageChangeCalback}
      />,
    )

    const lastButton = wrapper.getByRole('button', { name: /última página/i })
    fireEvent.click(lastButton)
    expect(onPageChangeCalback).toHaveBeenCalledWith(6)
  })

  it('should be able to navigate to the previous page', () => {
    const wrapper = render(
      <Pagination
        currentPage={2}
        totalItems={28}
        onPageChange={onPageChangeCalback}
      />,
    )

    const previoustButton = wrapper.getByRole('button', {
      name: /página anterior/i,
    })
    fireEvent.click(previoustButton)
    expect(onPageChangeCalback).toHaveBeenCalledWith(1)
  })

  it('should be able to navigate to the first page', () => {
    const wrapper = render(
      <Pagination
        currentPage={4}
        totalItems={58}
        onPageChange={onPageChangeCalback}
      />,
    )

    const firstButton = wrapper.getByRole('button', {
      name: /primeira página/i,
    })
    fireEvent.click(firstButton)
    expect(onPageChangeCalback).toHaveBeenCalledWith(1)
  })
})
