import { Message } from '@chat-app/api/db';
import m2s = require('mongoose-to-swagger');

export default {
  message: m2s(Message),
};
