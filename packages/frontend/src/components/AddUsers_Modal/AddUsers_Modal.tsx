import React from 'react';
import { GrClose } from 'react-icons/gr';
import { css } from '@emotion/css';
import { connect } from 'react-redux';
import { STATE } from 'services/redux/reducer';
import { IWebSocket } from 'services/redux/reducer/websocket/state';
import { IToggle } from 'services/redux/reducer/toggles/state';
import { toggleInviteModal } from 'services/redux/reducer/toggles/actions';
import { bindActionCreators, Dispatch } from 'redux';
import { useCookie } from 'next-cookie';
import { useUpdateChatMutation } from 'services/generated';

interface IAddUserModal {
  users: string[];
  chatId: string;
  ws: IWebSocket;
  toggle: IToggle;
  toggleInviteModal: typeof toggleInviteModal;
  setUsers: React.Dispatch<React.SetStateAction<any[]>>;
}

function AddUserModal(props: IAddUserModal) {
  const { users, chatId, setUsers, toggleInviteModal, ws, toggle } = props;
  const cookie = useCookie();
  const [invited, setInvited] = React.useState<string[]>([]);
  const [updateChat] = useUpdateChatMutation();
  const addMembers = async (user: string[]) => {
    try {
      await updateChat({
        variables: {
          auth: { userId: cookie.get('id'), AccessToken: cookie.get('cookie') },
          chat_id: chatId,
          username: undefined,
          usersData: user,
        },
      });
    } catch (error) {
      return false;
    }
  };

  const handleSubmit = async () => {
    try {
      if (invited.length <= 0) return;
      await addMembers(invited);
      setUsers(users.filter((element) => !invited.includes(element)));
      ws.ws?.emit('inviting_multiple_users', { users: invited });
      setInvited([]);

      return true;
    } catch (error) {
      return false;
    }
  };

  return (
    <div
      className={css`
        position: fixed;
        flex-direction: column;
        display: flex;
        align-items: center;
        justify-content: !important start;
        z-index: 9999;
        width: 40%;
        background: var(--main-white);
        overflow: hidden;
        left: 0;
        right: 0;
        margin-left: auto;
        margin-right: auto;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
        border-radius: 5px;
        @media (min-width: 1010px) {
          width: 70%;
        }
      `}
    >
      <section style={{ position: 'relative', textAlign: 'center' }} className="modalHeading flex">
        <h1 style={{ padding: '0 25%' }}>Add people</h1>
        <div
          onClick={() => toggleInviteModal(!toggle.toggleInvideModal)}
          style={{ width: '3rem', height: '3rem' }}
          className="circleBorder absoluteTopRight flex"
        >
          <GrClose style={{ width: '2rem', height: '2rem' }} />
        </div>
      </section>
      <div className="flex" style={{ overflowY: 'auto', width: '100%', flexDirection: 'column' }}>
        {users.length === 0 && <h1>No Chat suggestions</h1>}
        {/* {users.map((item, index) => (
          <CheckBox key={index} invited={invited} setInvited={setInvited} item={item} />
        ))} */}
      </div>
      <div className="modalFooter flex">
        <button onClick={handleSubmit} className="button" type="submit">
          submit
        </button>
      </div>
    </div>
  );
}

const mapStateToProps = (state: STATE) => ({
  ws: state.ws,
  toggle: state.toggle,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  toggleInviteModal: bindActionCreators(toggleInviteModal, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddUserModal);
