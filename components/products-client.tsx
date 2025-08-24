"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import type { Product, Filters } from "@/lib/types"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { ArrowUpDown } from "lucide-react"

type Props = {
  products: Product[]
  initialFilters: Filters
  initialSearchParams?: Record<string, any>
  hideCategory?: boolean
}

export function ProductsClient({ products, initialFilters, initialSearchParams, hideCategory }: Props) {
  const router = useRouter()
  const [q, setQ] = useState<string>(String(initialSearchParams?.q || ""))
  const [selected, setSelected] = useState<{
    tier: string[]
    color: string[]
    type: string[]
    size: string[]
  }>({
    tier: splitParam(initialSearchParams?.tier),
    color: splitParam(initialSearchParams?.color),
    type: splitParam(initialSearchParams?.type),
    size: splitParam(initialSearchParams?.size),
  })
  const [sort, setSort] = useState<string>(String(initialSearchParams?.sort || "featured"))

  function splitParam(val: any): string[] {
    if (!val) return []
    return String(val).split(",").filter(Boolean)
  }

  function toggleFilter(key: keyof typeof selected, value: string) {
    setSelected((prev) => {
      const exists = prev[key].includes(value)
      const next = exists ? prev[key].filter((v) => v !== value) : [...prev[key], value]
      return { ...prev, [key]: next }
    })
  }

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      const hay =
        `${p.name} ${p.description ?? ""} ${p.category} ${p.attributes?.tier ?? ""} ${p.attributes?.color ?? ""} ${p.attributes?.type ?? ""} ${p.attributes?.size ?? ""}`.toLowerCase()
      if (q && !hay.includes(q.toLowerCase())) return false
      if (selected.tier.length && !selected.tier.includes(p.attributes?.tier ?? "")) return false
      if (selected.color.length && !selected.color.includes(p.attributes?.color ?? "")) return false
      if (selected.type.length && !selected.type.includes(p.attributes?.type ?? "")) return false
      if (selected.size.length && !selected.size.includes(String(p.attributes?.size ?? ""))) return false
      return true
    })

    switch (sort) {
      case "name-asc":
        list = [...list].sort((a, b) => a.name.localeCompare(b.name))
        break
      case "name-desc":
        list = [...list].sort((a, b) => b.name.localeCompare(a.name))
        break
      default:
        break
    }
    return list
  }, [products, q, selected, sort])

  function applyToUrl() {
    const sp = new URLSearchParams()
    if (q) sp.set("q", q)
    if (selected.tier.length) sp.set("tier", selected.tier.join(","))
    if (selected.color.length) sp.set("color", selected.color.join(","))
    if (selected.type.length) sp.set("type", selected.type.join(","))
    if (selected.size.length) sp.set("size", selected.size.join(","))
    if (sort) sp.set("sort", sort)
    router.push(`?${sp.toString()}`)
  }

  return (
    <section className="mt-6 grid md:grid-cols-[260px_1fr] gap-8">
      <aside className="rounded-lg border p-4 h-fit sticky top-20">
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="q">Search</Label>
            <div className="flex items-center gap-2">
              <Input id="q" placeholder="Search products..." value={q} onChange={(e) => setQ(e.target.value)} />
              <Button variant="outline" onClick={() => setQ("")}>
                Clear
              </Button>
            </div>
          </div>

          {initialFilters.tier.length > 0 && (
            <fieldset className="grid gap-2">
              <legend className="font-medium">Tier</legend>
              {initialFilters.tier.map((v) => (
                <Label key={v} className="flex items-center gap-2 font-normal">
                  <Checkbox checked={selected.tier.includes(v)} onCheckedChange={() => toggleFilter("tier", v)} />
                  {v}
                </Label>
              ))}
            </fieldset>
          )}

          {initialFilters.color.length > 0 && (
            <fieldset className="grid gap-2">
              <legend className="font-medium">Color</legend>
              {initialFilters.color.map((v) => (
                <Label key={v} className="flex items-center gap-2 font-normal">
                  <Checkbox checked={selected.color.includes(v)} onCheckedChange={() => toggleFilter("color", v)} />
                  {v}
                </Label>
              ))}
            </fieldset>
          )}

          {initialFilters.type.length > 0 && (
            <fieldset className="grid gap-2">
              <legend className="font-medium">Type</legend>
              {initialFilters.type.map((v) => (
                <Label key={v} className="flex items-center gap-2 font-normal">
                  <Checkbox checked={selected.type.includes(v)} onCheckedChange={() => toggleFilter("type", v)} />
                  {v}
                </Label>
              ))}
            </fieldset>
          )}

          {initialFilters.size.length > 0 && (
            <fieldset className="grid gap-2">
              <legend className="font-medium">Size (inches)</legend>
              {initialFilters.size.map((v) => (
                <Label key={v} className="flex items-center gap-2 font-normal">
                  <Checkbox checked={selected.size.includes(v)} onCheckedChange={() => toggleFilter("size", v)} />
                  {v}"
                </Label>
              ))}
            </fieldset>
          )}

          <div className="flex items-center gap-2">
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white" onClick={applyToUrl}>
              Apply
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setQ("")
                setSelected({ tier: [], color: [], type: [], size: [] })
                setSort("featured")
                router.push("?")
              }}
            >
              Reset
            </Button>
          </div>
        </div>
      </aside>

      <div className="grid gap-4">
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm text-neutral-600">{filtered.length} product(s) found</p>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => setSort((s) => (s === "name-asc" ? "name-desc" : "name-asc"))}>
              <ArrowUpDown className="w-4 h-4 mr-2" />
              Sort by name
            </Button>
          </div>
        </div>
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <li key={p.sku}>
              <ProductCard product={p} hideCategory={!!hideCategory} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
