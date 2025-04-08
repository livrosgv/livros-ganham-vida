"use client"

import { signIn } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [erro, setErro] = useState("")
  const router = useRouter()

  const fazerLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password: senha,
    })

    if (res?.error) {
      setErro("E-mail ou senha incorretos.")
    } else {
      router.push("/painel")
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#191737] text-white">
      <form onSubmit={fazerLogin} className="bg-[#2a2755] p-6 rounded-xl flex flex-col gap-4 w-full max-w-sm">
        <h1 className="text-2xl font-bold">Login</h1>
        {erro && <p className="text-red-400">{erro}</p>}
        <input
          type="email"
          placeholder="Seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 rounded bg-[#191737] text-white border border-white/20"
        />
        <input
          type="password"
          placeholder="Sua senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="p-2 rounded bg-[#191737] text-white border border-white/20"
        />
        <button type="submit" className="bg-green-400 text-black font-bold p-2 rounded hover:opacity-80">
          Entrar
        </button>
      </form>
    </main>
  )
}
