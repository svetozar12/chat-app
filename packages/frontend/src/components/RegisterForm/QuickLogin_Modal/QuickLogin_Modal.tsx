import React, { FC, useEffect } from 'react';
import Link from 'next/link';
import { Button, GridItem, HStack, SimpleGrid, Skeleton } from '@chakra-ui/react';
import Loading from '../../Loading';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { toggleQuickLogin } from 'services/redux/reducer/toggles/actions';
import useThemeColors from 'hooks/useThemeColors';
import { ACCESS_TOKEN, REFRESH_TOKEN } from 'constants/cookieNames';
import { useRouter } from 'next/router';
import { useCookie } from 'next-cookie';
import routes from 'constants/routes';
import { useGetChatListQuery } from 'services/generated';
import useProvideAuth from 'hooks/useSession';

type Props = {
  AccessToken: string;
  RefreshToken: string;
} & ReturnType<typeof mapDispatchToProps>;

const QuickLoginModal: FC<Props> = ({ toggleQuickLogin, AccessToken, RefreshToken }) => {
  const {
    base: {
      button: { color },
      default: { background },
    },
  } = useThemeColors();
  const cookie = useCookie();
  const router = useRouter();
  const { auth } = useProvideAuth();
  const { data, refetch } = useGetChatListQuery({ variables: { auth } });

  return (
    <HStack w="full" h="100vh" alignItems="center" justifyContent="center" zIndex="200" pos="absolute" top={0}>
      <SimpleGrid
        gap={4}
        placeItems="center"
        columns={2}
        w={{ base: '95%', md: '80%', lg: '50%', xl: '30%' }}
        bg={background}
        h="40%"
        p={4}
        boxShadow="default"
      >
        <GridItem w="full" colSpan={{ base: 2, md: 1 }}>
          <Button
            colorScheme={color}
            w="full"
            onClick={async () => {
              cookie.set(ACCESS_TOKEN, AccessToken);
              cookie.set(REFRESH_TOKEN, RefreshToken);
              refetch();
              const { getAllChats } = data || {};
              if (getAllChats?.__typename === 'Error') return;
              const { _id } = getAllChats?.res[0] || {};
              router.push(routes.homeChat(_id as string));
            }}
          >
            Click me to Quick login
          </Button>
        </GridItem>
        <GridItem w="full" colSpan={{ base: 2, md: 1 }}>
          <Link href="/" passHref>
            <Button
              colorScheme="blue"
              w="full"
              onClick={() => {
                cookie.remove(ACCESS_TOKEN);
                cookie.remove(REFRESH_TOKEN);
                toggleQuickLogin(false);
              }}
            >
              Sign up
            </Button>
          </Link>
        </GridItem>
      </SimpleGrid>
    </HStack>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  toggleQuickLogin: bindActionCreators(toggleQuickLogin, dispatch),
});

export default connect(null, mapDispatchToProps)(QuickLoginModal);
