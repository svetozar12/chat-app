import React from "react";
import { useRouter } from "next/router";
import { Socket } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { requestUrl } from "../utils/hostUrl_requestUrl";
import axios from "axios";
import Avatar from "./Avatar";
import { InitialState2 } from "../redux/state";
interface IActiveChats {
  _id: string;
  members: string[];
  cookieName: string;
  socketRef: Socket;
  chatId: string;
}

const ActiveChats = ({
  _id,
  members,
  cookieName,
  socketRef,
  chatId,
}: IActiveChats) => {
  const router = useRouter();
  const [user1, user2] = [members[0], members[1]];
  const [image, setImage] = React.useState<string>("");
  const [images, setImages] = React.useState<string[]>([]);
  const [hasAvatar, setHasAvatar] = React.useState<boolean>(false);
  const dispatch = useDispatch();
  const state = useSelector(
    (state: { setReducer: InitialState2 }) => state.setReducer,
  );

  const getUserImage = async (name: string | undefined) => {
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
      setImages((prev) => [...prev, requestString]);
      return true;
    } catch (error) {
      return false;
    }
  };

  React.useEffect(() => {
    const notMe: string[] = members.filter((element) => element !== cookieName);
    const me: string | undefined = members.find(
      (element) => element === cookieName,
    );
    notMe.forEach((element, index) => {
      if (index == 2) return;
      getUserImage(element);
    });
    getUserImage(me);
  }, []);

  const joinChat = () => {
    socketRef?.emit("join_chat", {
      chat_id: cookieName,
    });
    router.push(`${_id}`);
  };

  const dispatching = () => {
    dispatch({
      type: "TOGGLE_CREATE_GROUP",
      payload: false,
    });
    dispatch({
      type: "SET_MOBILE_NAV",
      payload: false,
    });
  };

  return (
    <div
      style={{
        whiteSpace: state.setMobileNav ? "nowrap" : "normal",
        overflow: "hidden",
      }}
      onClick={() => {
        joinChat();
        dispatching();
      }}
      className={`contacts_container ${_id === chatId && "active_contact"} `}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <Avatar
          members={members}
          image={image}
          images={images}
          hasAvatar={hasAvatar}
        />
        <div className="contacts_info">
          <h2
            className="invite-userName"
            style={{
              display: "flex",
            }}
          >
            <>
              {members.length > 2
                ? members.map((element, index) => {
                    if (index === 3) return;
                    return (
                      <>
                        {element}
                        {element[members.length - 1] === element[index]
                          ? " ..."
                          : ","}
                      </>
                    );
                  })
                : (members.length === 1 && (
                    <p style={{ margin: "0" }}>{user1}</p>
                  )) ||
                  (user2 === cookieName && (
                    <p style={{ margin: "0" }}>{user1}</p>
                  )) ||
                  (user1 === cookieName && (
                    <p style={{ margin: "0" }}>{user2}</p>
                  ))}
            </>
          </h2>
          <h5>Last message...</h5>
        </div>
      </div>
    </div>
  );
};
export default ActiveChats;
