export function linkParaId(link: string): string {
  return encodeURIComponent(link);
}

export async function gerarLinkDiretoTelegram(fileId: string): Promise<string> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) throw new Error("Token do bot não encontrado");

  return `https://api.telegram.org/file/bot${token}/${fileId}`;
}
