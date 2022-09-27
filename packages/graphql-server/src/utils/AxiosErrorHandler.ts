import axios, { AxiosError } from "axios";

const AxiosErrorHandler = (error: AxiosError) => {
  if (axios.isAxiosError(error)) {
    const {
      //   @ts-ignore
      response: { data },
    } = error;
    return data;
  } else {
    console.log("unexpected error: ", error);
    return "An unexpected error occurred";
  }
};

export default AxiosErrorHandler;
