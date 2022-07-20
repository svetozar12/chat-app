import { useColorModeValue } from "@chakra-ui/react";

const useThemeColors = () => {
  const from_bg = useColorModeValue("white", "#2c323d");
  const form_button = useColorModeValue("blue", "gray");
  const color = useColorModeValue("black", "white");
  const chat_bg = useColorModeValue("#FCFCFC", "#1A202C");
  const chat_bg_blurr = useColorModeValue("#FCFCFC", "#1A202C");
  const colors = {
    from_bg,
    form_button,
    color,
    chat_bg,
  };
  return { colors };
};

export default useThemeColors;
