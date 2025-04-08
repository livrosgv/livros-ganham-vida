import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const token = process.env.TELEGRAM_BOT_TOKEN;
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

const webhookUrl = `${siteUrl}/api/telegram/webhook`;

async function setWebhook() {
  try {
    const res = await axios.get(
      `https://api.telegram.org/bot${token}/setWebhook?url=${webhookUrl}`
    );
    console.log("✅ Webhook ativado:", res.data);
  } catch (err) {
    console.error("❌ Erro ao ativar webhook:", err);
  }
}

setWebhook();
