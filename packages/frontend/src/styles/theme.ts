import { extendTheme, withDefaultProps } from "@chakra-ui/react";

const Input = {
  baseStyle: {
    borderColor: "red.200",
    _hover: {
      borderColor: "red.200",
    },
  },
  sizes: {
    sm: {
      fontSize: "md",
      height: "40px",
    },
  },
  defaultProps: {
    size: "lg",
  },
};

const theme = extendTheme({
  shadows: {
    default: "0 2px 30px rgba(0, 0, 0, 0.1)",
  },
  colors: {
    chat_form_bg: { 100: "#343a40" },
  },
  components: {
    Input,
  },
});

export default theme;
