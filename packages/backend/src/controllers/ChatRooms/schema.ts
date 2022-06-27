import Joi = require("joi");
import * as Schema from "../../common/schema";

export const CreateChatSchema = Schema.UserIdSchema.keys({
  invite_id: Joi.string()
    .trim()
    .required()
    .messages({ "string.empty": `invite_id cannot be empty`, "any.required": `invite_id is required field` }),
  user1: Joi.string().trim().min(3).max(30).messages({
    "string.base": `user1 should be of type text`,
    "string.empty": `user1 cannot be an empty field`,
    "string.min": `user1 should have a minimum length of {#limit}`,
    "string.max": `user1 should have a maximum length of {#limit}`,
  }),
  user2: Joi.string().trim().min(3).max(30).messages({
    "string.base": `user2 should be of type text`,
    "string.empty": `user2 cannot be an empty field`,
    "string.min": `user2 should have a minimum length of {#limit}`,
    "string.max": `user2 should have a maximum length of {#limit}`,
  }),
});

export const UpdateChatSchema = Schema.UserIdSchema.keys({
  username: Joi.string().trim().min(3).max(30).messages({
    "string.base": `username should be of type text`,
    "string.empty": `username cannot be an empty field`,
    "string.min": `username should have a minimum length of {#limit}`,
    "string.max": `username should have a maximum length of {#limit}`,
  }),
  usersData: Joi.array().messages({
    "array.base": `usersData should be of type array`,
    "array.empty": `usersData cannot be an empty field`,
  }),
});
