'use client';

import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { BiSolidCloudUpload } from 'react-icons/bi';
import React, { ChangeEvent, FormEvent, useRef, useState } from 'react';
import useMe from '@/hooks/useMe';
import { MdAddPhotoAlternate } from 'react-icons/md';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ProgressBar } from 'react-loader-spinner';

function NewPostForm() {
  const { user } = useMe();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [category, setCategory] = useState('');
  const subjectRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const [file, setFile] = useState<File>();

  const router = useRouter();

  console.log(category);

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
    }
  };

  // 사용자가 게시글을 업로드하면 포스트 업로드 api요청
  const handdleSubmit = (e: FormEvent) => {
    setLoading(true);

    e.preventDefault();

    const formData = new FormData();
    formData.append('subject', subjectRef.current?.value ?? '');
    formData.append('content', contentRef.current?.value ?? '');
    formData.append('userId', user?.id ?? '');
    formData.append('category', category ?? '');

    if (file) {
      formData.append('file', file);
    }

    fetch('/api/posts', { method: 'POST', body: formData })
      .then((res) => {
        if (!res.ok) {
          setError(`${res.status} ${res.statusText}`);
          return;
        }
        router.push('/');
      })
      .catch((err) => setError(err.toString()))
      .finally(() => setLoading(false));
  };

  return (
    <div className="h-full h-min-[100vh]">
      {loading && (
        <div className="flex justify-center w-full h-[100vh] bg-[#176B87]/30 absolute pt-48 z-50">
          <ProgressBar
            height="80"
            width="80"
            ariaLabel="progress-bar-loading"
            wrapperClass="progress-bar-wrapper"
            borderColor="#0C3543"
            barColor="#176B87"
          />
        </div>
      )}
      {error && (
        <p className="w-full bg-red-100 text-red-600 text-center p-4 mb-4 font-bold">
          {error}
        </p>
      )}
      <form className="flex flex-col p-3" onSubmit={handdleSubmit}>
        <FormControl className="w-1/2">
          <InputLabel id="select-label">카테고리</InputLabel>
          <Select
            required
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
          ref={subjectRef}
          required
          maxLength={30}
          className=" p-2 text-lg border-b border-[#176B87] mt-4 focus:outline-none"
        />
        <textarea
          name="content"
          id="input-content"
          rows={10}
          minLength={5}
          ref={contentRef}
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
