'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import Image from 'next/image'

type Categoria =
  | 'nomeEncantado'
  | 'email'
  | 'foto'
  | 'avatar'
  | 'seriesFavoritas'
  | 'preferencias'
  | 'tipoPlano'
  | 'status'

type Props = {
  categorias: Categoria[]
}

type DadosUsuario = {
  nomeEncantado: string
  email: string
  foto?: string
  tipoPlano?: string
  status?: string
  avatar?: string
  seriesFavoritas?: string[]
  preferencias?: Record<string, unknown>
}

export default function PerfilUsuario({ categorias }: Props) {
  const { data: session, status } = useSession()
  const [dados, setDados] = useState<DadosUsuario | null>(null)
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    async function carregarDados() {
      if (!session?.user?.email) return

      const ref = doc(db, 'usuarios', `usuario_${session.user.email}`)
      const snap = await getDoc(ref)

      if (!snap.exists()) {
        const nome = session.user.name || 'Visitante Mágico'
        const email = session.user.email || ''
        const foto = session.user.image || ''

        await setDoc(ref, {
          nomeEncantado: nome,
          email,
          foto,
          criadoEm: serverTimestamp(),
          tipoPlano: '',
          status: '',
          seriesFavoritas: [],
          preferencias: {},
        })

        setDados({
          nomeEncantado: nome,
          email,
          foto,
          tipoPlano: '',
          status: '',
          seriesFavoritas: [],
          preferencias: {},
        })
      } else {
        const dadosFirestore = snap.data()
        setDados({
          nomeEncantado: dadosFirestore.nomeEncantado ?? 'Visitante Mágico',
          email: dadosFirestore.email ?? '',
          foto: dadosFirestore.foto ?? '',
          tipoPlano: dadosFirestore.tipoPlano ?? '',
          status: dadosFirestore.status ?? '',
          avatar: dadosFirestore.avatar ?? '',
          seriesFavoritas: dadosFirestore.seriesFavoritas ?? [],
          preferencias: dadosFirestore.preferencias ?? {},
        })
      }

      setCarregando(false)
    }

    carregarDados()
  }, [session])

  if (status === 'loading' || carregando) {
    return <p className="text-white">🔮 Carregando perfil mágico...</p>
  }

  if (!dados) {
    return <p className="text-white">Nenhum dado encontrado no reino.</p>
  }

  return (
    <div className="text-white space-y-2">
      {categorias.includes('foto') && dados.foto && (
        <Image
          src={dados.foto}
          alt="Foto do usuário"
          width={96}
          height={96}
          className="rounded-full border-2 border-white"
        />
      )}

      {categorias.includes('nomeEncantado') && (
        <p><strong>Nome encantado:</strong> {dados.nomeEncantado}</p>
      )}

      {categorias.includes('email') && (
        <p><strong>Email:</strong> {dados.email}</p>
      )}

      {categorias.includes('avatar') && dados.avatar && (
        <p><strong>Avatar:</strong> {dados.avatar}</p>
      )}

      {categorias.includes('seriesFavoritas') && Array.isArray(dados.seriesFavoritas) && dados.seriesFavoritas.length > 0 && (
        <div>
          <strong>Séries favoritas:</strong>
          <ul className="list-disc list-inside">
            {dados.seriesFavoritas.map((serie, i) => (
              <li key={i}>{serie}</li>
            ))}
          </ul>
        </div>
      )}

      {categorias.includes('preferencias') && dados.preferencias && (
        <div>
          <strong>Preferências:</strong>
          <pre className="bg-[#2a2545] p-2 rounded-md whitespace-pre-wrap">
            {JSON.stringify(dados.preferencias, null, 2)}
          </pre>
        </div>
      )}

      {categorias.includes('tipoPlano') && (
        <p><strong>Plano:</strong> {dados.tipoPlano}</p>
      )}

      {categorias.includes('status') && (
        <p><strong>Status:</strong> {dados.status}</p>
      )}
    </div>
  )
}
