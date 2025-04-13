import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

export async function POST(req: NextRequest) {
  const body = await req.json()
  console.log('📥 Webhook recebido:', JSON.stringify(body, null, 2))

  const mensagem = body?.message || body?.channel_post
  if (!mensagem) {
    console.log('❌ Nenhuma mensagem encontrada.')
    return NextResponse.json({ ok: false, message: 'Nenhuma mensagem encontrada.' })
  }

  const fileId =
    mensagem?.photo?.[mensagem.photo.length - 1]?.file_id ||
    mensagem?.video?.file_id ||
    mensagem?.document?.file_id ||
    mensagem?.audio?.file_id

  if (!fileId) {
    console.log('❌ Nenhum file_id detectado.')
    return NextResponse.json({ ok: true, message: 'Sem mídia detectada.' })
  }

  let filePath = ''
  try {
    const res = await fetch(
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/getFile?file_id=${fileId}`
    )
    const data = await res.json()
    filePath = data?.result?.file_path
  } catch (e) {
    console.log('❌ Erro ao tentar obter o caminho do arquivo:', e)
  }

  let tipo: 'photo' | 'video' | 'audio' | 'document' | 'desconhecido' = 'desconhecido'
  if (mensagem.photo) tipo = 'photo'
  else if (mensagem.video) tipo = 'video'
  else if (mensagem.audio) tipo = 'audio'
  else if (mensagem.document) tipo = 'document'

  const chatId = mensagem.chat.id.toString().replace('-100', '')
  const messageId = mensagem.message_id
  const linkOriginal = `https://t.me/c/${chatId}/${messageId}`

  const docData = {
    linkOriginal,
    tipo,
    criadoEm: serverTimestamp(),
  }

  if (filePath) {
    const linkDireto = `https://api.telegram.org/file/bot${process.env.TELEGRAM_BOT_TOKEN}/${filePath}`
    Object.assign(docData, { linkDireto, status: 'ok' })
    console.log('✅ Salvando no Firestore com linkDireto:', linkDireto)
  } else {
    Object.assign(docData, { fileId, status: 'pendente' })
    console.log('⚠️ Arquivo ainda em processamento. Salvando como pendente.')
  }

  await addDoc(collection(db, 'links'), docData)

  return NextResponse.json({ ok: true })
}
