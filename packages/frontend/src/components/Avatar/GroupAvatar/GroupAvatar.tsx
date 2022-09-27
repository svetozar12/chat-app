import React from 'react';
import { useCookie } from 'next-cookie';
import sdk from 'services/sdk';
import { SingleAvatar } from 'services/chat-ui';

interface IGroup_avatar {
  members: string[];
}

function GroupAvatar({ members }: IGroup_avatar) {
  const [images, setImages] = React.useState<string[]>([]);
  const cookie = useCookie();
  const username: string = cookie.get('username');
  const getUserImage = async (image: string) => {
    try {
      const res = await sdk.user.getById({ auth: { userId: cookie.get('id'), AccessToken: cookie.get('token') } });
      const { userAvatar } = res;
      if (!userAvatar) {
        return false;
      }

      const requestString = `${image}`;
      setImages([...images, requestString]);
      return true;
    } catch (error) {
      return false;
    }
  };
  React.useEffect(() => {
    members?.forEach((element) => {
      if (element) getUserImage(element);
    });
  }, []);
  return (
    <div title={`groupChat-${username}`} className="groupLogoContainer">
      {members.map((element, index) => {
        if (index === 2) return null;
        return (
          <div key={index} title={username}>
            <SingleAvatar width="2.3125rem" height="2.3125rem" group overlay={index === 1} />
          </div>
        );
      })}
    </div>
  );
}

export default GroupAvatar;
