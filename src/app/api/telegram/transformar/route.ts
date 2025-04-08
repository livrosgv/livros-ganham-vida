import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { link } = await req.json()

  try {
    const fileId = link.split("/").pop()
    const url = `https://api.telegram.org/file/bot${process.env.TELEGRAM_BOT_TOKEN}/videos/${fileId}.mp4`

    return NextResponse.json({ url })
  } catch {
  return NextResponse.json({ url: link })
}
}
