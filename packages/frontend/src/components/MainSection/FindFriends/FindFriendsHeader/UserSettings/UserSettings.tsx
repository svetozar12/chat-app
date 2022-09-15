import React from 'react';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import { useCookie } from 'next-cookie';
import Link from 'next/link';
// utils
import { css } from '@emotion/css';
import { Link as ALink, VStack } from '@chakra-ui/react';
// icons
import { IoMdLogOut } from 'react-icons/io';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import { FiSettings } from 'react-icons/fi';
import { getAuth } from '../../../../../utils/authMethods';
import useThemeColors from '../../../../../hooks/useThemeColors';
import { bindActionCreators, Dispatch } from 'redux';
import { toggleUserSettings } from 'services/redux/reducer/toggles/actions';
import { signOut } from 'services/redux/reducer/auth/actions';
import sdk from 'services/sdk';

const buttonStyles = css`
  margin: 0 1rem;
  border-radius: unset;
  width: 1.5rem;
  height: 1.5rem;
`;

interface IUserSettings {
  toggleUserSettings: typeof toggleUserSettings;
  signOut: typeof signOut;
}

function UserSettings(props: IUserSettings) {
  const { toggleUserSettings, signOut } = props;
  const router = useRouter();
  const cookie = useCookie();

  const deleteCookies = async () => {
    getAuth();
    const cookies = cookie.getAll();
    await sdk.auth.logout({ auth: { userId: cookie.get('id'), AccessToken: cookie.get('token') } });
    for (const key in cookies) cookie.remove(key);

    router.push('/');
    signOut();
  };

  const deleteUser = async () => {
    try {
      getAuth();
      await sdk.user.deleteUser({ auth: { userId: cookie.get('id'), AccessToken: cookie.get('token') } });
      deleteCookies();
      return true;
    } catch (error) {
      return false;
    }
  };

  const Render = [
    {
      href: '/settings/profile',
      onClick: () => {
        toggleUserSettings(false);
      },
      Icon: FiSettings,
      title: 'User settings',
    },
    {
      href: '#',
      onClick: deleteCookies,
      Icon: IoMdLogOut,
      title: 'Log out',
    },
    {
      href: '#',
      onClick: deleteUser,
      Icon: RiDeleteBin6Fill,
      title: ' Delete user',
    },
  ];

  const {
    colors: { fromBg },
  } = useThemeColors();
  return (
    <VStack
      w={{ base: '15rem', lg: '15rem' }}
      pos="absolute"
      justifyContent="center"
      align="center"
      bg={fromBg}
      textAlign="left"
      top={0}
      right={0}
      m={0}
      pt={2}
      pb={2}
      zIndex={2000}
      transform="translate(-4px, 75px)"
      boxShadow=" 2px 2px 22px 1px var(--main-box-shadow)"
    >
      {Render.map((element, index) => {
        const { href, onClick, Icon, title } = element;

        return (
          <Link key={index} href={href} passHref>
            <ALink
              display="flex"
              justifyContent="flex-start"
              alignItems="center"
              textAlign="start"
              w="full"
              my="0 !important"
              py="2"
              fontSize={{ base: '1.4rem', md: '3vw', lg: '2vw', xl: '1vw' }}
              _hover={{ bg: 'hover_bg' }}
              onClick={onClick}
            >
              <Icon className={buttonStyles} />
              {title}
            </ALink>
          </Link>
        );
      })}
    </VStack>
  );
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  toggleUserSettings: bindActionCreators(toggleUserSettings, dispatch),
  signOut: bindActionCreators(signOut, dispatch),
});

export default connect(null, mapDispatchToProps)(UserSettings);
