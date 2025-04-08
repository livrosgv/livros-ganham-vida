import { NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
import type { NextRequest } from "next/server"

// Declara a estrutura esperada do token
interface UserToken {
  user?: {
    email?: string
  }
}

export async function middleware(req: NextRequest) {
  const token = (await getToken({ req })) as UserToken

  // Protege apenas a rota /painel
  if (req.nextUrl.pathname.startsWith("/painel")) {
    if (!token || token.user?.email !== "livrosganhamvida@gmail.com") {
      return NextResponse.redirect(new URL("/login", req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/painel"],
}

