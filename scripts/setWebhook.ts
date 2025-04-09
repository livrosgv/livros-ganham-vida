import fetch from 'node-fetch';

const BOT_TOKEN = '7339241221:AAFqqK-5eLpi-L_pXeJ9PASUef-NhA6bsnU';
const WEBHOOK_URL = 'https://livros-ganham-vida.vercel.app/api/telegram/webhook';

async function setWebhook() {
  try {
    const res = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/setWebhook?url=${WEBHOOK_URL}`
    );

    const data = await res.json();
    console.log('📡 Resultado:', data);
  } catch (error) {
    console.error('❌ Erro ao configurar o webhook:', error);
  }
}

setWebhook();




