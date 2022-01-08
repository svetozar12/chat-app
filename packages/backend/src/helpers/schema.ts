import * as Joi from "joi";

const authSchema = Joi.object({
  username: Joi.string().min(2).required(),
  password: Joi.string().min(2).required(),
  email: Joi.string().min(2).required(),
  gender: Joi.string().required(),
});

const registerValidation = (data: any) => {
  return authSchema.validate(data);
};
export { registerValidation };
export default authSchema;
