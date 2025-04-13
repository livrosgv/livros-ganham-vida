'use client'

import { useState } from 'react'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '@/lib/firebase'

interface Props {
  onClose: () => void
}

export default function PopupRecuperarSenha({ onClose }: Props) {
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
    } catch (err: unknown) {
      console.error(err)
      setErro('Não conseguimos lançar o feitiço. Verifique o e-mail.')
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-[#191737] p-8 rounded-lg w-full max-w-md space-y-6 text-white shadow-lg border border-[#2A2546]">
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-bold">Recuperar acesso ao portal 🔮</h2>
          <p className="text-[#BCBAB8] text-sm">
            Digite seu e-mail encantado e enviaremos o feitiço de recuperação ✨
          </p>
        </div>

        <input
          type="email"
          placeholder="Seu e-mail encantado"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 rounded-md bg-[#2A2546] border border-transparent placeholder-[#BCBAB8] text-sm focus:outline-none focus:ring-2 focus:ring-[#5d5ba4]"
        />

        <button
          onClick={handleRecuperarSenha}
          className="w-full py-3 bg-[#5d5ba4] hover:bg-[#6c6ad8] text-white rounded-md font-medium"
        >
          Enviar feitiço de recuperação
        </button>

        {mensagem && <p className="text-green-400 text-center text-sm">{mensagem}</p>}
        {erro && <p className="text-red-400 text-center text-sm">{erro}</p>}

        <div className="text-center pt-2">
          <button
            onClick={onClose}
            className="text-[#BCBAB8] hover:text-white underline text-sm"
          >
            Fechar portal 🪄
          </button>
        </div>
      </div>
    </div>
  )
}
