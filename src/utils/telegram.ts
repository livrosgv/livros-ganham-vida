export function linkParaId(link: string): string {
  return encodeURIComponent(link);
}

export async function gerarLinkDiretoTelegram(fileId: string): Promise<string> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) throw new Error("Token do bot não encontrado");

  const resposta = await fetch(`https://api.telegram.org/bot${token}/getFile?file_id=${fileId}`);
  const json = await resposta.json();

  if (!json.ok) {
    throw new Error("Erro ao buscar file_path: " + JSON.stringify(json));
  }

  const filePath = json.result.file_path;
  return `https://api.telegram.org/file/bot${token}/${filePath}`;
}
