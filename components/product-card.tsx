import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Product } from "@/lib/types"
import { WHATSAPP_NUMBER } from "@/lib/data"

export function ProductCard({ product, hideCategory = false }: { product: Product; hideCategory?: boolean }) {
  const waText = encodeURIComponent(
    `I want to buy this item. Please tell me the availability and price.\n\nProduct: ${product.name}\nSKU: ${product.sku}\nLink: ${process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com"}/products/${product.slug}`,
  )
  const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${waText}`

  return (
    <Card className="group overflow-hidden h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative overflow-hidden">
          <Image
            src={product.images[0] || "/placeholder.svg"}
            alt={product.name}
            width={800}
            height={800}
            className="h-56 w-full object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            aria-hidden="true"
          />
        </div>
      </Link>
      <CardContent className="p-4">
        {!hideCategory && <p className="text-xs text-neutral-500 uppercase tracking-wide">{product.category}</p>}
        <h3 className="font-semibold mt-1 leading-tight group-hover:text-emerald-700 transition-colors">
          {product.name}
        </h3>
        <div className="mt-2 flex flex-wrap gap-2">
          {product.attributes?.tier && (
            <Badge variant="outline" className="text-xs">
              {product.attributes.tier}
            </Badge>
          )}
          {product.attributes?.type && (
            <Badge variant="outline" className="text-xs">
              {product.attributes.type}
            </Badge>
          )}
          {product.attributes?.color && (
            <Badge variant="outline" className="text-xs">
              {product.attributes.color}
            </Badge>
          )}
          {product.attributes?.size && (
            <Badge variant="outline" className="text-xs">
              {product.attributes.size}
            </Badge>
          )}
        </div>
        <div className="mt-4 flex items-center gap-2">
          <Button
            asChild
            size="sm"
            className="bg-emerald-600 hover:bg-emerald-700 text-white transition-all duration-200 hover:scale-105"
          >
            <a href={waHref} target="_blank" rel="noopener noreferrer" aria-label="Order on WhatsApp">
              <span className="flex items-center gap-2">
                <Image src="https://img.icons8.com/?size=100&id=BkugfgmBwtEI&format=png&color=000000" alt="WhatsApp" width={20} height={20} />
                WhatsApp
              </span>
            </a>
          </Button>
          <Button
            asChild
            size="sm"
            variant="outline"
            className="hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-200 bg-transparent"
          >
            <Link href={`/products/${product.slug}`}>View Details</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
