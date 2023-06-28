import React, { FC } from 'react';
import { useQuery } from 'react-query';
import { USER_QUERY, sdk } from '@chat-app/web/shared';
import { useCookie } from 'next-cookie';
import { USER_ID } from '@chat-app/shared/common-constants';
type Props = {
  id: string;
};
const Typing: FC<Props> = ({ id }) => {
  const { data } = useQuery(USER_QUERY(id), () =>
    sdk.user.userControllerFind(id).then((data) => data.data)
  );
  const cookie = useCookie();
  const userId = cookie.get(USER_ID) as string;
  if (!data || userId === id) return <div></div>;
  const { displayName } = data || {};
  return <div>{displayName} is typing</div>;
};

export default Typing;
