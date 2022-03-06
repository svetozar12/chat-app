import { css, cx } from "@emotion/css";
import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import MessageSettings from "./MessageSettings";
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
  const [styleBool, SetStyleBool] = React.useState(false);
  const [settings, SetSettings] = React.useState(false);

  const checkSettingsOpt = () => {
    return styleBool || settings;
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
      display: flex;
      visibility: ${checkSettingsOpt() ? "vissible" : "hidden"};
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
        SetStyleBool(false);
      }}
      onMouseOver={() => {
        SetStyleBool(true);
      }}
      className={cx(
        "flex",
        css`
          justify-content: ${name === sender ? "flex-end" : "flex-start"};
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
        <div
          className={cx(
            "flex",
            css`
              width: 100%;
              justify-content: ${name === sender ? "flex-end" : "flex-start"};
            `,
          )}
        >
          {name === sender && (
            <div
              className={css`
                position: relative;
              `}
            >
              {settings && <MessageSettings translateX="-60px" />}
              <div onClick={() => SetSettings(!settings)} className={optionsPadding}>
                <BsThreeDotsVertical className={dothStyle} />
              </div>
            </div>
          )}
          <div
            title={time_stamp.toString()}
            className={cx(
              css`
                word-wrap: break-word;
                text-align: center;
                min-width: 7rem;
                border-radius: 4px;
                max-width: 40%;
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
            <div
              className={css`
                position: relative;
              `}
            >
              {settings && <MessageSettings translateX="250px" />}
              <div onClick={() => SetSettings(!settings)} className={optionsPadding}>
                <BsThreeDotsVertical className={dothStyle} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RenderChat;
