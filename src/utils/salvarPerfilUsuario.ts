import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export async function salvarPerfilUsuario(email: string, nome: string, foto?: string) {
  const ref = doc(db, 'usuarios', `usuario_${email}`)
  await setDoc(ref, {
    nomeEncantado: nome,
    email,
    foto: foto || '',
    criadoEm: serverTimestamp(),
    tipoPlano: '',
    status: '',
    seriesFavoritas: [],
    preferencias: {},
  }, { merge: true })
}
