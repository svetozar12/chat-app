import React from "react";
import { useSelector, useDispatch } from "react-redux";
import PendingChats from "./PendingChats/PendingChats";
import { IInitialSet } from "../../services/redux/reducer/setReducer/state";
import { Iinvites } from "../../pages/[acc]";
import { css } from "@emotion/css";
import { CloseButton, Divider, Flex, Heading, VStack } from "@chakra-ui/react";

interface INotifications {
  contacts: Iinvites[];
}

function Notifications({ contacts }: INotifications) {
  const state = useSelector((state: { setReducer: IInitialSet }) => state.setReducer);

  const dispatch = useDispatch();
  return (
    <VStack
      pos="fixed"
      zIndex={999}
      justifyContent="flex-start"
      w={{ base: "70%", md: "50%", lg: "40%", xl: "30%" }}
      bg="white"
      boxShadow="default"
      borderRadius="xl"
      p={2}
      overflow="hidden"
      top="50%"
      left="50%"
      transform="translate(-50%,-50%)"
    >
      <Flex alignItems="center" h="5rem" justifyItems="center" justifyContent="center">
        <Heading m="1rem">Notifications</Heading>
      </Flex>
      <Divider />
      <CloseButton
        size="lg"
        pos="absolute"
        right={0}
        top={0}
        m={5}
        mt="-0.5px !important"
        onClick={() => {
          dispatch({
            type: "SET_FRIEND_REQUEST",
            payload: !state.setFriendRequest,
          });
        }}
      />
      <div
        className={css`
          overflow-y: auto;
          width: 100%;
        `}
      >
        {contacts.length <= 0 ? (
          <Heading p={5} size="md" className="flex">
            You don&apos;t have invites !!!
          </Heading>
        ) : (
          contacts.map((item, index) => {
            return <PendingChats key={index} {...item} />;
          })
        )}
      </div>
    </VStack>
  );
}

export default Notifications;
