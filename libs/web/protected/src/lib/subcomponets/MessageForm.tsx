import React, { FC, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { CreateMessageDto } from '@chat-app/api/sdk';
import { useCookie } from 'next-cookie';
import { BsFillEmojiDizzyFill } from 'react-icons/bs';
import {
  ISendMessage,
  ISendTyping,
  MESSAGE_EVENT,
  TYPING_EVENT,
  USER_ID,
} from '@chat-app/shared/common-constants';
import { Socket } from 'socket.io-client';
import { MESSAGES_QUERY, sdk } from '@chat-app/web/shared';
import dynamic from 'next/dynamic';
import { queryClient } from '@chat-app/web/root-app';
import { Theme } from 'emoji-picker-react';

const Picker = dynamic(
  () => {
    return import('emoji-picker-react');
  },
  { ssr: false }
);
interface IMessageFormProps {
  socket: Socket;
}

const MessageForm: FC<IMessageFormProps> = ({ socket }) => {
  const { handleSubmit, setValues, values } = useForm(socket);
  const [isEmojiToggled, setIsEmojiToggled] = useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const { message } = values;

  return (
    <form
      className="w-full flex justify-center px-10 h-9 relative"
      onSubmit={handleSubmit}
      placeholder="Send a message..."
    >
      <input
        ref={inputRef}
        className="w-full bg-chatAppGray-200 rounded-md text-white px-4"
        value={message}
        onChange={(e) =>
          setValues({
            ...values,
            message: e.target.value,
            createdAt: new Date().toISOString(),
          })
        }
      />
      {isEmojiToggled && (
        <div className="absolute right-12 bottom-10">
          <Picker
            theme={Theme.DARK}
            onEmojiClick={(emoji) => {
              setValues({ ...values, message: values.message + emoji.emoji });
              setIsEmojiToggled(false);
              inputRef.current?.focus();
            }}
          />
        </div>
      )}
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
    </form>
  );
};

export default MessageForm;

function useForm(socket: Socket) {
  const MESSAGE_INITIAL_VALUE = '';
  const cookie = useCookie();
  const FORM_INITIAL_VALUES = {
    message: MESSAGE_INITIAL_VALUE,
    userId: cookie.get(USER_ID) as string,
    createdAt: new Date().toISOString(),
  };
  const [values, setValues] = useState<CreateMessageDto>(FORM_INITIAL_VALUES);
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      socket.emit(MESSAGE_EVENT, { ...values } as ISendMessage);
      await sdk.message.messageControllerCreateMessage(values);
    } catch (error) {
      // if error occurs refetch queries
      queryClient.invalidateQueries({ queryKey: MESSAGES_QUERY });
      throw new Error(error as string);
    } finally {
      setValues(FORM_INITIAL_VALUES);
    }
  }

  useEffect(() => {
    values.message &&
      socket.emit(TYPING_EVENT, {
        isTyping: true,
        userId: cookie.get(USER_ID),
      } as ISendTyping);
    const current = setTimeout(() => {
      socket.emit(TYPING_EVENT, {
        isTyping: false,
        userId: cookie.get(USER_ID),
      } as ISendTyping);
    }, 4000);
    return () => {
      clearTimeout(current);
    };
  }, [values]);
  return { handleSubmit, values, setValues };
}

function useTag() {
  const cookie = useCookie();
  const userId = cookie.get(USER_ID);
  return userId;
}
