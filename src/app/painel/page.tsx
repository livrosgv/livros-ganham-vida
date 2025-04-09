// src/app/painel/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { initializeApp, getApps } from 'firebase/app';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
};

if (!getApps().length) {
  initializeApp(firebaseConfig);
}

const db = getFirestore();

interface Midia {
  link_original: string;
  link_direto: string;
  tipo: 'photo' | 'video' | 'audio' | 'document';
  criadoEm: string;
}

export default function PainelPage() {
  const [midias, setMidias] = useState<Midia[]>([]);

  useEffect(() => {
    async function carregarMidias() {
      const ref = collection(db, 'links');
      const snapshot = await getDocs(ref);

      const lista: Midia[] = snapshot.docs.map((doc) => doc.data() as Midia);
      setMidias(lista.sort((a, b) => b.criadoEm.localeCompare(a.criadoEm))); // do mais novo pro mais antigo
    }

    carregarMidias();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">📂 Arquivos enviados</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {midias.map((midia) => (
          <div key={midia.link_direto} className="border rounded p-2 bg-gray-100">
            <p className="text-sm text-gray-600 mb-2">Tipo: {midia.tipo}</p>

            {midia.tipo === 'video' && (
              <video
                src={midia.link_direto}
                controls
                className="w-full rounded"
              />
            )}

            {midia.tipo === 'photo' && (
              <img
                src={midia.link_direto}
                alt="Imagem"
                className="w-full rounded"
              />
            )}

            {midia.tipo === 'audio' && (
              <audio
                src={midia.link_direto}
                controls
                className="w-full"
              />
            )}

            {midia.tipo === 'document' && (
              <a
                href={midia.link_direto}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                Abrir documento
              </a>
            )}

            <a
              href={midia.link_original}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-xs text-gray-400 mt-2"
            >
              Ver no Telegram
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
