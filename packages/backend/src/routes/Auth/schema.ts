import Joi from 'joi';

export const LoginSchema = Joi.object({
  username: Joi.string().trim().alphanum().min(3).max(30).required().messages({
    'string.base': `username should be of type text`,
    'string.empty': `username cannot be an empty field`,
    'string.min': `username should have a minimum length of {#limit}`,
    'string.max': `username should have a maximum length of {#limit}`,
    'any.required': `username is a required field`,
  }),
  password: Joi.string().trim().alphanum().min(3).max(30).required().messages({
    'string.base': `password should be of type text`,
    'string.empty': `password cannot be an empty field`,
    'string.min': `password should have a minimum length of {#limit}`,
    'string.max': `password should have a maximum length of {#limit}`,
    'any.required': `password is a required field`,
  }),
});
