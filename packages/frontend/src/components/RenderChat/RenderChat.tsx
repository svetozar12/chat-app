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
  const [styleBool, SetStyleBool] = React.useState(true);
  const [settings, SetSettings] = React.useState(false);

  const conditionalReturn = () => {
    if (styleBool) return "flex";
    else if (settings) return "flex";
    else return "none";
  };

  const optionsPadding = cx(
    css`
      position: relative;
      margin: 0 0.5rem;
      border-radius: 100%;
      width: 2.5rem;
      height: 2.5rem;
      cursor: pointer;
      color: var(--main-black);
      display: ${conditionalReturn()};
      &:hover {
        background: rgba(0, 0, 0, 0.1);
      }
      &:active {
        border: 1px solid rgba(0, 0, 255, 0.2);
      }
    `,
    "flex",
  );

  const dothStyle = css`
    width: 1.5rem;
    height: 1.5rem;
  `;

  return (
    <div
      onMouseOut={() => {
        SetStyleBool(true);
      }}
      onMouseOver={() => {
        SetStyleBool(false);
      }}
      title={`${time_stamp.toString()} ${message}`}
      className={cx(
        "flex",
        css`
          width: 100%;
        `,
        { [mineMessages]: name === sender },
        { [otherMessages]: name !== sender },
      )}
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
        <div className="flex">
          {name === sender && (
            <div className={optionsPadding}>
              {settings && (
                <div
                  className={css`
                    position: absolute;
                    top: 0;
                  `}
                >
                  MessageSettings
                </div>
              )}
              <BsThreeDotsVertical onClick={() => SetSettings(!settings)} className={dothStyle} />
            </div>
          )}
          <div
            className={cx(
              css`
                word-wrap: break-word;
                text-align: center;
                min-width: 7rem;
                border-radius: 4px;
                max-width: 80%;
                width: 7rem;
                padding: 0.5rem 1rem;
                overflow: hidden;
                word-wrap: break-word;
                background: ${name === sender ? "var(--main-blue)" : "var(--me-chat-buble)"};
              `,
            )}
          >
            <span>{message}</span>
          </div>
          {name !== sender && (
            <div className={optionsPadding}>
              {settings && (
                <div
                  className={css`
                    position: absolute;
                    top: 0;
                  `}
                >
                  MessageSettings
                </div>
              )}
              <BsThreeDotsVertical onClick={() => SetSettings(!settings)} className={dothStyle} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RenderChat;
