import React from 'react';
import Link from 'next/link';
import { Button, GridItem, HStack, SimpleGrid } from '@chakra-ui/react';
import Loading from '../../Loading';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { toggleQuickLogin } from 'services/redux/reducer/toggles/actions';
import useThemeColors from 'hooks/useThemeColors';

interface IQuickLoginModal {
  toggleQuickLogin: typeof toggleQuickLogin;
  quickLogin: () => Promise<void>;
}

function QuickLoginModal(props: IQuickLoginModal) {
  const { toggleQuickLogin, quickLogin } = props;
  const [isLoading, setIsLoading] = React.useState(false);
  const {
    base: {
      button: { color },
      default: { background },
    },
  } = useThemeColors();

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
          <Button colorScheme={color} w="full" isLoading={isLoading} spinner={<Loading />} onClick={async () => await quickLogin()}>
            Click me to Quick login
          </Button>
        </GridItem>
        <GridItem w="full" colSpan={{ base: 2, md: 1 }}>
          <Link href="/" passHref>
            <Button colorScheme="blue" w="full" onClick={() => toggleQuickLogin(false)}>
              Sign up
            </Button>
          </Link>
        </GridItem>
      </SimpleGrid>
    </HStack>
  );
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  toggleQuickLogin: bindActionCreators(toggleQuickLogin, dispatch),
});

export default connect(null, mapDispatchToProps)(QuickLoginModal);
