import { Button, Menu, MenuButton, MenuItem, MenuList, VStack } from '@chakra-ui/react';
import { css, cx } from '@emotion/css';
import { IchatInstance } from 'components/MessagesSection/ChatRoom/ChatRoom';
import useProvideAuth from 'hooks/useSession';
import useThemeColors from 'hooks/useThemeColors';
import { connect } from 'react-redux';
import React, { FC, useEffect, useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { useDeleteMessageMutation, useUpdateMessageMutation } from 'services/generated';
import { STATE } from 'services/redux/reducer';
import { bindActionCreators, Dispatch } from 'redux';
import { resetMessagesAction, setMessagesAction } from 'services/redux/reducer/messages/actions';
import { useCookie } from 'next-cookie';

type Props = {
  messageId: string;
  timeStamp: string | number;
  sender: string;
  recievedMessage: string;
} & ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const Message: FC<Props> = ({ message: { messages }, setMessages, resetMessages, recievedMessage, sender, messageId, timeStamp }) => {
  const cookie = useCookie();
  const { auth } = useProvideAuth();
  const [editing, setEditing] = useState(false);
  const [editedMessage, setEditedMessage] = React.useState('');
  const [width, setWidth] = React.useState(112);
  const [height, setHeight] = React.useState(48);
  const inputRef = React.useRef<HTMLDivElement>(null);
  const [updateMessage] = useUpdateMessageMutation();
  const [deleteMessage] = useDeleteMessageMutation();
  const name = cookie.get('name');
  const [settings, toggleSettings] = useState(false);

  useEffect(() => {
    setEditedMessage(recievedMessage);
    if (inputRef.current != null) {
      setWidth(inputRef.current.offsetWidth);
      setHeight(inputRef.current.offsetHeight);
    }
  }, []);
  const {
    base: {
      default: { color },
      message: { background: msgBg },
    },
  } = useThemeColors();
  const handleEdit = async (e: any) => {
    const target = e.target as HTMLTextAreaElement;
    e.target.style.height = '15px';
    e.target.style.height = `${target.scrollHeight}px`;
    e.target.style.height = `${Math.min(e.target.scrollHeight, 60)}px`;
    if (e.key === 'Enter') {
      const messageArr: IchatInstance[] = [];
      for (const obj of messages) {
        if (obj._id === messageId) {
          obj.message = editedMessage;
          await updateMessage({
            variables: {
              auth,
              message_id: messageId,
              newMessage: editedMessage,
            },
          });
          resetMessages();
        }
        messageArr.push(obj);
      }
      messageArr.forEach((element) => {
        setMessages(element);
      });
      setEditing(false);
    }
  };
  return (
    <div
      className={cx(
        'flex',
        css`
          width: 100%;
          justify-content: ${name === sender ? 'flex-end' : 'flex-start'};
        `,
      )}
    >
      {name === sender && (
        <div
          className={css`
            position: relative;
          `}
        >
          {settings && (
            <Menu>
              <MenuButton
                w="3rem"
                h="3rem"
                mr="1rem"
                flex="flex"
                justifyContent="center"
                alignItems="center"
                as={Button}
                rightIcon={
                  <BsThreeDots
                    className={css`
                      width: 2rem;
                      height: 2rem;
                      margin-right: 0.4rem;
                      color: ${color};
                    `}
                  />
                }
              />
              <MenuList>
                <MenuItem onClick={() => setEditing(true)}>Edit</MenuItem>
                <MenuItem onClick={() => deleteMessage({ variables: { auth, message_id: messageId } })}>Delete</MenuItem>
              </MenuList>
            </Menu>
          )}
        </div>
      )}
      <VStack
        onMouseEnter={() => toggleSettings(true)}
        wordBreak="break-word"
        textAlign="center"
        minW="10rem"
        minH="3rem"
        overflow="hidden"
        color="white"
        bg={name === sender ? 'dark_blue' : msgBg}
        ref={inputRef}
        title={timeStamp.toString()}
      >
        {editing ? (
          <textarea
            className={css`
              resize: none;
              border: none;
              text-align: center;
              color: main_white;
              background: rgba(0, 0, 0, 0.3);
              border-radius: 4px;
              width: ${width}px;
              height: ${height}px;
              padding: 1rem 0.5rem;
            `}
            autoFocus
            autoCorrect="off"
            onChange={(e) => setEditedMessage(e.target.value)}
            onKeyDown={async (e) => await handleEdit(e)}
          >
            {editedMessage}
          </textarea>
        ) : (
          <span
            className={cx(
              'flex',
              css`
                padding: 1rem 0.5rem;
              `,
            )}
          >
            {recievedMessage}
          </span>
        )}
      </VStack>
    </div>
  );
};

const mapStateToProps = (state: STATE) => ({
  message: state.messages,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setMessages: bindActionCreators(setMessagesAction, dispatch),
  resetMessages: bindActionCreators(resetMessagesAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Message);
