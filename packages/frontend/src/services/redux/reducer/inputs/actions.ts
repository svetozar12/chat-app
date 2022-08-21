import { ActionType } from 'services/redux/types';

const setInputUsername = (input: string) => ({
  type: ActionType.SAVE_INPUT_USERNAME,
  payload: input,
});

const setInputPassword = (input: string) => ({
  type: ActionType.SAVE_INPUT_PASSWORD,
  payload: input,
});

const setInputEmail = (input: string) => ({
  type: ActionType.SAVE_INPUT_EMAIL,
  payload: input,
});

const setInputGender = (input: string) => ({
  type: ActionType.SAVE_INPUT_GENDER,
  payload: input,
});

const setInputFile = (input: any) => ({
  type: ActionType.SAVE_INPUT_FILE,
  payload: input,
});

export { setInputUsername, setInputPassword, setInputEmail, setInputGender, setInputFile };
