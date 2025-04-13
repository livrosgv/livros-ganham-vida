// 📁 app/livros/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from '@/lib/firebase'
import Image from 'next/image'

interface Livro {
  id: string
  titulo: string
  capa: string
  ativo: boolean
}

export default function LivrosPage() {
  const router = useRouter()
  const [livros, setLivros] = useState<Livro[]>([])
  const [autorizado, setAutorizado] = useState(false)

  useEffect(() => {
    const verificarPermissao = async () => {
      onAuthStateChanged(auth, async (user) => {
        if (!user) return router.push('/valores')

        const docRef = doc(db, 'pagamentos', `usuario_${user.email}`)
        const snap = await getDoc(docRef)

        if (!snap.exists() || snap.data().status !== 'ativo') {
          return router.push('/valores')
        }

        setAutorizado(true)
      })
    }

    verificarPermissao()
  }, [router]) // ✅ corrigido: agora o router está como dependência

  useEffect(() => {
    setLivros([
      {
        id: 'acotar',
        titulo: 'Corte de Espinhos e Rosas',
        capa: 'https://t.me/arquivosgv/3',
        ativo: true,
      },
      {
        id: 'trono',
        titulo: 'Trono de Vidro',
        capa: 'https://t.me/arquivosgv/8',
        ativo: false,
      },
      {
        id: 'novidade',
        titulo: 'Crônicas Místicas',
        capa: 'https://t.me/arquivosgv/9',
        ativo: false,
      },
    ])
  }, [])

  if (!autorizado) return null

  return (
    <div className="min-h-screen bg-[#191737] text-white px-6 py-10">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-12">
        Veja seus livros ganharem vida
      </h1>

      <section>
        <h2 className="text-2xl font-semibold mb-4">📚 Já despertaram</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-10">
          {livros.filter(l => l.ativo).map((livro) => (
            <div
              key={livro.id}
              className="cursor-pointer hover:scale-105 transition-transform duration-300"
              onClick={() => router.push(`/livro/${livro.id}`)}
            >
              <Image
                src={livro.capa}
                alt={livro.titulo}
                width={400}
                height={600}
                className="rounded-xl shadow-lg"
              />
              <p className="mt-2 text-center text-lg font-medium">{livro.titulo}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="border-t border-white/20 my-10"></div>

      <section>
        <h2 className="text-2xl font-semibold mb-4">🔮 Ainda adormecidos</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {livros.filter(l => !l.ativo).map((livro) => (
            <div key={livro.id} className="opacity-50">
              <Image
                src={livro.capa}
                alt={livro.titulo}
                width={400}
                height={600}
                className="rounded-xl"
              />
              <p className="mt-2 text-center text-lg font-medium">{livro.titulo}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
