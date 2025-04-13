'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export default function PortalMagicoPage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [autorizado, setAutorizado] = useState(false)

  useEffect(() => {
    if (status === 'loading') return

    if (status !== 'authenticated') {
      router.push('/login')
      return
    }

    async function verificarPagamento() {
      if (!session?.user?.email) return

      const ref = doc(db, 'pagamentos', `usuario_${session.user.email}`)
      const snap = await getDoc(ref)

      if (!snap.exists() || snap.data()?.status !== 'ativo') {
        router.push('/valores')
      } else {
        setAutorizado(true)
      }
    }

    verificarPagamento()
  }, [status, session, router])

  if (!autorizado) {
    return <div className="text-white text-center mt-20">Carregando sua magia...</div>
  }

  return (
    <div className="min-h-screen bg-[#191737] text-white flex items-center justify-center text-center px-4">
      <div>
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          ✨ Bem-vindo(a) ao Portal Mágico ✨
        </h1>
        <p className="text-xl md:text-2xl max-w-3xl mx-auto">
          Aqui você encontrará todos os livros que ganharam vida. Prepare-se para entrar em um universo encantado de histórias, personagens e mundos criados com amor.
        </p>
      </div>
    </div>
  )
}
