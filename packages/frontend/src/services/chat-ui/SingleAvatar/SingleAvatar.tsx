import React, { FC, useEffect } from 'react';
import { css } from '@emotion/css';
import { Image, Box, BoxProps } from '@chakra-ui/react';
import s from './SingleAvatar.module.css';
import useThemeColors from 'hooks/useThemeColors';
import { IBaseComponent } from 'services/chat-ui/types';
import { useGetUserByIdQuery, AuthModel } from 'services/generated';
import useProvideAuth from 'hooks/useSession';

type Base = IBaseComponent<BoxProps>;

interface ISingleAvatar extends Base {
  width?: string;
  height?: string;
  overlay?: boolean;
  group?: boolean;
  preview?: string;
  imageSrc?: string;
}

const SingleAvatar: FC<ISingleAvatar> = ({ baseProps, chakraProps, group, height, imageSrc, overlay, preview, style, width }) => {
  const { auth } = useProvideAuth();
  const { data } = useGetUserByIdQuery({ variables: { auth } });
  const { getUser } = data || {};
  const {
    base: {
      default: { color },
    },
  } = useThemeColors();

  if (getUser?.__typename == 'Error') return <></>;

  return (
    <Box mb="0 !important" {...chakraProps} {...style} {...baseProps} boxShadow={`0px 0px 3px 0px ${color}`} borderRadius="full">
      {preview ? (
        <Box resize="none" w={width ?? '3.5rem'} h={height ?? '3.5rem'} color="var(--main-logo-color)" zIndex={overlay ? 1 : 0}>
          <Image src={imageSrc || getUser?.userAvatar} alt="random" className={`${group ? s.groupLogo : s.singleLogo} `} />
        </Box>
      ) : (
        <Box resize="none" zIndex={overlay ? 1 : 0}>
          <Image
            src={imageSrc || getUser?.userAvatar}
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
    </Box>
  );
};

export default SingleAvatar;
