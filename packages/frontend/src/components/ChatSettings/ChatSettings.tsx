import { css, cx } from "@emotion/css";
import React from "react";
import { useRouter } from "next/router";
import { AiOutlineUserDelete, AiOutlinePlusCircle } from "react-icons/ai";
import { Socket } from "socket.io-client";
import { getFirstChat } from "../../utils/getFirstChat";
import { useSelector, useDispatch } from "react-redux";
// services
import { IInitialSet } from "../../services/redux/reducer/setReducer/state";
import api_helper from "../../services/graphql/api_helper";
import { useCookie } from "next-cookie";
import { IAuthState } from "../../services/redux/reducer/authReducer/state";

interface IChatSettings {
  chatId: string;
}

function ChatSettings({ chatId }: IChatSettings) {
  const state = useSelector((state: { setReducer: IInitialSet }) => state.setReducer);
  const authState = useSelector((state: { authReducer: IAuthState }) => state.authReducer);

  const [users, setUsers] = React.useState<string[]>([]);
  const dispatch = useDispatch();
  const route = useRouter();
  const cookie = useCookie();
  const id = cookie.get("id") as string;
  const token = cookie.get("token") as string;

  const emitFriendRequest = async () => {
    authState.ws?.emit("friend_request");
  };
  const getMembers = async () => {
    try {
      const res = await api_helper.chatroom.getById(chatId, id, token);
      const data = res.members;

      setUsers(data);
      return true;
    } catch (error) {
      return false;
    }
  };

  const deleteMember = async (user: string) => {
    try {
      await api_helper.chatroom.update(id, chatId, token, user);
      return true;
    } catch (error) {
      return false;
    }
  };

  React.useEffect(() => {
    setUsers([]);
    getMembers();
    authState.ws?.on("inviting_multiple_users", ({ users }) => {
      setUsers((prev) => [...prev, ...users]);
    });
  }, [route.asPath]);

  const redirect = async (user: string) => {
    const updated_users = users.filter((element) => element !== user);
    setUsers(updated_users);
    if (updated_users.length === 2) {
      const redirect = await getFirstChat(id, token);

      route.push(`/${redirect._id}`);
    }
  };
  return (
    <>
      <div
        className={cx(
          "flex",
          css`
            position: relative;
            bottom: 0;
            transition: 0.3s;
            opacity: ${state.setChatSettings ? "1" : "0"};
            width: 100%;
            z-index: 11;
            height: 80vh;
            background: var(--main-white);
            border-left: 1px solid rgba(0, 0, 0, 0.1);
            flex-direction: column;
            justify-content: flex-start;
            overflow-x: hidden;
          `,
        )}
      >
        <h1
          className={css`
            color: var(--main-black);
            justify-content: center;
            white-space: nowrap;
            padding: 0 0.5rem;
            width: 70%;
            display: flex;
            justify-content: center;
            @media (max-width: 1000px) {
              font-size: 4vw;
            }
          `}
        >
          Members in chat
        </h1>

        {users.map((item, index) => {
          return (
            <div
              key={index}
              className={cx(
                "flex",
                css`
                  justify-content: space-between;
                `,
              )}
            >
              <h2
                className={cx(
                  "flex",
                  css`
                    flex-direction: column;
                    color: var(--main-black);
                    white-space: nowrap;
                  `,
                )}
              >
                {item}
              </h2>
              <AiOutlineUserDelete
                onClick={() => {
                  deleteMember(item);
                  emitFriendRequest();
                  redirect(item);
                }}
                className={css`
                  width: 2rem;
                  height: 2rem;
                  cursor: pointer;
                  &:hover {
                    color: red;
                  }
                `}
              />
            </div>
          );
        })}
        {users.length > 2 && (
          <div
            onClick={() => {
              dispatch({
                type: "SET_MODAL_INVITE",
                payload: !state.setModalInvite,
              });
            }}
            className={cx(
              "flex",
              css`
                position: relative;
                z-index: 101;
                width: 2rem;
                height: 2rem;
                cursor: pointer;
                padding: 2rem 0.5rem;
                border-radius: 5px;
                justify-content: space-between;
                width: 70%;
                height: 2rem;
                whitespace: nowrap;
                &:hover {
                  background: rgba(0, 0, 0, 0.1);
                }
              `,
            )}
          >
            <h2
              className={css`
                color: var(--main-black);
                margin: 0;
                @media (max-width: 1344px) {
                  font-size: 1.5vw;
                  word-break: keep-all;
                }
              `}
            >
              Add more users
            </h2>
            <div className="flex">
              <AiOutlinePlusCircle
                className={css`
                  width: 2rem;
                  height: 2rem;
                `}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ChatSettings;
