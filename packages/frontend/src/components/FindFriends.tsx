import React from "react";
import axios from "axios";
import { Socket } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { InitialState, InitialState2 } from "../redux/state";
import { requestUrl } from "../utils/hostUrl_requestUrl";
import { BsFillPeopleFill } from "react-icons/bs";

export interface IFindFriends {
  cookieName: string;
  socketRef: Socket;
}

function FindFriends({ cookieName, socketRef }: IFindFriends) {
  const dispatch = useDispatch();
  const state = useSelector(
    (state: { homePageReducer: InitialState2 }) => state.homePageReducer,
  );

  const authState = useSelector(
    (state: { authReducer: InitialState }) => state.authReducer,
  );

  const toggleGroupCreate = () => {
    dispatch({
      type: "TOGGLE_CREATE_GROUP",
      payload: !authState.toggleCreateGroup,
    });
  };

  const sendInvite = async () => {
    try {
      const res = await axios.post(`${requestUrl}/invites`, {
        reciever: state.reciever,
        inviter: cookieName,
        status: "recieved",
      });
      const data = res.data.message;
      socketRef.emit("send_friend_request", {
        inviter: data.inviter,
        reciever: state.reciever,
      });

      return true;
    } catch (error) {
      return false;
    }
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (state.reciever) {
      await sendInvite();
      dispatch({ type: "SET_RECIEVER", payload: "" });
    }
  };

  return (
    <form
      className="friendsInput"
      onSubmit={handleSubmit}
      style={{ marginBottom: "1rem", alignItems: "center" }}
    >
      <h1>Your chats</h1>
      <div style={{ display: "flex", alignItems: "center" }}>
        <input
          onChange={(e) =>
            dispatch({ type: "SET_RECIEVER", payload: e.target.value })
          }
          value={state.reciever}
          type="search"
          placeholder="Search user"
        />
        <BsFillPeopleFill
          onClick={toggleGroupCreate}
          style={{ width: "2rem", height: "2rem", cursor: "pointer" }}
        />
      </div>
    </form>
  );
}

export default FindFriends;
