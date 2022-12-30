import { Message } from 'services/generated';
import { ActionType } from 'services/redux/types';

const setMessagesAction = (message: any) => ({ type: ActionType.MESSAGES, payload: message });
const setPaginatedMessagesAction = (message: any) => ({ type: ActionType.PAGGINATION_MESSAGES, payload: message });
const deleteMessageAction = (message: any) => ({ type: ActionType.DELETE_MESSAGE, payload: message });
const incrementPaginationNumberAction = (number: number) => ({ type: ActionType.INCREMENT_PAGE_NUMBER, payload: number });
const resetMessagesAction = () => ({ type: ActionType.RESET_MESSAGES });

export { setMessagesAction, setPaginatedMessagesAction, deleteMessageAction, incrementPaginationNumberAction, resetMessagesAction };
