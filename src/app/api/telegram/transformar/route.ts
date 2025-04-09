import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const { link } = await req.json()

  if (!link || !link.includes("t.me/")) {
    return NextResponse.json({ url: link })
  }

  try {
    const res = await fetch(link)
    const html = await res.text()

    const regex = /https:\/\/api\.telegram\.org\/file\/[^"']+/g
    const match = html.match(regex)

    if (match && match[0]) {
      return NextResponse.json({ url: match[0] })
    } else {
      return NextResponse.json({ url: link })
    }
  } catch (error) {
    console.error("Erro ao transformar link:", error)
    return NextResponse.json({ url: link })
  }
}
