"use client"

import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"
import { AddProductDialog } from "@/components/add-product-dialog"
import type { Product } from "@/lib/types"
import { getProducts, addProduct } from "@/lib/api"
import { useToast } from "@/components/ui/use-toast"

export function ProductList() {
  const [isAddProductOpen, setIsAddProductOpen] = useState(false)
  const queryClient = useQueryClient()
  const { toast } = useToast()

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  })

  const addProductMutation = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] })
      setIsAddProductOpen(false)
      toast({
        title: "Product added",
        description: "Your product has been added successfully.",
      })
    },
  })

  const handleAddProduct = (product: Omit<Product, "id" | "variants">) => {
    addProductMutation.mutate(product)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Your Products</h2>
        <Button onClick={() => setIsAddProductOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-64 rounded-lg bg-muted animate-pulse" />
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-12 border rounded-lg bg-muted/50">
          <h3 className="text-lg font-medium">No products yet</h3>
          <p className="text-muted-foreground mt-1">Add your first product to get started.</p>
          <Button className="mt-4" onClick={() => setIsAddProductOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      <AddProductDialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen} onSubmit={handleAddProduct} />
    </div>
  )
}
