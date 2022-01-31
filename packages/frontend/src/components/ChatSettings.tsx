/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { css } from "@emotion/css";
import React from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { requestUrl } from "../utils/hostUrl_requestUrl";
import { AiOutlineUserDelete } from "react-icons/ai";
import { Socket } from "socket.io-client";
import { getFirstChat } from "../utils/getFirstChat";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { InitialState2 } from "../redux/state";
import styled from "@emotion/styled";
const Add_users = styled.div`
  position: relative;
  z-index: 101;
  width: 2rem;
  height: 2rem;
  cursor: pointer;
  padding: 2rem 0.5rem;
  border-radius: 5px;
  justify-content: space-between;
  width: 70%;
  height: 2rem;
  whitespace: nowrap;
  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }
`;

const Add_users_button = styled.h2`
  color: var(--main-black);
  margin: 0;
  @media (max-width: 1344px) {
    font-size: 1.5vw;
    word-break: keep-all;
  }
`;

const Chat_settings_members = styled.div`
  width: 70%;
  padding: 0 0.5rem;
  justify-content: space-between;
`;

const Chat_settings_nav = styled.div`
  position: relative;
  bottom: 0;
  width: 100%;
  z-index: 11;
  height: 80vh;
  background: var(--main-white);
  border-left: 1px solid rgba(0, 0, 0, 0.1);
  flex-direction: column;
  justify-content: flex-start;
  overflow: auto;
`;

function ChatSettings({
  chatId,
  socketRef,
  setLocalStatus,
  cookieName,
}: {
  chatId: string;
  socketRef: Socket;
  cookieName: string;
  setLocalStatus: React.Dispatch<React.SetStateAction<string>>;
}) {
  const dispatch = useDispatch();
  const state = useSelector(
    (state: { setReducer: InitialState2 }) => state.setReducer,
  );

  const [users, setUsers] = React.useState<string[]>([]);
  const route = useRouter();
  const emitFriendRequest = async () => {
    socketRef?.emit("friend_request");
  };
  const getMembers = async () => {
    try {
      const res = await axios.get(`${requestUrl}/chat-room/${chatId}`);
      const data = res.data.Message[0].members;
      setUsers(data);
      return true;
    } catch (error) {
      return false;
    }
  };

  const deleteMember = async (user: string) => {
    try {
      await axios.put(`${requestUrl}/chat-room/${chatId}?username=${user}`);
      return true;
    } catch (error) {
      return false;
    }
  };

  React.useEffect(() => {
    setUsers([]);
    getMembers();
    socketRef.on("inviting_multiple_users", ({ users }) => {
      setUsers((prev) => [...prev, ...users]);
    });
  }, [route.asPath]);

  const redirect = async (user: string) => {
    const updated_users = users.filter((element) => element !== user);
    setUsers(updated_users);
    if (updated_users.length === 2) {
      const redirect = await getFirstChat(cookieName);

      route.push(`/${redirect._id}`);
    }
    setLocalStatus(user);
    setLocalStatus("");
  };
  return (
    <>
      <Chat_settings_nav className={`flex`}>
        <h1
          className={css`
            color: var(--main-black);
            justify-content: center;
            white-space: nowrap;
            padding: 0 0.5rem;
            width: 70%;
            display: flex;
            justify-content: flex-start;
            @media (max-width: 1000px) {
              font-size: 4vw;
            }
          `}
        >
          Members in chat
        </h1>
        {users.map((item, index) => {
          return (
            <Chat_settings_members key={index} className="flex">
              <h2
                style={{
                  flexDirection: "column",
                  color: "var(--main-black)",
                  whiteSpace: "nowrap",
                }}
                className="flex"
              >
                {item}
              </h2>
              <AiOutlineUserDelete
                onClick={() => {
                  deleteMember(item);
                  emitFriendRequest();
                  redirect(item);
                }}
                className={css`
                  width: 2rem;
                  height: 2rem;
                  cursor: pointer;
                  &:hover {
                    color: red;
                  }
                `}
              />
            </Chat_settings_members>
          );
        })}
        {users.length > 2 && (
          <Add_users
            onClick={() => {
              dispatch({
                type: "SET_MODAL_INVITE",
                payload: !state.setModalInvite,
              });
            }}
            className="flex"
          >
            <Add_users_button>Add more users</Add_users_button>
            <div className="flex">
              <AiOutlinePlusCircle style={{ width: "2rem", height: "2rem" }} />
            </div>
          </Add_users>
        )}
      </Chat_settings_nav>
    </>
  );
}

export default ChatSettings;
