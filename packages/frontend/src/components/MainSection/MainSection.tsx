import React from "react";
import ActiveChats from "../ActiveChats";
import FindFriends from "../FindFriends";
import ChatSettings from "../ChatSettings";
import { css, cx } from "@emotion/css";
import { GrClose } from "react-icons/gr";
import { Ichats } from "../../pages/[acc]";
import { useSelector, useDispatch } from "react-redux";
import { IInitialSet } from "../../redux/reducer/setReducer/state";
import { Socket } from "socket.io-client";
import { Cookie } from "next-cookie";

interface IMainSection {
  socketRef: Socket | null;
  cookie: Cookie;
  chatId: string;
  chatRooms: Ichats[];
}

const MainSection = ({ socketRef, chatRooms, cookie, chatId }: IMainSection) => {
  const dispatch = useDispatch();
  const state = useSelector((state: { setReducer: IInitialSet }) => state.setReducer);

  return (
    <section
      title="main_section"
      className={css`
        position: relative;
        transition-timing-function: ease-out;
        transition: 0.6s ease-out;
        background: var(--main-white);
        color: var(--main-whitre);
        border-right: 1px solid rgba(0, 0, 0, 0.1);
        text-align: center;
        overflow: hidden;
        height: 100vh;
        z-index: 20;
        width: 29%;
        flex-direction: column;
        justify-content: flex-start;
        flex-shrink: unset;
        display: flex;
        align-items: center;
        @media (max-width: 1008px) {
          ${!state.setMobileNav ? "width:0" : "width:100%"};
          position: absolute;
        }
      `}
    >
      {socketRef && <FindFriends cookie={cookie} cookieName={cookie.get("name")} socketRef={socketRef} />}
      <div
        className="flex "
        style={{
          overflow: "auto",
          width: "95%",
          height: "100%",
          flexDirection: "column",
          justifyContent: "flex-start",
        }}
      >
        <div
          className={cx(
            "flex",
            css`
              top: 0;
              left: 0;
              position: absolute;
              z-index: 11;
              width: 0;
              height: 88vh;
              background: var(--main-white);
              padding: 1rem;
              transition: 0.4s;
              align-items: flex-start;
              padding: 0;
              flex-direction: column;
              justify-content: flex-start;
              width: ${state.setChatSettings ? "100%" : "0"};
              height: 100vh;
            `,
            {
              ["chat-settings-open"]: state.setChatSettings,
            },
          )}
        >
          <div
            className={cx(
              "flex",
              css`
                justifycontent: flex-end;
                position: absolute;
                width: 95%;
                margin: 1rem;
                padding: 0 1rem;
              `,
            )}
          >
            <GrClose
              className={cx(css`
                width: 2rem;
                height: 2rem;
                cursor: pointer;
                right: 0;
                margin-top: 2.5rem;
                position: absolute;
                z-index: 9999;
                transition: 0.3s;
                opacity: ${state.setChatSettings ? "1" : "0"};
              `)}
              onClick={() =>
                dispatch({
                  type: "SET_CHAT_SETTINGS",
                  payload: !state.setChatSettings,
                })
              }
            />
          </div>

          {socketRef && <ChatSettings socketRef={socketRef} chatId={chatId} cookieName={cookie.get("name")} />}
        </div>

        {socketRef &&
          chatRooms.map((item, index) => {
            return <ActiveChats key={index} {...item} cookieName={cookie.get("name")} socketRef={socketRef} chatId={chatId} />;
          })}
      </div>
    </section>
  );
};

export default MainSection;
