import { ProductList } from "@/components/product-list"
import { Toaster } from "@/components/ui/toaster"

export default function Home() {
  return (
    <main className="container mx-auto py-6 px-4 md:px-6 lg:py-10">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6">Product Manager</h1>
      <ProductList />
      <Toaster />
    </main>
  )
}
