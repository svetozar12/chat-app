import React from "react";
import axios from "axios";
import { Socket } from "socket.io-client";
import { InitialState2 } from "../../redux/state";
import { useSelector, useDispatch } from "react-redux";
import { css } from "@emotion/css";

const AddGroupChat = ({ cookieName, socketRef }: { cookieName: string; socketRef: Socket }) => {
  const [user, setUser] = React.useState<string>("");
  const [usersData, setUsersData] = React.useState<string[]>([]);

  const dispatch = useDispatch();

  const state1 = useSelector((state: { setReducer: InitialState2 }) => state.setReducer);

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
      dispatch({
        type: "TOGGLE_CREATE_GROUP",
        payload: !state1.toggleCreateGroup,
      });
      return true;
    } catch (error) {
      setUsersData([]);
      return false;
    }
  };

  return (
    <>
      {state1.toggleCreateGroup && (
        <div
          className={css`
            width: 100%;
            height: 100%;
          `}
        >
          <form
            className={css`
              display: flex;
              flex-direction: row;
            `}
            onSubmit={(e) => addToGroup(user, e)}
          >
            <input
              className={css`
                width: 70%;
                height: 2rem;
                margin: 0.5rem 0;
                border: 1px solid var(--input-border-color);
                border-radius: 5px;
                transition: 0.3s;
                padding: 1.3rem 0.9rem;
              `}
              onChange={(e) => setUser(e.target.value)}
              value={user}
              placeholder="Add user ..."
              type="search"
            />
            <button
              className={css`
                border-radius: 5px;
                border: none;
                padding: 0.8rem;
                cursor: pointer;
                transition: 0.4s;
              `}
              onClick={handleSumbit}
              type="button"
            >
              Create room
            </button>
          </form>
          <div style={{ display: "flex" }}>
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
};

export default AddGroupChat;
