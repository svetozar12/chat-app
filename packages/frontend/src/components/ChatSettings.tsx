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
import { AddUsers_Modal } from "./AddUsers_Modal";
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
      <div style={{ overflowY: "auto" }} className={`chat_settings_nav flex`}>
        <h1
          style={{
            color: "var(--main-black)",
            justifyContent: "center",
            whiteSpace: "nowrap",
          }}
        >
          Members in chat
        </h1>
        {users.map((item, index) => {
          return (
            <div key={index} className="flex chat_settings_members">
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
                className="remove_user"
              />
            </div>
          );
        })}
        {users.length > 2 && (
          <div
            onClick={() => {
              dispatch({
                type: "SET_MODAL_INVITE",
                payload: !state.setModalInvite,
              });
            }}
            style={{ width: "70%", height: "2rem", whiteSpace: "nowrap" }}
            className="flex add_users"
          >
            <h2
              className="add_users_button"
              style={{
                color: "var(--main-black)",
                margin: "0",
              }}
            >
              Add more users
            </h2>
            <div className="flex">
              <AiOutlinePlusCircle style={{ width: "2rem", height: "2rem" }} />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ChatSettings;
