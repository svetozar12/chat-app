import Joi = require("joi");
import * as Schema from "../../common/schema";

export const UpdateChatSchema = Schema.UserIdSchema.keys({
  username: Joi.string().trim().email().min(3).max(30).required().messages({
    "string.base": `username should be of type text`,
    "string.empty": `username cannot be an empty field`,
    "string.min": `username should have a minimum length of {#limit}`,
    "string.max": `username should have a maximum length of {#limit}`,
    "any.required": `username is a required field`,
  }),
});
