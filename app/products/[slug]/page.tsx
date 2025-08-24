import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ProductGallery } from "@/components/product-gallery"
import { JsonLd } from "@/components/json-ld"
import { getProductBySlug, WHATSAPP_NUMBER } from "@/lib/data"
import { PhoneCall } from "lucide-react"

type Props = { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = getProductBySlug(params.slug)
  if (!product) return { title: "Product — Yatanz" }
  const title = `${product.name} — Yatanz`
  const description =
    product.seoDescription ||
    `${product.name} by Yatanz. ${product.attributes?.features?.join(", ") || "Premium materials and design."}`
  return {
    title,
    description,
    keywords: product.seoKeywords,
    openGraph: {
      title,
      description,
      images: product.images?.slice(0, 1).map((src) => ({ url: src })) || [],
    },
  }
}

export default function ProductPage({ params }: Props) {
  const product = getProductBySlug(params.slug)
  if (!product) notFound()

  const waText = encodeURIComponent(
    `I want to buy this item. Please tell me the availability and price.\n\nProduct: ${product.name}\nSKU: ${product.sku}\nLink: ${process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com"}/products/${product.slug}`,
  )
  const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${waText}`

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    sku: product.sku,
    brand: { "@type": "Brand", name: "Yatanz" },
    category: product.category,
    description:
      product.seoDescription ||
      `${product.name} with ${product.attributes?.tier ?? ""} ${product.attributes?.type ?? ""} ${product.attributes?.color ?? ""}`.trim(),
    image: product.images,
    url: `/products/${product.slug}`,
    additionalProperty: Object.entries(product.dimensions || {}).map(([name, value]) => ({
      "@type": "PropertyValue",
      name,
      value,
    })),
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SiteHeader />
      <main className="container mx-auto px-4 md:px-6 py-8 md:py-10">
        <div className="grid lg:grid-cols-2 gap-10">
          <ProductGallery images={product.images} alt={product.name} />
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">{product.name}</h1>
            <div className="mt-2 flex flex-wrap gap-2">
              {product.attributes?.tier && <Badge variant="outline">{product.attributes.tier}</Badge>}
              {product.attributes?.type && <Badge variant="outline">{product.attributes.type}</Badge>}
              {product.attributes?.color && <Badge variant="outline">{product.attributes.color}</Badge>}
              {product.attributes?.size && <Badge variant="outline">{product.attributes.size}"</Badge>}
            </div>

            <p className="mt-4 text-neutral-700">
              {product.description ||
                "Crafted with durable materials and modern finishes for long-lasting performance and style."}
            </p>

            {product.attributes?.features?.length ? (
              <ul className="mt-4 list-disc pl-5 text-neutral-700">
                {product.attributes.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            ) : null}

            {product.dimensions ? (
              <div className="mt-4">
                <p className="font-medium">Dimensions</p>
                <p className="text-neutral-700 text-sm">
                  {Object.entries(product.dimensions)
                    .map(([k, v]) => `${k}: ${v}`)
                    .join(" · ")}
                </p>
              </div>
            ) : null}

            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild className="bg-emerald-600 hover:bg-emerald-700 text-white">
                <a href={waHref} target="_blank" rel="noopener noreferrer" aria-label="Order on WhatsApp">
                  <span className="flex items-center gap-2">
                    <Image src="/icons/whatsapp.png" alt="WhatsApp" width={18} height={18} className="rounded-sm" />
                    Order on WhatsApp
                  </span>
                </a>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/contact" className="flex items-center gap-2">
                  <PhoneCall className="w-4 h-4" />
                  Enquire
                </Link>
              </Button>
            </div>

            <div className="mt-8 rounded-lg border p-4 bg-neutral-50">
              <p className="text-sm text-neutral-700">
                Tip: Hover or click the image to zoom. Use thumbnails to view other angles.
              </p>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
      <JsonLd json={jsonLd} />
    </div>
  )
}
