import { extendTheme, withDefaultProps } from "@chakra-ui/react";
// c comes from components
import c from "./CustomComponents";

const theme = extendTheme({
  components: {
    Input: {
      variants: {
        ...c.FormInput,
      },
    },
    Button: {
      variants: {
        ...c.FormButton,
      },
    },
  },
  shadows: {
    default: "0 2px 30px rgba(0, 0, 0, 0.1)",
  },
  colors: {
    chat_form_bg: { 100: "#343a40" },
  },
});

export default theme;
