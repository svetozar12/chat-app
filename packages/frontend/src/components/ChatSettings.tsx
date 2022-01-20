import React from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { requestUrl } from "../utils/hostUrl_requestUrl";
import { AiOutlineUserDelete } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { Socket } from "socket.io-client";
import { getFirstChat } from "../utils/getFirstChat";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { InitialState2 } from "../redux/state";
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

  const [username, setUsername] = React.useState<string>("");
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

  const addMembers = async (usernames: string[]) => {
    try {
      const res = await axios.put(`${requestUrl}/chat-room/${chatId}`, {
        usernames,
      });
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
      setLocalStatus(user);
      setLocalStatus("");
      return true;
    } catch (error) {
      return false;
    }
  };

  React.useEffect(() => {
    setUsers([]);
    getMembers();
  }, [route.asPath]);
  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      setUsers([...users, username]);
      setUsername("");
    }
  };
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
    <div className="chat_settings_nav flex">
      <h1 style={{ color: "var(--main-black)" }}>Members in chat</h1>
      {users.map((item) => {
        return (
          <div className="flex">
            <h2
              style={{ flexDirection: "column", color: "var(--main-black)" }}
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
      <div style={{ width: "95%", height: "2rem" }} className="flex">
        <h2 style={{ color: "var(--main-black)" }}>Add more users</h2>
        <div>
          <AiOutlinePlusCircle
            className="add_users"
            onClick={() => {
              console.log(state.setModalInvite);

              dispatch({
                type: "SET_MODAL_INVITE",
                payload: !state.setModalInvite,
              });
            }}
          />
        </div>
      </div>

      <div className="search-bar" style={{ border: "none", width: "70%" }}>
        <BsSearch
          onClick={() => {
            addMembers(users);
            emitFriendRequest();
          }}
          style={{
            cursor: "pointer",
            color: "black",
          }}
        />
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="search"
          onKeyPress={handleKeyPress}
          style={{
            border: "none",
            width: "100%",
            background: "none",
          }}
        />
      </div>
    </div>
  );
}

export default ChatSettings;
