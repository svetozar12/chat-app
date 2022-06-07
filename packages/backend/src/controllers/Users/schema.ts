import Joi = require("joi");

export const UpdateUserSchema = Joi.object({
  username: Joi.string().trim().alphanum().min(3).max(30).required().messages({
    "string.base": `username should be of type text`,
    "string.empty": `username cannot be an empty field`,
    "string.min": `username should have a minimum length of {#limit}`,
    "string.max": `username should have a maximum length of {#limit}`,
  }),
  email: Joi.string().trim().email().min(3).max(30).messages({
    "string.base": `email should be of type text`,
    "string.empty": `email cannot be an empty field`,
    "string.min": `email should have a minimum length of {#limit}`,
    "string.max": `email should have a maximum length of {#limit}`,
  }),
  gender: Joi.string().valid("Male", "Female", "Others").trim().messages({
    "string.base": `gender should be of type text`,
    "string.empty": `gender cannot be an empty field`,
    "string.valid": `gender is not valid`,
  }),
});

export const CreateUserSchema = UpdateUserSchema.keys({
  username: Joi.required().messages({ "any.required": `username is a required field` }),
  gender: Joi.required().messages({ "any.required": `gender is a required field` }),
  email: Joi.required().messages({ "any.required": `email is a required field` }),
  password: Joi.string().trim().min(3).max(30).required().messages({
    "string.base": `password should be of type text`,
    "string.empty": `password cannot be an empty field`,
    "string.min": `password should have a minimum length of {#limit}`,
    "string.max": `password should have a maximum length of {#limit}`,
    "any.required": `password is a required field`,
  }),
});
