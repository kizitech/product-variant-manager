export interface Product {
  id: string
  name: string
  description: string
  variants: Variant[]
}

export interface Variant {
  id: string
  productId: string
  size: string
  color: string
  price: number
}
