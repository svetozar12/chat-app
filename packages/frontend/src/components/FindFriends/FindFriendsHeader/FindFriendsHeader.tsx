import { css, cx } from "@emotion/css";
import React from "react";
import UserSettings from "../../UserSettings";
// icons
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import ISave_inputState from "../../../services/redux/reducer/save_inputReducer/state";
import { IInitialSet } from "../../../services/redux/reducer/setReducer/state";
import api_helper from "../../../services/graphql/api_helper";
import { useCookie } from "next-cookie";
import { useAuth } from "../../../utils/SessionProvider";

const FindFriendsHeader = () => {
  const dispatch = useDispatch();
  const cookie = useCookie();
  const user_id = cookie.get("id") as string;
  const token = cookie.get("token") as string;

  const [hasAvatar, setHasAvatar] = React.useState(false);
  const [image, setImage] = React.useState("");
  const state = useSelector((state: { setReducer: IInitialSet }) => state.setReducer);
  const notifState = useSelector((state: { saveInputReducer: ISave_inputState }) => state.saveInputReducer);

  const getUserImage = async () => {
    try {
      const res = await api_helper.user.getById(user_id, token);
      const userAvatar = res.userAvatar;
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

  return (
    <>
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
          <h1 style={{ whiteSpace: "nowrap", margin: "0 0 0 1rem " }}> Chats</h1>
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
            {notifState.notification_number > 0 && <div className="flex">{notifState.notification_number}</div>}
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
    </>
  );
};

export default React.memo(FindFriendsHeader);
