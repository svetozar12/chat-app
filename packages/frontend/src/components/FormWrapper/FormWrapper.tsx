import React from 'react';
// components
import { FormControl, Box, Heading, VStack, Flex, ScaleFade } from '@chakra-ui/react';
import useThemeColors from 'hooks/useThemeColors';
import { STATE } from 'services/redux/reducer';
import { connect } from 'react-redux';
import { IAlert } from 'services/redux/reducer/alert/state';
import Alerts from 'services/chat-ui/Alerts';
import { bindActionCreators, Dispatch } from 'redux';
import { setAlert } from 'services/redux/reducer/alert/actions';

interface IFormWrapper {
  alert: IAlert;
  children: JSX.Element | JSX.Element[];
  type: 'Register' | 'Login';
  handleSubmit: () => void;
  setAlert: typeof setAlert;
}

function FormWrapper(props: IFormWrapper) {
  const { type, children, handleSubmit, alert, setAlert } = props;
  const {
    base: {
      form: { background },
    },
  } = useThemeColors();
  return (
    <ScaleFade initialScale={0.7} in>
      {!!alert.message && (
        <Alerts
          chakraProps={{ zIndex: 999 }}
          message={alert.message}
          type={alert.type}
          closeAlert={() => {
            setAlert('', 'info');
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
  setAlert: bindActionCreators(setAlert, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(FormWrapper);
