import React from "react";
import { useRouter } from "next/router";
import { Socket } from "socket.io-client";

import { requestUrl } from "../utils/hostUrl_requestUrl";
import axios from "axios";
import Avatar from "./Avatar";
interface IActiveChats {
  _id: string;
  members: string[];
  cookieName: string;
  socketRef: Socket;
}

const ActiveChats = ({ _id, members, cookieName, socketRef }: IActiveChats) => {
  const router = useRouter();
  const [user1, user2] = [members[0], members[1]];
  const [image, setImage] = React.useState<string>("");
  const [images, setImages] = React.useState<string[]>([]);
  const [hasAvatar, setHasAvatar] = React.useState<boolean>(false);

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
      console.log(requestString, "hello");

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
      console.log(images[index], index);
    });
    getUserImage(me);
  }, []);

  const joinChat = () => {
    socketRef?.emit("join_chat", {
      chat_id: cookieName,
    });
    router.push(`${_id}`);
  };

  return (
    <div onClick={joinChat} className="contacts_container">
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
            <span>
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
                : (members.length === 1 && <p>{user1}</p>) ||
                  (user2 === cookieName && <p>{user1}</p>) ||
                  (user1 === cookieName && <p>{user2}</p>)}
            </span>
          </h2>
          <h5>Last message...</h5>
        </div>
      </div>
    </div>
  );
};
export default ActiveChats;
