import React, { FC } from 'react';
import { BsFillEmojiDizzyFill } from 'react-icons/bs';

interface IEmojiPickerIconProps {
  isEmojiToggled: boolean;
  setIsEmojiToggled: React.Dispatch<React.SetStateAction<boolean>>;
}

const EmojiPickerInput: FC<IEmojiPickerIconProps> = ({
  isEmojiToggled,
  setIsEmojiToggled,
}) => {
  return (
    <div
      className="w-9 h-9 absolute right-12 text-2xl cursor-pointer flex justify-center items-center "
      onClick={() => setIsEmojiToggled((prev) => !prev)}
    >
      <BsFillEmojiDizzyFill
        className={`w-7 h-7 ${
          isEmojiToggled ? 'text-yellow-300' : 'text-gray-400'
        } hover:text-yellow-300`}
      />
    </div>
  );
};

export default EmojiPickerInput;
