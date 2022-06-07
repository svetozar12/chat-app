import Joi = require("joi");
import * as Schema from "../../common/schema";

export const GetInviteSchema = Joi.object({
  status: Joi.string().valid("accepted", "recieved", "declined").messages({
    "string.base": `status should be of type text`,
    "string.empty": `status cannot be an empty field`,
    "any.only": `status is not valid`,
  }),
});

export const CreateInviteSchema = Schema.UserIdSchema.keys({
  reciever: Joi.string().trim().alphanum().min(3).max(30).required().messages({
    "string.base": `reciever should be of type text`,
    "string.empty": `reciever cannot be an empty field`,
    "string.min": `reciever should have a minimum length of {#limit}`,
    "string.max": `reciever should have a maximum length of {#limit}`,
    "any.required": `reciever is a required field`,
  }),
});

export const UpdateInviteSchema = Schema.UserIdSchema.keys({
  status: Joi.string().valid("accepted", "recieved", "declined").required().messages({
    "string.base": `status should be of type text`,
    "string.empty": `status cannot be an empty field`,
    "any.only": `status is not valid`,
    "any.required": `status is a required field`,
  }),
});

export const CreateGroupChat = Joi.object({
  usersData: Joi.array().required().messages({
    "string.base": `usersData should be of type array`,
    "string.empty": `usersData cannot be an empty field`,
    "any.required": `usersData is a required field`,
  }),
});