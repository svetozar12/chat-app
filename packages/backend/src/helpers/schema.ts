import * as Joi from "joi";

const registerValidation = (data: any) => {
  const schema = Joi.object({
    username: Joi.string().min(2).max(20).required().label("Invalid input"),
    password: Joi.string().min(2).max(20).required().label("Invalid input"),
  });
  return schema.validate(data);
};

export default registerValidation;
