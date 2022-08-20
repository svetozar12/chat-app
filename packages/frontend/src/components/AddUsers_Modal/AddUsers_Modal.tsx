import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GrClose } from 'react-icons/gr';
import axios from 'axios';
import { css } from '@emotion/css';
import { IInitialSet } from '../../services/redux/reducer/setReducer/state';
import CheckBox from '../../services/chat-ui/CheckBox';
import { constants } from '../../constants';
import { IAuthState } from '../../services/redux/reducer/authReducer/state';

interface IAddUserModal {
  users: string[];
  chatId: string;
  setUsers: React.Dispatch<React.SetStateAction<any[]>>;
}

function AddUserModal({ users, chatId, setUsers }: IAddUserModal) {
  const authState = useSelector((state: { authReducer: IAuthState }) => state.authReducer);
  const state = useSelector((state: { setReducer: IInitialSet }) => state.setReducer);
  const [invited, setInvited] = React.useState<string[]>([]);
  const dispatch = useDispatch();
  const addMembers = async (user: string[]) => {
    try {
      await axios.put(`${constants.GRAPHQL_URL}/chat-room/${chatId}`, {
        usernames: user,
      });
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleSubmit = async () => {
    try {
      if (invited.length <= 0) return;
      await addMembers(invited);
      setUsers(users.filter((element) => !invited.includes(element)));
      authState.ws?.emit('inviting_multiple_users', { users: invited });
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
          onClick={() => {
            dispatch({
              type: 'SET_MODAL_INVITE',
              payload: !state.setModalInvite,
            });
          }}
          style={{ width: '3rem', height: '3rem' }}
          className="circleBorder absoluteTopRight flex"
        >
          <GrClose style={{ width: '2rem', height: '2rem' }} />
        </div>
      </section>
      <div className="flex" style={{ overflowY: 'auto', width: '100%', flexDirection: 'column' }}>
        {users.length === 0 && <h1>No Chat suggestions</h1>}
        {users.map((item, index) => (
          <CheckBox key={index} invited={invited} setInvited={setInvited} item={item} />
        ))}
      </div>
      <div className="modalFooter flex">
        <button onClick={handleSubmit} className="button" type="submit">
          submit
        </button>
      </div>
    </div>
  );
}

export default AddUserModal;
