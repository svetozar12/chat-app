import { css, cx } from '@emotion/css';
import React from 'react';
import { BsThreeDots, BsThreeDotsVertical } from 'react-icons/bs';
import { connect } from 'react-redux';
// components
import { useCookie } from 'next-cookie';
import { Heading, HStack, IconButton, VStack } from '@chakra-ui/react';
import MessageSettings from './MessageSettings';
import { IchatInstance } from '../ChatRoom';
// services
import useThemeColors from 'hooks/useThemeColors';
import { STATE } from 'services/redux/reducer';
import { bindActionCreators, Dispatch } from 'redux';
import { resetMessagesAction, setMessagesAction } from 'services/redux/reducer/messages/actions';
import { IMessage } from 'services/redux/reducer/messages/state';
import { toggleMessageSettings } from 'services/redux/reducer/toggles/actions';
import { useUpdateMessageMutation } from 'services/generated';
import useProvideAuth from 'hooks/useSession';

interface IRenderChat {
  id: string;
  sender: string;
  timeStamp: string | number;
  recievedMessage: string;
  chatId: string;
  message: IMessage;
  toggleMessageSettings: typeof toggleMessageSettings;
  setMessages: typeof setMessagesAction;
  resetMessages: typeof resetMessagesAction;
}

const mineMessages = css`
  align-items: flex-end;
  justify-content: center;
  color: var(--main-white);
  flex-direction: column;
`;

const otherMessages = css`
  align-items: flex-start;
  justify-content: center;
  color: var(--main-black);
  flex-direction: column;
`;

function RenderChat(props: IRenderChat) {
  const { id, sender, timeStamp, recievedMessage, message, toggleMessageSettings, resetMessages, setMessages } = props;
  const { show, messages } = message;
  const cookie = useCookie();
  const { auth } = useProvideAuth();
  const [styleBool, setStyleBool] = React.useState(false);
  const [settings, setSettings] = React.useState(false);
  const [editing, setEditing] = React.useState(false);
  const [editedMessage, setEditedMessage] = React.useState('');
  const [width, setWidth] = React.useState(112);
  const [height, setHeight] = React.useState(48);
  const inputRef = React.useRef<HTMLDivElement>(null);
  const [updateMessage] = useUpdateMessageMutation();
  const name = cookie.get('name');
  const checkSettingsOpt = () => styleBool || settings;

  const optionsPadding = cx(
    css`
      position: relative;
      margin: 0 0.5rem;
      border-radius: 100%;
      width: 2.5rem;
      height: 2.5rem;
      cursor: pointer;
      color: var(--main-black);
      display: flex;
      visibility: ${checkSettingsOpt() ? 'vissible' : 'hidden'};
      &:hover {
        background: rgba(0, 0, 0, 0.1);
      }
      &:active {
        border: 1px solid rgba(0, 0, 255, 0.2);
      }
    `,
    'flex',
  );

  const ToggleSettings = () => {
    toggleMessageSettings(!show);
    if (settings) setEditing(false);
    setSettings(!show);
  };

  const handleEdit = async (e: any) => {
    const target = e.target as HTMLTextAreaElement;
    e.target.style.height = '15px';
    e.target.style.height = `${target.scrollHeight}px`;
    e.target.style.height = `${Math.min(e.target.scrollHeight, 60)}px`;
    if (e.key === 'Enter') {
      const messageArr: IchatInstance[] = [];
      for (const obj of messages) {
        if (obj._id === id) {
          obj.message = editedMessage;
          await updateMessage({
            variables: {
              auth,
              message_id: id,
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

  React.useEffect(() => {
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

  return (
    <HStack
      gap={5}
      onMouseOut={() => {
        setStyleBool(false);
      }}
      onMouseOver={() => {
        setStyleBool(true);
      }}
      className={cx(
        'flex',
        css`
          justify-content: ${name === sender ? 'flex-end' : 'flex-start'};
          width: 100%;
        `,
        { [mineMessages]: name === sender },
        { [otherMessages]: name !== sender },
      )}
    >
      <Heading
        color={color}
        fontSize="lg"
        className={css`
          justify-content: ${name === sender ? 'flex-end' : 'flex-start'};
          font-size: 15px;
        `}
      >
        {name === sender ? null : sender}
      </Heading>
      <div
        className={cx(
          'flex',
          css`
            width: 100%;
            justify-content: ${name === sender ? 'flex-end' : 'flex-start'};
          `,
        )}
      >
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
              {settings && <MessageSettings setSettings={setSettings} setEditing={setEditing} id={id} translateX="-60px" />}
              <div onClick={ToggleSettings} className={optionsPadding}>
                <IconButton
                  borderRadius="full"
                  aria-label=""
                  boxShadow="box-shadow: 0 0 5px main_black"
                  icon={
                    <BsThreeDots
                      className={css`
                        width: 2rem;
                        height: 2rem;
                        color: ${color};
                      `}
                    />
                  }
                />
              </div>
            </div>
          )}
          <VStack
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
      </div>
    </HStack>
  );
}

const mapStateToProps = (state: STATE) => ({
  message: state.messages,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setMessages: bindActionCreators(setMessagesAction, dispatch),
  resetMessages: bindActionCreators(resetMessagesAction, dispatch),
  toggleMessageSettings: bindActionCreators(toggleMessageSettings, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(RenderChat));
