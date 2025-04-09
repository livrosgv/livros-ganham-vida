// ✅ Arquivo: src/app/api/telegram/transformar/route.ts
import { NextResponse } from "next/server"

type TelegramUpdate = {
  channel_post?: {
    message_id: number
    photo?: { file_id: string }[]
    video?: { file_id: string }
    document?: { file_id: string }
  }
}

export async function POST(req: Request) {
  const { link }: { link: string } = await req.json()

  try {
    const parts = link.split("/")
    const messageId = parts.pop()
    parts.pop() // remove o nome do canal

    if (!messageId) return NextResponse.json({ url: link })

    const updatesResponse = await fetch(
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/getUpdates`
    )
    const updatesJson = await updatesResponse.json()

    const updates = updatesJson.result as TelegramUpdate[]
    const update = updates.find(
      (u) => u.channel_post?.message_id?.toString() === messageId
    )

    if (!update || !update.channel_post) return NextResponse.json({ url: link })

    const fileId =
      update.channel_post.photo?.at(-1)?.file_id ||
      update.channel_post.video?.file_id ||
      update.channel_post.document?.file_id

    if (!fileId) return NextResponse.json({ url: link })

    const fileResponse = await fetch(
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/getFile?file_id=${fileId}`
    )
    const fileJson = await fileResponse.json()
    const filePath = fileJson.result?.file_path

    if (!filePath) return NextResponse.json({ url: link })

    const finalUrl = `https://api.telegram.org/file/bot${process.env.TELEGRAM_BOT_TOKEN}/${filePath}`
    return NextResponse.json({ url: finalUrl })
  } catch {
    return NextResponse.json({ url: link })
  }
}
