import Image from "next/image"
import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="border-t bg-white">
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="grid gap-6 md:grid-cols-4">
          <div className="md:col-span-2">
            <p className="font-semibold text-lg">Yatanz: Chaos to Class</p>
            <p className="text-sm text-neutral-600 mt-2">
              Premium storage solutions and home organization products designed to transform your space with style and
              functionality.
            </p>
            <div className="flex items-center gap-4 mt-4">
              <a
                href="https://instagram.com/yatanz_official"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm hover:text-emerald-600 transition-colors"
              >
                <Image src="/icons/instagram.png" alt="Instagram" width={16} height={16} />
                Instagram
              </a>
              <a
                href="https://amazon.in/stores/yatanz"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm hover:text-emerald-600 transition-colors"
              >
                <Image src="/icons/amazon.png" alt="Amazon" width={16} height={16} />
                Amazon
              </a>
              <a
                href="https://flipkart.com/stores/yatanz"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm hover:text-emerald-600 transition-colors"
              >
                <Image src="/icons/flipkart.png" alt="Flipkart" width={16} height={16} />
                Flipkart
              </a>
            </div>
          </div>
          <div className="grid gap-2">
            <p className="font-medium">Quick Links</p>
            <Link href="/products" className="text-sm text-neutral-700 hover:text-emerald-600 transition-colors">
              All Products
            </Link>
            <Link
              href="/categories/multipurpose-storage-basket"
              className="text-sm text-neutral-700 hover:text-emerald-600 transition-colors"
            >
              Storage Baskets
            </Link>
            <Link href="/about" className="text-sm text-neutral-700 hover:text-emerald-600 transition-colors">
              About Us
            </Link>
            <Link href="/contact" className="text-sm text-neutral-700 hover:text-emerald-600 transition-colors">
              Contact
            </Link>
          </div>
          <div className="md:text-right text-sm text-neutral-600">
            <p>&copy; {new Date().getFullYear()} Yatanz. All rights reserved.</p>
            <p className="mt-2">Built for performance and SEO optimization with Next.js</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
