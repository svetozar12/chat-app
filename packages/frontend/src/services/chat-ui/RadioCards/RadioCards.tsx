// eslint-disable-next-line import/named
import { Box, BoxProps, useRadio, UseRadioProps } from '@chakra-ui/react';
import { IBaseComponent } from 'services/chat-ui/types';

type Base = IBaseComponent<BoxProps> & UseRadioProps;
interface IRadioCard extends Base {
  children: JSX.Element | JSX.Element[];
}

function RadioCard(props: IRadioCard) {
  const { baseProps, chakraProps, style } = props;
  const { getInputProps, getCheckboxProps } = useRadio(props);
  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label" {...chakraProps} {...style} {...baseProps}>
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        textAlign="center"
        minW="6.25rem"
        fontWeight="semibold"
        _checked={{
          bg: '#3182ce',
          color: 'white',
          borderColor: '#3182ce',
        }}
        px={5}
        py={3}
      >
        {props.children}
      </Box>
    </Box>
  );
}

export default RadioCard;
