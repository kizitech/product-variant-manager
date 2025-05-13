import type { Product, Variant } from "./types"

// Helper function to generate a unique ID
const generateId = () => Math.random().toString(36).substring(2, 9)

// Local storage keys
const PRODUCTS_KEY = "products"

// Get products from localStorage
export const getProducts = async (): Promise<Product[]> => {
  if (typeof window === "undefined") return []

  const storedProducts = localStorage.getItem(PRODUCTS_KEY)
  return storedProducts ? JSON.parse(storedProducts) : []
}

// Add a new product
export const addProduct = async (product: Omit<Product, "id" | "variants">): Promise<Product> => {
  const products = await getProducts()

  const newProduct: Product = {
    id: generateId(),
    ...product,
    variants: [],
  }

  const updatedProducts = [...products, newProduct]
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(updatedProducts))

  return newProduct
}

// Update a product
export const updateProduct = async (product: Omit<Product, "variants"> & { id: string }): Promise<Product> => {
  const products = await getProducts()

  const productIndex = products.findIndex((p) => p.id === product.id)
  if (productIndex === -1) throw new Error("Product not found")

  const updatedProduct = {
    ...products[productIndex],
    name: product.name,
    description: product.description,
  }

  const updatedProducts = [...products]
  updatedProducts[productIndex] = updatedProduct

  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(updatedProducts))

  return updatedProduct
}

// Delete a product
export const deleteProduct = async (productId: string): Promise<void> => {
  const products = await getProducts()

  const updatedProducts = products.filter((p) => p.id !== productId)
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(updatedProducts))
}

// Add a variant to a product
export const addVariant = async (variant: Omit<Variant, "id">): Promise<Variant> => {
  const products = await getProducts()

  const productIndex = products.findIndex((p) => p.id === variant.productId)
  if (productIndex === -1) throw new Error("Product not found")

  const newVariant: Variant = {
    id: generateId(),
    ...variant,
  }

  const updatedProduct = {
    ...products[productIndex],
    variants: [...products[productIndex].variants, newVariant],
  }

  const updatedProducts = [...products]
  updatedProducts[productIndex] = updatedProduct

  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(updatedProducts))

  return newVariant
}

// Update a variant
export const updateVariant = async (variant: Variant): Promise<Variant> => {
  const products = await getProducts()

  const productIndex = products.findIndex((p) => p.id === variant.productId)
  if (productIndex === -1) throw new Error("Product not found")

  const variantIndex = products[productIndex].variants.findIndex((v) => v.id === variant.id)
  if (variantIndex === -1) throw new Error("Variant not found")

  const updatedVariant = {
    ...products[productIndex].variants[variantIndex],
    size: variant.size,
    color: variant.color,
    price: variant.price,
  }

  const updatedVariants = [...products[productIndex].variants]
  updatedVariants[variantIndex] = updatedVariant

  const updatedProduct = {
    ...products[productIndex],
    variants: updatedVariants,
  }

  const updatedProducts = [...products]
  updatedProducts[productIndex] = updatedProduct

  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(updatedProducts))

  return updatedVariant
}

// Delete a variant
export const deleteVariant = async ({ id, productId }: { id: string; productId: string }): Promise<void> => {
  const products = await getProducts()

  const productIndex = products.findIndex((p) => p.id === productId)
  if (productIndex === -1) throw new Error("Product not found")

  const updatedVariants = products[productIndex].variants.filter((v) => v.id !== id)

  const updatedProduct = {
    ...products[productIndex],
    variants: updatedVariants,
  }

  const updatedProducts = [...products]
  updatedProducts[productIndex] = updatedProduct

  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(updatedProducts))
}
