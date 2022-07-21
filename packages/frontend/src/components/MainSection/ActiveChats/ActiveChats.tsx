import React from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "components/Avatar";
import { IInitialSet } from "services/redux/reducer/setReducer/state";
import { BsThreeDots } from "react-icons/bs";
import { css, cx } from "@emotion/css";
import { IAuthState } from "services/redux/reducer/authReducer/state";
import { useCookie } from "next-cookie";
import { Heading, HStack, IconButton, VStack } from "@chakra-ui/react";
import useThemeColors from "hooks/useThemeColors";

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
  const {
    colors: { color },
  } = useThemeColors();

  return (
    <HStack
      w="full"
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
                      <Heading color={color} size="md" style={{ margin: 0 }} key={index}>
                        {element}
                        {element[members.length - 1] === element[index] ? `${members.length > 3 ? "..." : ""}` : ","}
                      </Heading>
                    );
                  })
                : (members.length === 1 && (
                    <Heading color={color} size="md" m={0}>
                      {user1}
                    </Heading>
                  )) ||
                  (user2 === cookieName && (
                    <Heading color={color} size="md" m={0}>
                      {user1}
                    </Heading>
                  )) ||
                  (user1 === cookieName && (
                    <Heading color={color} size="md" m={0}>
                      {user2}
                    </Heading>
                  ))}
            </div>
            <p
              className={css`
                margin: 0;
                color: ${color};
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
          <IconButton
            borderRadius="full"
            aria-label=""
            boxShadow="box-shadow: 0 0 5px main_black"
            icon={
              <BsThreeDots
                className={css`
                  width: 2rem;
                  height: 2rem;
                  color: ${color};
                `}
                onClick={chatSettings}
              />
            }
          ></IconButton>
        )}
      </div>
    </HStack>
  );
};
export default ActiveChats;
