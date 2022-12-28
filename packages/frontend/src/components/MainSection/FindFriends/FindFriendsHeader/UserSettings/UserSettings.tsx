import React from 'react';
import { connect } from 'react-redux';
import { useCookie } from 'next-cookie';
import Link from 'next/link';
// utils
import { css } from '@emotion/css';
import { Link as ALink, useColorModeValue, VStack } from '@chakra-ui/react';
// icons
import { IoMdLogOut } from 'react-icons/io';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import { FiSettings } from 'react-icons/fi';
import { getAuth } from '../../../../../utils/authMethods';
import useThemeColors from '../../../../../hooks/useThemeColors';
import { bindActionCreators, Dispatch } from 'redux';
import { toggleUserSettings } from 'services/redux/reducer/toggles/actions';
import sdk from 'services/sdk';
import { useRouter } from 'next/router';
import { BsFillSunFill } from 'react-icons/bs';
import { MdDarkMode } from 'react-icons/md';
import { AuthModel, useDeleteUserMutation } from 'services/generated';

const buttonStyles = css`
  margin: 0 1rem;
  border-radius: unset;
  width: 1.5rem;
  height: 1.5rem;
`;

interface IUserSettings {
  toggleUserSettings: typeof toggleUserSettings;
}

function UserSettings(props: IUserSettings) {
  const { toggleUserSettings } = props;
  const cookie = useCookie();
  const router = useRouter();
  const [deleteUserMutation] = useDeleteUserMutation();
  const {
    base: {
      form: { background },
      default: { offColor },
    },
  } = useThemeColors();

  const deleteUser = async () => {
    try {
      getAuth();
      const auth: AuthModel = { userId: cookie.get('id'), AccessToken: cookie.get('token') };
      await deleteUserMutation({ variables: { auth } });
      router.push('/logout');

      return true;
    } catch (error) {
      return false;
    }
  };

  const Render = [
    {
      href: '#',
      onClick: deleteUser,
      Icon: RiDeleteBin6Fill,
      title: ' Delete user',
    },
    {
      href: '/logout',
      Icon: IoMdLogOut,
      title: 'Log out',
    },
  ];

  return (
    <VStack
      w={{ base: '15rem', lg: '15rem' }}
      pos="absolute"
      justifyContent="center"
      align="center"
      bg={background}
      textAlign="left"
      top={0}
      right={0}
      m={0}
      pt={2}
      pb={2}
      zIndex={2000}
      transform="translate(215px, -103px)"
      boxShadow={`${offColor} 0px 1px 4px`}
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
});

export default connect(null, mapDispatchToProps)(UserSettings);
