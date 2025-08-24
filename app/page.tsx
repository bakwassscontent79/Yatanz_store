import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { categories } from "@/lib/data"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export const metadata = {
  title: "Yatanz: Chaos to Class — Smart Storage, Racks, Stands & More",
  description:
    "Shop premium storage racks, baskets, umbrella stands, trolleys, microwave & printer stands, and TV screen protectors. Yatanz brings order to your home in style.",
  keywords: [
    "Yatanz",
    "storage racks",
    "kitchen rack",
    "umbrella stand",
    "inverter trolley",
    "microwave stand",
    "printer stand",
    "metal mesh basket",
    "wooden basket",
    "TV screen protector",
    "home organization",
  ],
}

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SiteHeader />
      <main className="flex-1">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-100 to-white" aria-hidden="true" />
          <div className="container mx-auto px-4 md:px-6 py-12 md:py-20 relative">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-neutral-900">
                  Yatanz: Chaos to Class
                </h1>
                <p className="mt-4 text-neutral-600 text-lg">
                  Transform your space with our premium storage solutions. From multipurpose baskets to specialized
                  stands, we bring order and style to every corner of your home.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button asChild className="bg-emerald-600 hover:bg-emerald-700 text-white">
                    <Link href="/products">Shop All Products</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/about" className="flex items-center gap-2">
                      Learn about Yatanz <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
                <div className="mt-8 flex items-center gap-6">
                  <Image src="/placeholder.svg?height=64&width=64" alt="Durable materials" width={64} height={64} />
                  <div>
                    <p className="font-medium">Built to last</p>
                    <p className="text-sm text-neutral-600">Premium materials, modern finishes, functional design.</p>
                  </div>
                </div>
              </div>
              <div className="relative">
                <Image
                  src="/placeholder.svg?height=600&width=800"
                  alt="Modern storage solutions by Yatanz"
                  width={800}
                  height={600}
                  className="rounded-xl border object-cover shadow-sm"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 md:px-6 py-10 md:py-16">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl md:text-3xl font-bold">Shop by Category</h2>
            <Button variant="ghost" asChild>
              <Link href="/products" className="text-emerald-700 hover:text-emerald-800">
                Browse all
              </Link>
            </Button>
          </div>
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.slice(0, 6).map((cat) => (
              <Link
                key={cat.slug}
                href={`/categories/${cat.slug}`}
                className="group"
                aria-label={`View ${cat.name} category`}
              >
                <Card className="overflow-hidden transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg">
                  <CardHeader className="p-0">
                    <Image
                      src={cat.image || "/placeholder.svg"}
                      alt={`${cat.name} category image`}
                      width={800}
                      height={500}
                      className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </CardHeader>
                  <CardContent className="p-4">
                    <CardTitle className="flex items-center justify-between text-lg">
                      <span>{cat.name}</span>
                      <ArrowRight className="w-4 h-4 text-neutral-500 transition-transform group-hover:translate-x-1" />
                    </CardTitle>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        <section className="container mx-auto px-4 md:px-6 pb-16">
          <div className="rounded-xl border bg-neutral-50 p-6 md:p-10">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-xl md:text-2xl font-semibold">TV Screen Protectors</h3>
                <p className="mt-2 text-neutral-600">
                  Crystal Clear Tempered Glass with 9H hardness. Scratch resistant and waterproof. Sizes: 24″, 32″, 43″,
                  50″, 65″, 75″.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {["24", "32", "43", "50", "65", "75"].map((size) => (
                    <span
                      key={size}
                      className="px-3 py-1 rounded-full text-sm border bg-white text-neutral-700"
                      aria-label={`Size ${size} inch`}
                    >
                      {size}"
                    </span>
                  ))}
                </div>
                <Button asChild className="mt-6 bg-emerald-600 hover:bg-emerald-700 text-white">
                  <Link href="/categories/tv-screen-protector">Explore sizes</Link>
                </Button>
              </div>
              <div>
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="TV Screen Protector"
                  width={600}
                  height={400}
                  className="rounded-lg border object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
