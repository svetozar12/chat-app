import React from "react";
import { MdSend } from "react-icons/md";
import { Message_form } from "./styled";
import { css } from "@emotion/css";
import { useCookie } from "next-cookie";
import api_helper from "../../../services/graphql/api_helper";
import { Socket } from "socket.io-client";
import { IAuthState } from "../../../services/redux/reducer/authReducer/state";
import { useSelector } from "react-redux";
import { getAuth } from "../../../utils/authMethods";
import { Flex, FormControl, HStack, Textarea } from "@chakra-ui/react";

interface IPropsState {
  name?: string;
  message?: string;
  time?: string | number;
}

interface IChatRoomForm {
  chatId: string;
  inputTextArea: React.MutableRefObject<any>;
}

const ChatRoomForm = ({ chatId, inputTextArea }: IChatRoomForm) => {
  const cookie = useCookie();
  const authState = useSelector((state: { authReducer: IAuthState }) => state.authReducer);
  const [state, setState] = React.useState<IPropsState>({
    name: cookie.get("name"),
    message: "",
    time: "",
  });
  const onMessageSubmit = async (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<SVGElement>) => {
    e.preventDefault();
    if (state.message) {
      await getAuth();
      const { name, message, time } = state;
      await saveMessage();
      authState.ws?.emit("message", {
        chatInstance: chatId,
        sender: cookie.get("name"),
        message,
        time,
      });
      setState({ name, message: "" });
    }
  };

  const handleKeyPress = (e: any) => {
    const target = e.target as HTMLTextAreaElement;
    inputTextArea.current.style.height = "15px";
    inputTextArea.current.style.height = `${target.scrollHeight}px`;
    inputTextArea.current.style.height = `${Math.min(e.target.scrollHeight, 60)}px`;

    setState({ ...state, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e: any) => {
    if (e.key === "Enter") {
      onMessageSubmit(e);
    }
  };

  const saveMessage = async () => {
    try {
      await api_helper.message.create(cookie.get("id"), chatId, state.message as string, cookie.get("token"));
      return true;
    } catch (error) {
      return false;
    }
  };
  return (
    <Flex justifyContent="center" alignItems="center" w="full" h="10vh" bg="white" onSubmit={onMessageSubmit}>
      <HStack
        cursor="text"
        pos="relative"
        zIndex="1000"
        bg="#f3f3f5"
        w="70%"
        m="1"
        h="5rem"
        p="2"
        overflowWrap="break-word"
        borderRadius="3xl"
        onClick={() => inputTextArea.current.focus()}
      >
        <Textarea
          variant="unstyled"
          resize="none"
          wordBreak="break-all"
          w="90%"
          size="sm"
          ref={inputTextArea}
          name="message"
          onKeyDown={(e) => handleSubmit(e)}
          onChange={(e) => handleKeyPress(e)}
          placeholder="Your Message "
          value={state.message}
        />
        <div
          className={css`
              display:flex;
              justify-content: center;
              align-items: center;
              cursor: pointer;
              padding: 0.3rem 0 0.3rem 0.5rem;
              border: 1px transperant;
              border-radius: 50px;
              &:hover {
                background: rgba(0, 0, 0, 0.1);
                border-radius: 50px;
              }
            flex`}
        >
          <MdSend
            className={css`
              cursor: pointer;
              width: 1.5rem;
              height: 1.5rem;
              margin-right: 0.3rem;
              padding: 0.1rem;
            `}
            type="submit"
            onClick={onMessageSubmit}
          />
        </div>
      </HStack>
    </Flex>
  );
};

export default ChatRoomForm;
