// src/lib/cacheTelegram.ts

const cacheRecentes: Record<string, string> = {}

export function salvarNoCache(messageId: string, url: string) {
  cacheRecentes[messageId] = url
}

export function buscarNoCache(messageId: string): string | null {
  return cacheRecentes[messageId] || null
}
