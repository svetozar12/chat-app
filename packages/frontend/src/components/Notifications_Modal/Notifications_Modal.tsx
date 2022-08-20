import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { css } from '@emotion/css';
import { CloseButton, Divider, Flex, Heading, ScaleFade } from '@chakra-ui/react';
import PendingChats from './PendingChats/PendingChats';
import { IInitialSet } from '../../services/redux/reducer/setReducer/state';
import { Iinvites } from '../../pages/[acc]';
import s from './Notifications_Modal.module.css';
import useThemeColors from '../../hooks/useThemeColors';

interface INotifications {
  contacts: Iinvites[];
}

function Notifications({ contacts }: INotifications) {
  const state = useSelector((state: { setReducer: IInitialSet }) => state.setReducer);
  const {
    colors: { fromBg },
  } = useThemeColors();
  const dispatch = useDispatch();

  const modalVariant = {
    hide: {
      scale: 0.8,
    },
    show: {
      y: '-50%',
      x: '-50%',
      scale: 1,
    },
    exit: {
      scale: 0.8,
    },
  };

  return (
    <ScaleFade style={{ background: fromBg }} className={s.box} variants={modalVariant} initial="hide" animate="show" exit="exit">
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
            type: 'SET_FRIEND_REQUEST',
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
          contacts.map((item, index) => <PendingChats key={index} {...item} />)
        )}
      </div>
    </ScaleFade>
  );
}

export default Notifications;
