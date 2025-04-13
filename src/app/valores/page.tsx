'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSession } from 'next-auth/react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import Rodape from '@/components/Rodape'
import { motion } from 'framer-motion'
import AssinarButton from '@/components/AssinarButton'

export default function ValoresPage() {
  const { data: session } = useSession()
  const [plano, setPlano] = useState<'mensal' | 'anual'>('mensal')
  const [nomeEncantado, setNomeEncantado] = useState('alma encantada')
  const [pagamentoFeito, setPagamentoFeito] = useState(false)

  const preco = plano === 'mensal' ? 'R$ 29,90/mês' : 'R$ 299,90/ano'

  useEffect(() => {
    const nomeSalvo = localStorage.getItem('nomeEncantado')
    if (nomeSalvo) setNomeEncantado(nomeSalvo)

    const pagou = localStorage.getItem('pagamentoConfirmado')
    if (pagou === 'true') setPagamentoFeito(true)

    async function buscarNomeFirestore() {
      if (session?.user?.email) {
        const ref = doc(db, 'usuarios', `usuario_${session.user.email}`)
        const snap = await getDoc(ref)
        if (snap.exists() && snap.data().nomeEncantado) {
          setNomeEncantado(snap.data().nomeEncantado)
        }
      }
    }

    buscarNomeFirestore()
  }, [session])

  return (
    <Suspense fallback={<div className="text-white text-center mt-10">Carregando magia...</div>}>
      <>
        <div
          className="min-h-screen flex flex-col bg-cover bg-center"
          style={{ backgroundImage: "url('/images/fundo-da-pagina-login.png')" }}
        >
          {pagamentoFeito && (
            <div className="bg-green-600 text-white py-3 text-center font-semibold shadow-lg shadow-black/30">
              ✨ Pagamento confirmado! Você agora é um(a) membro(a) encantado(a)! ✨
            </div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-center text-white mt-10 px-4"
          >
            <h1 className="text-3xl font-bold mb-4">
              ✦ SEJA BEM-VINDO(A), {nomeEncantado.toUpperCase()}! ✦
            </h1>
            <p className="max-w-5xl mx-auto text-xl leading-relaxed">
              Obrigada por se registrar no portal mágico. Você acaba de entrar na sala de apresentação do <strong>Livros Ganham Vida</strong> e agora vou te contar tudo que você terá se decidir se tornar um(a) membro(a).
            </p>
          </motion.div>

          <main className="flex-grow flex flex-col items-center justify-center px-4 py-14">
            <h2 className="text-5xl font-bold text-white text-center mb-10">
              ✦ O QUE VOCÊ GANHA? ✦
            </h2>

            <div className="max-w-[120rem] w-full grid md:grid-cols-2 gap-10 bg-black/30 backdrop-blur-lg p-8 rounded-xl relative">
              <div className="text-white space-y-4">
                <ul className="space-y-4 text-base md:text-lg leading-relaxed">
                  <li>✦ <strong>Acesso ao Livroflix</strong>, com séries baseadas em livros como <em>Acotar, Trono de Vidro...</em></li>
                  <li>✦ <strong>Mapa interativo</strong> para visitar os locais mágicos</li>
                  <li>✦ <strong>Testes</strong> como “Qual sua corte de Prythian”</li>
                  <li>✦ <strong>Vídeos exclusivos</strong> com os personagens que você ama</li>
                  <li>✦ <strong>Grupo fechado</strong> no Telegram para conversar</li>
                  <li>✦ <strong>Audiolivros exclusivos</strong> com narração humana</li>
                  <li>✦ <strong>E todas as atualizações</strong> e ferramentas futuras</li>
                </ul>
              </div>

              <div className="bg-[#191737] text-white p-8 rounded-lg flex flex-col items-center justify-center space-y-6 relative">
                <div className="absolute top-6 left-0 w-full px-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setPlano('mensal')}
                      className={`w-1/2 py-3 px-4 text-lg tracking-wide font-bold rounded-md shadow-lg shadow-black/40 transition duration-300 hover:scale-[1.03] hover:brightness-110 ${
                        plano === 'mensal'
                          ? 'bg-[#8676d1] text-white'
                          : 'bg-[#BCBAB8] text-[#191737]'
                      }`}
                    >
                      MENSAL
                    </button>
                    <button
                      onClick={() => setPlano('anual')}
                      className={`w-1/2 py-3 px-4 text-lg tracking-wide font-bold rounded-md shadow-lg shadow-black/40 transition duration-300 hover:scale-[1.03] hover:brightness-110 ${
                        plano === 'anual'
                          ? 'bg-[#8676d1] text-white'
                          : 'bg-[#BCBAB8] text-[#191737]'
                      }`}
                    >
                      ANUAL
                    </button>
                  </div>
                </div>

                <h3 className="text-3xl font-bold pt-20">{preco}</h3>
                <p className="text-base text-center">
                  Seja um(a) membro(a) encantado(a) <span className="text-yellow-400">✦</span>
                </p>
                <AssinarButton plano={plano} />
              </div>
            </div>

            <div className="text-white text-center max-w-5xl mx-auto mt-20 mb-20 px-4 space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold tracking-wide uppercase">
                ✦ Obrigada por fazer parte! ✦
              </h2>
              <p className="text-xl md:text-2xl leading-relaxed font-normal">
                Todos os valores arrecadados serão usados na manutenção do app, melhorias, novos episódios e experiências imersivas. Esse projeto é a realização de um sonho: dar vida aos livros que fizeram parte da minha jornada desde que aprendi a falar.
              </p>
            </div>
          </main>

          <Rodape />
        </div>
      </>
    </Suspense>
  )
}
