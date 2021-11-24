import React from "react";
import axios from "axios";
import { Socket } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { InitialState2 } from "../redux/state";

interface IFindFriends {
  cookieName: string;
  socketRef: Socket;
}

function FindFriends({ cookieName, socketRef }: IFindFriends) {
  const dispatch = useDispatch();
  const state = useSelector(
    (state: { homePageReducer: InitialState2 }) => state.homePageReducer,
  );

  const sendInvite = async () => {
    try {
      const res = await axios.post(`http://localhost:4001/invites`, {
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

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (state.reciever) {
      await sendInvite();
      dispatch({ type: "SET_RECIEVER", payload: "" });
    }
  };

  return (
    <form className="friendsInput">
      <h1>Your chats</h1>
      <input
        onChange={(e) =>
          dispatch({ type: "SET_RECIEVER", payload: e.target.value })
        }
        value={state.reciever}
        type="text"
        placeholder="Search user"
      />
      <button type="submit" onClick={handleSubmit}>
        Search
      </button>
    </form>
  );
}

export default FindFriends;