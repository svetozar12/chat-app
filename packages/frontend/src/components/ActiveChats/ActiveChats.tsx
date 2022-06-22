import React from "react";
import { useRouter } from "next/router";
import { Socket } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "../Avatar";
import { IInitialSet } from "../../services/redux/reducer/setReducer/state";
import { BsThreeDots } from "react-icons/bs";
import { css, cx } from "@emotion/css";
import api_helper from "../../services/graphql/api_helper";
import { useCookie } from "next-cookie";
import { IAuthState } from "../../services/redux/reducer/authReducer/state";
import { Heading, HStack, VStack } from "@chakra-ui/react";
interface IActiveChats {
  _id: string;
  members: string[];
  chatId: string;
}

const ActiveChats = ({ _id, members, chatId }: IActiveChats) => {
  const router = useRouter();

  const dispatch = useDispatch();
  const state = useSelector((state: { setReducer: IInitialSet }) => state.setReducer);
  const authState = useSelector((state: { authReducer: IAuthState }) => state.authReducer);
  const [inviter, setInviter] = React.useState<string>("");
  const cookie = useCookie();

  const cookieName = cookie.get("name") as string;
  const user1 = members[0];
  const user2 = members[1];

  const joinChat = () => {
    authState.ws?.emit("join_chat", {
      rooms: [cookieName, chatId],
    });
    router.push(`${_id}`);
  };

  React.useEffect(() => {
    joinChat();
    const notMe: string[] = members.filter((element) => element !== cookieName);
    setInviter(notMe[0]);
  }, []);

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
    <HStack
      w="full"
      color="var(--main-white)"
      cursor="pointer"
      p="2rem"
      ml="2rem"
      whiteSpace="nowrap"
      transition="0.2s"
      borderRadius="2xl"
      _hover={{ borderRadius: "15px", background: " rgba(122, 122, 122, 0.1)", transition: "0.2s" }}
      data-testid="chat"
      onClick={() => {
        joinChat();
        dispatching();
      }}
      className={cx({
        [css`
          border-radius: 15px;
          background: rgba(122, 122, 122, 0.1);
        `]: _id === chatId,
      })}
    >
      <div
        className={css`
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
        `}
      >
        <HStack>
          <Avatar members={members} inviter={inviter} cookieName={cookieName} />
          <VStack align="flex-start">
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
                      <Heading size="md" style={{ margin: 0 }} key={index}>
                        {element}
                        {element[members.length - 1] === element[index] ? `${members.length > 3 ? "..." : ""}` : ","}
                      </Heading>
                    );
                  })
                : (members.length === 1 && (
                    <Heading size="md" m={0}>
                      {user1}
                    </Heading>
                  )) ||
                  (user2 === cookieName && (
                    <Heading size="md" m={0}>
                      {user1}
                    </Heading>
                  )) ||
                  (user1 === cookieName && (
                    <Heading size="md" m={0}>
                      {user2}
                    </Heading>
                  ))}
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
          </VStack>
        </HStack>
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
    </HStack>
  );
};
export default ActiveChats;
