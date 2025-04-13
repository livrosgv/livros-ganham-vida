'use client'
import PerfilUsuario from '@/components/PerfilUsuario'

export default function TestePerfil() {
  return (
    <div className="p-6 bg-[#191737] min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-4">👤 Teste de Perfil do Usuário</h1>

      <PerfilUsuario categorias={[
  'nomeEncantado',
  'email',
  'foto',
  'status',
  'tipoPlano',
  'seriesFavoritas',
  'preferencias',
  'avatar'
]} />
    </div>
  )
}
