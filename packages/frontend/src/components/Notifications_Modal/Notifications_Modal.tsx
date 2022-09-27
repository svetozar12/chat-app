import React from 'react';
import { css } from '@emotion/css';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import s from './Notifications_Modal.module.css';
import useThemeColors from '../../hooks/useThemeColors';
// components
import { CloseButton, Divider, Flex, Heading, ScaleFade } from '@chakra-ui/react';
import PendingChats from './PendingChats/PendingChats';
import { Iinvites } from '../../pages/[acc]';
// services
import { STATE } from 'services/redux/reducer';
import { toggleFriendRequestAction } from 'services/redux/reducer/toggles/actions';
import { IToggle } from 'services/redux/reducer/toggles/state';

interface INotifications {
  contacts: Iinvites[];
  toggle: IToggle;
  toggleFriendRequest: typeof toggleFriendRequestAction;
}

function Notifications(props: INotifications) {
  const { contacts, toggle, toggleFriendRequest } = props;
  const {
    base: {
      form: { background },
    },
  } = useThemeColors();

  const modalVariant = {
    hide: {
      scale: 0.8,
      y: '-50%',
      x: '-50%',
    },
    show: {
      scale: 1,
    },
  };

  return (
    <ScaleFade style={{ background }} className={s.box} variants={modalVariant} initial="hide" animate="show">
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
          toggleFriendRequest(!toggle.toggleFriendReqModal);
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

const mapStateToProps = (state: STATE) => ({
  toggle: state.toggle,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  toggleFriendRequest: bindActionCreators(toggleFriendRequestAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
