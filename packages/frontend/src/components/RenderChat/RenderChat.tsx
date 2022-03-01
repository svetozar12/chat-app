import { css, cx } from "@emotion/css";
import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
interface IRenderChat {
  sender: string;
  time_stamp: string | number;
  message: string;
  chatId: string;
  cookie: string;
}

const mineMessages = css`
  align-items: flex-end;
  justify-content: center;
  color: var(--main-white);
  flex-direction: column;
`;

const otherMessages = css`
  align-items: flex-start;
  justify-content: center;
  color: var(--main-black);
  flex-direction: column;
`;

const RenderChat = ({ sender, time_stamp, message, cookie }: IRenderChat) => {
  const name = cookie;
  return (
    <div
      title={`${time_stamp.toString()} ${message}`}
      className={cx("flex", { [mineMessages]: name === sender }, { [otherMessages]: name !== sender })}
    >
      <h2
        className={css`
          font-size: 15px;
          color: var(--main-black);
        `}
      >
        {name === sender ? null : sender}
      </h2>
      <div
        className={cx(
          "flex",
          css`
            width: 100%;
            justify-content: ${name === sender ? "flex-end" : "flex-start"};
          `,
        )}
      >
        <BsThreeDotsVertical
          className={css`
            color: black;
          `}
        />
        <div
          className={css`
            border-radius: 4px;
            max-width: 80%;
            padding: 0.5rem 1rem;
            overflow: hidden;
            word-wrap: break-word;
            background: ${name === sender ? "var(--main-blue)" : "var(--me-chat-buble)"};
          `}
        >
          <div
            className={css`
              word-wrap: break-word;
              text-align: center;
              min-width: 7rem;
            `}
          >
            <span>{message}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RenderChat;
