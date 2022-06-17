import React from "react";
import { Socket } from "socket.io-client";
import { IInitialSet } from "../../services/redux/reducer/setReducer/state";
import { useSelector, useDispatch } from "react-redux";
import { css, cx } from "@emotion/css";
import { Button } from "../styledComponents";
import api_helper from "../../services/graphql/api_helper";
import { useCookie } from "next-cookie";
import { IAuthState } from "../../services/redux/reducer/authReducer/state";
import { getAuth } from "../../utils/authMethods";

const AddGroupChat = () => {
  const [user, setUser] = React.useState<string>("");
  const [usersData, setUsersData] = React.useState<string[]>([]);
  const cookie = useCookie();
  const dispatch = useDispatch();
  const authState = useSelector((state: { authReducer: IAuthState }) => state.authReducer);
  const setState = useSelector((state: { setReducer: IInitialSet }) => state.setReducer);
  const cookieName = cookie.get("name") as string;

  const emitFriendRequest = async () => {
    authState.ws?.emit("friend_request");
  };

  const addToGroup = (user: string, e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUsersData((prev) => [...prev, user]);
    setUser("");
  };
  const handleSumbit = async () => {
    try {
      getAuth();
      const result = usersData.includes(cookieName);

      if (!result) usersData.push(cookieName);
      await api_helper.invite.createGroupChat(usersData);
      emitFriendRequest();
      setUsersData([]);
      dispatch({
        type: "TOGGLE_CREATE_GROUP",
        payload: !setState.toggleCreateGroup,
      });
      return true;
    } catch (error) {
      setUsersData([]);
      return false;
    }
  };

  return (
    <>
      {setState.toggleCreateGroup && (
        <div
          className={css`
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;
          `}
        >
          <form
            className={cx(
              css`
                width: 100%;
                flex-direction: row;
              `,
              "flex",
            )}
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
            <Button
              className={css`
                width: 20%;
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
            </Button>
          </form>
          <div style={{ display: "flex" }}>
            {usersData.map((element, index) => {
              return (
                <p
                  className={css`
                    background: var(--main-blue);
                    color: var(--main-white);
                    padding: 0.2rem 1rem;
                    border-radius: 5px;
                  `}
                  key={index}
                >
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
