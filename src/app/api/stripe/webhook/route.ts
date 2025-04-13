import { NextResponse } from "next/server"
import Stripe from "stripe"
import { db } from "@/lib/firebase"
import { doc, setDoc } from "firebase/firestore"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-03-31.basil",
})

export async function POST(req: Request) {
  const body = await req.text()
  const signature = req.headers.get("stripe-signature") as string

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    if (err instanceof Error) {
      console.error("Erro no webhook Stripe:", err.message)
      return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 })
    }
    return new NextResponse("Erro desconhecido", { status: 400 })
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session
    const email = session.customer_details?.email // ← CORREÇÃO AQUI

    if (email) {
      await setDoc(doc(db, "pagamentos", `usuario_${email}`), {
        status: "ativo",
      })
      console.log("✅ Pagamento confirmado e acesso liberado para:", email)
    } else {
      console.log("⚠️ Nenhum e-mail encontrado na sessão Stripe.")
    }
  }

  return NextResponse.json({ received: true })
}
