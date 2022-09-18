import { consoleColours } from '../common/constants';
import { developEnv } from '../config/env';

const logger = (type: 'log' | 'info' | 'warn' | 'error', message: any, optionalParams?: any[]) => {
  let color = '';

  switch (type) {
    case 'info':
      color = consoleColours.reverse;
      break;
    case 'error':
      color = consoleColours.fg.red;
      break;
    case 'warn':
      color = consoleColours.fg.yellow;
      break;
  }

  if (developEnv.DEBUG === 'false') return;
  if (optionalParams) return console[type](color, message, ...optionalParams);
  return console[type](color, message);
};

export default logger;
