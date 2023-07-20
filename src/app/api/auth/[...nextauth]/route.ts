import { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth/next';
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
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
