'use client';
import useMe from '@/hooks/useMe';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import Avatar from './UI/Avatar';
import { redirect } from 'next/navigation';
import { DefaultUserInfo } from '@/model/user';
import { BiSave } from 'react-icons/bi';
import { IconButton } from '@mui/material';

function ProfileDetail() {
  //   const { user } = useMe();

  const user: DefaultUserInfo = {
    name: 'nara lee',
    username: 'nara lee',
    email: 'worldfk@gmai.com',
    id: 'sfsfsf',
    bookmarks: ['mark'],
    userProfileImage: '/images/default_user_image.png',
    wagePerHour: 3432,
  };

  const [username, setUsername] = useState(user.username);
  const [wagePerHour, setWage] = useState(user.wagePerHour);
  const [userProfileimage, setImage] = useState<File>();

  // 사용자가 프로필 사진을 변경하면 상태 업데이트
  const handdleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target.files;

    if (files && files[0]) {
      setImage(files[0]);
    }
  };

  //   프로필 정보 업데이트 해주기
  const updateProfile = (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    if (userProfileimage) {
      formData.append('file', userProfileimage);
    }
    formData.append('username', username);
    formData.append('wagePerHour', `${wagePerHour}`);

    // TODO
    // 1.api route 만들기 fetch 진행
    // 2.mutate 진행 후 refresh 진행
  };

  return (
    <div className="flex flex-col items-center  justify-center mt-3">
      <h1 className=" text-2xl font-thin mb-8 ">
        안녕하세요{' '}
        <span className="font-semibold text-[#176B87]">{user?.username}</span>
        님🤗
      </h1>

      <form
        action="submit"
        className="flex flex-col items-center justify-center"
      >
        <div className={containerStyle}>
          {' '}
          <label htmlFor="닉네임">✨닉네임</label>
          <input
            id="username"
            type="text"
            placeholder={user?.username}
            className={inputStyle}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className={containerStyle}>
          {' '}
          <label htmlFor="시급">💸시급</label>
          <input
            type="number"
            placeholder={`${user?.wagePerHour}`}
            className={inputStyle}
            value={wagePerHour}
            onChange={(e) => setWage(Number(e.target.value))}
          />
        </div>
        <IconButton className="mt-5" onClick={(e) => updateProfile(e)}>
          <BiSave className="w-10 h-10 m-auto  " />
        </IconButton>
      </form>
    </div>
  );
}

export default ProfileDetail;

const containerStyle =
  'flex flex-col font-thin items-center gap-2 text-lg mt-8';
const inputStyle =
  'p-2 border border-[#176B87] rounded-md text-center focus:outline-none';
