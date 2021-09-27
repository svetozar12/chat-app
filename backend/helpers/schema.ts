const Joi = require("joi");

const registerValidation = (data: string) => {
  const schema = Joi.object({
    username: Joi.string()
      .min(2)
      .max(20)
      .required()
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.code) {
            case "any.empty":
              err.message = "Schema should not be empty!";
              break;
            case "any.required":
              err.message = "Username is required";
              break;
            case "string.empty":
              err.message = "Input should not be empty!";
              break;
            case "string.base":
              err.message = "Input should be string";
              break;
            case "string.min":
              err.message = "Your username is too short";
              break;
            case "string.max":
              err.message = "Your username is too long";
              break;
          }
        });
        return errors;
      }),
  });
  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
