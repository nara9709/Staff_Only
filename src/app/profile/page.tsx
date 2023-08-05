import ProfileDetail from '@/components/ProfileDetail';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: '유저정보 변경',
  description: '유저정보를 변경할수있습니다.',
};

function ProfilePage() {
  return (
    <section className=" min-h-[100vh] h-full bg-white w-full p-3">
      <ProfileDetail />
    </section>
  );
}

export default ProfilePage;
