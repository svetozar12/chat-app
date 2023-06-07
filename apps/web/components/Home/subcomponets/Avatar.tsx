import Image from 'next/image';
import React, { FC } from 'react';

interface IAvatarProps {
  src: string;
  witdh?: number;
  height?: number;
}
const Avatar: FC<IAvatarProps> = ({ src, witdh, height }) => {
  console.log(witdh, height);
  return (
    <div className="px-3">
      <div>
        <Image
          src={src}
          width={witdh}
          height={height}
          className="rounded-full"
          alt="avatar"
        />
      </div>
    </div>
  );
};

Avatar.defaultProps = {
  witdh: 48,
  height: 48,
};

export default Avatar;
