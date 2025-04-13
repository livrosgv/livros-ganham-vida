'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import PreviewMidia from '@/components/PreviewMidia'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '@/lib/firebase'

function converterLinkParaFirestore(link: string): string {
  return link.replace('https://t.me/arquivosgv/', 'https://t.me/c/2578271103/')
}

export default function TestarVideoPage() {
  const [link, setLink] = useState('')
  const [linkConvertido, setLinkConvertido] = useState('')
  const [tipo, setTipo] = useState<'photo' | 'video' | 'audio' | 'document' | 'desconhecido'>('desconhecido')

  const testarLink = async () => {
    if (!link) return alert('Cole um link válido do Telegram')

    const convertido = converterLinkParaFirestore(link)

    try {
      const q = query(collection(db, 'links'), where('linkOriginal', '==', convertido))
      const snapshot = await getDocs(q)

      if (snapshot.empty) {
        alert('Esse link ainda não está disponível ou está pendente.')
        return
      }

      const doc = snapshot.docs[0].data()
      setLinkConvertido(doc.linkDireto || '')
      setTipo(doc.tipo || 'desconhecido')
    } catch (error) {
      console.error(error)
      alert('Erro ao buscar no Firestore')
    }
  }

  return (
    <div className="p-10 min-h-screen bg-[#191737] text-white">
      <h1 className="text-2xl font-bold mb-4">Testar link de mídia</h1>

      <p className="mb-2">{link}</p>
      <Input
        value={link}
        onChange={(e) => setLink(e.target.value)}
        placeholder="https://t.me/arquivosgv/94"
        className="mb-4"
      />

      <Button onClick={testarLink} className="bg-green-500 hover:bg-green-600 text-black">
        Testar agora
      </Button>

      {linkConvertido && (
        <div className="mt-6">
          <PreviewMidia linkOriginal={link} linkDireto={linkConvertido} tipo={tipo} />
        </div>
      )}
    </div>
  )
}
