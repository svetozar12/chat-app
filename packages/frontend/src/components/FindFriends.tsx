import React from "react";
import axios from "axios";
import { Socket } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { InitialState, InitialState2 } from "../redux/state";
import { requestUrl } from "../utils/hostUrl_requestUrl";
import { BsFillPeopleFill, BsSearch } from "react-icons/bs";
import { FaUserCircle, FaUserFriends } from "react-icons/fa";
import UserSettings from "./UserSettings";

export interface IFindFriends {
  cookieName: string;
  socketRef: Socket;
  cookie: any;
}

function FindFriends({ cookie, cookieName, socketRef }: IFindFriends) {
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
      payload: !state.toggleCreateGroup,
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

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<SVGElement>,
  ) => {
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
      <div className="profile" style={{ display: "flex" }}>
        <div>
          <FaUserCircle
            onClick={() =>
              dispatch({
                type: "SET_USER_SETTINGS",
                payload: !state.setUserSettings,
              })
            }
          />
          {state.setUserSettings ? <UserSettings cookie={cookie} /> : null}
        </div>
        <div>
          <FaUserFriends
            onClick={() =>
              dispatch({
                type: "SET_FRIEND_REQUEST",
                payload: !state.setFriendRequest,
              })
            }
          />
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div className="search-bar">
          <BsSearch
            style={{ cursor: "pointer", color: "black" }}
            onClick={handleSubmit}
          />
          <input
            onChange={(e) =>
              dispatch({ type: "SET_RECIEVER", payload: e.target.value })
            }
            value={state.reciever}
            type="search"
          />
        </div>
        <BsFillPeopleFill
          onClick={toggleGroupCreate}
          style={{ width: "2rem", height: "2rem", cursor: "pointer" }}
        />
      </div>
    </form>
  );
}

export default FindFriends;
