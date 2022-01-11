import React from "react";
import axios from "axios";
import { Socket } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { InitialState2 } from "../redux/state";
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
  const [hasAvatar, setHasAvatar] = React.useState(false);
  const [image, setImage] = React.useState("");

  const getUserImage = async (name: string) => {
    try {
      const res = await axios.get(`${requestUrl}/users/${name}`);
      const userAvatar = res.data.user.userAvatar;
      if (userAvatar === "") {
        setHasAvatar(false);
        return true;
      }
      setHasAvatar(true);
      const requestString = `${requestUrl}/${userAvatar}`;
      setImage(requestString);
      return true;
    } catch (error) {
      return false;
    }
  };

  React.useEffect(() => {
    getUserImage(cookieName);
  }, []);

  const state = useSelector(
    (state: { setReducer: InitialState2 }) => state.setReducer,
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
  console.log(state.setUserSettings);

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
          {hasAvatar ? (
            <img
              src={image}
              onClick={() =>
                dispatch({
                  type: "SET_USER_SETTINGS",
                  payload: !state.setUserSettings,
                })
              }
              className="user-logo"
              style={{ borderRadius: "50px", cursor: "pointer" }}
            />
          ) : (
            <FaUserCircle
              onClick={() =>
                dispatch({
                  type: "SET_USER_SETTINGS",
                  payload: !state.setUserSettings,
                })
              }
            />
          )}
          {state.setUserSettings ? <UserSettings cookie={cookie} /> : null}
        </div>
        <div className="flex">
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
