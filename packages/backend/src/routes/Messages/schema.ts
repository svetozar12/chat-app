import Joi from 'joi';
import * as Schema from '../../common/schema';

export const GetMessagesSchema = Schema.UserIdSchema.keys({
  page_size: Joi.number().messages({ 'number.base': `page_size must be of type number` }),
  page_number: Joi.number().messages({ 'number.base': `page_number must be of type number` }),
});

export const CreateMessageSchema = Schema.UserIdSchema.keys({
  message: Joi.string().trim().min(1).max(100).required().messages({
    'string.base': `message should be of type text`,
    'string.empty': `message cannot be an empty field`,
    'string.min': `message should have a minimum length of {#limit}`,
    'string.max': `message should have a maximum length of {#limit}`,
    'any.required': `message is a required field`,
  }),
});

export const UpdateMessageSchema = Schema.UserIdSchema.keys({
  message: Joi.string().trim().min(1).max(100).required().messages({
    'string.base': `message should be of type text`,
    'string.empty': `message cannot be an empty field`,
    'string.min': `message should have a minimum length of {#limit}`,
    'string.max': `message should have a maximum length of {#limit}`,
    'any.required': `message is a required field`,
  }),
});
