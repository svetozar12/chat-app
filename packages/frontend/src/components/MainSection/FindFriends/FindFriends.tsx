import React from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { css } from '@emotion/css';
import { useCookie } from 'next-cookie';
// services
import apiHelper from 'services/graphql/apiHelper';
import { getAuth } from 'utils/authMethods';
import { useAuth } from 'utils/SessionProvider';
// components
import SkeletonFindFriendsHeader from 'components/Loading/SkeletonFindFriendsHeader';
import { Skeleton, VStack, FormControl } from '@chakra-ui/react';
import FindFriendsHeader from './FindFriendsHeader';
import FindFriendsSearch from './FindFriendsSearch';
import { STATE } from 'services/redux/reducer';
import { IWebSocket } from 'services/redux/reducer/websocket/state';
import IInvite from 'services/redux/reducer/invites/state';

interface IFindFriends {
  ws: IWebSocket;
  invite: IInvite;
}

function FindFriends(props: IFindFriends) {
  const { ws, invite } = props;
  const dispatch = useDispatch();

  const cookie = useCookie();
  const { user } = useAuth();

  const sendInvite = async () => {
    try {
      await getAuth();
      const res = await apiHelper.invite.create(cookie.get('id'), invite.reciever, cookie.get('token'));
      ws.ws?.emit('send_friend_request', {
        inviter: res.inviter,
        reciever: res.reciever,
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
      dispatch({ type: 'SET_RECIEVER', payload: '' });
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

export default connect(mapStateToProps)(React.memo(FindFriends));
