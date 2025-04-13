'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from '@/lib/firebase'

export function useProtecaoPagante() {
  const router = useRouter()
  const [autorizado, setAutorizado] = useState(false)

  useEffect(() => {
    const checarAutorizacao = async () => {
      onAuthStateChanged(auth, async (user) => {
        if (!user) return router.push('/login')

        const ref = doc(db, 'pagamentos', `usuario_${user.email}`)
        const snap = await getDoc(ref)

        if (!snap.exists() || snap.data()?.status !== 'ativo') {
          return router.push('/valores')
        }

        setAutorizado(true)
      })
    }

    checarAutorizacao()
  }, [router])

  return autorizado
}
