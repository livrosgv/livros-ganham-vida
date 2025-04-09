'use client'

import { useEffect, useState } from 'react'
import { getDoc, doc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { linkParaId } from '@/utils/telegram'

type Props = {
  url: string
}

export default function PreviewMidia({ url }: Props) {
  const [linkFinal, setLinkFinal] = useState<string | null>(null)

  useEffect(() => {
    if (!url || typeof url !== 'string') return

    const buscarLinkConvertido = async () => {
      try {
        const id = linkParaId(url)
        const ref = doc(db, 'midias', id)
        const snap = await getDoc(ref)

        if (snap.exists()) {
          const data = snap.data()
          setLinkFinal(data.convertido || url)
        } else {
          setLinkFinal(url)
        }
      } catch (error) {
        console.error('Erro ao buscar link no Firestore:', error)
        setLinkFinal(url)
      }
    }

    buscarLinkConvertido()
  }, [url])

  if (!linkFinal) return null

  if (linkFinal.endsWith('.mp4') || linkFinal.includes('/video/')) {
    return (
      <video
        src={linkFinal}
        controls
        className="w-full max-w-lg rounded my-2"
      />
    )
  }

  if (
    linkFinal.match(/\.(jpeg|jpg|gif|png)$/i) ||
    linkFinal.includes('/photos/')
  ) {
    return (
      <img
        src={linkFinal}
        alt="Prévia da imagem"
        className="w-full max-w-xs rounded my-2"
      />
    )
  }

  return null
}
