import Image from 'next/image';
import React, { FC } from 'react';

interface IAvatarProps {
  src: string;
}
const Avatar: FC<IAvatarProps> = ({ src }) => {
  return (
    <div className="avatar">
      <div className="w-24 rounded-full">
        <Image src={src} width={24} height={24} alt="avatar" />
      </div>
    </div>
  );
};

export default Avatar;
