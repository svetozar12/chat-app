import React, { FC, useEffect, useState } from 'react';
import { CreateMessageDto } from '@chat-app/api/sdk';
import { useCookie } from 'next-cookie';
import {
  ISendMessage,
  ISendTyping,
  MESSAGE_EVENT,
  TYPING_EVENT,
  USER_ID,
} from '@chat-app/shared/common-constants';
import { Socket } from 'socket.io-client';
import { MESSAGES_QUERY, sdk } from '@chat-app/web/shared';
import { queryClient } from '@chat-app/web/root-app';
import EmojiPickerInput from './subcomponents/EmojiPickerInput';
import EmojiPickerIcon from './subcomponents/EmojiPickerIcon';
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
      <EmojiPickerInput
        inputRef={inputRef}
        isEmojiToggled={isEmojiToggled}
        setIsEmojiToggled={setIsEmojiToggled}
        setValues={setValues}
        values={values}
      />
      <EmojiPickerIcon
        isEmojiToggled={isEmojiToggled}
        setIsEmojiToggled={setIsEmojiToggled}
      />
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

  function emitTyping(isTyping: boolean) {
    socket.emit(TYPING_EVENT, {
      isTyping,
      userId: cookie.get(USER_ID),
    } as ISendTyping);
  }

  useEffect(() => {
    values.message && emitTyping(true);
    const current = setTimeout(() => {
      emitTyping(false);
    }, 4000);
    return () => {
      clearTimeout(current);
    };
  }, [values]);
  return { handleSubmit, values, setValues };
}
