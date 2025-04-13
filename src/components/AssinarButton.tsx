export default function AssinarButton({ plano }: { plano: 'mensal' | 'anual' }) {
  const iniciarPagamento = async () => {
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plano }),
      })

      if (!res.ok) {
        const erro = await res.text()
        console.error('Erro ao criar sessão do Stripe:', erro)
        alert('Erro ao iniciar o pagamento. Tente novamente.')
        return
      }

      const data = await res.json()
      window.location.href = data.url
    } catch (err) {
      console.error('Erro inesperado:', err)
      alert('Erro inesperado. Tente novamente.')
    }
  }

  return (
    <button
      onClick={iniciarPagamento}
      className="bg-[#8676d1] hover:bg-[#6f62c5] px-10 py-4 text-lg text-white font-semibold rounded-full transition shadow-lg shadow-black/40 hover:scale-105 hover:brightness-110"
    >
      Assinar agora
    </button>
  )
}
