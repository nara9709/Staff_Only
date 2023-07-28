'use client';

import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { BiSolidCloudUpload } from 'react-icons/bi';
import React, { ChangeEvent, useState } from 'react';
import useMe from '@/hooks/useMe';
import { MdAddPhotoAlternate } from 'react-icons/md';
import Image from 'next/image';

function NewPostForm() {
  const { user } = useMe();
  const [category, setCategory] = useState('');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState<File>();

  const categories = [
    '카페',
    '프렌차이즈',
    '엔터테이먼트',
    '배달전문',
    '사무보조',
    '주점',
    '식당',
    '드럭스토어',
  ];

  // 사용자가 사진을 선택하면 상태 업데이트
  const handdleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target.files;

    if (files && files[0]) {
      setFile(files[0]);
      console.log(files[0]);
    }
  };

  return (
    <div className="h-full h-min-[100vh]">
      <form className="flex flex-col p-3">
        <FormControl className="w-1/2">
          <InputLabel id="select-label">카테고리</InputLabel>
          <Select
            labelId="select-label"
            label="카테고리"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((category, index) => (
              <MenuItem value={category} key={index}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <input
          name="subject"
          id="input-subject"
          type="text"
          placeholder="제목을 입력해주세요 (최대 30자)"
          value={subject}
          required
          maxLength={30}
          onChange={(e) => setSubject(e.target.value)}
          className=" p-2 text-lg border-b border-[#176B87] mt-4 focus:outline-none"
        />
        <textarea
          name="content"
          id="input-content"
          rows={10}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border border-[#176B87] p-4 text-[1.1em] mt-4 focus:outline-none"
        />

        {file && (
          <div className="relative w-full h-64 aspect-squre mt-5">
            <Image
              className="object-cover"
              fill
              src={URL.createObjectURL(file)}
              alt="local file"
            />
          </div>
        )}

        <input
          className="hidden"
          name="input"
          id="input-upload"
          type="file"
          accept="image/*"
          onChange={(e) => handdleChange(e)}
        ></input>
        <label
          htmlFor="input-upload"
          className="w-full flex justify-center pt-4"
        >
          <MdAddPhotoAlternate className="w-16 h-16" fill="#176B87" />
        </label>

        <button
          className="flex items-center justify-center text-lg font-semibold text-white
        p-2 bg-[#176B87] rounded-md cursor-pointer hover:opacity-50 mt-4"
        >
          <BiSolidCloudUpload className="w-8 h-8" fill="#fff" />
          업로드
        </button>
      </form>
    </div>
  );
}

export default NewPostForm;
