"use client"

import { useState } from "react"

// Função utilitária para converter links do Telegram em links diretos
async function gerarLinkDiretoTelegram(link: string): Promise<string> {
  try {
    const resposta = await fetch("/api/telegram/transformar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ link }),
    })
    const json = await resposta.json()
    return json?.url || link
  } catch {
    return link // 🔥 não precisa do (e), pois ele não era usado
  }
}

export default function Painel() {
  const [titulo, setTitulo] = useState("")
  const [descricao, setDescricao] = useState("")
  const [capa, setCapa] = useState("")
  const [categoriasSelecionadas, setCategoriasSelecionadas] = useState<string[]>([])
  const [novaCategoria, setNovaCategoria] = useState("")
  const [classificacao, setClassificacao] = useState("")
  const [dataUltimoEpisodio, setDataUltimoEpisodio] = useState("")

  const [temporadas, setTemporadas] = useState([
    {
      episodios: [{ titulo: "", duracao: "", video: "", capa: "" }],
    },
  ])

  const categoriasExistentes = ["Fantasia", "Romance", "Ação", "Suspense", "Terror"]

  const handleChangeEpisodio = async (
    temporadaIndex: number,
    episodioIndex: number,
    field: string,
    value: string
  ) => {
    const novasTemporadas = [...temporadas]

    let novoValor = value
    if (value.startsWith("https://t.me/")) {
      novoValor = await gerarLinkDiretoTelegram(value)
    }

    // @ts-expect-error – acesso dinâmico ao campo
    novasTemporadas[temporadaIndex].episodios[episodioIndex][field] = novoValor
    setTemporadas(novasTemporadas)
  }

  const adicionarEpisodio = (temporadaIndex: number) => {
    const novasTemporadas = [...temporadas]
    novasTemporadas[temporadaIndex].episodios.push({ titulo: "", duracao: "", video: "", capa: "" })
    setTemporadas(novasTemporadas)
  }

  const adicionarTemporada = () => {
    setTemporadas([...temporadas, { episodios: [{ titulo: "", duracao: "", video: "", capa: "" }] }])
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex justify-center p-4 sm:p-8">
      <div className="w-full max-w-3xl space-y-6">
        <h1 className="text-3xl font-bold text-center">Criar nova série</h1>

        <input type="text" placeholder="Título da série" className="w-full p-3 rounded bg-[#221c48] text-white" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
        <textarea placeholder="Descrição" className="w-full p-3 rounded bg-[#221c48] text-white" value={descricao} onChange={(e) => setDescricao(e.target.value)} />

        <div className="flex flex-wrap gap-2">
          {categoriasExistentes.map((cat) => {
            const selecionada = categoriasSelecionadas.includes(cat)
            return (
              <button
                key={cat}
                className={`px-3 py-1 rounded-full border ${selecionada ? "bg-green-500 text-black" : "bg-[#221c48]"}`}
                onClick={() => {
                  if (selecionada) {
                    setCategoriasSelecionadas(categoriasSelecionadas.filter(c => c !== cat))
                  } else {
                    setCategoriasSelecionadas([...categoriasSelecionadas, cat])
                  }
                }}
              >
                {cat}
              </button>
            )
          })}
        </div>

        <input type="text" placeholder="Nova categoria (opcional)" className="w-full p-3 rounded bg-[#221c48] text-white" value={novaCategoria} onChange={(e) => setNovaCategoria(e.target.value)} />
        <input type="text" placeholder="Classificação indicativa (ex: Livre, 12 anos...)" className="w-full p-3 rounded bg-[#221c48] text-white" value={classificacao} onChange={(e) => setClassificacao(e.target.value)} />
        <input type="text" placeholder="Link da imagem de capa (Telegram)" className="w-full p-3 rounded bg-[#221c48] text-white" value={capa} onChange={(e) => setCapa(e.target.value)} />
        <input type="text" placeholder="Data do último episódio adicionado" className="w-full p-3 rounded bg-[#221c48] text-white mb-4" value={dataUltimoEpisodio} onChange={(e) => setDataUltimoEpisodio(e.target.value)} />

        {capa && (
          <div>
            <p className="text-sm mb-2">Prévia da capa:</p>
            <img src={capa} alt="Prévia da capa" className="rounded-xl border border-white max-w-xs" />
          </div>
        )}

        {temporadas.map((temporada, temporadaIndex) => (
          <details key={temporadaIndex} className="bg-[#221c48] rounded p-3">
            <summary className="cursor-pointer text-lg font-semibold">Temporada {temporadaIndex + 1}</summary>

            {temporada.episodios.map((ep, index) => (
              <details key={index} className="bg-[#191737] rounded p-3 my-2">
                <summary className="cursor-pointer font-medium">Episódio {index + 1}</summary>
                <div className="pt-3 space-y-2">
                  <input type="text" placeholder="Título do episódio" className="w-full p-2 rounded bg-[#0f0f2f] text-white" value={ep.titulo} onChange={(e) => handleChangeEpisodio(temporadaIndex, index, "titulo", e.target.value)} />
                  <input type="text" placeholder="Duração (ex: 10min)" className="w-full p-2 rounded bg-[#0f0f2f] text-white" value={ep.duracao} onChange={(e) => handleChangeEpisodio(temporadaIndex, index, "duracao", e.target.value)} />
                  <input type="text" placeholder="Link do vídeo (Telegram)" className="w-full p-2 rounded bg-[#0f0f2f] text-white" value={ep.video} onChange={(e) => handleChangeEpisodio(temporadaIndex, index, "video", e.target.value)} />

                  {ep.video && (
                    <div>
                      <p className="text-sm">Prévia do vídeo:</p>
                      <video src={ep.video} controls className="rounded-lg border border-white max-w-md" />
                    </div>
                  )}

                  <input type="text" placeholder="Link da capa do episódio (Telegram)" className="w-full p-2 rounded bg-[#0f0f2f] text-white" value={ep.capa} onChange={(e) => handleChangeEpisodio(temporadaIndex, index, "capa", e.target.value)} />
                  {ep.capa && (
                    <div>
                      <p className="text-sm">Prévia da capa:</p>
                      <img src={ep.capa} alt="Capa do episódio" className="rounded-lg border border-white max-w-xs" />
                    </div>
                  )}
                </div>
              </details>
            ))}

            <button className="bg-green-500 text-black px-4 py-1 rounded mt-2" onClick={() => adicionarEpisodio(temporadaIndex)}>
              + Adicionar Episódio
            </button>
          </details>
        ))}

        <div className="text-center">
          <button className="bg-purple-500 hover:bg-purple-400 text-white font-bold py-2 px-6 rounded-xl mt-4" onClick={adicionarTemporada}>
            + Adicionar Temporada
          </button>
        </div>
      </div>
    </div>
  )
}
