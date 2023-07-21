import React from 'react';

type Props = {
  image: string;
  name: string;
  size: 'sm' | 'md';
};
function Avatar({ image, name, size }: Props) {
  return (
    <div className={size === 'md' ? 'w-12 h-12' : 'w-8 h-8 '}>
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
