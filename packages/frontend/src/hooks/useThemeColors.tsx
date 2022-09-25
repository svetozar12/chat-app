import { useColorModeValue } from '@chakra-ui/react';

const useThemeColors = () => {
  const base = {
    default: {
      color: useColorModeValue('black', 'white'),
      inverseColor: useColorModeValue('white', '#1A202C'),
      offColor: useColorModeValue('rgba(0, 0, 0, 0.16)', 'rgba(255, 255, 255, 0.16)'),
      border: useColorModeValue('#E5E5E5', 'transparent'),
      background: useColorModeValue('#FCFCFC', '#1A202C'),
    },
    form: {
      background: useColorModeValue('white', '#2c323d'),
    },
    button: {
      color: useColorModeValue('blue', 'gray'),
    },
    message: {
      background: useColorModeValue('rgb(79, 81, 216)', '#2c323d'),
    },
  };

  return { base };
};

export default useThemeColors;
