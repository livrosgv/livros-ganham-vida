// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { auth } from "@/lib/firebase"
import { signInWithEmailAndPassword } from "firebase/auth"

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Login por E-mail",
      credentials: {
        email: { label: "E-mail", type: "text" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null

        try {
          const userCredential = await signInWithEmailAndPassword(
            auth,
            credentials.email,
            credentials.password
          )
          const user = userCredential.user
          return { id: user.uid, email: user.email }
        } catch (error) {
          console.error("Erro no login:", error)
          return null
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user
      return token
    },
    async session({ session, token }) {
      session.user = token.user as {
        id: string
        email: string
      }
      return session
    },
  },
  pages: {
    signIn: "/login", // depois vamos criar essa página 💌
  },
})

export { handler as GET, handler as POST }

