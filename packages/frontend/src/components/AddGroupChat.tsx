import React from "react";
import axios from "axios";
import { Socket } from "socket.io-client";
import { InitialState2 } from "../redux/state";
import { useSelector } from "react-redux";
function AddGroupChat({
  cookieName,
  socketRef,
}: {
  cookieName: string;
  socketRef: Socket;
}) {
  const [user, setUser] = React.useState<string>("");
  const [usersData, setUsersData] = React.useState<string[]>([]);

  const state1 = useSelector(
    (state: { setReducer: InitialState2 }) => state.setReducer,
  );

  const emitFriendRequest = async () => {
    socketRef?.emit("friend_request");
  };

  const addToGroup = (user: string, e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUsersData((prev) => [...prev, user]);
    setUser("");
  };
  const handleSumbit = async () => {
    try {
      const result = usersData.includes(cookieName);

      if (!result) usersData.push(cookieName);
      await axios.post("http://localhost:4002/invites/group-chat", {
        usersData,
      });

      emitFriendRequest();
      setUsersData([]);
      return true;
    } catch (error) {
      setUsersData([]);
      return false;
    }
  };
  return (
    <>
      {state1.toggleCreateGroup && (
        <div>
          <form
            style={{ display: "flex", flexDirection: "row" }}
            onSubmit={(e) => addToGroup(user, e)}
          >
            <input
              onChange={(e) => setUser(e.target.value)}
              value={user}
              style={{ width: "70%" }}
              type="search"
            />
            <button
              className="addGroup_button"
              onClick={handleSumbit}
              type="button"
            >
              Create room
            </button>
          </form>
          <div className="group_chat_users">
            {usersData.map((element, index) => {
              return (
                <p style={{ color: "black" }} key={index}>
                  {element}
                </p>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default AddGroupChat;
