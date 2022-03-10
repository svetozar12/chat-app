import React from "react";
import { useRouter } from "next/router";
import { Socket } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "../Avatar";
import { InitialState2 } from "../../redux/state";
import { BsThreeDots } from "react-icons/bs";
import { css, cx } from "@emotion/css";
interface IActiveChats {
  _id: string;
  members: string[];
  cookieName: string;
  socketRef: Socket;
  chatId: string;
}

const ActiveChats = ({ _id, members, cookieName, socketRef, chatId }: IActiveChats) => {
  const router = useRouter();
  const [user1, user2] = [members[0], members[1]];
  const [inviter, setInviter] = React.useState<string>("");
  const dispatch = useDispatch();
  const state = useSelector((state: { setReducer: InitialState2 }) => state.setReducer);

  React.useEffect(() => {
    const notMe: string[] = members.filter((element) => element !== cookieName);
    setInviter(notMe[0]);
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
  };
  const chatSettings = () => {
    dispatch({
      type: "SET_CHAT_SETTINGS",
      payload: !state.setChatSettings,
    });
  };

  return (
    <div
      data-testid="chat"
      onClick={() => {
        joinChat();
        dispatching();
      }}
      className={cx(
        {
          [css`
            border-radius: 15px;
            background: rgba(122, 122, 122, 0.1);
          `]: _id === chatId,
        },
        css`
          color: var(--main-white);
          width: 97%;
          cursor: pointer;
          padding: 1rem 1rem;
          width: 100%;
          white-space: nowrap;
          transition: 0.2s;
          border-radius: 15px;
          white-space: nowrap;
          &:hover {
            border-radius: 15px;
            background: rgba(122, 122, 122, 0.1);
            transition: 0.2s;
          }
        `,
      )}
    >
      <div
        className={css`
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
        `}
      >
        <section
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Avatar members={members} inviter={inviter} cookieName={cookieName} />
          <div
            className={css`
              display: flex;
              flex-direction: column;
              align-items: flex-start;
              justify-content: center;
            `}
          >
            <div
              className={css`
                margin: 0;
                color: black;
                display: flex;
              `}
            >
              {members.length > 2
                ? members.map((element, index) => {
                    if (index === 3) return;
                    return (
                      <p style={{ margin: 0 }} key={index}>
                        {element}
                        {element[members.length - 1] === element[index] ? `${members.length > 3 ? "..." : ""}` : ","}
                      </p>
                    );
                  })
                : (members.length === 1 && <p style={{ margin: 0 }}>{user1}</p>) ||
                  (user2 === cookieName && <p style={{ margin: 0 }}>{user1}</p>) ||
                  (user1 === cookieName && <p style={{ margin: 0 }}>{user2}</p>)}
            </div>
            <p
              className={css`
                margin: 0;
                color: #65676b;
                justify-content: flex-start;
                align-items: center;
                margin: 1rem 0;
              `}
            >
              Last message...
            </p>
          </div>
        </section>
        {_id === chatId && (
          <BsThreeDots
            className={css`
              width: 2rem;
              height: 2rem;
              background: var(--main-white);
              color: var(--main-black);
              border-radius: 25px;
              box-shadow: 0 0 5px var(--main-black);
              &:hover {
                color: rgba(122, 122, 122, 1);
              }
            `}
            onClick={chatSettings}
          />
        )}
      </div>
    </div>
  );
};
export default ActiveChats;
