import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { link } = await req.json()

  try {
    const fileId = link.split("/").pop()
    const res = await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/getFile?file_id=${fileId}`)
    const data = await res.json()

    const filePath = data.result?.file_path
    if (!filePath) throw new Error("Caminho do arquivo não encontrado")

    const url = `https://api.telegram.org/file/bot${process.env.TELEGRAM_BOT_TOKEN}/${filePath}`

    return NextResponse.json({ url })
  } catch (error) {
  console.error("Erro ao gerar link direto do Telegram:", error)
  return NextResponse.json({ url: link })
}
}
