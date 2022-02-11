import React from "react";
import axios from "axios";
import { Socket } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { InitialState2, InitialState3 } from "redux/state";
import { requestUrl } from "utils/hostUrl_requestUrl";
import { BsSearch, BsThreeDots } from "react-icons/bs";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { IoNotifications } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import styled from "@emotion/styled";
import { css } from "@emotion/css";
import UserSettings from "components/UserSettings/UserSettings";
const Form = styled.form`
  width: 100%;
  margin: 0;
  padding: 1rem;
  justify: flex-start;
  position: relative;
`;

const Closed_hamburger = styled.div`
  width: 95%;
  height: 3rem;
  margin-bottom: 1rem;
  position: relative;
`;

const Form_input = styled.input`
  width: 90%;
  margin: 0 1rem;
  background: transparent;
  border: none;
`;

const Profile = styled.div`
  display: flex;
  width: 95%;
  justify-content: space-between;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  margin: 0 1rem;
`;

const User_logo = styled.img`
  width: 2.8rem;
  height: 2.8rem;
  color: var(--main-logo-color);
  margin-right: 1rem;
  border-radius: 100px;
  position: relative;
  zindex: 10;
  &:hover {
    background: rgba(122, 122, 122, 0.4);
  }
`;
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
    <Form
      onSubmit={handleSubmit}
      style={{ marginBottom: "1rem", alignItems: "center" }}
    >
      <Closed_hamburger></Closed_hamburger>
      <Profile>
        <div className="flex">
          {hasAvatar ? (
            <User_logo src={image} className="click" />
          ) : (
            <FaUserCircle
              className={css`
                width: 3.25rem;
                height: 3.25rem;
                margin: 0;
                color: var(--main-logo-color);
                position: relative;
                z-index: 10;
              `}
            />
          )}
          <h1 style={{ whiteSpace: "nowrap", margin: "0 0 0 1rem " }}>Chats</h1>
        </div>
        <div className="flex find_friends_icons">
          <div
            className="flex notifications"
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
            className="flex"
            style={{
              cursor: "pointer",
            }}
            onClick={toggleGroupCreate}
          >
            <AiOutlineUsergroupAdd />
          </div>
          <div
            className="flex"
            style={{
              cursor: "pointer",
              position: "relative",
            }}
          >
            <BsThreeDots
              onClick={() =>
                dispatch({
                  type: "SET_USER_SETTINGS",
                  payload: !state.setUserSettings,
                })
              }
            />
            {state.setUserSettings ? <UserSettings cookie={cookie} /> : null}
          </div>
        </div>
      </Profile>
      <div className="flex" style={{ width: "95%", position: "relative" }}>
        <div className="search-bar">
          <BsSearch
            style={{ cursor: "pointer", color: "black" }}
            onClick={handleSubmit}
          />
          <Form_input
            onChange={(e) =>
              dispatch({ type: "SET_RECIEVER", payload: e.target.value })
            }
            placeholder="Search for chats"
            value={state.reciever}
            type="search"
          />
        </div>
      </div>
    </Form>
  );
}

export default FindFriends;
