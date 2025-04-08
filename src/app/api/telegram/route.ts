// app/api/telegram/route.ts
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { fileId } = await req.json()

  const botToken = process.env.TELEGRAM_BOT_TOKEN
  if (!botToken) {
    return NextResponse.json({ error: 'Token não encontrado' }, { status: 500 })
  }

  const response = await fetch(`https://api.telegram.org/bot${botToken}/getFile?file_id=${fileId}`)
  const data = await response.json()

  const file_path = data?.result?.file_path
  if (!file_path) {
    return NextResponse.json({ error: 'Caminho do arquivo não encontrado' }, { status: 500 })
  }

  const url = `https://api.telegram.org/file/bot${botToken}/${file_path}`
  return NextResponse.json({ url })
}
