import { extendTheme } from "@chakra-ui/react";
// c comes from components
import c from "./CustomComponents";

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
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
    main_white: "#FCFCFC",
    main_black: "#1A202C",
    off_black: "#1c2330",
    main_green: "rgb(52, 192, 34)",
    main_blue: "rgb(79, 81, 216)",
    off_blue: "rgb(38, 92, 163)",
    main_red: "rgb(231, 10, 10)",
    form_gray: "#343a40",
    me_chat_buble: "#a5a7ac",
    button_blue: "#0069d9",
    gradient_first: "#dfdfdf",
    gradient_second: "#fff",
    input_border_color: "#ccd0d5",
    main_logo_color: " #bfc2c6",
    bad_alert_color: "#f24654",
    bad_alert_bgcolor: " rgba(255, 0, 0, 0.5)",
    good_alert_color: "#60af86",
    good_alert_bgcolor: "rgba(0, 255, 0, 0.5)",
    main_box_shadow: "rgba(0, 0, 0, 0.2)",
    hover_bg: "rgba(122, 122, 122, 0.3)",
  },
});

export default theme;
