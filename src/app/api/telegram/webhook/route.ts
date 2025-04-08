import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.json();
  console.log("📨 Mensagem recebida do Telegram:", data);
  return NextResponse.json({ ok: true });
}
