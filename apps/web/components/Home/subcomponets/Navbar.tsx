import { USER_ID } from '@chat-app/common/constants';
import { USER_QUERY } from '@chat-app/web/constants';
import { sdk } from '@chat-app/web/utils';
import { useCookie } from 'next-cookie';
import React from 'react';
import { useQuery } from 'react-query';
import Avatar from './Avatar';

const Navbar = () => {
  const cookie = useCookie();
  const userId = cookie.get(USER_ID) as string;
  const { data } = useQuery(USER_QUERY(userId), () =>
    sdk.user.userControllerFind(userId).then((data) => data.data)
  );
  if (!data) return <div></div>;
  const {
    id,
    displayName,
    photos: [{ value }],
  } = data;

  return (
    <div className="flex justify-items-center items-center text-white">
      <Avatar src={value} witdh={60} height={60} key={id} />
      <div>
        <p>Logged in as</p>
        <p>{displayName}</p>
      </div>
    </div>
  );
};

export default Navbar;
