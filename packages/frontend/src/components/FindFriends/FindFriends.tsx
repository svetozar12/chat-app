import React from "react";
import { Socket } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { IInitialSet } from "../../redux/reducer/setReducer/state";
import ISave_inputState from "../../redux/reducer/save_inputReducer/state";
import { BsSearch, BsThreeDots } from "react-icons/bs";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { IoNotifications } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { css, cx } from "@emotion/css";
import UserSettings from "../UserSettings";
import { IAuthState } from "../../redux/reducer/authReducer/state";
import api_helper from "../../graphql/api_helper";

export interface IFindFriends {
  cookieName: string;
  socketRef: Socket;
  cookie: any;
}

function FindFriends({ socketRef }: IFindFriends) {
  const dispatch = useDispatch();
  const [hasAvatar, setHasAvatar] = React.useState(false);
  const [image, setImage] = React.useState("");
  const authState = useSelector((state: { authReducer: IAuthState }) => state.authReducer);

  const getUserImage = async () => {
    try {
      const res = await api_helper.user.getById(authState.cookie?.id as string, authState.cookie?.token as string);
      const userAvatar = res.data.user.userAvatar;
      if (!userAvatar) {
        setHasAvatar(false);
        return true;
      }
      setHasAvatar(true);
      const requestString = ``;
      setImage(requestString);
      return true;
    } catch (error) {
      return false;
    }
  };

  React.useEffect(() => {
    getUserImage();
  }, []);

  const state = useSelector((state: { setReducer: IInitialSet }) => state.setReducer);

  const notifState = useSelector((state: { saveInputReducer: ISave_inputState }) => state.saveInputReducer);

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
      const res = await api_helper.invite.create(authState.cookie?.id as string, state.reciever, authState.cookie?.token as string);
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
      <div
        className={css`
          width: 95%;
          height: 3rem;
          margin-bottom: 1rem;
          position: relative;
        `}
      ></div>
      <div
        className={css`
          display: flex;
          width: 95%;
          justify-content: space-between;
          padding-bottom: 1rem;
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
          margin: 0 1rem;
        `}
      >
        {/* refactor to new component bellow */}
        <div className="flex">
          {hasAvatar ? (
            <img
              alt="user_avatar"
              src={image}
              className={cx(
                "click",
                css`
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
                `,
              )}
            />
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
        {/* refactor to new component above */}
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
            {notifState.notification_number != 0 && <div className="flex">{notifState.notification_number}</div>}
          </div>
          <div
            className="flex add_group"
            style={{
              cursor: "pointer",
            }}
            onClick={toggleGroupCreate}
          >
            <AiOutlineUsergroupAdd />
          </div>
          <div
            className="flex dots"
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
            {state.setUserSettings ? <UserSettings /> : null}
          </div>
        </div>
      </div>
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
          <BsSearch style={{ cursor: "pointer", color: "black" }} onClick={handleSubmit} />
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

export default FindFriends;
