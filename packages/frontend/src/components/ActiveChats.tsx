import React from "react";
import { useRouter } from "next/router";
import { Socket } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { requestUrl } from "../utils/hostUrl_requestUrl";
import axios from "axios";
import Avatar from "./Avatar";
import { InitialState2 } from "../redux/state";
import { BsThreeDots } from "react-icons/bs";
import ChatSettings from "../components/ChatSettings";
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
        return false;
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
    notMe.forEach((element, index) => {
      if (index == 2) return;
      getUserImage(element);
    });
    getUserImage(cookieName);
  }, []);

  React.useEffect(() => {
    members.forEach((element) => {
      dispatch({
        type: "SET_ROOM_MEMBERS",
        payload: element,
      });
    });
  }, [router.asPath]);

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
  };
  const chatSettings = () => {
    dispatch({
      type: "SET_CHAT_SETTINGS",
      payload: !state.setChatSettings,
    });
  };

  return (
    <div
      style={{
        whiteSpace: "nowrap",
        overflow: "hidden",
      }}
      onClick={() => {
        joinChat();
        dispatching();
      }}
      className={`contacts_container ${_id === chatId && "active_contact"} `}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <section
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Avatar
            members={members}
            image={image}
            images={images}
            hasAvatar={hasAvatar}
          />
          <div className="contacts_info">
            <p
              style={{
                margin: "0",
                color: "black",
                display: "flex",
              }}
            >
              {members.length > 2
                ? members.map((element, index) => {
                    if (index === 3) return;
                    return (
                      <p>
                        {element}
                        {element[members.length - 1] === element[index]
                          ? " ..."
                          : ","}
                      </p>
                    );
                  })
                : (members.length === 1 && <p>{user1}</p>) ||
                  (user2 === cookieName && <p>{user1}</p>) ||
                  (user1 === cookieName && <p>{user2}</p>)}
            </p>

            <p
              style={{ margin: "0", color: "#65676b" }}
              className="invite-userName"
            >
              Last message...
            </p>
          </div>
        </section>
        {_id === chatId && (
          <BsThreeDots className="chat_settings" onClick={chatSettings} />
        )}
      </div>
    </div>
  );
};
export default ActiveChats;
