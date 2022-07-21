import React from "react";
import { useSelector, useDispatch } from "react-redux";
import PendingChats from "./PendingChats/PendingChats";
import { IInitialSet } from "../../services/redux/reducer/setReducer/state";
import { Iinvites } from "../../pages/[acc]";
import { css } from "@emotion/css";
import { CloseButton, Divider, Flex, Heading, ScaleFade, useColorModeValue } from "@chakra-ui/react";
import s from "./Notifications_Modal.module.css";

interface INotifications {
  contacts: Iinvites[];
}

function Notifications({ contacts }: INotifications) {
  const state = useSelector((state: { setReducer: IInitialSet }) => state.setReducer);

  const from_bg = useColorModeValue("white", "#1c2330");
  const dispatch = useDispatch();

  const modalVariant = {
    hide: {
      scale: 0.8,
    },
    show: {
      y: "-50%",
      x: "-50%",
      scale: 1,
    },
    exit: {
      scale: 0.8,
    },
  };

  return (
    <ScaleFade style={{ background: from_bg }} className={s.box} variants={modalVariant} initial="hide" animate="show" exit="exit">
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
    </ScaleFade>
  );
}

export default Notifications;
