import { ActionType } from 'services/redux/types';

const setReciever = (reciever: string) => ({
  type: ActionType.SET_RECIEVER,
  payload: reciever,
});

const setInviter = (inviter: string) => ({
  type: ActionType.SET_INVITER,
  payload: inviter,
});

export { setReciever, setInviter };
