import React from 'react';
import { connect } from 'react-redux';
import Head from 'next/dist/shared/lib/head';
import { css } from '@emotion/css';
import { useColorMode } from '@chakra-ui/react';
import { STATE } from 'services/redux/reducer';
import { bindActionCreators, Dispatch } from 'redux';
import { IToggle } from 'services/redux/reducer/toggles/state';
import { toggleFriendRequestAction, toggleInviteModal, toggleQuickLogin } from 'services/redux/reducer/toggles/actions';

interface IGlobals {
  toggle: IToggle;
  toggleQuickLogin: typeof toggleQuickLogin;
  toggleFriendRequestModal: typeof toggleFriendRequestAction;
  toggleInviteModal: typeof toggleInviteModal;
}

function Globals(props: IGlobals) {
  const { toggle, toggleQuickLogin, toggleFriendRequestModal, toggleInviteModal } = props;
  const closeModals = () => {
    toggleFriendRequestModal(false);
    toggleInviteModal(false);
    toggleQuickLogin(false);
  };

  const { colorMode } = useColorMode();

  const Blur: boolean = toggle.toggleFriendReqModal || toggle.toggleInvideModal || toggle.toggleQuickLogin;
  // styles={{
  //         body: {
  //           margin: 0,
  //           padding: 0,
  //           userSelect: Blur ? 'none' : 'select',
  //         },
  //         a: {
  //           textDecoration: 'none',
  //         },
  //       }}
  return (
    <>
      <Head>
        <title>Chat What</title>
      </Head>
      <div
        className={css`
          position: absolute;
          z-index: ${Blur ? '101' : '-1'};
          width: 100vw;
          height: 100vh;
          opacity: 0.7;
        `}
        onClick={closeModals}
      />
    </>
  );
}

const mapStateToProps = (state: STATE) => ({
  toggle: state.toggle,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  toggleQuickLogin: bindActionCreators(toggleQuickLogin, dispatch),
  toggleInviteModal: bindActionCreators(toggleInviteModal, dispatch),
  toggleFriendRequestModal: bindActionCreators(toggleFriendRequestAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Globals);
