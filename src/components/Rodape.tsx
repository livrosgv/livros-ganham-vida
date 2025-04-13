'use client'

import Link from 'next/link'
import Image from 'next/image'
import RedesSociais from './RedesSociais'
import LinhaComEstrela from './LinhaComEstrela'

export default function Rodape() {
  return (
    <footer className="bg-[#BCBAB8] text-[#191737] py-6 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo e Início */}
        <div>
          <Link href="/">
            <Image
              src="/images/logo-lgv.png"
              alt="Logo LGV"
              width={40}
              height={40}
              className="mb-2"
            />
          </Link>
          <Link href="/" className="text-base hover:underline block">Início</Link>
        </div>

        {/* LIVROS GANHAM VIDA */}
        <div>
          <h3 className="text-lg font-bold mb-2">LIVROS GANHAM VIDA</h3>
          <Link href="/valores" className="text-base hover:underline block">Valores</Link>
          <Link href="/sobre" className="text-base hover:underline block">Sobre o Livros Ganham Vida</Link>
        </div>

        {/* ENTRE EM CONTATO */}
        <div>
          <h3 className="text-lg font-bold mb-2">ENTRE EM CONTATO</h3>
          <Link href="/contato" className="text-base hover:underline block">Contato</Link>
          <Link href="/faq" className="text-base hover:underline block">Perguntas frequentes</Link>
        </div>

        {/* REDES SOCIAIS */}
        <div>
          <h3 className="text-lg font-bold mb-2">SEGUIR</h3>
          <RedesSociais />
        </div>
      </div>

      {/* Linha com estrela */}
      <LinhaComEstrela />

      {/* Linha final com links */}
      <div className="text-center text-sm space-x-4">
        <Link href="/" className="hover:underline">Livros ganham vida criado em 2025</Link>
        <Link href="/privacidade" className="hover:underline">privacidade de dados</Link>
        <Link href="/termos" className="hover:underline">termos e condições</Link>
      </div>
    </footer>
  )
}
