// 📁 src/app/login/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { FcGoogle } from 'react-icons/fc'
import { auth } from '@/lib/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import PopupRecuperarSenha from '@/components/PopupRecuperarSenha'
import { signIn, useSession } from 'next-auth/react'

export default function LoginPage() {
  const router = useRouter()
  const { data: session } = useSession()
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [mostrarPopup, setMostrarPopup] = useState(false)

  // ✅ Correção: inclui `router` como dependência
  useEffect(() => {
    if (session) {
      router.push('/valores')
    }
  }, [session, router])

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, senha)
      router.push('/valores')
    } catch (err: unknown) {
      console.error(err)
      setErro('Não conseguimos encontrar seu portal mágico ✨')
    }
  }

  return (
    <div className="flex h-screen relative">
      <div className="w-1/2 h-full relative hidden md:block">
        <Image
          src="/images/livro-aberto.jpg"
          alt="Portal mágico"
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center bg-[#191737] text-white px-8">
        <div className="w-full max-w-lg space-y-10">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold">Livros Ganham Vida</h1>
            <Image src="/images/logo-lgv.png" alt="Logo LGV" width={40} height={40} className="mx-auto" />
            <p className="text-base text-[#BCBAB8] font-medium">Conecte-se ao portal mágico ✨</p>
          </div>

          <button
            onClick={() => signIn('google', { callbackUrl: '/valores' })}
            className="flex items-center justify-center w-full py-4 px-4 bg-white text-black rounded-md shadow text-base font-semibold"
          >
            <FcGoogle className="mr-3 text-xl" /> Entrar com o Google
          </button>

          <div className="flex items-center justify-center text-sm text-[#BCBAB8]">
            <span className="mx-2">OU</span>
          </div>

          <div className="space-y-5">
            <input
              type="email"
              placeholder="Seu e-mail encantado"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-4 rounded-md bg-[#2A2546] border border-transparent placeholder-[#BCBAB8] text-base focus:outline-none focus:ring-2 focus:ring-[#5d5ba4]"
            />
            <input
              type="password"
              placeholder="Senha secreta"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full px-4 py-4 rounded-md bg-[#2A2546] border border-transparent placeholder-[#BCBAB8] text-base focus:outline-none focus:ring-2 focus:ring-[#5d5ba4]"
            />
            <button
              onClick={login}
              className="w-full py-4 bg-[#5d5ba4] text-white rounded-md font-semibold text-base"
            >
              Entrar no reino
            </button>
          </div>

          {erro && <p className="text-center text-red-400 text-sm">{erro}</p>}

          <div className="text-right text-sm">
            <button onClick={() => setMostrarPopup(true)} className="text-[#BCBAB8] hover:underline">
              Esqueceu a senha?
            </button>
          </div>

          <p className="text-center text-sm text-[#BCBAB8] leading-snug">
            Ao se registrar, você concorda com os mistérios do reino<br />
            e nossos <a href="#" className="underline hover:text-white">Termos mágicos</a>.
          </p>

          <p className="text-center text-sm text-white font-medium">
            Não tem uma conta mágica?{' '}
            <button
              onClick={() => router.push('/registro')}
              className="underline text-[#5d5ba4] hover:text-white"
            >
              Registre-se no reino 🔮
            </button>
          </p>
        </div>
      </div>

      {mostrarPopup && (
        <PopupRecuperarSenha onClose={() => setMostrarPopup(false)} />
      )}
    </div>
  )
}
