import React, { FC } from 'react';
import Avatar from './Avatar';
import { useQuery } from 'react-query';
import { USERS_QUERY, sdk } from '@chat-app/web/shared';

const UsersList: FC = () => {
  const { data: users } = useQuery(USERS_QUERY, () =>
    sdk.user.userControllerFindAll().then((data) => data.data)
  );
  if (!users)
    return <div className="flex my-2 h-12 bg-gray-primary-dark w-1/6"></div>;
  return (
    <div className="text-white bg-gray-primary-dark w-1/6">
      {users.map(({ _id, displayName, photos: [{ value }] }) => {
        return (
          <div key={_id} className="flex my-4 items-center">
            <Avatar
              src={value}
              props={{ className: 'lg:w-10 lg:h-10 w-8 h-8 rounded-full' }}
            />
            {displayName}
          </div>
        );
      })}
    </div>
  );
};

export default UsersList;
