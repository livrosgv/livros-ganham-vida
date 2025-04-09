'use client'

import React from 'react'

interface Props {
  link_original: string
  tipo: 'photo' | 'video' | 'audio' | 'document'
}

export default function PreviewMidia({ link_original, tipo }: Props) {
  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md text-sm text-black">
      <p className="mb-2">Tipo: <strong>{tipo}</strong></p>

      {tipo === 'photo' && (
        <img src={link_original} alt="imagem" className="rounded w-full h-auto mb-2" />
      )}

      {tipo === 'video' && (
        <video controls className="rounded w-full h-auto mb-2">
          <source src={link_original} type="video/mp4" />
          Seu navegador não suporta vídeos.
        </video>
      )}

      {tipo === 'audio' && (
        <audio controls className="w-full mb-2">
          <source src={link_original} type="audio/mpeg" />
          Seu navegador não suporta áudio.
        </audio>
      )}

      {tipo === 'document' && (
        <a
          href={link_original}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          Ver documento no Telegram
        </a>
      )}

      <a
        href={link_original}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline text-xs"
      >
        Ver no Telegram
      </a>
    </div>
  )
}
