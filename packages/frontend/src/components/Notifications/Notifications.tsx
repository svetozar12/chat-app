import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
// components
import { Heading } from '@chakra-ui/react';
import PendingChats from './PendingChats/PendingChats';
import { Iinvites } from '../../pages/[acc]';
// services
import { STATE } from 'services/redux/reducer';
import { toggleFriendRequestAction } from 'services/redux/reducer/toggles/actions';
import { IToggle } from 'services/redux/reducer/toggles/state';
import { Modal } from 'services/chat-ui';
import { Status } from 'services/generated';

interface INotifications {
  contacts: Iinvites[];
  toggle: IToggle;
  isLoading?: boolean;
  toggleFriendRequest: typeof toggleFriendRequestAction;
}

function Notifications(props: INotifications) {
  const { contacts, toggle, isLoading = false, toggleFriendRequest } = props;
  const filterInvites = contacts.filter(({ status }) => status === Status.Recieved);

  return (
    <Modal
      isLoading={isLoading}
      heading={contacts.length ? 'Invites' : "You don't have invites !!!"}
      closeModal={() => toggleFriendRequest(!toggle.toggleFriendReqModal)}
    >
      {filterInvites.length <= 0 ? (
        <Heading p={5} size="md" className="flex">
          You don&apos;t have invites !!!
        </Heading>
      ) : (
        filterInvites.map((item, index) => <PendingChats key={index} {...item} />)
      )}
    </Modal>
  );
}

const mapStateToProps = (state: STATE) => ({
  toggle: state.toggle,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  toggleFriendRequest: bindActionCreators(toggleFriendRequestAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
