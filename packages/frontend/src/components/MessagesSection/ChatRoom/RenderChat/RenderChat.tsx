import { css, cx } from "@emotion/css";
import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
// components
import MessageSettings from "./MessageSettings";
import { IchatInstance } from "../ChatRoom";
// services
import { InitialStateMessage } from "services/redux/reducer/messageReducer/state";
import api_helper from "services/graphql/api_helper";
import { useCookie } from "next-cookie";
import { Heading, HStack, useColorModeValue, VStack } from "@chakra-ui/react";

interface IRenderChat {
  id: string;
  sender: string;
  time_stamp: string | number;
  message: string;
  chatId: string;
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

const RenderChat = ({ id, sender, time_stamp, message }: IRenderChat) => {
  const messageState = useSelector((state: { messageReducer: InitialStateMessage }) => state.messageReducer);
  const dispatch = useDispatch();
  const cookie = useCookie();
  const [styleBool, setStyleBool] = React.useState(false);
  const [settings, setSettings] = React.useState(false);
  const [editing, setEditing] = React.useState(false);
  const [editedMessage, setEditedMessage] = React.useState("");
  const [width, setWidth] = React.useState(112);
  const [height, setHeight] = React.useState(48);
  const inputRef = React.useRef<HTMLDivElement>(null);

  const name = cookie.get("name");
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

  const handleEdit = async (e: any) => {
    const target = e.target as HTMLTextAreaElement;
    e.target.style.height = "15px";
    e.target.style.height = `${target.scrollHeight}px`;
    e.target.style.height = `${Math.min(e.target.scrollHeight, 60)}px`;
    if (e.key === "Enter") {
      const messageArr: IchatInstance[] = [];
      for (const obj of messageState.messages) {
        if (obj._id === id) {
          obj.message = editedMessage;
          await api_helper.message.update(cookie.get("id"), id, editedMessage, cookie.get("token"));
          dispatch({ type: "RESET_MESSAGES" });
        }
        messageArr.push(obj);
      }
      messageArr.forEach((element) => {
        dispatch({ type: "MESSAGES", payload: element });
      });
      setEditing(false);
    }
  };

  React.useEffect(() => {
    setEditedMessage(message);
    if (inputRef.current) {
      setWidth(inputRef.current.offsetWidth);
      setHeight(inputRef.current.offsetHeight);
    }
  }, []);

  const chat_bg = useColorModeValue("off_black", "#2c323d");
  const from_bg = useColorModeValue("white", "#3F3D3C");
  const color = useColorModeValue("black", "white");

  return (
    <HStack
      gap={5}
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
      <Heading
        color={color}
        fontSize="lg"
        className={css`
          justify-content: ${name === sender ? "flex-end" : "flex-start"};
          font-size: 15px;
        `}
      >
        {name === sender ? null : sender}
      </Heading>
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
          <VStack
            wordBreak="break-word"
            textAlign="center"
            minW="10rem"
            minH="3rem"
            overflow="hidden"
            color={color}
            bg={name === sender ? "#2c323d" : chat_bg}
            ref={inputRef}
            title={time_stamp.toString()}
          >
            {editing ? (
              <textarea
                className={css`
                  resize: none;
                  border: none;
                  text-align: center;
                  color: var(--main-white);
                  background: rgba(0, 0, 0, 0.3);
                  border-radius: 4px;
                  width: ${width}px;
                  height: ${height}px;
                  padding: 1rem 0.5rem;
                `}
                autoFocus
                autoCorrect="off"
                onChange={(e) => setEditedMessage(e.target.value)}
                onKeyDown={(e) => handleEdit(e)}
              >
                {editedMessage}
              </textarea>
            ) : (
              <span
                className={cx(
                  "flex",
                  css`
                    padding: 1rem 0.5rem;
                  `,
                )}
              >
                {message}
              </span>
            )}
          </VStack>
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
    </HStack>
  );
};

export default React.memo(RenderChat);
