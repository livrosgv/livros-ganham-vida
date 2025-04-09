// src/app/midia/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { db } from '@/lib/firebase'

interface Midia {
  tipo: 'photo' | 'video' | 'audio' | 'document' | 'desconhecido'
  fileId: string
  linkOriginal: string
  linkDireto: string
  criadoEm: { seconds: number, nanoseconds: number }
}

export default function MidiaPage() {
  const [midias, setMidias] = useState<Midia[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function carregar() {
      const q = query(collection(db, 'links'), orderBy('criadoEm', 'desc'))
      const snap = await getDocs(q)
      const lista: Midia[] = []
      snap.forEach(doc => lista.push(doc.data() as Midia))
      setMidias(lista)
      setLoading(false)
    }
    carregar()
  }, [])

  if (loading) return <p className="text-white p-4">Carregando mídias...</p>

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-2xl font-bold mb-4">📁 Arquivos recebidos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {midias.map((midia, i) => (
          <div key={i} className="bg-gray-100 text-black p-4 rounded shadow">
            <p className="text-sm mb-2">Tipo: <strong>{midia.tipo}</strong></p>

            {midia.tipo === 'photo' && (
              <img src={midia.linkDireto} alt='imagem' className="w-full rounded mb-2" />
            )}

            {midia.tipo === 'video' && (
              <video controls className="w-full rounded mb-2">
                <source src={midia.linkDireto} type="video/mp4" />
              </video>
            )}

            {midia.tipo === 'audio' && (
              <audio controls className="w-full mb-2">
                <source src={midia.linkDireto} type="audio/mpeg" />
              </audio>
            )}

            {midia.tipo === 'document' && (
              <a href={midia.linkDireto} target='_blank' className='text-blue-600 underline block mb-2'>Abrir documento</a>
            )}

            <a href={midia.linkOriginal} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-xs underline">
              Ver no Telegram
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}
