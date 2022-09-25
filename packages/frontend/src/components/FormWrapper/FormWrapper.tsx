import React from 'react';
// components
import { FormControl, Box, Heading, VStack, Flex, ScaleFade, FlexProps } from '@chakra-ui/react';
import useThemeColors from 'hooks/useThemeColors';
import { STATE } from 'services/redux/reducer';
import { connect } from 'react-redux';
import { IAlert } from 'services/redux/reducer/alert/state';
import Alerts from 'services/chat-ui/Alerts';
import { bindActionCreators, Dispatch } from 'redux';
import { setLoginError, setRegisterError } from 'services/redux/reducer/alert/actions';

interface IFormWrapper {
  alert: IAlert;
  children: JSX.Element | JSX.Element[];
  type: 'Register' | 'Login';
  handleSubmit: () => void;
  setLoginError: typeof setLoginError;
  setRegisterError: typeof setRegisterError;
}

function FormWrapper(props: IFormWrapper) {
  const { type, children, handleSubmit, alert, setLoginError, setRegisterError } = props;
  const {
    base: {
      form: { background },
    },
  } = useThemeColors();
  const isAlert = alert.good || alert.bad;
  return (
    <ScaleFade initialScale={0.7} in>
      {!!isAlert && (
        <Alerts
          chakraProps={{ zIndex: 999 }}
          message={isAlert}
          type={alert.good ? 'success' : 'error'}
          closeAlert={() => {
            setLoginError('');
            setRegisterError('');
          }}
        />
      )}
      <Flex h="100vh" flexDir="column" alignItems="center" justifyContent="center" pos="relative" zIndex="101">
        <Heading
          w={{ base: '95%', sm: '90%', md: '70%', lg: '60%', xl: '40%' }}
          p="0.5rem"
          color="white"
          borderTopRadius="5px"
          textAlign="center"
          bg="form_gray"
        >
          {type}
        </Heading>
        <Box
          bg={background}
          w={{ base: '95%', sm: '90%', md: '70%', lg: '60%', xl: '40%' }}
          maxH="auto"
          minH="45vh"
          padding="3rem"
          boxShadow="default"
        >
          <FormControl w="full" borderRadius="5px">
            <form onSubmit={handleSubmit}>
              <VStack w="full" alignItems="flex-start" spacing={5}>
                {children}
              </VStack>
            </form>
          </FormControl>
        </Box>
      </Flex>
    </ScaleFade>
  );
}

export type { IFormWrapper };

const mapStateToProps = (state: STATE) => ({
  alert: state.alert,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setLoginError: bindActionCreators(setLoginError, dispatch),
  setRegisterError: bindActionCreators(setRegisterError, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(FormWrapper);
