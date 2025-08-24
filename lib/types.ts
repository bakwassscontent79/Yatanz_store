export type Dimensions = {
  width?: string
  height?: string
  depth?: string
  length?: string
  diameter?: string
}

export type ProductAttributes = {
  tier?: "2 Tier" | "3 Tier" | "4 Tier" | "5 Tier"
  color?: "Black" | "White" | "Golden"
  type?: string
  size?: string | number
  features?: string[]
}

export type Product = {
  sku: string
  slug: string
  name: string
  category: string
  categorySlug: string
  description?: string
  images: string[]
  attributes?: ProductAttributes
  dimensions?: Dimensions
  seoDescription?: string
  seoKeywords?: string[]
  tags?: string[]
}

export type Filters = {
  tier: string[]
  color: string[]
  type: string[]
  size: string[]
}
