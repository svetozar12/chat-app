import React, { useEffect } from "react";
import { MdSend } from "react-icons/md";
import { css } from "@emotion/css";
import { useCookie } from "next-cookie";
import api_helper from "../../../services/graphql/api_helper";
import { IAuthState } from "../../../services/redux/reducer/authReducer/state";
import { useDispatch, useSelector } from "react-redux";
import { getAuth } from "../../../utils/authMethods";
import { background, Box, Center, Flex, HStack, Spacer, Text } from "@chakra-ui/react";
import s from "./ChatRoomForm.module.css";
import generic from "../../../utils/generic";

interface IPropsState {
  name?: string;
  message?: string;
  time?: string | number;
}

interface IChatRoomForm {
  chatId: string;
}

const ChatRoomForm = ({ chatId }: IChatRoomForm) => {
  const cookie = useCookie();
  const dispatch = useDispatch();
  const authState = useSelector((state: { authReducer: IAuthState }) => state.authReducer);
  const [state, setState] = React.useState<IPropsState>({
    name: cookie.get("name"),
    message: "",
    time: "",
  });
  const inputTextArea = React.useRef<any>(null);

  useEffect(() => {
    inputTextArea.current.focus();

    console.log("ws-connect");
    authState.ws?.on("message", ({ messages }) => {
      const [message] = messages;
      dispatch({ type: "MESSAGES", payload: message });
    }),
      [];
  });
  const handleKeyPress = (e: any) => {
    const target = e.target as HTMLTextAreaElement;
    inputTextArea.current.style.height = "20px";
    inputTextArea.current.style.height = `${target.scrollHeight}px`;
    inputTextArea.current.style.height = `${Math.min(e.target.scrollHeight, 60)}px`;

    setState({ ...state, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    inputTextArea.current.style.height = "20px";
  }, []);

  const saveMessage = async () => {
    try {
      await api_helper.message.create(cookie.get("id"), chatId, state.message as string, cookie.get("token"));
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
      authState.ws?.emit("message", {
        chatInstance: chatId,
        sender: cookie.get("name"),
        message,
        time,
      });
      setState({ name, message: "" });
    }
  };

  return (
    <Flex mt="-0.5rem !important" w="full" h="10vh" bg="var(--main-white)" alignItems="center" justifyContent="center">
      <HStack
        cursor="text"
        pos="relative"
        zIndex="1"
        w="70%"
        h="auto"
        p="2"
        bg="#F3F3F5"
        overflowWrap="break-word"
        borderRadius="3xl"
        align="center"
        onClick={() => inputTextArea.current.focus()}
      >
        <textarea
          rows={40}
          style={{ height: "3rem", margin: "0 0.5rem" }}
          className={s.MessageInput}
          ref={inputTextArea}
          name="message"
          onKeyDown={(e) => generic.handleSubmitOnEnter(e, onMessageSubmit)}
          onChange={(e) => handleKeyPress(e)}
          value={state.message}
        />
        {!state.message && (
          <Text pos="absolute" color="#B1BAC5">
            placeholder
          </Text>
        )}
        <Spacer />
        <Center
          mr={12}
          w="2rem"
          h="2rem"
          _hover={{ bg: "rgba(0,0,0,0.1)", borderRadius: "full" }}
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
};

export default React.memo(ChatRoomForm);
