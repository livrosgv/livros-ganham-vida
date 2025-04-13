// ✅ Arquivo: src/app/registro/page.tsx
'use client'

import { useRouter } from 'next/navigation'
import { useState, ChangeEvent } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { FcGoogle } from 'react-icons/fc'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import { salvarPerfilUsuario } from '@/utils/salvarPerfilUsuario'

export default function RegistroPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [nomeEncantado, setNomeEncantado] = useState('')
  const [erro, setErro] = useState('')

  const handleRegistro = async () => {
    try {
      localStorage.setItem('nomeEncantado', nomeEncantado)
      const result = await createUserWithEmailAndPassword(auth, email, senha)
      const foto = result.user.photoURL || ''
      await salvarPerfilUsuario(email, nomeEncantado, foto)
      router.push('/valores')
    } catch (error) {
      console.error(error)
      setErro('Erro ao criar conta mágica ✨')
    }
  }

  return (
    <div className="min-h-screen flex">
      <div className="w-1/2 hidden md:block relative">
        <Image
          src="/images/livro-aberto.jpg"
          alt="Portal mágico"
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>

      <div className="w-full md:w-1/2 bg-[#191737] text-white flex flex-col justify-center items-center p-6 md:p-10">
        <div className="w-full max-w-xl space-y-6">
          <div className="text-center space-y-1">
            <h1 className="text-3xl font-bold">Livros Ganham Vida</h1>
            <div className="flex justify-center">
              <Image
                src="/images/logo-lgv.png"
                alt="Logo LGV"
                width={40}
                height={40}
                className="mx-auto"
              />
            </div>
            <p className="text-base text-[#BCBAB8] mt-1">Crie seu portal mágico ✨</p>
          </div>

          <button
            onClick={() => signIn('google', { callbackUrl: '/valores' })}
            className="w-full flex items-center justify-center gap-2 py-3 bg-white text-black font-medium rounded-md shadow text-sm"
          >
            <FcGoogle className="text-lg" /> Cadastrar-se com o Google
          </button>

          <div className="text-center text-sm text-[#BCBAB8]">OU</div>

          <input
            type="text"
            placeholder="Nome encantado"
            value={nomeEncantado}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setNomeEncantado(e.target.value)}
            className="w-full px-4 py-3 rounded-md bg-[#2a2545] text-white placeholder-[#BCBAB8] focus:outline-none focus:ring-2 focus:ring-[#5d5ba4]"
          />

          <input
            type="email"
            placeholder="E-mail encantado"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-md bg-[#2a2545] text-white placeholder-[#BCBAB8] focus:outline-none focus:ring-2 focus:ring-[#5d5ba4]"
          />

          <input
            type="password"
            placeholder="Senha secreta"
            value={senha}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setSenha(e.target.value)}
            className="w-full px-4 py-3 rounded-md bg-[#2a2545] text-white placeholder-[#BCBAB8] focus:outline-none focus:ring-2 focus:ring-[#5d5ba4]"
          />

          <button
            onClick={handleRegistro}
            className="w-full py-3 bg-[#5d5ba4] text-white rounded-md font-medium"
          >
            Entrar no reino
          </button>

          {erro && (
            <p className="text-center text-red-400 text-sm">{erro}</p>
          )}

          <p className="text-sm text-center text-[#BCBAB8] leading-snug">
            Ao se registrar, você concorda com os mistérios do reino <br />
            e nossos <span className="underline cursor-pointer">Termos mágicos</span>
          </p>

          <p className="text-sm text-center">
            Já tem um portal?{' '}
            <button
              onClick={() => router.push('/login')}
              className="underline text-[#5d5ba4] hover:text-white"
            >
              Entrar no reino 🔮
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
