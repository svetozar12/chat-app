import { USER_ID } from '@chat-app/shared/common-constants';
import { USER_QUERY, sdk } from '@chat-app/web/shared';
import { useCookie } from 'next-cookie';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import Avatar from './Avatar';
import Link from 'next/link';

const Navbar = () => {
  const cookie = useCookie();
  const userId = cookie.get(USER_ID) as string;
  const [toggleDropDown, setToggleDropDown] = useState(false);
  const { data } = useQuery(USER_QUERY(userId), () =>
    sdk.user.userControllerFind(userId).then((data) => data.data)
  );
  if (!data) return <div></div>;
  const {
    _id,
    displayName,
    photos: [{ value }],
  } = data;

  return (
    <div className="flex relative justify-items-center items-center p-2 text-white">
      <Avatar
        src={value}
        props={{
          className: 'lg:w-24 lg:h-24 w-20 h-20 rounded-full cursor-pointer',
          onClick: () => setToggleDropDown(!toggleDropDown),
        }}
        key={_id}
      />
      <div
        id="dropdown"
        className={`z-10 absolute ${
          toggleDropDown ? 'block' : 'hidden'
        } -bottom-14 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
      >
        <ul
          className="py-2 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownDefaultButton"
        >
          <li>
            <Link
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              href="/logout"
            >
              LOGOUT
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <p className="font-semibold text-3xl">{displayName}</p>
      </div>
    </div>
  );
};

export default Navbar;
