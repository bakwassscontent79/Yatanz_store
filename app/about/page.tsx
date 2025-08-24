import Image from "next/image"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata = {
  title: "About — Yatanz: Chaos to Class",
  description:
    "Yatanz designs premium storage and home organization products that transform chaos into class. Built for durability and aesthetics.",
}

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SiteHeader />
      <main className="container mx-auto px-4 md:px-6 py-10 md:py-16">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 items-center mb-16">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">About Yatanz</h1>
              <p className="mt-4 text-neutral-700 text-lg">
                At Yatanz, we believe that every home deserves to be organized beautifully. Our mission is simple:
                transform chaos into class through thoughtfully designed storage solutions.
              </p>
              <p className="mt-4 text-neutral-700">
                From multipurpose storage baskets to specialized stands and racks, every product is crafted with premium
                materials, reliable engineering, and modern aesthetics. We're expanding into home décor appliances to
                bring you a complete home organization ecosystem.
              </p>
            </div>
            <div>
              <Image
                src="/modern-home-organization-storage-solutions.png"
                alt="Yatanz storage solutions in modern home"
                width={700}
                height={500}
                className="rounded-lg border object-cover shadow-sm"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏠</span>
              </div>
              <h3 className="font-semibold mb-2">Home Organization</h3>
              <p className="text-sm text-neutral-600">Comprehensive storage solutions for every room in your home</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⭐</span>
              </div>
              <h3 className="font-semibold mb-2">Premium Quality</h3>
              <p className="text-sm text-neutral-600">Durable materials and finishes that stand the test of time</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="font-semibold mb-2">Modern Design</h3>
              <p className="text-sm text-neutral-600">Stylish products that complement your home's aesthetic</p>
            </div>
          </div>

          <div className="bg-emerald-50 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-semibold mb-4">Ready to Transform Your Space?</h2>
            <p className="text-neutral-700 mb-6">
              Explore our complete range of storage solutions and start your journey from chaos to class.
            </p>
            <Button asChild className="bg-emerald-600 hover:bg-emerald-700 text-white">
              <Link href="/products">Shop All Products</Link>
            </Button>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
