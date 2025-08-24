import type { Product, Filters } from "./types"

export const WHATSAPP_NUMBER = "919999999999" // Update to your business number

const cat = (name: string, slug: string, imageQuery: string) => ({
  name,
  slug,
  image: `/placeholder.svg?height=300&width=500&query=${encodeURIComponent(imageQuery)}`,
})

export const categories = [
  cat("Multipurpose Storage Basket", "multipurpose-storage-basket", "multipurpose storage basket organizer"),
  cat("Kitchen Storage Rack", "kitchen-storage-rack", "kitchen storage rack metal 3 tier"),
  cat("Single Inverter Trolley", "single-inverter-trolley", "single inverter trolley"),
  cat("Double Inverter Trolley", "double-inverter-trolley", "double inverter trolley"),
  cat("Microwave Stand", "microwave-stand", "microwave stand 2 tier kitchen"),
  cat("Printer Stand", "printer-stand", "printer stand 3 tier office"),
  cat("Umbrella Stand", "umbrella-stand", "umbrella stand metal"),
  cat("Basket — Wooden Type", "basket-wooden-type", "wooden basket home"),
  cat("Metal Mesh Storage Basket", "metal-mesh-storage-basket", "metal mesh storage basket"),
  cat("TV Screen Protector", "tv-screen-protector", "tv screen protector tempered glass"),
]

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

function imgs(query: string): string[] {
  return [
    `/placeholder.svg?height=900&width=1200&query=${encodeURIComponent(query + " front")}`,
    `/placeholder.svg?height=900&width=1200&query=${encodeURIComponent(query + " angle")}`,
    `/placeholder.svg?height=900&width=1200&query=${encodeURIComponent(query + " detail")}`,
    `/placeholder.svg?height=900&width=1200&query=${encodeURIComponent(query + " lifestyle")}`,
  ]
}

let skuCounter = 1000
function sku() {
  skuCounter += 1
  return "YTZ-" + skuCounter
}

const products: Product[] = []

// Category 1: Multipurpose Storage Basket (2–5 Tier, Square/Round) — NO color variants
;(["2 Tier", "3 Tier", "4 Tier", "5 Tier"] as const).forEach((tier) => {
  ;(["Square", "Round"] as const).forEach((shape) => {
    const name = `Multipurpose Storage Basket — ${tier} (${shape})`
    products.push({
      sku: sku(),
      slug: slugify(name),
      name,
      category: "Multipurpose Storage Basket",
      categorySlug: "multipurpose-storage-basket",
      images: imgs(`multipurpose storage basket ${tier} ${shape} black metal`),
      attributes: { tier, type: shape },
      seoKeywords: ["multipurpose storage basket", tier, shape, "organizer", "Yatanz"],
      tags: ["basket", "storage", "organizer", "multipurpose"],
      description:
        "Versatile multi-tier storage basket perfect for kitchen, bathroom, or utility room organization. Durable construction with ventilated design for easy visibility and airflow.",
    })
  })
})

// Category 2: Kitchen Storage Rack
;(["3 Tier", "2 Tier"] as const).forEach((tier) => {
  ;(["Black", "White"] as const).forEach((color) => {
    const name = `Kitchen Storage Rack — ${tier} (${color})`
    products.push({
      sku: sku(),
      slug: slugify(name),
      name,
      category: "Kitchen Storage Rack",
      categorySlug: "kitchen-storage-rack",
      images: imgs(`kitchen storage rack ${tier} ${color}`),
      attributes: { tier, color },
      seoKeywords: ["kitchen rack", "storage rack", tier, color, "Yatanz"],
      tags: ["kitchen", "storage", "rack"],
    })
  })
})

// Category 3: Single Inverter Trolley
;(["Black", "White"] as const).forEach((color) => {
  const name = `Single Inverter Trolley (${color})`
  products.push({
    sku: sku(),
    slug: slugify(name),
    name,
    category: "Single Inverter Trolley",
    categorySlug: "single-inverter-trolley",
    images: imgs(`single inverter trolley ${color}`),
    attributes: { color, type: "Single" },
    seoKeywords: ["inverter", "trolley", "single", color, "Yatanz"],
    tags: ["trolley", "inverter"],
  })
})

// Category 4: Double Inverter Trolley
;(["Black", "White"] as const).forEach((color) => {
  const name = `Double Inverter Trolley (${color})`
  products.push({
    sku: sku(),
    slug: slugify(name),
    name,
    category: "Double Inverter Trolley",
    categorySlug: "double-inverter-trolley",
    images: imgs(`double inverter trolley ${color}`),
    attributes: { color, type: "Double" },
    seoKeywords: ["inverter", "trolley", "double", color, "Yatanz"],
    tags: ["trolley", "inverter"],
  })
})

// Category 5: Microwave Stand (2 & 3 Tier — Black, White, Golden)
;(["2 Tier", "3 Tier"] as const).forEach((tier) => {
  ;(["Black", "White", "Golden"] as const).forEach((color) => {
    const name = `Microwave Stand — ${tier} (${color})`
    products.push({
      sku: sku(),
      slug: slugify(name),
      name,
      category: "Microwave Stand",
      categorySlug: "microwave-stand",
      images: imgs(`microwave stand ${tier} ${color}`),
      attributes: { tier, color },
      seoKeywords: ["microwave stand", tier, color, "Yatanz"],
      tags: ["kitchen", "microwave", "stand"],
    })
  })
})

// Category 6: Printer Stand (3 Tier — Black, White, Golden)
;(["Black", "White", "Golden"] as const).forEach((color) => {
  const name = `Printer Stand — 3 Tier (${color})`
  products.push({
    sku: sku(),
    slug: slugify(name),
    name,
    category: "Printer Stand",
    categorySlug: "printer-stand",
    images: imgs(`printer stand 3 tier ${color}`),
    attributes: { tier: "3 Tier", color },
    seoKeywords: ["printer stand", "3 tier", color, "Yatanz"],
    tags: ["office", "printer", "stand"],
  })
})

// Category 7: Umbrella Stand (Black, White, Golden)
;(["Black", "White", "Golden"] as const).forEach((color) => {
  const name = `Umbrella Stand (${color})`
  products.push({
    sku: sku(),
    slug: slugify(name),
    name,
    category: "Umbrella Stand",
    categorySlug: "umbrella-stand",
    images: imgs(`umbrella stand ${color}`),
    attributes: { color },
    seoKeywords: ["umbrella stand", color, "Yatanz"],
    tags: ["entryway", "stand"],
  })
})

// Category 8: Basket — Wooden Type (Square, Oval, Round)
;(["Square", "Oval", "Round"] as const).forEach((type) => {
  const name = `Basket — Wooden Type (${type})`
  products.push({
    sku: sku(),
    slug: slugify(name),
    name,
    category: "Basket — Wooden Type",
    categorySlug: "basket-wooden-type",
    images: imgs(`wooden basket ${type}`),
    attributes: { type },
    seoKeywords: ["wooden basket", type, "Yatanz"],
    tags: ["basket", "wooden"],
  })
})

// Category 9: Metal Mesh Storage Basket
const meshVariants: { type: string; color: "Black" | "White" }[] = [
  { type: "Square (Depth)", color: "Black" },
  { type: "Square (Depth)", color: "White" },
  { type: "Rectangle", color: "Black" },
  { type: "Rectangle", color: "White" },
  { type: "Square with Wooden Handle", color: "Black" },
  { type: "Square with Wooden Handle", color: "White" },
  { type: "Rectangle with Wooden Handle", color: "Black" },
  { type: "Rectangle with Wooden Handle", color: "White" },
]
meshVariants.forEach(({ type, color }) => {
  const name = `Metal Mesh Storage Basket — ${type} (${color})`
  products.push({
    sku: sku(),
    slug: slugify(name),
    name,
    category: "Metal Mesh Storage Basket",
    categorySlug: "metal-mesh-storage-basket",
    images: imgs(`metal mesh storage basket ${type} ${color}`),
    attributes: { type, color },
    seoKeywords: ["mesh basket", type, color, "Yatanz"],
    tags: ["basket", "metal", "mesh"],
  })
})

// Category 10: TV Screen Protector (sizes with features)
;["24", "32", "43", "50", "65", "75"].forEach((size) => {
  const name = `TV Screen Protector — ${size}"`
  products.push({
    sku: sku(),
    slug: slugify(name),
    name,
    category: "TV Screen Protector",
    categorySlug: "tv-screen-protector",
    images: imgs(`tv screen protector ${size} inch tempered glass crystal clear`),
    attributes: {
      size,
      features: ["9H Hardness", "Scratch Resistance", "Waterproof", "Crystal Clear Tempered Glass"],
    },
    seoKeywords: ["tv screen protector", `${size} inch`, "tempered glass", "Yatanz"],
    tags: ["tv", "protector", "glass"],
  })
})

export function getProducts() {
  return products
}

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug)
}

export function getCategoryBySlug(slug: string) {
  return categories.find((c) => c.slug === slug)
}

export function getAllFilters(list: Product[]): Filters {
  const tier = new Set<string>()
  const color = new Set<string>()
  const type = new Set<string>()
  const size = new Set<string>()
  list.forEach((p) => {
    if (p.attributes?.tier) tier.add(p.attributes.tier)
    if (p.attributes?.color) color.add(p.attributes.color)
    if (p.attributes?.type) type.add(p.attributes.type)
    if (p.attributes?.size) size.add(String(p.attributes.size))
  })
  return {
    tier: Array.from(tier),
    color: Array.from(color),
    type: Array.from(type),
    size: Array.from(size),
  }
}
