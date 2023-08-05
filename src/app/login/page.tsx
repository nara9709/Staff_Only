import Login from '@/components/Login';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: '로그인 페이지',
};

function LoginPage() {
  return (
    <section>
      <Login />
    </section>
  );
}

export default LoginPage;
