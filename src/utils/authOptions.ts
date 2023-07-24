import { addUser } from '@/service/user';
import { NextAuthOptions } from 'next-auth';

import GoogleProvider from 'next-auth/providers/google';
import KakaoProvider from 'next-auth/providers/kakao';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: `${process.env.GOOGLE_AUTH_CLIENT_ID}`,
      clientSecret: `${process.env.GOOGLE_AUTH_CLIENT_PW}`,
    }),
    KakaoProvider({
      clientId: `${process.env.KAKAO_AUTH_CLIENT_ID}`,
      clientSecret: `${process.env.KAKAO_AUTH_CLIENT_PW}`,
    }),
  ],
  callbacks: {
    async signIn({ user: { id, name, email, image } }) {
      addUser({
        id,
        name: name || '',
        email: email || '',
        image: image || '',
      });

      return true;
    },
    async session({ session, token }) {
      const user = session?.user;
      if (user) {
        id: token.id as string;
      }
      return session;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
