import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const data = await req.json()
    // Basic validation
    if (!data.name || !data.email || !data.message) {
      return NextResponse.json({ ok: false, error: "Missing fields" }, { status: 400 })
    }
    // In a real app, send email or persist to DB here
    console.log("Contact message:", data)
    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 })
  }
}
