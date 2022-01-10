import * as Joi from "joi";

const authSchema = Joi.object({
  username: Joi.string().min(2).required(),
  password: Joi.string().min(2).required(),
  email: Joi.string().min(2).required(),
  gender: Joi.string().required(),
});

const registerValidation = (data: {
  username: string;
  password: string;
  email: string;
  gender: string;
}) => {
  return authSchema.validate(data);
};

const updateFormSchema = Joi.object({
  username: Joi.string().min(2),
  password: Joi.string().min(2),
  email: Joi.string().min(2),
  gender: Joi.string(),
  userAvatar: Joi.string(),
});

const update_formValidation = (data: {
  username: string;
  password: string;
  email: string;
  gender: string;
  userAvatar: string;
}) => {
  return updateFormSchema.validate(data);
};
export { registerValidation, update_formValidation };
export { authSchema, updateFormSchema };
