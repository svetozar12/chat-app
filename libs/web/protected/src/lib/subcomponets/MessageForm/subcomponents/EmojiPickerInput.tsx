import React, { FC } from 'react';
import { Theme } from 'emoji-picker-react';
import dynamic from 'next/dynamic';
import { CreateMessageDto } from '@chat-app/api/sdk';
import { isMobile } from '@chat-app/web/shared';

const Picker = dynamic(
  () => {
    return import('emoji-picker-react');
  },
  { ssr: false }
);
interface IEmojiPickerProps {
  isEmojiToggled: boolean;
  setIsEmojiToggled: React.Dispatch<React.SetStateAction<boolean>>;
  values: CreateMessageDto;
  setValues: React.Dispatch<React.SetStateAction<CreateMessageDto>>;
  inputRef: React.RefObject<HTMLInputElement>;
}

const EmojiPickerInput: FC<IEmojiPickerProps> = ({
  isEmojiToggled,
  setIsEmojiToggled,
  values,
  setValues,
  inputRef,
}) => {
  return (
    <>
      {isEmojiToggled &&
        (isMobile() ? (
          <div className="absolute left-1/2 transform -translate-x-1/2 bottom-5">
            <Picker
              theme={Theme.DARK}
              onEmojiClick={(emoji) => {
                setValues({ ...values, message: values.message + emoji.emoji });
                if (!isMobile()) {
                  setIsEmojiToggled(false);
                  inputRef.current?.focus();
                }
              }}
            />
          </div>
        ) : (
          <div className="absolute right-5 bottom-5">
            <Picker
              theme={Theme.DARK}
              onEmojiClick={(emoji) => {
                setValues({ ...values, message: values.message + emoji.emoji });
                if (!isMobile()) {
                  setIsEmojiToggled(false);
                  inputRef.current?.focus();
                }
              }}
            />
          </div>
        ))}
    </>
  );
};

export default EmojiPickerInput;
