import Joi = require("joi");

export const UserIdSchema = Joi.object({
  user_id: Joi.string()
    .trim()
    .required()
    .messages({ "string.empty": `user_id cannot be empty`, "any.required": `user_id is required field` }),
});

export const ChatIdSchema = Joi.object({
  chat_id: Joi.string()
    .trim()
    .required()
    .messages({ "string.empty": `chat_id cannot be empty`, "any.required": `chat_id is required field` }),
});

export const DefaultIdSchema = Joi.object({
  _id: Joi.string().trim().required().messages({ "string.empty": `_id cannot be empty`, "any.required": `_id is required field` }),
});

export const InviteIdSchema = Joi.object({
  invite_id: Joi.string()
    .trim()
    .required()
    .messages({ "string.empty": `invite_id cannot be empty`, "any.required": `invite_id is required field` }),
});
