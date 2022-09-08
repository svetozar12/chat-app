import React from 'react';
import { css } from '@emotion/css';
import { useCookie } from 'next-cookie';
import { Image, Box } from '@chakra-ui/react';
import { gqlSdk } from '@chat-app/sdk';
import s from './SingleAvatar.module.css';
import { getSdk } from '@chat-app/graphql-server';
import axios from 'axios';

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
      // gqlSdk.
      gqlSdk;
      const res = await gqlSdk.user.getById(cookie.get('id'), cookie.get('token'));
      const { userAvatar } = res;

      const requestString = `${userAvatar}`;
      setImage(requestString);
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
