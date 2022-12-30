import React from 'react';
import { connect } from 'react-redux';
import { css } from '@emotion/css';
import { bindActionCreators, Dispatch } from 'redux';
import { Skeleton, VStack, FormControl } from '@chakra-ui/react';
import { useCookie } from 'next-cookie';
// services
import { setReciever } from 'services/redux/reducer/invites/actions';
import { getAuth } from 'utils/authMethods';
import { STATE } from 'services/redux/reducer';
import { IWebSocket } from 'services/redux/reducer/websocket/state';
import IInvite from 'services/redux/reducer/invites/state';
// components
import SkeletonFindFriendsHeader from 'components/Loading/SkeletonFindFriendsHeader';
import FindFriendsHeader from './FindFriendsHeader';
import FindFriendsSearch from './FindFriendsSearch';
import { useCreateInviteMutation } from 'services/generated';
import useProvideAuth from 'hooks/useSession';

interface IFindFriends {
  ws: IWebSocket;
  invite: IInvite;
  setReciever: typeof setReciever;
}

function FindFriends(props: IFindFriends) {
  const { ws, invite, setReciever } = props;
  const cookie = useCookie();
  const { user } = useProvideAuth();
  const [createInviteMutation, { data }] = useCreateInviteMutation();
  const sendInvite = async () => {
    try {
      await getAuth();
      await createInviteMutation({
        variables: {
          auth: { userId: cookie.get('id'), AccessToken: cookie.get('token') },
          reciever: invite.reciever,
        },
      });
      const { createInvite } = data || {};
      if (createInvite?.__typename === 'Error') throw new Error(createInvite.message);
      const { reciever, inviter } = createInvite || {};

      ws.ws?.emit('send_friend_request', {
        inviter,
        reciever,
      });

      return true;
    } catch (error) {
      console.log(error);

      return false;
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<SVGElement>) => {
    e.preventDefault();
    if (invite.reciever) {
      await sendInvite();
      setReciever('');
    }
  };

  return (
    <VStack
      className={css`
        width: 100%;
        margin: 0;
        padding: 1rem;
        display: flex;
        justify: flex-start;
        position: relative;
        margin-bottom: 1rem;
        align-items: center;
      `}
    >
      {user ? <FindFriendsHeader /> : <SkeletonFindFriendsHeader />}
      <FormControl>{user ? <FindFriendsSearch handleSubmit={handleSubmit} /> : <Skeleton w="100%" mt={1} h="2.6875rem" />}</FormControl>
    </VStack>
  );
}

const mapStateToProps = (state: STATE) => ({
  ws: state.ws,
  invite: state.invite,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setReciever: bindActionCreators(setReciever, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(FindFriends));
