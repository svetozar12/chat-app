import React from "react";
import axios from "axios";
import { Socket } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { InitialState2, InitialState3 } from "../redux/state";
import { requestUrl } from "../utils/hostUrl_requestUrl";
import { BsFillPeopleFill, BsSearch } from "react-icons/bs";
import { IoNotifications } from "react-icons/io5";
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
      if (!userAvatar) {
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

  const notifState = useSelector(
    (state: { saveInputReducer: InitialState3 }) => state.saveInputReducer,
  );

  const toggleGroupCreate = () => {
    dispatch({
      type: "TOGGLE_CREATE_GROUP",
      payload: !state.toggleCreateGroup,
    });
    dispatch({
      type: "SET_MOBILE_NAV",
      payload: !state.setMobileNav,
    });
    dispatch({
      type: "SET_CHAT_SETTINGS",
      payload: false,
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
      <div className="close_hamburger">
        <h1 style={{ whiteSpace: "nowrap" }}>Your chats</h1>
      </div>
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
              className="user-logo click"
              style={{
                width: "3rem",
                height: "3.25rem",
                borderRadius: "100px",
                cursor: "pointer",
                position: "relative",
                zIndex: "10",
              }}
            />
          ) : (
            <FaUserCircle
              style={{
                color: "var(--main-logo-color)",
                position: "relative",
                zIndex: "10",
                width: "3rem",
                height: "3.25rem",
              }}
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
        <div className="flex find_friends_icons">
          <div
            className="notifications"
            style={{ cursor: "pointer" }}
            onClick={() => {
              dispatch({
                type: "SET_FRIEND_REQUEST",
                payload: !state.setFriendRequest,
              });
            }}
          >
            <IoNotifications />
            {notifState.notification_number != 0 && (
              <div className="flex">{notifState.notification_number}</div>
            )}
          </div>
          <div
            style={{
              cursor: "pointer",
            }}
            onClick={toggleGroupCreate}
          >
            <BsFillPeopleFill />
          </div>
        </div>
      </div>
      <div className="flex search_container">
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
      </div>
    </form>
  );
}

export default FindFriends;
