import Image from 'next/image';
import React, { FC } from 'react';

interface IAvatarProps {
  src: string;
}
const Avatar: FC<IAvatarProps> = ({ src }) => {
  return (
    <div className="avatar">
      <div className="w-24 rounded-full">
        <Image
          src={src}
          width={48}
          height={48}
          className="rounded-full"
          alt="avatar"
        />
      </div>
    </div>
  );
};

export default Avatar;
