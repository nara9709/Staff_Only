import Login from '@/components/Login';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: '로그인 페이지',
};

function LoginPage() {
  return (
    <section className="h-[100vh] bg-white flex flex-col items-center pt-48">
      <div className="flex flex-col text-stone-500 ">
        <span className="font-thin">
          <span className="text-[#165f77] font-bold">알바러</span>들을 위한
        </span>
        <span className="font-thin">우리들만의 휴게실</span>
        <h1 className="font-bold text-4xl uppercase text-stone-600">
          <span className="text-[#165f77]">Staff</span> only
        </h1>
      </div>
      <Login />
    </section>
  );
}

export default LoginPage;
