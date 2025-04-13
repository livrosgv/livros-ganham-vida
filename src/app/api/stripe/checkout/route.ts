// 📁 src/app/api/stripe/checkout/route.ts
import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: Request) {
  const { plano } = await req.json()

  const priceId = plano === 'anual'
    ? process.env.STRIPE_PRICE_ID_ANUAL
    : process.env.STRIPE_PRICE_ID_MENSAL

  if (!priceId) {
    console.error('❌ PRICE_ID está indefinido.')
    return NextResponse.json({ error: 'Preço inválido' }, { status: 400 })
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'subscription',
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/sucesso`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/valores?cancelado=true`,
  })

  return NextResponse.json({ url: session.url })
}

