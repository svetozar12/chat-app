import { AlertStatus } from '@chakra-ui/react';
import { ActionType } from 'services/redux/types';

const setAlert = (message: string, type: AlertStatus) => ({
  type: ActionType.SET_ALERT,
  payload: { type, message },
});

export { setAlert };
