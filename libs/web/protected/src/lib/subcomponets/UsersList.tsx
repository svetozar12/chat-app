import React, { FC } from 'react';
import Avatar from './Avatar';
import { useQuery } from 'react-query';
import { USERS_QUERY, sdk } from '@chat-app/web/shared';
import { CreateUserDtoStatusEnum } from '@chat-app/api/sdk';

interface IUsersListProps {
  usersStatus: {
    userId: string;
    status: CreateUserDtoStatusEnum;
  };
}

const UsersList: FC<IUsersListProps> = ({ usersStatus }) => {
  const { data: users } = useQuery(USERS_QUERY, () =>
    sdk.user.userControllerFindAll().then((data) => data.data)
  );
  console.log(usersStatus);
  if (!users)
    return <div className="flex my-2 h-12 bg-gray-primary-dark w-3/12"></div>;

  return (
    <div className="text-white bg-gray-primary-dark w-3/12">
      {users.map(({ _id, displayName, photos: [{ value }] }) => {
        const isOffline =
          !usersStatus[_id as keyof typeof usersStatus] ||
          usersStatus[_id as keyof typeof usersStatus] ===
            CreateUserDtoStatusEnum.Offline;
        if (isOffline) {
          return (
            <div key={_id} className="flex my-4 items-center opacity-40">
              <div className="relative">
                <Avatar
                  src={value}
                  props={{ className: 'lg:w-10 lg:h-10 w-8 h-8 rounded-full' }}
                />
              </div>
              {displayName}
            </div>
          );
        }
        return (
          <div key={_id} className="flex my-4 items-center">
            <div className="relative">
              <Avatar
                src={value}
                props={{ className: 'lg:w-10 lg:h-10 w-8 h-8 rounded-full' }}
              />

              <div className="absolute bottom-0 right-2 border-gray-primary border-2 w-4 h-4 bg-green-600 rounded-full"></div>
            </div>
            {displayName}
          </div>
        );
      })}
    </div>
  );
};

export default UsersList;
