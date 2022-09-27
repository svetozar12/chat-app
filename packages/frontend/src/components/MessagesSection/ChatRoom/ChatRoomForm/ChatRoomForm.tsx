import React, { useEffect } from 'react';
import { MdSend } from 'react-icons/md';
import { css } from '@emotion/css';
import { useCookie } from 'next-cookie';
import { Center, Flex, HStack, Spacer, Text } from '@chakra-ui/react';
import sdk from 'services/sdk';
import { getAuth } from 'utils/authMethods';
import generic from 'utils/generic';
import s from './ChatRoomForm.module.css';
import useThemeColors from 'hooks/useThemeColors';
import { STATE } from 'services/redux/reducer';
import { connect } from 'react-redux';
import { IWebSocket } from 'services/redux/reducer/websocket/state';
import { bindActionCreators, Dispatch } from 'redux';
import { setMessagesAction } from 'services/redux/reducer/messages/actions';

interface IPropsState {
  name?: string;
  message?: string;
  time?: string | number;
}

interface IChatRoomForm {
  chatId: string;
  ws: IWebSocket;
  setMessages: typeof setMessagesAction;
}

function ChatRoomForm(props: IChatRoomForm) {
  const { chatId, ws, setMessages } = props;
  const cookie = useCookie();
  const [state, setState] = React.useState<IPropsState>({
    name: cookie.get('name'),
    message: '',
    time: '',
  });
  const inputTextArea = React.useRef<any>(null);

  useEffect(() => {
    inputTextArea.current.focus();
    ws.ws?.on('message', ({ messages }) => {
      const [message] = messages;
      setMessages(message);
    });
  }, [ws.ws]);
  const handleKeyPress = (e: any) => {
    const target = e.target as HTMLTextAreaElement;
    inputTextArea.current.style.height = '10px';
    inputTextArea.current.style.height = `${target.scrollHeight}px`;
    inputTextArea.current.style.height = `${Math.min(e.target.scrollHeight, 40)}px`;

    setState({ ...state, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    inputTextArea.current.style.height = '20px';
  }, []);

  const saveMessage = async () => {
    try {
      if (state.message)
        await sdk.message.create({
          auth: { userId: cookie.get('id'), AccessToken: cookie.get('token') },
          chat_id: chatId,
          message: state.message,
        });
      return true;
    } catch (error) {
      return false;
    }
  };

  const onMessageSubmit = async (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<SVGElement>) => {
    e.preventDefault();
    if (state.message) {
      await getAuth();
      const { name, message, time } = state;
      await saveMessage();
      ws.ws?.emit('message', {
        chatInstance: chatId,
        sender: cookie.get('name'),
        message,
        time,
      });
      setState({ name, message: '' });
    }
  };

  const {
    base: {
      default: { inverseColor, color, offColor },
    },
  } = useThemeColors();

  return (
    <Flex mt="0.5rem !important" w="full" h="10vh" bg={inverseColor} alignItems="center" justifyContent="center">
      <HStack
        cursor="text"
        pos="relative"
        zIndex="1"
        w="70%"
        h="auto"
        p="2"
        bg={offColor}
        overflowWrap="break-word"
        borderRadius="3xl"
        align="center"
        onClick={() => inputTextArea.current.focus()}
      >
        <textarea
          rows={40}
          style={{ margin: '0 0.5rem' }}
          className={s.messageInput}
          ref={inputTextArea}
          name="message"
          onKeyDown={(e) => generic.handleSubmitOnEnter(e, onMessageSubmit)}
          onChange={(e) => handleKeyPress(e)}
          value={state.message}
        />
        {!state.message && (
          <Text pos="absolute" color={offColor}>
            Aa
          </Text>
        )}
        <Spacer />
        <Center
          mr={12}
          w="2rem"
          h="2rem"
          _hover={{ bg: 'rgba(0,0,0,0.1)', borderRadius: 'full' }}
          justifyItems="center"
          alignItems="center"
          cursor="pointer"
          justifyContent="center"
          border="1px transperant"
        >
          <MdSend
            className={css`
              cursor: pointer;
              width: 1.5rem;
              height: 1.5rem;
              padding: 0.1rem;
            `}
            type="submit"
            onClick={onMessageSubmit}
          />
        </Center>
      </HStack>
    </Flex>
  );
}

const mapStateToProps = (state: STATE) => ({
  ws: state.ws,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setMessages: bindActionCreators(setMessagesAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(ChatRoomForm));
