import { notFound } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ProductsClient } from "@/components/products-client"
import { getAllFilters, getCategoryBySlug, getProducts } from "@/lib/data"

type Props = { params: { slug: string }; searchParams?: Record<string, string | string[] | undefined> }

export async function generateMetadata({ params }: Props) {
  const category = getCategoryBySlug(params.slug)
  if (!category) return { title: "Category — Yatanz" }
  return {
    title: `${category.name} — Yatanz`,
    description: `Shop ${category.name} from Yatanz: premium build and modern finishes.`,
  }
}

export default function CategoryPage({ params, searchParams }: Props) {
  const category = getCategoryBySlug(params.slug)
  if (!category) notFound()
  const products = getProducts().filter((p) => p.categorySlug === params.slug)
  const filters = getAllFilters(products)

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SiteHeader />
      <main className="container mx-auto px-4 md:px-6 py-8 md:py-10">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-2xl md:text-3xl font-bold">{category.name}</h1>
        </div>
        <ProductsClient
          products={products}
          initialFilters={filters}
          initialSearchParams={{ ...(searchParams as any), category: params.slug }}
          hideCategory
        />
      </main>
      <SiteFooter />
    </div>
  )
}
