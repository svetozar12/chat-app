import { css, cx } from "@emotion/css";
import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import MessageSettings from "./MessageSettings";
import { useDispatch, useSelector } from "react-redux";
import { InitialStateMessage } from "../../../redux/state";

interface IRenderChat {
  id: string;
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

const RenderChat = ({ id, sender, time_stamp, cookie, message }: IRenderChat) => {
  const messageState = useSelector((state: { messageReducer: InitialStateMessage }) => state.messageReducer);
  const dispatch = useDispatch();
  const name = cookie;
  const [styleBool, setStyleBool] = React.useState(false);
  const [settings, setSettings] = React.useState(false);
  const [editing, setEditing] = React.useState(false);

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

  const ToggleSettings = () => {
    dispatch({ type: "SHOW_SETTINGS", payload: !messageState.show });
    if (settings === true) setEditing(false);
    setSettings(!messageState.show);
  };

  const handleEdit = (e: any) => {
    if (e.key === "Enter") {
      console.log("submited");
      setEditing(false);
    }
  };

  return (
    <div
      onMouseOut={() => {
        setStyleBool(false);
      }}
      onMouseOver={() => {
        setStyleBool(true);
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
              {settings && <MessageSettings setSettings={setSettings} setEditing={setEditing} id={id} translateX="-60px" />}
              <div onClick={ToggleSettings} className={optionsPadding}>
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
                min-height: 3rem;
                border-radius: 4px;
                max-width: 40%;
                padding: 0.5rem 1rem;
                overflow: hidden;
                word-wrap: break-word;
                background: ${name === sender ? "var(--main-blue)" : "var(--me-chat-buble)"};
              `,
              "flex",
            )}
          >
            <span className="flex">
              {editing ? (
                <input
                  onKeyDown={(e) => handleEdit(e)}
                  className={css`
                    background: transparent;
                    border: none;
                    padding: 0.2rem 0;
                    margin: 0.2rem 0;
                    max-width: 40%;
                    color: var(--main-white);
                    box-shadow: 0px 0px 5px var(--main-white);
                    text-align: center;
                    &:focus {
                      outline: none;
                    }
                  `}
                  type="text"
                  value={message}
                  autoFocus
                />
              ) : (
                message
              )}
            </span>
          </div>
          {name !== sender && (
            <div
              className={css`
                position: relative;
              `}
            >
              {settings && <MessageSettings setSettings={setSettings} setEditing={setEditing} id={id} translateX="250px" />}
              <div onClick={ToggleSettings} className={optionsPadding}>
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
