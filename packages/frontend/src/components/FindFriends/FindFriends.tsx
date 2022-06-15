import React from "react";
import { Socket } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { BsSearch } from "react-icons/bs";
import { css } from "@emotion/css";
import { useCookie } from "next-cookie";
// services
import { IInitialSet } from "../../services/redux/reducer/setReducer/state";
import api_helper from "../../services/graphql/api_helper";
import FindFriendsHeader from "./FindFriendsHeader";
import { IAuthState } from "../../services/redux/reducer/authReducer/state";

function FindFriends() {
  const dispatch = useDispatch();

  const cookie = useCookie();

  const state = useSelector((state: { setReducer: IInitialSet }) => state.setReducer);
  const authState = useSelector((state: { authReducer: IAuthState }) => state.authReducer);

  const sendInvite = async () => {
    try {
      const res = await api_helper.invite.create(cookie.get("id"), state.reciever, cookie.get("token"));
      authState.ws?.emit("send_friend_request", {
        inviter: res.inviter,
        reciever: res.reciever,
      });

      return true;
    } catch (error) {
      console.log(error);

      return false;
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<SVGElement>) => {
    e.preventDefault();
    if (state.reciever) {
      await sendInvite();
      dispatch({ type: "SET_RECIEVER", payload: "" });
    }
  };

  return (
    <form
      className={css`
        width: 100%;
        margin: 0;
        padding: 1rem;
        display: flex;
        justify: flex-start;
        position: relative;
        margin-bottom: 1rem;
        align-items: center;
      `}
      onSubmit={handleSubmit}
    >
      <FindFriendsHeader />
      <div className="flex" style={{ width: "95%", position: "relative" }}>
        <div
          className={css`
            width: 95%;
            border-radius: 25px;
            margin: 1rem 0;
            padding: 0.3rem;
            background: rgba(122, 122, 122, 0.1);
            display: flex;
            justify-content: center;
            align-items: center;
            &:focus-within {
              box-shadow: 0 0 5px;
            }
          `}
        >
          <BsSearch style={{ cursor: "pointer", color: "black" }} />
          <input
            className={css`
              width: 90%;
              margin: 0 1rem;
              background: transparent;
              border: none;
              outline: none;
            `}
            onChange={(e) => dispatch({ type: "SET_RECIEVER", payload: e.target.value })}
            placeholder="Search for chats"
            value={state.reciever}
            type="search"
          />
        </div>
      </div>
    </form>
  );
}

export default React.memo(FindFriends);
