const Joi = require("joi");

const registerValidation = (data: string) => {
  const schema = Joi.object({
    username: Joi.string().min(2).max(20).required().label("Invalid input"),
  });
  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
