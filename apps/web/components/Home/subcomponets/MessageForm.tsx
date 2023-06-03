import React, { FC } from 'react';
import { useFormik } from 'formik';
import { CreateMessageDto, GetMessageListDto } from '@chat-app/api/sdk';
import { useCookie } from 'next-cookie';
import {
  ISendMessage,
  MESSAGE_EVENT,
  USER_ID,
} from '@chat-app/common/constants';
import { sdk } from '@chat-app/web/utils';
import { Socket } from 'socket.io-client';
import { queryClient } from '../../../pages/_app';
import { MESSAGES_QUERY } from '@chat-app/web/constants';

interface IMessageFormProps {
  socket: Socket;
}

const MessageForm: FC<IMessageFormProps> = ({ socket }) => {
  const { handleSubmit, getFieldProps } = useForm(socket);

  return (
    <form onSubmit={handleSubmit}>
      <input {...getFieldProps('message')} />
      <button type="submit">Submit</button>
    </form>
  );
};

export default MessageForm;

function useForm(socket: Socket) {
  const MESSAGE_INITIAL_VALUE = '';
  const cookie = useCookie();

  const { values, handleSubmit, getFieldProps, resetForm } =
    useFormik<CreateMessageDto>({
      initialValues: {
        message: MESSAGE_INITIAL_VALUE,
        userId: cookie.get(USER_ID),
        createdAt: new Date().toISOString(),
      },
      onSubmit: async () => {
        try {
          queryClient.setQueryData(
            MESSAGES_QUERY,
            ({ messages: oldMessages, pagination }: GetMessageListDto) => {
              const old = Array.isArray(oldMessages) ? oldMessages : [];
              console.log(old);
              return { messages: [...old, values], pagination };
            }
          );
          socket.emit(MESSAGE_EVENT, { ...values } as ISendMessage);
          await sdk.message.messageControllerCreateMessage(values);
        } catch (error) {
          // if error occurs refetch queries
          queryClient.invalidateQueries({ queryKey: MESSAGES_QUERY });
          throw new Error(error);
        } finally {
          resetForm();
        }
      },
    });

  return { handleSubmit, getFieldProps };
}
