'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import Image from 'next/image'

export default function RecuperarPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [mensagem, setMensagem] = useState('')
  const [erro, setErro] = useState('')

  const handleRecuperarSenha = async () => {
    if (!email) {
      setErro('Digite seu e-mail encantado ✨')
      return
    }

    try {
      await sendPasswordResetEmail(auth, email)
      setMensagem('Feitiço de recuperação enviado com sucesso! Confira seu e-mail 📩')
      setErro('')
    } catch (err) {
      console.error(err)
      setErro('Não conseguimos lançar o feitiço. Verifique o e-mail.')
    }
  }

  return (
    <div className="flex h-screen">
      {/* Lado esquerdo com imagem */}
      <div className="w-1/2 h-full relative hidden md:block">
        <Image
          src="/images/livro-aberto.jpg"
          alt="Portal mágico"
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>

      {/* Formulário */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-[#191737] text-white px-8">
        <div className="w-full max-w-lg space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold">Recuperar acesso ao portal 🔮</h1>
            <p className="text-[#BCBAB8]">
              Digite seu e-mail encantado e enviaremos o feitiço de recuperação ✨
            </p>
          </div>

          <input
            type="email"
            placeholder="Seu e-mail encantado"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-4 rounded-md bg-[#2A2546] border border-transparent placeholder-[#BCBAB8] text-base focus:outline-none focus:ring-2 focus:ring-[#5d5ba4]"
          />

          <button
            onClick={handleRecuperarSenha}
            className="w-full py-4 bg-[#5d5ba4] text-white rounded-md font-semibold text-base"
          >
            Enviar feitiço de recuperação
          </button>

          {mensagem && <p className="text-green-400 text-center text-sm">{mensagem}</p>}
          {erro && <p className="text-red-400 text-center text-sm">{erro}</p>}

          <p className="text-center text-sm text-[#BCBAB8]">
            Lembrou sua senha?{' '}
            <button
              onClick={() => router.push('/login')}
              className="underline text-[#5d5ba4] hover:text-white"
            >
              Voltar ao reino
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
