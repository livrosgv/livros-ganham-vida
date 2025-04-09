import { NextResponse } from "next/server";
import { db } from '@/lib/firebase';
import { collection, addDoc } from "firebase/firestore";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("📦 Corpo recebido:", JSON.stringify(body));

    const mensagem = body.message || body.edited_message || body.channel_post;

    if (!mensagem || !mensagem.chat || !mensagem.message_id) {
      return NextResponse.json({ error: "Mensagem inválida" }, { status: 400 });
    }

    const tipo = mensagem.photo ? "photo" :
                 mensagem.video ? "video" :
                 mensagem.document ? "document" : "desconhecido";

    const fileId =
      mensagem?.photo?.[mensagem.photo.length - 1]?.file_id ||
      mensagem?.video?.file_id ||
      mensagem?.document?.file_id;

    const linkOriginal = `https://t.me/arquivosgv/${mensagem.message_id}`;

    if (!fileId) {
      return NextResponse.json({ error: "Arquivo não encontrado" }, { status: 400 });
    }

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const resposta = await fetch(`https://api.telegram.org/bot${token}/getFile?file_id=${fileId}`);
    const json = await resposta.json();

    if (!json.ok) {
      throw new Error("Erro ao buscar file_path: " + JSON.stringify(json));
    }

    const filePath = json.result.file_path;
    const linkDireto = `https://api.telegram.org/file/bot${token}/${filePath}`;

    await addDoc(collection(db, "links"), {
      tipo,
      fileId,
      linkOriginal,
      linkDireto,
      criadoEm: new Date(),
    });

    console.log(`✅ Link salvo no sistema: ${linkOriginal} → ${linkDireto}`);

    return NextResponse.json({ ok: true });
  } catch (erro) {
    console.error("❌ Erro no webhook:", erro);
    return NextResponse.json({ error: "Erro interno no servidor" }, { status: 500 });
  }
}
