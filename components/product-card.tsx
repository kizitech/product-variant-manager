"use client"

import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Edit, Plus, Trash2 } from "lucide-react"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { VariantList } from "@/components/variant-list"
import { AddVariantDialog } from "@/components/add-variant-dialog"
import { EditProductDialog } from "@/components/edit-product-dialog"
import { ConfirmDialog } from "@/components/confirm-dialog"
import type { Product, Variant } from "@/lib/types"
import { addVariant, deleteProduct, updateProduct } from "@/lib/api"
import { useToast } from "@/components/ui/use-toast"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [isAddVariantOpen, setIsAddVariantOpen] = useState(false)
  const [isEditProductOpen, setIsEditProductOpen] = useState(false)
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false)
  const queryClient = useQueryClient()
  const { toast } = useToast()

  const addVariantMutation = useMutation({
    mutationFn: addVariant,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] })
      setIsAddVariantOpen(false)
      toast({
        title: "Variant added",
        description: "Your product variant has been added successfully.",
      })
    },
  })

  const updateProductMutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] })
      setIsEditProductOpen(false)
      toast({
        title: "Product updated",
        description: "Your product has been updated successfully.",
      })
    },
  })

  const deleteProductMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] })
      setIsDeleteConfirmOpen(false)
      toast({
        title: "Product deleted",
        description: "Your product has been deleted successfully.",
      })
    },
  })

  const handleAddVariant = (variant: Omit<Variant, "id">) => {
    addVariantMutation.mutate({ ...variant, productId: product.id })
  }

  const handleUpdateProduct = (updatedProduct: Omit<Product, "id" | "variants">) => {
    updateProductMutation.mutate({ id: product.id, ...updatedProduct })
  }

  const handleDeleteProduct = () => {
    deleteProductMutation.mutate(product.id)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{product.name}</CardTitle>
            <CardDescription>{product.description}</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={() => setIsEditProductOpen(true)}>
              <Edit className="h-4 w-4" />
              <span className="sr-only">Edit product</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="text-destructive"
              onClick={() => setIsDeleteConfirmOpen(true)}
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Delete product</span>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-medium">Variants</h3>
            <Button variant="outline" size="sm" onClick={() => setIsAddVariantOpen(true)}>
              <Plus className="mr-2 h-3 w-3" />
              Add Variant
            </Button>
          </div>
          <VariantList productId={product.id} variants={product.variants} />
        </div>
      </CardContent>
      <CardFooter className="text-sm text-muted-foreground">
        {product.variants.length} {product.variants.length === 1 ? "variant" : "variants"}
      </CardFooter>

      <AddVariantDialog open={isAddVariantOpen} onOpenChange={setIsAddVariantOpen} onSubmit={handleAddVariant} />

      <EditProductDialog
        open={isEditProductOpen}
        onOpenChange={setIsEditProductOpen}
        product={product}
        onSubmit={handleUpdateProduct}
      />

      <ConfirmDialog
        open={isDeleteConfirmOpen}
        onOpenChange={setIsDeleteConfirmOpen}
        title="Delete Product"
        description="Are you sure you want to delete this product? This action cannot be undone."
        onConfirm={handleDeleteProduct}
      />
    </Card>
  )
}
