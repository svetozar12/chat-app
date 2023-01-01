import {
  FormControl,
  Box,
  VStack,
  Flex,
  ScaleFade,
  Button,
  ButtonProps,
  HStack,
  InputProps,
  CheckboxProps,
  RadioProps,
} from '@chakra-ui/react';
import Fields from 'components/FormWrapper/subcomponents/Fields';
import useThemeColors from 'hooks/useThemeColors';
import { ReactNode } from 'react';
import { useForm } from 'react-hook-form';

export type RadioButtons = {
  value: string;
  props?: RadioProps;
};

export interface IFields {
  props?: InputProps & CheckboxProps;
  label?: string;
  radioButtons?: RadioButtons[];
}

interface IButtons {
  props?: ButtonProps;
  value: string;
}

interface IFormWrapper {
  onSubmit: (date: any) => Promise<any>;
  fields: IFields[];
  buttons: IButtons[];
  header?: ReactNode;
}

function FormWrapper(props: IFormWrapper) {
  const { onSubmit, fields, buttons, header } = props;
  const {
    base: {
      form: { background },
    },
  } = useThemeColors();
  const { register, handleSubmit } = useForm();
  return (
    <ScaleFade initialScale={0.7} in>
      <Flex h="100vh" flexDir="column" alignItems="center" justifyContent="center" pos="relative" zIndex="101">
        <Box
          bg={background}
          w={{ base: '95%', sm: '90%', md: '70%', lg: '60%', xl: '40%' }}
          maxH="auto"
          minH="45vh"
          padding="3rem"
          boxShadow="default"
        >
          {header}
          <FormControl w="full" borderRadius="5px">
            <form onSubmit={handleSubmit(onSubmit)}>
              <VStack w="full" alignItems="flex-start" spacing={5}>
                {/*Fields  */}
                <Fields fields={fields} register={register} />
                <HStack flexWrap="wrap" w="100%" display="flex">
                  {buttons.map(({ props, value }) => (
                    <Button {...props} key={value}>
                      {value}
                    </Button>
                  ))}
                </HStack>
              </VStack>
            </form>
          </FormControl>
        </Box>
      </Flex>
    </ScaleFade>
  );
}

export type { IFormWrapper };

export default FormWrapper;

// {!!alert.message && (
//   <Alerts
//     chakraProps={{ zIndex: 999 }}
//     message={alert.message}
//     type={alert.type}
//     closeAlert={() => {
//       setAlert('', 'info');
//     }}
//   />
// )}
