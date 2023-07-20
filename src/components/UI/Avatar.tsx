import React from 'react';

type Props = {
  image: string;
  name: string;
};
function Avatar({ image, name }: Props) {
  return (
    <div className="w-12 h-12 ">
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
