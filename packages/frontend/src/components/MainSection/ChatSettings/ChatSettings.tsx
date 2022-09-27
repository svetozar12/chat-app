import { css, cx } from "@emotion/css";
import React from "react";
import { useRouter } from "next/router";
import { AiOutlineUserDelete, AiOutlinePlusCircle } from "react-icons/ai";
import generic from "utils/generic";
import { useSelector, useDispatch } from "react-redux";
// services
import { IInitialSet } from "services/redux/reducer/setReducer/state";
import api_helper from "services/graphql/api_helper";
import { useCookie } from "next-cookie";
import { IAuthState } from "services/redux/reducer/authReducer/state";
import { Flex, Heading, HStack, VStack } from "@chakra-ui/react";
import s from "./ChatSettings.module.css";
import useThemeColors from "hooks/useThemeColors";

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
      const redirect = await generic.getFirstChat(id, token);

      route.push(`/${redirect._id}`);
    }
  };

  const {
    colors: { color },
  } = useThemeColors();

  return (
    <>
      <VStack mt={5} gap={5} pos={"relative"} transition="ease" w="full" opacity={state.setChatSettings ? 1 : 0}>
        <Heading w="70%" color={color} textAlign="center" whiteSpace="nowrap" fontSize={{ base: "4vw", md: "2vw" }}>
          Members in chat
        </Heading>

        {users.map((item, index) => {
          return (
            <HStack color={color} justify="center" alignItems="center" key={index}>
              <Heading>{item}</Heading>
              <AiOutlineUserDelete
                onClick={() => {
                  deleteMember(item);
                  emitFriendRequest();
                  redirect(item);
                }}
                className={s.remove_user}
              />
            </HStack>
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
            <Flex>
              <AiOutlinePlusCircle
                className={css`
                  width: 2rem;
                  height: 2rem;
                `}
              />
            </Flex>
          </div>
        )}
      </VStack>
    </>
  );
}

export default ChatSettings;
