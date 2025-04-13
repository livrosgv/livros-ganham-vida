'use client'

import React from 'react'
import Image from 'next/image'

type PreviewMidiaProps = {
  linkOriginal: string
  linkDireto?: string
  tipo: 'photo' | 'video' | 'audio' | 'document' | 'desconhecido'
}

export default function PreviewMidia({ linkOriginal, linkDireto, tipo }: PreviewMidiaProps) {
  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md text-sm text-black">
      <p className="mb-2">
        Tipo: <strong>{tipo}</strong>
      </p>

      {tipo === 'photo' && linkDireto && (
        <div className="relative w-full h-64 mb-2">
          <Image
            src={linkDireto}
            alt="Imagem"
            fill
            className="object-contain rounded"
          />
        </div>
      )}

      {tipo === 'video' && linkDireto && (
        <video controls className="rounded w-full h-auto mb-2">
          <source src={linkDireto} type="video/mp4" />
          Seu navegador não suporta vídeos.
        </video>
      )}

      {tipo === 'audio' && linkDireto && (
        <audio controls className="w-full mb-2">
          <source src={linkDireto} type="audio/mpeg" />
          Seu navegador não suporta áudio.
        </audio>
      )}

      {tipo === 'document' && (
        <a
          href={linkOriginal}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline block mb-2"
        >
          Ver documento no Telegram
        </a>
      )}

      <a
        href={linkOriginal}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline text-xs"
      >
        Ver no Telegram
      </a>
    </div>
  )
}
