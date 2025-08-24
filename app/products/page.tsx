import { Suspense } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ProductsClient } from "@/components/products-client"
import { getAllFilters, getProducts } from "@/lib/data"

export const metadata = {
  title: "All Products — Yatanz: Chaos to Class",
  description:
    "Explore all Yatanz products: racks, baskets, umbrella stands, trolleys, microwave and printer stands, and TV screen protectors.",
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams?: {
    q?: string
    tier?: string
    color?: string
    type?: string
    size?: string
    category?: string
  }
}) {
  const products = getProducts()
  const filters = getAllFilters(products)

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SiteHeader />
      <main className="container mx-auto px-4 md:px-6 py-8 md:py-10">
        <h1 className="text-2xl md:text-3xl font-bold">All Products</h1>
        <Suspense fallback={<div className="mt-8">Loading products…</div>}>
          <ProductsClient products={products} initialFilters={filters} initialSearchParams={searchParams} />
        </Suspense>
      </main>
      <SiteFooter />
    </div>
  )
}
