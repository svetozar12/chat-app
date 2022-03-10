import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { GrClose } from "react-icons/gr";
import { Socket } from "socket.io-client";
import PendingChats from "./PendingChats/PendingChats";
import { InitialState2 } from "../../redux/state";
import { Iinvites } from "../../pages/[acc]";
import { css, cx } from "@emotion/css";
function Notifications({
  contacts,
  socketRef,
}: {
  contacts: Iinvites[];
  socketRef: Socket | any;
  setLocalStatus: React.Dispatch<React.SetStateAction<string>>;
}) {
  const state = useSelector((state: { setReducer: InitialState2 }) => state.setReducer);

  const dispatch = useDispatch();
  const checkSize = contacts.filter((element) => element.status != "accepted");

  return (
    <div
      className={css`
        position: fixed;
        flex-direction: column;
        display: flex;
        align-items: center;
        justify-content: !important start;
        z-index: 9999;
        width: 40%;
        background: var(--main-white);
        overflow: hidden;
        left: 0;
        right: 0;
        margin-left: auto;
        margin-right: auto;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
        border-radius: 5px;
        @media (min-width: 1010px) {
          width: 70%;
        }
      `}
    >
      <section
        className={cx(
          "modal_heading flex",
          css`
            position: relative;
            text-align: center;
          `,
        )}
      >
        <h1
          className={css`
            padding: 0 25%;
          `}
        >
          Notifications
        </h1>
        <div
          onClick={() => {
            dispatch({
              type: "SET_FRIEND_REQUEST",
              payload: !state.setFriendRequest,
            });
          }}
          className={cx(
            "circle_border absolute_top_right flex",
            css`
              width: 3rem;
              height: 3rem;
              margin: 0 1rem;
            `,
          )}
        >
          <GrClose
            className={css`
              width: 2rem;
              height: 2rem;
            `}
          />
        </div>
      </section>
      <div
        className={css`
          overflow-y: auto;
          width: 100%;
        `}
      >
        {checkSize.length === 0 && <h1 className="flex">No Chat suggestions</h1>}
        {contacts.map((item, index) => {
          return socketRef && <PendingChats key={index} socketRef={socketRef} {...item} />;
        })}
      </div>
    </div>
  );
}

export default Notifications;
