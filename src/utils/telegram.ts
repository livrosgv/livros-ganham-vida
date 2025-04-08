// src/utils/telegram.ts
export async function gerarLinkDiretoTelegram(file_id: string) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  if (!botToken) throw new Error("Token do bot não encontrado");

  const response = await fetch(`https://api.telegram.org/bot${botToken}/getFile?file_id=${file_id}`);
  const data = await response.json();

  const file_path = data?.result?.file_path;
  if (!file_path) throw new Error("Caminho do arquivo não encontrado");

  const url = `https://api.telegram.org/file/bot${botToken}/${file_path}`;
  return url;
}
