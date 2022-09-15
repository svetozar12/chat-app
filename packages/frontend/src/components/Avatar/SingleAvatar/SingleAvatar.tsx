import React from 'react';
import { css } from '@emotion/css';
import { useCookie } from 'next-cookie';
import { Image, Box } from '@chakra-ui/react';
import s from './SingleAvatar.module.css';
import sdk from 'services/sdk';

function SingleAvatar({
  width,
  height,
  overlay,
  group,
  preview,
}: {
  width?: string;
  height?: string;
  overlay?: boolean;
  group?: boolean;
  preview?: string;
}) {
  const [image, setImage] = React.useState<string>('');
  const cookie = useCookie();

  const getUserImage = async () => {
    try {
      const res = await sdk.user.getUser({ auth: { userId: cookie.get('id'), AccessToken: cookie.get('token') } });
      const {
        getUser: { userAvatar },
      } = res;

      setImage(userAvatar);
      return true;
    } catch (error) {
      return false;
    }
  };

  (() => {
    getUserImage();
  })();

  return (
    <>
      {preview ? (
        <Box resize="none" w={width ?? '3.5rem'} h={height ?? '3.5rem'} color="var(--main-logo-color)" zIndex={overlay ? 1 : 0}>
          <Image src={image} alt="random" className={`${group ? s.groupLogo : s.singleLogo} `} />
        </Box>
      ) : (
        <Box resize="none" zIndex={overlay ? 1 : 0}>
          <Image
            src={image}
            alt="random"
            className={`${
              group
                ? s.groupLogo
                : css`
                    border-radius: 100%;
                    margin: 0;
                    width: ${width ?? '3.5rem'};
                    height: ${height ?? '3.5rem'};
                    color: var(--main-logo-color);
                    ${overlay ? 'bottom: 0;' : 'top:0'}
                    ${overlay ? 'left: 0;' : 'right:0'}
                  `
            } `}
          />
        </Box>
      )}
    </>
  );
}

export default SingleAvatar;
