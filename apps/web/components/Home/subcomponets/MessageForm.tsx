import React, { FC } from 'react';
import { useFormik } from 'formik';
import { CreateMessageDto } from '@chat-app/api/sdk';
import { useCookie } from 'next-cookie';
import {
  ISendMessage,
  MESSAGE_EVENT,
  USER_ID,
} from '@chat-app/common/constants';
import { sdk } from '@chat-app/web/utils';
import { Socket } from 'socket.io-client';

interface IMessageFormProps {
  socket: Socket;
}

const MessageForm: FC<IMessageFormProps> = ({ socket }) => {
  const MESSAGE_INITIAL_VALUE = '';
  const cookie = useCookie();
  const { values, handleSubmit, getFieldProps } = useFormik<CreateMessageDto>({
    initialValues: {
      message: MESSAGE_INITIAL_VALUE,
      userId: cookie.get(USER_ID),
    },
    onSubmit: async () => {
      try {
        await sdk.message.messageControllerCreateMessage(values);
        socket.emit(MESSAGE_EVENT, { ...values } as ISendMessage);
      } catch (error) {
        throw new Error(error);
      }
    },
  });
  return (
    <form onSubmit={handleSubmit}>
      <input {...getFieldProps('message')} />
      <button type="submit">Submit</button>
    </form>
  );
};

export default MessageForm;
