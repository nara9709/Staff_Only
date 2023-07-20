'use client';

import React from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';
import { RiKakaoTalkFill } from 'react-icons/ri';

function Login() {
  const { data: session } = useSession();
  console.log(session?.user);
  return (
    <div>
      <FcGoogle onClick={() => signIn('google')} />
      <RiKakaoTalkFill onClick={() => signIn('kakao')} />
    </div>
  );
}

export default Login;
