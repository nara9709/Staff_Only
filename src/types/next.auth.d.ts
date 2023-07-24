import { OAuthUser } from '@/service/user';

declare module 'next-auth' {
  interface Session {
    user: OAuthUser;
  }
}
