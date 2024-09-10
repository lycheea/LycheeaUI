import type { NextAuthConfig } from "next-auth";
import credentials from "next-auth/providers/credentials";
import { z } from 'zod';
import prisma from '@/database';
import bcrypt from 'bcrypt';
import { User } from "@prisma/client"

async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    })
    return user;
  } catch (error) {
    console.log("Failed to fetch user: ", error);
    throw new Error("Failed to fetch user");
  }
}

export const authConfig = {
  pages: {
    signIn: '/signin',
  },
  callbacks: {
    authorized({
      auth,
      request: { nextUrl }
    }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    }
  },
  providers: [
    credentials({
      async authorize(credentials): Promise <User | null> {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(8) })
          .safeParse(credentials);
        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) {
            return null;
          }
          const passwordMatch = await bcrypt.compare(password, user.password);
          if (passwordMatch) {
            return user;
          }
        }
        return null;
      },
    })
  ],
} satisfies NextAuthConfig;