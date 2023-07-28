import NewPostForm from '@/components/NewPostForm';
import { authOptions } from '@/utils/authOptions';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react';

export const metadata: Metadata = {
  title: 'New Post',
  description: 'Create a new post',
};

async function NewPostPage() {
  const session = await getServerSession(authOptions);

  // 로그인 하지 않은 사용자는 로그인 페이지로 리다이렉트
  if (!session) {
    redirect('/login');
  }

  return (
    <section className="bg-white h-100vh">
      <NewPostForm />
    </section>
  );
}

export default NewPostPage;
