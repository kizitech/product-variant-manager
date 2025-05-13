"use client"

import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Edit, Trash2 } from "lucide-react"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { EditVariantDialog } from "@/components/edit-variant-dialog"
import { ConfirmDialog } from "@/components/confirm-dialog"
import type { Variant } from "@/lib/types"
import { deleteVariant, updateVariant } from "@/lib/api"
import { useToast } from "@/components/ui/use-toast"
import { formatCurrency } from "@/lib/utils"

interface VariantListProps {
  productId: string
  variants: Variant[]
}

export function VariantList({ productId, variants }: VariantListProps) {
  const [editingVariant, setEditingVariant] = useState<Variant | null>(null)
  const [deletingVariantId, setDeletingVariantId] = useState<string | null>(null)
  const queryClient = useQueryClient()
  const { toast } = useToast()

  const updateVariantMutation = useMutation({
    mutationFn: updateVariant,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] })
      setEditingVariant(null)
      toast({
        title: "Variant updated",
        description: "Your product variant has been updated successfully.",
      })
    },
  })

  const deleteVariantMutation = useMutation({
    mutationFn: deleteVariant,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] })
      setDeletingVariantId(null)
      toast({
        title: "Variant deleted",
        description: "Your product variant has been deleted successfully.",
      })
    },
  })

  const handleUpdateVariant = (variant: Omit<Variant, "id" | "productId">) => {
    if (editingVariant) {
      updateVariantMutation.mutate({
        id: editingVariant.id,
        productId,
        ...variant,
      })
    }
  }

  const handleDeleteVariant = () => {
    if (deletingVariantId) {
      deleteVariantMutation.mutate({ id: deletingVariantId, productId })
    }
  }

  if (variants.length === 0) {
    return (
      <div className="text-center py-6 border rounded-lg bg-muted/50">
        <p className="text-sm text-muted-foreground">No variants yet</p>
      </div>
    )
  }

  return (
    <>
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Size</TableHead>
              <TableHead>Color</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {variants.map((variant) => (
              <TableRow key={variant.id}>
                <TableCell>{variant.size}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-4 h-4 rounded-full border"
                      style={{ backgroundColor: variant.color.toLowerCase() }}
                    />
                    <span>{variant.color}</span>
                  </div>
                </TableCell>
                <TableCell>{formatCurrency(variant.price)}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" onClick={() => setEditingVariant(variant)}>
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit variant</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive"
                      onClick={() => setDeletingVariantId(variant.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete variant</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {editingVariant && (
        <EditVariantDialog
          open={!!editingVariant}
          onOpenChange={(open) => !open && setEditingVariant(null)}
          variant={editingVariant}
          onSubmit={handleUpdateVariant}
        />
      )}

      <ConfirmDialog
        open={!!deletingVariantId}
        onOpenChange={(open) => !open && setDeletingVariantId(null)}
        title="Delete Variant"
        description="Are you sure you want to delete this variant? This action cannot be undone."
        onConfirm={handleDeleteVariant}
      />
    </>
  )
}
