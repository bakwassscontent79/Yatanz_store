"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

export function ProductGallery({ images, alt }: { images: string[]; alt: string }) {
  const [index, setIndex] = useState(0)
  const active = images[index] || images[0]

  function prev() {
    setIndex((i) => (i - 1 + images.length) % images.length)
  }
  function next() {
    setIndex((i) => (i + 1) % images.length)
  }

  // Simple hover zoom effect with a magnifier lens
  const containerRef = useRef<HTMLDivElement>(null)
  const lensRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const lens = lensRef.current
    if (!container || !lens) return

    function move(e: MouseEvent) {
      const rect = container.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const px = (x / rect.width) * 100
      const py = (y / rect.height) * 100
      lens.style.backgroundImage = `url('${active}')`
      lens.style.backgroundRepeat = "no-repeat"
      lens.style.backgroundSize = "200% 200%"
      lens.style.backgroundPosition = `${px}% ${py}%`
      lens.style.left = Math.max(0, Math.min(rect.width - 120, x - 60)) + "px"
      lens.style.top = Math.max(0, Math.min(rect.height - 120, y - 60)) + "px"
    }

    function enter() {
      lens.style.opacity = "1"
    }
    function leave() {
      lens.style.opacity = "0"
    }

    container.addEventListener("mousemove", move)
    container.addEventListener("mouseenter", enter)
    container.addEventListener("mouseleave", leave)
    return () => {
      container.removeEventListener("mousemove", move)
      container.removeEventListener("mouseenter", enter)
      container.removeEventListener("mouseleave", leave)
    }
  }, [active])

  return (
    <div>
      <div className="relative">
        <div ref={containerRef} className="relative rounded-lg border overflow-hidden">
          <Image
            src={active || "/placeholder.svg"}
            alt={`${alt} image ${index + 1}`}
            width={1200}
            height={1200}
            className="w-full h-[380px] md:h-[480px] object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={index === 0}
          />
          <div
            ref={lensRef}
            className="pointer-events-none absolute w-[120px] h-[120px] rounded-full border border-neutral-300 shadow bg-white/20 opacity-0 transition-opacity"
            aria-hidden="true"
          />
          <div className="absolute inset-y-0 left-0 flex items-center">
            <Button
              variant="outline"
              size="icon"
              className="m-2 bg-transparent"
              onClick={prev}
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center">
            <Button variant="outline" size="icon" className="m-2 bg-transparent" onClick={next} aria-label="Next image">
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="secondary" className="absolute bottom-3 right-3">
                <ZoomIn className="w-4 h-4 mr-2" />
                View full
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <Image
                src={active || "/placeholder.svg"}
                alt={`${alt} zoomed`}
                width={1600}
                height={1600}
                className="w-full h-auto object-contain"
              />
            </DialogContent>
          </Dialog>
        </div>

        <div className="mt-3 grid grid-cols-4 sm:grid-cols-6 md:grid-cols-6 gap-2">
          {images.map((src, i) => (
            <button
              key={src + i}
              onClick={() => setIndex(i)}
              className={`rounded-md border overflow-hidden focus:outline-none focus:ring-2 focus:ring-emerald-600 ${i === index ? "ring-2 ring-emerald-600" : ""}`}
              aria-label={`Show image ${i + 1}`}
            >
              <Image
                src={src || "/placeholder.svg"}
                alt={`${alt} thumbnail ${i + 1}`}
                width={200}
                height={200}
                className="h-20 w-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
