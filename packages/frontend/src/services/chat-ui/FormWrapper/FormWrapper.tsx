import React from 'react';
// components
import { FormControl, Box, Heading, VStack, Flex, ScaleFade, FlexProps } from '@chakra-ui/react';
import useThemeColors from '../../../hooks/useThemeColors';
import { IBaseComponent } from '../types';

type Base = IBaseComponent<FlexProps>;
interface IFormWrapper extends Base {
  children: JSX.Element | JSX.Element[];
  type: 'Register' | 'Login';
  handleSubmit: () => void;
}

function FormWrapper(props: IFormWrapper) {
  const { type, children, handleSubmit, style, baseProps, chakraProps } = props;
  const {
    colors: { fromBg },
  } = useThemeColors();
  return (
    <ScaleFade initialScale={0.7} in>
      {/* {(state.good || state.bad) && <Alerts />} */}
      <Flex
        h="100vh"
        flexDir="column"
        alignItems="center"
        justifyContent="center"
        pos="relative"
        zIndex="101"
        {...chakraProps}
        {...style}
        {...baseProps}
      >
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
          bg={fromBg}
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

export default FormWrapper;
