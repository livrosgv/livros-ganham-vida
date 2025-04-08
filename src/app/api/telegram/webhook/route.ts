import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  console.log("Mensagem recebida do Telegram:", body);

  return NextResponse.json({ status: "ok" });
}
