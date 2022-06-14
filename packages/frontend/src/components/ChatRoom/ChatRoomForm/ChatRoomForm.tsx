import React from "react";
import { MdSend } from "react-icons/md";
import { Message_form } from "./styled";
import { css } from "@emotion/css";
import { useCookie } from "next-cookie";
import api_helper from "../../../services/graphql/api_helper";
import { Socket } from "socket.io-client";

interface IPropsState {
  name?: string;
  message?: string;
  time?: string | number;
}

interface IChatRoomForm {
  chatId: string;
  socketRef: Socket | null;
  inputTextArea: React.MutableRefObject<any>;
}

const ChatRoomForm = ({ chatId, socketRef, inputTextArea }: IChatRoomForm) => {
  const cookie = useCookie();
  const [state, setState] = React.useState<IPropsState>({
    name: cookie.get("name"),
    message: "",
    time: "",
  });
  const onMessageSubmit = async (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<SVGElement>) => {
    e.preventDefault();
    if (state.message) {
      const { name, message, time } = state;

      await saveMessage();
      socketRef?.emit("message", {
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
    <Message_form onSubmit={onMessageSubmit} className="flex">
      <div
        className={css`
            cursor: text;
            position: relative;
            z-index: 1000;
            flex-direction: row;
            justify-content: space-between;
            background: #d9d9d9;
            border-radius: 25px;
            width: 70%;
            margin: 0.5rem 0;
            padding: 0.5rem 2rem;
            overflow-wrap: break-word;
            display: flex;
            justify-content: center;
            align-items: center;
          flex`}
        onClick={() => inputTextArea.current.focus()}
      >
        <textarea
          className={css`
            border: none;
            resize: none;
            padding: 0;
            wordbreak: break-all;
            width: 90%;
            background: transparent;
            height: 0.9375rem;
            &:focus {
              outline: none;
            }
          `}
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
      </div>
    </Message_form>
  );
};

export default ChatRoomForm;
