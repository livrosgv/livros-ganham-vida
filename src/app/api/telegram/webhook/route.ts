// src/app/api/telegram/webhook/route.ts
import { NextRequest } from "next/server";
import { gerarLinkDiretoTelegram } from "@/utils/telegram";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const message = body?.message || body?.channel_post;

  const file_id =
    message?.video?.file_id ||
    message?.animation?.file_id ||
    message?.photo?.[message.photo.length - 1]?.file_id ||
    message?.document?.file_id;

  if (!file_id) {
    console.log("❌ Nenhum arquivo encontrado na mensagem.");
    return new Response("Nada para fazer", { status: 200 });
  }

  try {
    const url = await gerarLinkDiretoTelegram(file_id);
    console.log("✅ Mídia recebida:", {
      tipo: message?.video ? "vídeo" : message?.animation ? "animação" : message?.photo ? "imagem" : "documento",
      link: url,
    });
  } catch (err) {
    console.error("❌ Erro ao gerar link direto do Telegram:", err);
  }

  return new Response("ok", { status: 200 });
}
