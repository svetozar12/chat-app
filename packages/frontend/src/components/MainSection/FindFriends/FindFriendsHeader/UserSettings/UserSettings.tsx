import React, { FC } from 'react';
import { useCookie } from 'next-cookie';
// utils
import { css } from '@emotion/css';
import { MenuItem, MenuList } from '@chakra-ui/react';
// icons
import { IoMdLogOut } from 'react-icons/io';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import { getAuth } from '../../../../../utils/authMethods';
import { useRouter } from 'next/router';
import { AuthModel, useDeleteUserMutation } from 'services/generated';

const buttonStyles = css`
  margin: 0 1rem;
  border-radius: unset;
  width: 1.5rem;
  height: 1.5rem;
`;

const UserSettings: FC = () => {
  const cookie = useCookie();
  const router = useRouter();
  const [deleteUserMutation] = useDeleteUserMutation();

  const deleteUser = async () => {
    try {
      getAuth();
      const auth: AuthModel = { userId: cookie.get('id'), AccessToken: cookie.get('token') };
      await deleteUserMutation({ variables: { auth } });
      router.push('/logout');

      return true;
    } catch (error) {
      return false;
    }
  };

  const Render = [
    {
      onClick: deleteUser,
      Icon: RiDeleteBin6Fill,
      title: ' Delete user',
    },
    {
      onClick: () => router.push('/logout'),
      Icon: IoMdLogOut,
      title: 'Log out',
    },
  ];

  return (
    <MenuList>
      {Render.map((element, index) => {
        const { onClick, Icon, title } = element;
        return (
          <MenuItem onClick={onClick} key={title}>
            <Icon className={buttonStyles} />
            <span>{title}</span>
          </MenuItem>
        );
      })}
    </MenuList>
  );
};

export default UserSettings;
