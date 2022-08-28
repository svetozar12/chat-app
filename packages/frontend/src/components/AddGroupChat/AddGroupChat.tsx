import React from 'react';
import { css, cx } from '@emotion/css';
import { CloseButton, HStack, IconButton, Input, Spacer } from '@chakra-ui/react';
import { gqlSdk } from '@chat-app/sdk';
import { useCookie } from 'next-cookie';
import { getAuth } from 'utils/authMethods';
import useThemeColors from 'hooks/useThemeColors';
import { IoCreateOutline } from 'react-icons/io5';
import { connect } from 'react-redux';
import { STATE } from 'services/redux/reducer';
import { IWebSocket } from 'services/redux/reducer/websocket/state';
import { IToggle } from 'services/redux/reducer/toggles/state';
import { bindActionCreators, Dispatch } from 'redux';
import { toggleCreateGroup } from 'services/redux/reducer/toggles/actions';

interface IAddGroupChat {
  ws: IWebSocket;
  toggle: IToggle;
  toggleCreateGroup: typeof toggleCreateGroup;
}

function AddGroupChat(props: IAddGroupChat) {
  const { toggle, ws, toggleCreateGroup } = props;
  const [user, setUser] = React.useState<string>('');
  const [usersData, setUsersData] = React.useState<string[]>([]);
  const cookie = useCookie();
  const cookieName: string = cookie.get('name');

  const emitFriendRequest = async () => {
    ws.ws?.emit('friend_request');
  };

  const addToGroup = (user: string, e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUsersData((prev) => [...prev, user]);
    setUser('');
  };

  const removeFromGroup = (username: string) => {
    const newUsersData = usersData.filter((user) => user !== username);
    setUsersData(newUsersData);
  };

  const handleSumbit = async () => {
    try {
      getAuth();
      const result = usersData.includes(cookieName);

      if (!result) usersData.push(cookieName);
      await gqlSdk.invite.createGroupChat(usersData);
      emitFriendRequest();
      setUsersData([]);
      toggleCreateGroup(!toggle.toggleCreateGroupModal);
      return true;
    } catch (error) {
      setUsersData([]);
      return false;
    }
  };

  const {
    colors: { chatMessageBgColor, chatBg },
  } = useThemeColors();

  return (
    <>
      {toggle.toggleCreateGroupModal && (
        <div
          className={css`
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;
            background: ${chatBg};
          `}
        >
          <form
            className={cx(
              css`
                width: 100%;
                flex-direction: row;
              `,
              'flex',
            )}
            onSubmit={(e) => addToGroup(user, e)}
          >
            <Input
              className={css`
                width: 70%;
                margin: 0.5rem 0;
                transition: 0.3s;
                padding: 1.3rem 0.9rem;
              `}
              borderTopRightRadius="none"
              borderBottomRightRadius="none"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              placeholder="Add user ..."
              type="search"
            />
            <IconButton
              w="3rem"
              borderTopLeftRadius="none"
              borderBottomLeftRadius="none"
              aria-label="icon"
              icon={<IoCreateOutline />}
              onClick={handleSumbit}
            />
          </form>
          <HStack mx={5} gap={5}>
            {usersData.map((element, index) => (
              <HStack align="center" justify="center" bg={chatMessageBgColor} color="main_white" p="0.5rem 0.8rem" key={index}>
                <p>{element}</p>
                <Spacer />
                <CloseButton
                  onClick={() => {
                    removeFromGroup(element);
                  }}
                  borderRadius="full"
                />
              </HStack>
            ))}
          </HStack>
        </div>
      )}
    </>
  );
}

const mapStateToProps = (state: STATE) => ({
  ws: state.ws,
  toggle: state.toggle,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  toggleCreateGroup: bindActionCreators(toggleCreateGroup, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddGroupChat);
