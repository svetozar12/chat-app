/* eslint-disable no-unused-vars */
import React from "react";
// components
import ActiveChats from "./ActiveChats";
import FindFriends from "./FindFriends";
import ChatSettings from "./ChatSettings";
// other
import { css, cx } from "@emotion/css";
import { GrClose } from "react-icons/gr";
import { Ichats } from "pages/[acc]";
import { useSelector, useDispatch } from "react-redux";
import { useAuth } from "utils/SessionProvider";
import { IInitialSet } from "services/redux/reducer/setReducer/state";
import SkeletonActiveInvites from "components/Loading/SkeletonActiveInvites";
import { Flex, useColorModeValue, VStack } from "@chakra-ui/react";

interface IMainSection {
  chatId: string;
  chatRooms: Ichats[];
}

const MainSection = ({ chatRooms, chatId }: IMainSection) => {
  const dispatch = useDispatch();
  const state = useSelector((state: { setReducer: IInitialSet }) => state.setReducer);
  const { user } = useAuth();

  const chat_bg = useColorModeValue("main_white", "main_black");
  const from_bg = useColorModeValue("white", "#3F3D3C");
  const color = useColorModeValue("#B1BAC5", "white");

  return (
    <VStack
      mr="-0.5rem !important"
      ml="-0.5rem !important"
      w={{ base: !state.setMobileNav ? 0 : "102%", xl: "50%", "2xl": "40%" }}
      h="100vh"
      pos={{ base: "absolute", lg: "relative" }}
      bg={chat_bg}
      transitionTimingFunction="ease-out"
      transition="0.6s ease-out"
      borderRight="1px solid rgba(0, 0, 0, 0.1)"
      textAlign="center"
      overflow="hidden"
      zIndex="20"
      align="center"
      justifyItems="center"
      title="main_section"
    >
      <FindFriends />
      {user ? (
        <VStack overflow="auto" w="94%" h="100vh">
          <VStack
            w={state.setChatSettings ? "100%" : 0}
            h="100vh"
            top={0}
            left={0}
            transition="0.34s"
            pos="absolute"
            zIndex={11}
            bg="var(--main-white)"
            p={0}
          >
            <Flex ml="2rem" align="center" pos="absolute" w="95%" m="1rem" px="1rem">
              <GrClose
                className={cx(css`
                  width: 2rem;
                  height: 2rem;
                  cursor: pointer;
                  right: 0;
                  margin-top: 2.5rem;
                  position: absolute;
                  z-index: 9999;
                  transition: 0.3s;
                  opacity: ${state.setChatSettings ? "1" : "0"};
                `)}
                onClick={() =>
                  dispatch({
                    type: "SET_CHAT_SETTINGS",
                    payload: !state.setChatSettings,
                  })
                }
              />
            </Flex>
            <ChatSettings chatId={chatId} />
          </VStack>

          {chatRooms.map((item, index) => {
            return <ActiveChats key={index} {...item} chatId={chatId} />;
          })}
        </VStack>
      ) : (
        <SkeletonActiveInvites />
      )}
    </VStack>
  );
};

export default MainSection;
