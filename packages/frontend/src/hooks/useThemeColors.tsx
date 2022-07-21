import { useColorModeValue } from "@chakra-ui/react";

const useThemeColors = () => {
  const from_bg = useColorModeValue("white", "#2c323d");
  const form_button = useColorModeValue("blue", "gray");
  const color = useColorModeValue("black", "white");
  const chat_bg = useColorModeValue("#FCFCFC", "#1A202C");
  const chat_border_color = useColorModeValue("#E5E5E5", "transparent");
  const chat_message_bg_color = useColorModeValue("rgb(79, 81, 216)", "#2c323d");

  const colors = {
    from_bg,
    form_button,
    color,
    chat_bg,
    chat_border_color,
    chat_message_bg_color,
  };
  return { colors };
};

export default useThemeColors;
