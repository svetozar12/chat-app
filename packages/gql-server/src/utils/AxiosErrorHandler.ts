import axios, { AxiosError } from 'axios';

const AxiosErrorHandler = (error: Error) => {
  if (axios.isAxiosError(error)) {
    return error.response?.data;
  } else {
    console.log('unexpected error: ', error);
    return { Message: 'An unexpected error occurred' };
  }
};

export default AxiosErrorHandler;
