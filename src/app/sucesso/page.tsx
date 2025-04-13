// 📁 src/app/sucesso/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export default function SucessoPage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [autorizado, setAutorizado] = useState(false)

  useEffect(() => {
    if (status === 'loading') return
    if (status !== 'authenticated') return router.push('/login')

    async function verificarPagamento() {
      const ref = doc(db, 'pagamentos', `usuario_${session?.user?.email}`)
      const snap = await getDoc(ref)

      if (!snap.exists() || snap.data()?.status !== 'ativo') {
        return router.push('/valores')
      }

      localStorage.setItem('pagamentoConfirmado', 'true')
      setAutorizado(true)
    }

    verificarPagamento()
  }, [status, session, router])

  if (!autorizado) {
    return <div className="text-white text-center mt-20">Carregando sua magia...</div>
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#191737] text-white text-center px-4">
      <h1 className="text-4xl md:text-6xl font-bold mb-6">
        ✨ Assinatura confirmada ✨
      </h1>
      <p className="text-xl md:text-2xl max-w-2xl">
        Obrigada por se tornar um(a) membro(a) encantado(a)! Agora você tem
        acesso completo ao Portal Mágico e todas as experiências que criamos
        com amor.
      </p>

      <a
        href="/portalmagico"
        className="mt-10 bg-[#8676d1] hover:bg-[#6f62c5] px-8 py-4 text-lg text-white font-semibold rounded-full transition shadow-lg shadow-black/40 hover:scale-105 hover:brightness-110"
      >
        Ir para o portal mágico
      </a>
    </div>
  )
}