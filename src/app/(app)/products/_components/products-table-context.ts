import React from 'react'

import type { ProductType } from '@/@types/products'

export const ProductsTableContext = React.createContext({} as ProductType)

export const useProductsTable = () => {
  const productFromContext = React.useContext(ProductsTableContext)

  if (!productFromContext) {
    throw new Error(
      'useProductsTable should be used within <ProductsTableContext>',
    )
  }

  return { product: productFromContext }
}
