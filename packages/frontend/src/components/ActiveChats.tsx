import React from "react";
import { useRouter } from "next/router";
import { Socket } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "./Avatar";
import { InitialState2 } from "../redux/state";
import { BsThreeDots } from "react-icons/bs";
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
  const [inviter, setInviter] = React.useState<string>("");
  const dispatch = useDispatch();
  const state = useSelector(
    (state: { setReducer: InitialState2 }) => state.setReducer,
  );

  React.useEffect(() => {
    const notMe: string[] = members.filter((element) => element !== cookieName);
    setInviter(notMe[0]);
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
          <Avatar members={members} inviter={inviter} cookieName={cookieName} />
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
                      <p key={index}>
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
