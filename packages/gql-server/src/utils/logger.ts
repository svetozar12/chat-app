import consoleColours from "../constants/consoleColours";

const logger = (
  type: "log" | "info" | "warn" | "error",
  message: any,
  optionalParams?: any[],
) => {
  let color = "";

  switch (type) {
    case "info":
      color = consoleColours.reverse;
      break;
    case "error":
      color = consoleColours.fg.red;
      break;
    case "warn":
      color = consoleColours.fg.yellow;
      break;
  }

  if (optionalParams) return console[type](color, message, ...optionalParams);
  return console[type](color, message);
};

export default logger;
