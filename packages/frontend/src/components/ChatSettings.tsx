import React from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { requestUrl } from "../utils/hostUrl_requestUrl";
import { AiOutlineUserDelete } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { Socket } from "socket.io-client";
import { getFirstChat } from "../utils/getFirstChat";

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
      const res = await axios.put(
        `${requestUrl}/chat-room/${chatId}?username=${user}`,
      );
      const data = res.data.Message[0].members;
      setUsers(data);
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
    console.log(e.key);

    if (e.key === "Enter") {
      setUsers([...users, username]);
      setUsername("");
    }
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
              }}
              className="remove_user"
            />
          </div>
        );
      })}

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
