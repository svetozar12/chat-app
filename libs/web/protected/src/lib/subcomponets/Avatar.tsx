import React, { FC } from 'react';

interface IAvatarProps {
  src: string;
  props: any;
}
const Avatar: FC<IAvatarProps> = ({ src, props }) => {
  return (
    <div className="px-3">
      <div>
        <img src={src} {...props} alt="avatar" />
      </div>
    </div>
  );
};

export default Avatar;
