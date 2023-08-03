import React from 'react';

type Props = {
  image: string;
  name: string;
  size: 'sm' | 'md';
  isRing?: boolean;
};

function Avatar({ image, name, size, isRing }: Props) {
  return (
    <div
      className={`${size === 'md' ? 'w-12 h-12' : 'w-8 h-8'} ${
        isRing && ' border-[#176B87] border-4 rounded-full'
      }`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image}
        alt={`${name}'s image`}
        className="rounded-full object-cover"
      />
    </div>
  );
}

export default Avatar;
