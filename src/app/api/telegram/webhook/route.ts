import { NextRequest, NextResponse } from "next/server";
import { initializeApp, getApps } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { gerarLinkDiretoTelegram, linkParaId } from "@/utils/telegram";
import { salvarLinkConvertido } from "@/utils/salvarLinkConvertido";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
};

if (!getApps().length) {
  initializeApp(firebaseConfig);
}

const db = getFirestore();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const msg = body.message || body.channel_post;

    if (!msg) return NextResponse.json({ status: "ignorado" });

    const tipo = msg.photo ? "photo"
      : msg.video ? "video"
      : msg.audio ? "audio"
      : msg.document ? "document"
      : null;

    if (!tipo) return NextResponse.json({ status: "ignorado" });

    const arquivo = msg[tipo] || (msg.photo && msg.photo.at(-1));
    const file_id = arquivo.file_id;

    const linkDireto = await gerarLinkDiretoTelegram(file_id);
    const username = msg.chat?.username || msg.sender_chat?.username || "arquivosgv";
    const linkOriginal = `https://t.me/${username}/${msg.message_id}`;
    const docId = linkParaId(linkOriginal);

    await setDoc(doc(db, "links", docId), {
      link_original: linkOriginal,
      link_direto: linkDireto,
      tipo,
      criadoEm: new Date().toISOString(),
    });

    await salvarLinkConvertido(linkOriginal, linkDireto);

    return NextResponse.json({ status: "ok", linkDireto });
  } catch (error) {
    console.error("Erro no webhook:", error);
    return NextResponse.json({ status: "erro", error: String(error) });
  }
}
