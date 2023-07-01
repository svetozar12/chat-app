import React, { FunctionComponent } from 'react';
import { IconType } from 'react-icons/lib';

interface IOauthButton {
  Icon: IconType;
  title: string;
  onClick: () => void;
}

const OauthButton: FunctionComponent<IOauthButton> = ({
  Icon,
  onClick,
  title,
}) => {
  return (
    <div
      className="flex gap-2 w-72 bg-white rounded-full py-2 font-semibold px-5 justify-center items-center cursor-pointer hover:bg-opacity-70 duration-100"
      onClick={onClick}
    >
      <Icon className="w-6 h-6" /> {title}
    </div>
  );
};

export { OauthButton };
