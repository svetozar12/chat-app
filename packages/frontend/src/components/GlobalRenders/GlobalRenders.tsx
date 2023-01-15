import React, { FC } from 'react';
import { connect } from 'react-redux';
import Head from 'next/dist/shared/lib/head';
import { css } from '@emotion/css';
import { STATE } from 'services/redux/reducer';
import { bindActionCreators, Dispatch } from 'redux';
import { toggleFriendRequestAction, toggleInviteModal, toggleQuickLogin } from 'services/redux/reducer/toggles/actions';
import { Alerts } from 'services/chat-ui';
import { setAlert } from 'services/redux/reducer/alert/actions';

type IGlobals = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

const Globals: FC<IGlobals> = ({ alert, setAlert, toggle, toggleFriendRequestModal, toggleInviteModal, toggleQuickLogin }) => {
  const closeModals = () => {
    toggleFriendRequestModal(false);
    toggleInviteModal(false);
    toggleQuickLogin(false);
  };

  const Blur: boolean = toggle.toggleFriendReqModal || toggle.toggleInvideModal || toggle.toggleQuickLogin;

  return (
    <>
      <Head>
        <title>Chat What</title>
      </Head>
      {!!alert.message && (
        <Alerts
          chakraProps={{ zIndex: 999 }}
          message={alert.message}
          type={alert.type}
          closeAlert={() => {
            setAlert('', 'info');
          }}
        />
      )}
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
};

const mapStateToProps = (state: STATE) => ({
  toggle: state.toggle,
  alert: state.alert,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  toggleQuickLogin: bindActionCreators(toggleQuickLogin, dispatch),
  toggleInviteModal: bindActionCreators(toggleInviteModal, dispatch),
  toggleFriendRequestModal: bindActionCreators(toggleFriendRequestAction, dispatch),
  setAlert: bindActionCreators(setAlert, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Globals);
