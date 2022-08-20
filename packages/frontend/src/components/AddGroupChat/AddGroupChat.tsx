import React from 'react';
import { IInitialSet } from 'services/redux/reducer/setReducer/state';
import { useSelector, useDispatch } from 'react-redux';
import { css, cx } from '@emotion/css';
import { CloseButton, HStack, IconButton, Input, Spacer } from '@chakra-ui/react';
import apiHelper from 'services/graphql/apiHelper';
import { useCookie } from 'next-cookie';
import { IAuthState } from 'services/redux/reducer/authReducer/state';
import { getAuth } from 'utils/authMethods';
import useThemeColors from 'hooks/useThemeColors';
import { IoCreateOutline } from 'react-icons/io5';

function AddGroupChat() {
  const [user, setUser] = React.useState<string>('');
  const [usersData, setUsersData] = React.useState<string[]>([]);
  const cookie = useCookie();
  const dispatch = useDispatch();
  const authState = useSelector((state: { authReducer: IAuthState }) => state.authReducer);
  const setState = useSelector((state: { setReducer: IInitialSet }) => state.setReducer);
  const cookieName: string = cookie.get('name');

  const emitFriendRequest = async () => {
    authState.ws?.emit('friend_request');
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
      await apiHelper.invite.createGroupChat(usersData);
      emitFriendRequest();
      setUsersData([]);
      dispatch({
        type: 'TOGGLE_CREATE_GROUP',
        payload: !setState.toggleCreateGroup,
      });
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
      {setState.toggleCreateGroup && (
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

export default AddGroupChat;
