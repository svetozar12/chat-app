import { useColorModeValue } from '@chakra-ui/react';

const useThemeColors = () => {
  const fromBg = useColorModeValue('white', '#2c323d');
  const formButton = useColorModeValue('blue', 'gray');
  const color = useColorModeValue('black', 'white');
  const chatBg = useColorModeValue('#FCFCFC', '#1A202C');
  const chatBorderColor = useColorModeValue('#E5E5E5', 'transparent');
  const chatMessageBgColor = useColorModeValue('rgb(79, 81, 216)', '#2c323d');

  const colors = {
    fromBg,
    formButton,
    color,
    chatBg,
    chatBorderColor,
    chatMessageBgColor,
  };
  return { colors };
};

export default useThemeColors;
