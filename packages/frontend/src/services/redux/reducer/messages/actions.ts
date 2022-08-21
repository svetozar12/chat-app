import { ActionType } from 'services/redux/types';

const setMessagesAction = (message: Record<string, any>) => ({ type: ActionType.MESSAGES, payload: message });
const setPaginatedMessagesAction = (message: Record<string, any>) => ({ type: ActionType.PAGGINATION_MESSAGES, payload: message });
const deleteMessageAction = (message: Record<string, any>) => ({ type: ActionType.DELETE_MESSAGE, payload: message });
const incrementPaginationNumberAction = (number: number) => ({ type: ActionType.INCREMENT_PAGE_NUMBER, payload: number });
const resetMessagesAction = () => ({ type: ActionType.RESET_MESSAGES });

export { setMessagesAction, setPaginatedMessagesAction, deleteMessageAction, incrementPaginationNumberAction, resetMessagesAction };
