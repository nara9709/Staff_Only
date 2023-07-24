'use client';

import React from 'react';
import { signIn, useSession } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';
import { RiKakaoTalkFill } from 'react-icons/ri';
import { redirect } from 'next/navigation';

function Login() {
  const { data: session } = useSession();

  if (session?.user) {
    redirect('/');
  }

  const iconStyle = 'w-12 h-12';
  return (
    <div className="flex flex-col justify-center items-center mt-20 ">
      <h2 className="text-lg text-gray-900">
        소셜 계정으로<span className=" font-bold text-blue-900"> 간편하게</span>{' '}
        로그인
      </h2>
      <div className="flex mt-5 justify-around">
        <FcGoogle onClick={() => signIn('google')} className={iconStyle} />
        <RiKakaoTalkFill
          onClick={() => signIn('kakao')}
          className={iconStyle}
        />
      </div>
    </div>
  );
}

export default Login;
